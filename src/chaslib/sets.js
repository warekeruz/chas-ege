'use strict';

/** @namespace chaslib.sets
 * Наборы
 */
chaslib.sets = {
	/** @namespace chaslib.sets.alphabets
	 * Алфавиты/Азбуки
	 */
	alphabets : {
		/**
		 * Английский алфавит
		 */
		english : [ 'A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'Q', 'U', 'W', 'X', 'Y', 'Z' ],


		/**
		 * Русская азбука
		 */
		russian : [ 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'П', 'Р', 'С', 'Т', 'У', 'Ф',
		            'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я' ],
	},


	/**
	 * Единицы длинны
	 */
	lengthUnits : [
		{ name : 'русская миля', inMeters : 7467.6 },
		{ name : 'верста', inMeters : 1066.8 },
		{ name : 'кабельтов', inMeters : 185.2 },
		{ name : 'морская миля', inMeters : 1852 },
		{ name : 'американская миля', inMeters : 1609.34 },
		{ name : 'фурлонг', inMeters : 201.16 },
		{ name : 'метр', inMeters : 1 },
		{ name : 'километр', inMeters : 1000 },
		{ name : 'дециметр', inMeters : 0.1 },
		{ name : 'сантиметр', inMeters : 0.01 },
		{ name : 'миллиметр', inMeters : 0.001 },
	],


	/**
	 * Единицы измерения грузов
	 */
	weightUnits : [ 'тонна', 'кубометр' ],


	/**
	 * Стороны монеты
	 */
	sidesOfCoin : [ 'орёл', 'решка' ],


	/**
	 * Разы
	 */
	times : [ 'ни разу', 'один раз', 'дважды', 'трижды', 'четырежды', 'пятикратно', 'шестикратно', 'семикратно', 'восьмикратно',
	          'девятикратно', 'десятикратно' ],

	/**
	 * Качества
	 */
	merits  : [ 'безопасность', 'комфорт', 'функциональность', 'качество', 'внешний вид', 'простота ремонта', 'надёжность',
	            'гарантийный срок', 'скорость запуска', 'настраиваемость' ],

	/**
	 * Товары
	 */
	goods : [ 'автомобиль', 'кофеварка', 'чайник', 'ноутбук', 'бензопила', 'СВЧ-печь', 'велосипед', 'садовый насос' ],


	/**
	 * Имена (женские)
	 */
	womanNames : [ 'Анастасия', 'Юлия', 'Елена', 'Ольга', 'Яна', 'Олеся', 'Кристина', 'Вероника', 'Элеонора', 'Дарья', 'Мария',
	                'Екатерина', 'Софья', 'Наталия', 'Надежда', 'Александра' ],


	/**
	 * Отчества (женские)
	 */
	womanPatronymic : [ 'Ивановна', 'Петровна', 'Фёдоровна', 'Васильевна', 'Анатольевна', 'Николаевна', 'Сергеевна', 'Игоревна',
	                     'Михайловна', 'Владимировна', 'Олеговна', 'Степановна', 'Юрьевна', 'Александровна', 'Алексеевна' ],


	/**
	 * Професии (женские)
	 */
	womanProfessions : [ 'суровая хакерша', 'программистка', 'веб-дизайнер', 'аспирантка', 'скромный библиотекарь', 'блондинка',
	                      'студентка', 'школьница', 'комсомолка, спортсменка, отличница и, наконец, просто красавица', '' ],


	/**
	 * Транспортные средства
	 */
	transportation : [ '\'Запорожец\'', '\'Москвич\'', /*'автомобиль',*/ 'грузовик', 'велосипед', 'доисторический омнибус', 'автобус' ],


	/**
	 * Месяца
	 */
	months : [
		{ name : 'январь', daysCount : 31 },
		{ name : 'февраль', daysCount : 28 },
		{ name : 'март', daysCount : 31 },
		{ name : 'апрель', daysCount : 30 },
		{ name : 'май', daysCount : 31 },
		{ name : 'июнь', daysCount : 30 },
		{ name : 'июль', daysCount : 31 },
		{ name : 'август', daysCount : 31 },
		{ name : 'сентябрь', daysCount : 30 },
		{ name : 'октябрь', daysCount : 31 },
		{ name : 'ноябрь', daysCount : 30 },
		{ name : 'декабрь', daysCount : 31 }
	],


	/**
	 * Валюты
	 */
	currencies : [ 'российский рубль', 'доллар США', 'евро', 'фунт стерлингов' ],


	/**
	 * Еда
	 */
	food : [ 'сырок', 'шоколадка', 'яблоко', 'груша', 'упаковка сока', 'бутерброд', 'бутылка газировки', 'батон', 'буханка хлеба' ],


	/**
	 * Корабли
	 */
	ships : [ 'корабль', 'круизный лайнер', 'прогулочное судно', 'теплоход', 'пароход', 'атомоход' ],


	/**
	 * Сроки
	 */
	terms : [ 'неделя', 'декада', 'месяц' ],


	/**
	 * Учереждения
	 */
	agencies : [ 'офис', 'канцелярия', 'секретариат', 'министерство', 'ведомство', 'Рособрнадзор', 'Минобрнауки' ],


	/**
	 * Дни недели
	 */
	weekDays : [ 'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота' ],

	/**
	 * Страны
	 */
	countries : [ 'Россия', 'Белоруссия', 'Китай', 'ЮАР', 'Эквадор', 'Венесуэла', 'Куба', 'Австралия', 'Австрия', 'Бельгия',
	              'Англия', 'Германия', 'Польша', 'Сербия', 'Чехия', 'Словакия', 'Словения', 'Израиль', 'Бразилия', 'Мексика' ],


	/**
	 * Игры на двоих
	 */
	gamesForTwo : [ 'шахматы', 'вольная борьба', 'настольный теннис', 'бадминтон', 'шашки' ],


	/**
	 * Виды спорта
	 */
	sports : [ 'гимнастика', 'вольная борьба', 'лёгкая атлетика', 'тяжёлая атлетика' ],


	/**
	 * Стеклянные изделия
	 */
	vitrics : [ 'витрина', 'оконная рама', 'аквариум', 'книжная полка', 'террариум' ],


	/**
	 * Жидкости
	 */
	liquids : [ 'воды', 'ртути', 'жидкости', 'раствора', 'бензина', 'керосина', 'метилового спирта', 'газировки', 'уксуса',
	            'нефти' ],

	/**
	 * Города
	 */
	cities : [ 'Киров', 'Воронеж', 'Москва', 'Санкт-Петербург', 'Казань', 'Сочи', 'Семилуки', 'Хабаровск', 'Магадан', 'Красноярск' ],


	/**
	 * Просьбы ответить
	 */
	answer : [ 'выразите', 'дайте', 'приведите', 'запишите' ],


	/**
	 * Просьбы найти
	 */
	answerFind : [ 'найдите', 'определите', 'вычислите' ],


	/**
	 * Металы
	 */
	metals : [ 'меди', 'алюминия', 'чугуна', 'железа', 'стали', 'никеля', 'хрома' ],


	/**
	 * Топлива
	 */
	fuels : [ 'топливо', 'бензин', 'дизель', 'газ', 'керосин', 'солярка' ],


	/**
	 * Междугородний транспорт
	 */
	longDistanceTransport : [ 'автобус', 'поезд' ],


	/**
	 * Виды населённых пунтков
	 */
	typesOfSettlements : [ 'пункт', 'населённый пункт', 'город', 'городок', 'ПГТ', 'деревня', 'село', 'хутор', 'посёлок',
	                         'инноград', 'наукоград' ],


	/**
	 * Стройматериалы
	 */
	buildingMaterials : [ 'пенобетон', 'бетон', 'брус', 'шлак', 'песок', 'щебень', 'гранит', 'известняк', 'песчаник',
	                       'камень', 'гравий' ],


	/**
	 * Строения
	 */
	buildings : ['гараж', 'дом', 'дача', 'магазин']
};

