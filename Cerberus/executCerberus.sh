#!/bin/bash


which java | grep -q /usr/bin/java
if [ $? = 0 ] 
then echo "ok"

sudo apt-get update
sudo apt-get install openjdk-8-jdk
fi


echo java -jar /home/aluno/'Área de Trabalho'/cerberus-maquina-10.jar-with-dependencies.jar >executCerberus.sh
chmod +x executCerberus.sh
sudo cp executCerberus.sh /usr/local/bin

