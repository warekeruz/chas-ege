//41. Задание 4 № 320192
//В классе 26 учащихся, среди них два друга — Андрей и Сергей. Учащихся случайным
//образом разбивают на 2 равные группы. Найдите вероятность того, что
//Андрей и Сергей окажутся в одной группе.


(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 0);

	var pol = ['два друга', 'две подруги'].iz();
	var name1;
	var name2;
	if (pol == 'два друга') {
		name1 = ['Михаил', 'Коля', 'Саша', 'Данил', 'Рома', 'Сергей', 'Пётр', 'Дима', 'Ваня', 'Никита', 'Антон', 'Илья', 'Олег'].iz();
		name2 = ['Павел', 'Егор', 'Вова', 'Денис', 'Игорь', 'Лёша', 'Боря', 'Андрей', 'Юра', 'Максим', 'Семён', 'Витя', 'Вадим'].iz();
	} else {
		name1 = ['Маша', 'Алина', 'Вера', 'Лена', 'Лера', 'Вика', 'Ангелина', 'Соня', 'Катя', 'Женя', 'Ира', 'Рита', 'Алёна', 'Аня'].iz();
		name2 = ['Даша', 'Юля', 'Рината', 'Арина', 'Ульяна', 'Милана', 'Таня', 'Алиса', 'Саша', 'Оксана', 'Ксюша', 'Марина', 'Нина'].iz();
	}
	var vopr = ['одной группе', 'разных группах'].iz();
	var vsego;
	var kolvogrup;
	var answers;
	var answ;
	var proverka;
	do {
		kolvogrup = sl(2, 4);
		vsego = kolvogrup * sl(2, 15);
		answ = (vsego / kolvogrup - 1) / (vsego - 1);
		proverka = (answ * 10000) % 100;
	} while (proverka !== 0);

	if (vopr == 'одной группе')
		answers = answ;
	else
		answers = 1 - answ;

	NAtask.setTask({

		text: 'В классе ' + chislitlx(vsego, 'учащийся') + ', среди них ' + pol + ' — ' + name1 + ' и ' + name2 + '. Учащихся случайным ' +
			'образом разбивают на ' + kolvogrup + ' равные группы. Найдите вероятность того, что ' +
			'' + name1 + ' и ' + name2 + ' окажутся в ' + vopr + '.',

		answers,
	});
})();
