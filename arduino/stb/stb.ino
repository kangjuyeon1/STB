#include <SoftwareSerial.h>
#include <Servo.h>
#include "HX711.h"

#define ESP8266_RX 2
#define ESP8266_TX 3

#define calibration_factor 650 //declaration loadcell scale value
#define HX711_CLK 4
#define HX711_DOUT 5

#define SERVO_PIN 8

#define ULTRASONIC_ECHO 9
#define ULTRASONIC_TRIG 10
#define THRESHOLD 10

SoftwareSerial mySerial(ESP8266_RX, ESP8266_TX); // RX, TX ESP8266

HX711 scale(HX711_DOUT, HX711_CLK); //amp pin declaration

unsigned long lastMillis;

Servo myservo;

// variables declarations for connection to server
String ipAddress = "10.10.180.171";
int portNumber = 80;
String ssid = "JTI-3.11";
String password = "";

// Function declarations
void sendCommandAndWaitForResponse(String command, String expectedResponse);
void sendDataToServer(String data);
void detectPerson();

void setup() {
  Serial.begin(9600);
  mySerial.begin(9600);

  pinMode(ULTRASONIC_TRIG, OUTPUT);
  pinMode(ULTRASONIC_ECHO, INPUT);

  myservo.attach(SERVO_PIN, 500, 2400);  // attaches the servo on GIO2 to the servo object
  myservo.write(0);

  //randomSeed(analogRead(0)); // Seed the random generator
  scale.set_scale(calibration_factor); //designation scale
  scale.tare(); //setting scale

  sendCommandAndWaitForResponse("AT+RST", "OK");
  sendCommandAndWaitForResponse("AT+CWMODE=1", "OK");
  sendCommandAndWaitForResponse("AT+CWJAP=\"" + ssid + "\",\"" + password + "\"", "WIFI GOT IP");
  sendCommandAndWaitForResponse("AT+CIPSTART=\"TCP\",\"" + ipAddress + "\"," + String(portNumber), "CONNECT");
}

void loop() {
  detectPerson();

  float weightSensorValue = scale.get_units() / 220.462;

  Serial.print("Load Cell Reading: ");
  Serial.print(weightSensorValue, 1);
  Serial.print(" point"); //1point per 10gram 
  Serial.println();

  // // Send data to the server
  // sendDataToServer(String(weightSensorValue));
}

// Function to send a command and wait for the expected response
void sendCommandAndWaitForResponse(String command, String expectedResponse) {
  mySerial.println(command);

  String response = "";
  unsigned long startTime = millis();
  unsigned long timeout = 1000; // Set the timeout to 5 seconds

  while (millis() - startTime < timeout) {
    if (mySerial.available() > 0) {
      char receivedChar = mySerial.read();
      if (receivedChar == '\n') {
        Serial.println("response: " + response);

        if (response.indexOf(expectedResponse) != -1) {
          Serial.print("   Received: " + response + "\n");
          return;
        }

        response = ""; // Clear the response buffer after processing a complete line
      } else {
        response += receivedChar;
      }
    }
  }

  // Timeout reached, response not fully received
  Serial.println("Timeout waiting for response: " + expectedResponse);
}

// Function to send data to the Flask server
void sendDataToServer(String data) {
  String httpRequest = "POST /data HTTP/1.1\r\n";
  httpRequest += "Host: " + ipAddress + "\r\n";
  httpRequest += "Content-Type: application/x-www-form-urlencoded\r\n";
  httpRequest += "Content-Length: ";
  httpRequest += data.length() + 13;
  httpRequest += "\r\n\r\n";
  httpRequest += "sensor_value=";
  httpRequest += data;
  httpRequest += "\r\n\r\n";

  // AT+CIPSEND=<length of httpRequest>
  sendCommandAndWaitForResponse("AT+CIPSEND=" + String(httpRequest.length()), "");
  // Send HTTP request
  sendCommandAndWaitForResponse(httpRequest + "\n", "SEND OK");
  // ESP Response: AT+CIPSTART="TCP","222.104.209.55",80
  sendCommandAndWaitForResponse("AT+CIPSTART=\"TCP\",\"" + ipAddress + "\"," + String(portNumber), "");
}

void detectPerson() {
  long duration, distance;
  bool isChanged = false;
  
  digitalWrite(ULTRASONIC_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(ULTRASONIC_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(ULTRASONIC_TRIG, LOW);

  duration = pulseIn(ULTRASONIC_ECHO, HIGH); //saving echo time into variable

  distance = -1; // 초기화
  if((duration > 200) && (duration < 10000)){
    distance = duration * 17 / 1000;
    Serial.println("distance : " + String(distance));
  }

  if (distance != -1 && distance < THRESHOLD) {
    myservo.write(180);
    lastMillis = millis();
    Serial.println("true"+String(lastMillis));
  }


  if ((distance == -1) && (millis() - lastMillis >= 10000)) { //if it takes more than 10s
    Serial.println("*******");
    myservo.write(0); // make it's degree 0
  }

  delay(500);
}
