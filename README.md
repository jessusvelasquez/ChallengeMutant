
# Mutant Challenge!!!! (Desafío mutante)

Se quiere reclutar la mayor cantidad de mutantes. Por lo cual te han
contratado a ti para que desarrolles un proyecto que detecte si un humano es 
mutante basándose en su secuencia de ADN. 

Sabrás si un humano es mutante, si encuentras más de una secuencia de cuatro letras 
iguales, de forma oblicua, horizontal o vertical

**Técnologias utilizadas:** \
Nodejs/express\
Jest \
VS Code\
Mongo DB 



## Documentación



### Datos de entrada
El api expone dos endpoint, un método post el cual recibe un arreglo de datos tipo 
string correspondiente a la secuencia de DNA para analizar:

POST :=> **/mutant** \
{ 
"dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] 
}

La ejecución de este proceso arroja un un modelo de respuesta donde se indica su el DNA
correponde o no a mutante: \

{\
    "isMutant": false\
}

El otro endpoint corresponde a un reporte (/stats), donde se puede conocer la cantidad
de DAN analizados, cuatos de ellos son mutantes y cuantos no al igual que su procentaje:\

GET :=> **/stast**\
Response:\
{
    "stats_dna": {
        "count_mutant_dna": 1,
        "count_human_dna": 2,
        "ratio": 0.5
    }
}
## Demo

En construccion...


## Instalacion ambiente Local

Para este utilizar este proyecto de forma local se deben seguir la siguientes instrucciones:
Clonar el código desde https://github.com/jessusvelasquez/ChallengeMutant \
Instalar las dependencias con el comando indicado:

```bash
  npm install
```
Una vez finalice la instalacion de las depencias, puede iniciar el proyecto.
```bash
  npm start
```

### Importante
Este proyecto utiliza una base de datos mongodb, por lo cual para correcto y completo
funcionamineto, la debe tener instalada y de ser posible ajustar los datos de conexión
situados en la clase **functions/database.js**
## Pruebas Unitarias

Puede ejecutar el siguiente comando para ver las pruebas unitarias

```bash
  npm test
```

Al finalizar este proceso se imprimirá en consola un reporte sobre las mismas, estas
se encuentra con covertura al 100%
## Autor

- [@jessusvelasquez](https://github.com/jessusvelasquez/ChallengeMutant)

