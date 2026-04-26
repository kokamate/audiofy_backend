# 📒 OOODIFY Backend Dokumentáció

## 🏪 Bevezetés
Az OOODIFY egy olyan weboldal, ahol zenéket hallgathatsz vagy tölthetsz fel te magad is akár, bármikor! A felhasználók könnyedén böngészhetnek különböző műfajok között, kedvelhetnek zenéket és felfedezhetnek új előadókat, ami lehetővé teszi hogy mindenki gyorsan megtalálja a hangulatának megfelelő zenét.

## Adatbázis

- user
  	- userID
	- email
	- psw
	- role
    
- music
  	- songID 
  	- userID
	- name
	- musicImg
	- title
  	- song
    
- liked songs
  	- userID 
  	- songID

![kép az adatbáziskapcsolatokról](https://github.com/durocsongor/ooodify_kepek/blob/main/kepek/K%C3%A9perny%C5%91felv%C3%A9tel%20(51).png?raw=true)

>[Megtekintés](https://drawsql.app/teams/csapat-2/diagrams/audify-database)

---
## Backend

A backend
- Node.js alapú
- Express keretrendszerrel
- MySQL adatbázissal


### Telepítés és futtatás
```bash
git clone https://github.com/kokamate/audiofy_backend.git
```
---

### Mappa struktúra
```markdown
├── audiofy_backend/
│   ├── config/
│       └── dotenvConfig.js
│   ├── controllers/
│       └── adminController.js
│       └── songController.js
│       └── userController.js
│   ├── db/
│       └── db.js
│   ├── middleware/
│       └── multer.js
│       └── uploadSong.js
│       └── userMiddleware.js
│   ├── models/
│       └── adminModel.js
│       └── SongImgModel.js
│       └── songModel.js
│       └── userModel.js
│   ├── routes/
│       └── adminRoutes.js
│       └── SongImgRoutes.js
│       └── songRoutes.js
│       └── userRoutes.js
│   ├── uploads/
│       └── 41/
│       └── 42/
│   ├── package.json
│   ├── server.js
│   ├── index.js
│   ├── app.js
```
---

### Használt package-ek
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [multer](https://www.npmjs.com/package/multer)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [nodemon](https://www.npmjs.com/package/nodemon)

````javascript
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.3.1",
    "multer": "^2.1.1",
    "mysql2": "^3.17.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.11"
  }
````
---  

### Biztonság
- **JWT** token alapú hitelesítés
- Jelszavak **bcryptjs** segítségével vannak hashelve
- Middleware szinten történik az authentikáció
- A **.env** fájl tartalmaz minden érzékeny adatot – ne oszd meg publikusan!
---

### Végpontok
Az app.js -be meghívtuk az összes routes fájlt és mint egy közlekedési csomópont igazgatja a végpontokat.
````javascript

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/song', songRoutes);
````
>app.js
---
1. user végpontok

    | Művelet        | HTTP                                               | Végpont         | Leírás                                                                 |
    |----------------|----------------------------------------------------|-----------------|------------------------------------------------------------------------|
    | Regisztráció   | ![POST](https://img.shields.io/badge/-POST-yellow) | `/register` 	| Új felhasználó regisztrálása                                           |
    | Bejelentkezés  | ![POST](https://img.shields.io/badge/-POST-yellow) | `/login`        | Felhasználó bejelentkezése                                             |
    | Kijelentkezés  | ![POST](https://img.shields.io/badge/-POST-yellow) | `/logout`       | Felhasználó kijelentkezése                                             |
    | Ellenőrzés     | ![GET](https://img.shields.io/badge/-GET-green)    | `/whoAmI`     	| Bejelentkezés ellenőrzése 											 |
    | Zenelekérés    | ![GET](https://img.shields.io/badge/-GET-green)    | `/musics`     	| Zenék betöltése 											 			 |
    | Likeolás       | ![POST](https://img.shields.io/badge/-GET-green)   | `/like/:songID`| Tudunk egy zenét kedvelni 											     |
    | Likeok lekérése| ![GET](https://img.shields.io/badge/-GET-green)    | `/liked-songs`  | Likeoltak zenék betöltése 											 |


    ```javascript
		router.post('/register', register)
		router.post('/login', login)
		router.get('/whoami', auth, whoAmI)
		router.post('/logout', auth, logout)
		router.get('/musics', getmusics)
		router.post('/like/:songID', auth, toggleLikeSong)
		router.get('/liked-songs', auth, getLikedSongIDsHandler)
    ```
    >userRoutes.js

	2. admin végpontok

	| Művelet                | HTTP   | Végpont                | Leírás                                    |
	| ---------------------- | ------ | ---------------------- | ----------------------------------------- |
	| Felhasználók lekérése  | ![GET](https://img.shields.io/badge/-GET-green)    | `/users`               | Összes felhasználó lekérése               |
	| Zenék lekérése         | ![GET](https://img.shields.io/badge/-GET-green)    | `/musics`              | Összes zene lekérése                      |
	| Felhasználó törlése    | ![DELETE](https://img.shields.io/badge/-DELETE-red) | `/deleteusers/:userID` | Egy felhasználó törlése ID alapján        |
	| Zene törlése           | ![DELETE](https://img.shields.io/badge/-DELETE-red) | `/deletesongs/:songID` | Egy zene törlése ID alapján               |
	| Felhasználó frissítése | ![PUT](https://img.shields.io/badge/-PUT-blue)     | `/updateuser/:userID`  | Felhasználó adatainak frissítése          |
	| Zene frissítése        | ![PUT](https://img.shields.io/badge/-PUT-blue)     | `/updatesong/:songID`  | Zene adatainak frissítése                 |
	| Zene feltöltése        | ![POST](https://img.shields.io/badge/-GET-green)   | `/uploadsong`          | Új zene feltöltése (fájl + kép feltöltés) |



    ```javascript
		router.get('/users', getusers);
		router.get('/musics', getmusics);
		router.delete('/deleteusers/:userID', deleteuser);
		router.delete('/deletesongs/:songID', deletesongs);
		router.put('/updateuser/:userID', updateuser);
		router.put('/updatesong/:songID', updatesong);
		
		router.post('/uploadsong', upload.fields([
		  { name: 'song', maxCount: 1 },
		  { name: 'img', maxCount: 1 }
		]), uploadSong);
    ```
>adminRoutes.js
    

---
### Tesztelés

# Bejelentkezés teszt
![postman teszt1](https://github.com/durocsongor/ooodify_kepek/blob/main/K%C3%A9perny%C5%91felv%C3%A9tel%20(52).png?raw=true)

# Ki vagyok teszt
![postman teszt2](https://github.com/durocsongor/ooodify_kepek/blob/main/K%C3%A9perny%C5%91felv%C3%A9tel%20(53).png?raw=true)

A projekt jelenleg manuálisan tesztelt és tesztelhető a **Postman** segítségével.
---

## Frontend

- [Github repo](https://github.com/durocsongor/audiofy_frontend_biztonsagi.git)
- [Frontend](https://csongi.netlify.app)

## Használt eszközök
- [VS code](https://code.visualstudio.com)
- [NPM](https://www.npmjs.com)
- [Postman](https://www.postman.com)
- [DrawSQL](https://drawsql.app)
- [W3Schools](https://www.w3schools.com)
- [ChatGPT](https://chatgpt.com)
- [GitHub](https://github.com/)
- [Google Drive](https://workspace.google.com/products/drive/)
- [PhpMyAdmin](https://www.phpmyadmin.net)
