# POS system
POS system for Assignment of Software Engineering class

Figma: https://www.figma.com/file/NVNqgbbpfwQHBcd6ai9ysd/Untitled?node-id=0%3A1  
Trello: https://trello.com/b/WLR01H8g/ph%C3%A2n-t%C3%ADch-requirements

Welcome to our restaurant\
If you want to clone this project, please do as following:\
Step 1: Clone this github project by command "git clone https://github.com/hungprovip0089/CNPM.git" \
Step 2: Adjust the url in file .env to connect to one of your schema in MONGO.\
Step 3: Use command "npm start" to start the server.\
Now you can enjoy our team's restaurant with your own schema.\
\
But wait, another note: You must create table if you want customers to access your page, create employees if you want to hire employees. \
Firstly, you have to create a collection named "employees" in your database (the fields are in our directory "model"). \
Secondly, please create a document as below: \
 {   "id" : "MNG0", \
    "name" : "Mr.Tony Stark", \
    "type" : "manager", \
    "username" : "admin", \
    "pwd" : "admin" \
 } \
 id,name,username,pwd are whatever you want but the type must be "manager".\
 Then please use this account to create table, create employee by the functions of the manager.\
 \
 ![image](https://user-images.githubusercontent.com/71562654/144164050-48f875cb-4b37-43fc-8976-ca4ffdbe8172.png) \
 \
 Here is the list of tables that I have just created: \
 \
 ![image](https://user-images.githubusercontent.com/71562654/144164193-c8a3061e-4a4e-4b33-8186-1847e548ca08.png)
\
You can set the QR code to link to the format url: localhost:3000/customer/... \
... is the ID of the table your restaurant has (for example above I have 5 tables with perspective ids: TABLE0,TABLE1,TABLE2,TABLE3,TABLE4).\
Your customers can access to, for example: localhost:3000/customer/TABLE0 \
\
![image](https://user-images.githubusercontent.com/71562654/144164489-9ea8237d-72ac-45c9-96cf-511300ec154f.png)
\
Now you can try this.\
Here is our demo : https://drive.google.com/file/d/1qlDPMtVFTAQDIgmJRSZxI4g7ds3XUDq_/view?usp=sharing.


