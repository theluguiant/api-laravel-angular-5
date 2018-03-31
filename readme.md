# api-laravel-angular-5
Intalación laravel 5.6
----------------------
Por consola de comando ir a la carpeta del proyecto laravel 5.6 (first-api-angular), previamente teniendo el composer instalado ingresar el comando 

```
composer install
```

Con esto instalaremos las dependencias de laravel, acto seguido copiar el archivo .env del archivo .env.example

Intalación angular 5
--------------------
Por consola de comando ir a la carpeta del proyecto angular 5 (front-angular-first), previamente teniendo el comando npm instalado
ingresar el siguiente comando 

```
npm install
```

 Con esto instalaremos los modulos necesarios de angular 5, preferiblemente ya deberiamos tener el angular cli intalado tambien si no seguir la siguiente liga [angular cli](<https://cli.angular.io/>)

Arrancar el serviodor laravel
-----------------------------
por consola ir a la carpeta del proyecto laravel y ejecutar el comando

```
php artisan serve
```

con esto arrancamos nuestro servidor laravel, para que siga funcionando no cierren esta consola y abran una nueva para hacer los siguiente procedimientos

Arrancar el serviodor angular 5
-------------------------------
Instalado previemanete el angular cli, ir por consola de comandos a la carpeta del proyecto angular 5 y ejecutar el siguiente comando

```
ng serve
```

con esto iniciaremos el proyecto angular 5

Rutas
-----
localhost:4200/register => nos permite ir a la vista de registro y agregar nuevos usuarios <br />
localhost:4200/login => vista pantalla de logueo <br /> 
localhost:4200 => home <br />
