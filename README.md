# <img src="https://i.imgur.com/CwNl45b.png" width="24"> IASA Champ '24 Система Прогнозування Погоди
![Promo](https://i.imgur.com/gP0X8wh.png)

## Скріншот роботи застосунку
![Site](https://i.imgur.com/2GhD6sV.png)



## Установка та запуск (Linux)

Переконайтеся, що у системі встановлено `docker`.

```
docker info
```

### Дотримуйтесь наведених нижче інструкцій, щоб встановити залежності та запустити проект.

### Клонування репозиторію

```
git clone https://github.com/Arthurysh/weather-analyzer.git
cd weather-analyzer
```

### Встановлення залежностей та запуск контейнеру

```
sudo docker compose up
```
> [!NOTE]
> При наявності помилки Docker daemon виконайте команду запуску служби `sudo systemctl start docker`



### Після повідомлення про успішний запуск серверу перейдіть за посиланням

```
http://localhost:3000/
```

> [!WARNING]
> Для отримання даних про стан погоди сервер використовує Open Meteo Weather Api. При перевищенні запитів зачекайте 1 день, або використовуйте іншу мережу


### Посилання на корисні ресурси
<img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png" width="32"> [Офіційний сайт Docker](https://www.docker.com/)

<img src="https://publicapi.dev/images/logos/open-meteo.com.png" width="32"> [Open Meteo Weather API](https://open-meteo.com/)

## Розробники

Студенти групи ІПЗм-23-1

- [Лапін Владислав](https://github.com/MagisterFelix)
- [Ющенко Артур](https://github.com/Arthurysh)
- [Корнев Олександр](https://github.com/fenixqwe)
- [Трофіменко Олексій](https://github.com/AlexeyTrofimenko)
