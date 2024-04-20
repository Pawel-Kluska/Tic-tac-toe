#!/bin/bash
yum update -y
yum install -y yum-utils device-mapper-persistent-data lvm2 python3-pip git docker

# Start Docker service
systemctl start docker
systemctl enable docker

# Download Docker Compose binary
if [ ! -f "/usr/local/bin/docker-compose" ]; then
    wget -q https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -O /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

git clone https://github.com/Pawel-Kluska/Tic-tac-toe.git /home/ec2-user/Tic-tac-toe
echo "IP_ADDRESS=$(curl checkip.amazonaws.com)" | sudo tee /home/ec2-user/Tic-tac-toe/.env > /dev/null
sudo docker-compose -f /home/ec2-user/Tic-tac-toe/docker-compose-prod.yml up -d