
# Template Front-End con caracteristicas de seguridad de la informacion

## Lista de características disponibles

1. Guía de estilo de código fuente
El diseño del template tiene en cuenta la adhesión a la guía de estilo de AirBnB, disponible en https://github.com/airbnb/javascript. Este enfoque busca mantener coherencia y buenas prácticas en el código fuente, siguiendo las recomendaciones establecidas por AirBnB para el desarrollo en JavaScript.

Cubre el control de seguridad:
- [Secure system architecture and engineering principles](https://www.iso.org/standard/27001) refuerza la importancia de aplicar principios específicos de seguridad en la codificación del software.

2. Validación de datos de entrada
Se considera la validación de los tipos de datos ingresados
Guía de uso e implementación
En la ruta src/boot/directive.js se encuentran directivas. En inputs agregar la directiva que corresponda al tipo de dato que se pretende restringir.

Cubre el control de seguridad:
- [Application security requirements](https://www.iso.org/standard/27001) 

https://owasp.org/www-project-top-ten/

Evidencia de prueba satisfactoria
Por ejemplo: La directiva personalizada 'my-only-alphanumeric' en el código proporcionado tiene como objetivo restringir el contenido de un campo de entrada (input) en el front end a caracteres alfanuméricos, permitiendo solo letras (tanto minúsculas como mayúsculas) y números. 

3. Sistema de autenticación un factor (usuario y contraseña)
Se cuenta con un sistema de autenticación basado en un único factor, que requiere la combinación de un nombre de usuario y una contraseña para verificar la identidad del usuario.

Cubre el control de seguridad:
- [Privileged access rights, Information access restriction, secure authentication](https://www.iso.org/standard/27001) dejando unicamente que una vez se haya autenticado podra acceder al sistema.

- [Use of criptography](https://www.iso.org/standard/27001) y [A02:2021-Criptographic failures](https://owasp.org/www-project-top-ten/ ): Se emplea criptografía mediante el hashing de contraseñas con sal única para garantizar la seguridad en el almacenamiento y verificación de las credenciales de los usuarios.


4. Uso de software actualizado
En la implementación del template, se ha optado por utilizar la versión más reciente del framework [Quasar (v2.14.0)](https://quasar.dev/) para el desarrollo del lado del cliente, junto con [Laravel 10](https://laravel.com/docs/10.x) en el lado del servidor, buscando aprovechar las últimas funcionalidades y mejoras proporcionadas por ambas tecnologías.

Cubriendo el control de seguridad:
- [Vulnerable and Outdated Components]( https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/ )

5. Borrado lógico
El borrado lógico permite marcar registros como "eliminados" sin eliminar físicamente la información. Esto es beneficioso para preservar la integridad de los datos y, al mismo tiempo, cumplir con requisitos de privacidad o regulaciones que puedan exigir la eliminación de cierta información.

Satisface el control de seguridad:
- [Information deletion](https://www.iso.org/standard/27001)
- [Information backup](https://www.iso.org/standard/27001)
Esto permite mantener un historial de cambios en la base de datos, lo que puede ser útil en situaciones en las que es importante conservar versiones anteriores de los datos.

6.- 
