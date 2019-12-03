#!/bin/bash


which java | grep -q /usr/bin/java
if [ $? = 0 ] 
then echo "ok"

sudo apt-get update
sudo apt-get install openjdk-8-jdk
fi


echo java -jar /home/aluno/'Área de Trabalho'/cerberus-maquina-10.jar-with-dependencies.jar >Cerberus.sh
chmod +x Cerberus.sh
sudo cp Cerberus.sh /usr/local/bin







