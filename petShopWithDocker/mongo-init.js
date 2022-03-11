db = db.getSiblingDB('animal_db');

db.createCollection('animals');

db.animals.insertMany([
    {
        "name": "Хедвик",
        "type": "Сова",
        "sex": "м",
        "color": "серый",
        "age": 1,
        "family": "Birds",
        "uniqueAbilities": "доставлять почту"
    },
    {
        "name": "Фоукс",
        "type": "Феникс",
        "sex": "м",
        "color": "оранжевый",
        "age": 101,
        "family": "Birds",
        "uniqueAbilities": "исцелять слезами"
    },
    {
        "name": "Симба",
        "type": "Лев",
        "sex": "м",
        "color": "жёлтый",
        "age": 1,
        "family": "Cats",
        "uniqueAbilities": "честность"
    },
    {
        "name": "Гав",
        "type": "Котёнок",
        "sex": "м",
        "color": "песочный",
        "age": 1,
        "family": "Cats",
        "uniqueAbilities": "искать неприятности"
    },
    {
        "name": "Саймон",
        "type": "Кот",
        "sex": "м",
        "color": "серо-белый",
        "family": "Cats",
        "age": 1,
        "uniqueAbilities": "кушать и гулять",
    },
    {
        "name": "Дружок",
        "type": "Пёс",
        "age": 1,
        "sex": "м",
        "color": "чёрный",
        "family": "Dogs",
        "uniqueAbilities": "бегать за кошкой",
    },
    {
        "name": "Кеша",
        "type": "Попугай",
        "age": "1",
        "sex": "м",
        "color": "разноцветный",
        "family": "Cacatuidae",
        "uniqueAbilities": "разговаривать",
    }
]);