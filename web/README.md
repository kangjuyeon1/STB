## Smart Trash Bin | Front End & Server
i dont know what to put here on the description

<hr/>

##### Initial Setup
- Setup Project
  ```bash
  npm install
  ```

- Run Project
  ```bash
  npm serverstart
  ```

<hr/>

<!-- brow -->
##### Check Local IP
- Linux/Derivatives
  ```bash
  ip -o -4 addr list wlo1 | awk '{print $4}' | cut -d/ -f1
  ```

- Windows
  ```powershell
  (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Local *").IPAddress
  ```

<hr/>

The BEERWARE License (BEERWARE)

Copyright (c) 2022 3.11 Team. All rights reserved.

Licensed under the "THE BEER-WARE LICENSE" (Revision 42):
3.11 Team wrote this file. As long as you retain this notice you
can do whatever you want with this stuff. If we meet some day, and you think
this stuff is worth it, you can buy me a beer or coffee in return
