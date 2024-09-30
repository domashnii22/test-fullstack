# Иструкция по установке и запуску

1) Если установлен Docker Compose
- Открыть терминал Bash
- Перейти в папку server командой "cd server/"
- Выполнить команду "npm run docker-up"
- После поднятия контейнеров перейти по [ссылке] (http://localhost:4000)

2) Если не установлен Docker Compose
- Скачайте установщик Docker Desktop с официального сайта [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).
- Установите Docker Desktop, следуя инструкциям установщика. Docker Compose входит в состав Docker Desktop.
- В папке docker на вашем компьютере открываем файл daemon.json и вставляем туда следующие инструкции:
 "registry-mirrors": [
    "https://dockerhub.timeweb.cloud",
    "https://c.163.com",
    "https://regiistry.docker-cn.com",
    "https://mirror.gcr.io",
    "https://daocloud.io"
  ]
- Перезапускаем Docker Desktop
- Выполняем все шаги из п.1 "Если установлен Docker Compose" 

Примечание: при повторном поднятии контейнеров удаляйте папку pgdata из корня проекта