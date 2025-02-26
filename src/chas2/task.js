'use strict';

/** @namespace chas2.task
 * Параметры задания
 */
chas2.task = {
	/** @namespace chas2.task._
	 * Функционал, используемый только внутри модуля chas2.task
	 * @private
	 */
	_ : {
		/** @function chas2.task._.validateTask
		 * Проверить корректность объекта-задания
		 * @param {String} text текст задания
		 * @param {String} analys текст разбора задания
		 * @param {String|Number|String[]|Number[]} answers правильные ответы
		 * @param {String|Number|String[]|Number[]} wrongAnswers неправильные ответы
		 * @param {String[]} tags теги
		 * @param {Function} checkAnswer функция проверки ответа
		 * @param {Function} draw функция отрисовки
		 */
		validateTask : function(o) {
			if (chaslib.getTypeOf(o.text) != '[object String]') {
				throw TypeError('Параметр text должен быть строкой');
			}

			if (chaslib.getTypeOf(o.analys) != '[object String]') {
				throw TypeError('Параметр analys должен быть строкой');
			}

			if (o.checkAnswer != undefined && chaslib.getTypeOf(o.checkAnswer) != '[object Function]') {
				throw TypeError('Параметр checkAnswer должен быть функцией или отсутствовать');
			}

			if (o.draw != undefined && chaslib.getTypeOf(o.draw) != '[object Function]') {
				throw TypeError('Параметр draw должен быть функцией или отсутствовать');
			}

			if (o.tags != undefined && chaslib.getTypeOf(o.tags) != '[object Object]') {
				throw TypeError('Параметр tags должен быть массивом строк или отсутствовать');
			}
			if (o.tags) {
				//Следующий цикл сомнителен: for-in разве не всегда возвращает строки?
				for (var t in o.tags) {
					if (chaslib.getTypeOf(t) != '[object String]') {
						throw TypeError('Параметр tags (массив) должен содержать только строки');
					}
				}
			}
		},


		/** @function chas2.task._.normalizeTask
		 * Привести объект-задание к нормальному виду
		 * @param {String} text текст задания
		 * @param {String} analys текст разбора задания
		 * @param {String|Number|String[]|Number[]} answers правильные ответы
		 * @param {String|Number|String[]|Number[]} wrongAnswers неправильные ответы
		 * @param {String[]} tags теги
		 * @param {Function} checkAnswer функция проверки ответа
		 * @param {Function} draw функция отрисовки
		 */
		normalizeTask : function(o) {
			o.text = o.text || '';
			o.analys = o.analys || '';
			o.answers = chaslib.toStringsArray('answers' in o ? o.answers : []);
			o.wrongAnswers = chaslib.toStringsArray((('wrongAnswers' in o) && (o.wrongAnswers !== undefined)) ? o.wrongAnswers : []);
			// Просто o.answers || [] нельзя - ноль не будет передаваться
		},


		/** @function chas2.task._.normalizeCanvasOptions
		 * Привести опции canvas к нормальному виду
		 * @param {Number} o.width ширина canvas
		 * @param {Number} o.height высота canvas
		 * @param {String} o.style стиль canvas
		 */
		normalizeCanvasOptions : function(o) {
			o.importNonExistingFrom({
				width: 600,
				height: 400,
				style: 'float:left; margin-right:1em;',
			});
		},


		/** @function chas2.task._.generateCanvasTag
		 * Сгенерировать тэг canvas для иллюстрации
		 * @param {Number} o.width ширина canvas
		 * @param {Number} o.height высота canvas
		 * @param {String} o.style стиль canvas
		 * @param {Number} randomId случайный идентификатор canvas
		 */
		generateCanvasTag : function(o, randomId) {
			return '<canvas style="' + o.style + '" width="' + o.width + '" height="' + o.height + '" id="canvas' + randomId + '" data-nonce="' + Math.random() + '"></canvas>';
		},

	},


	/** @function chas2.task.setTask
	 * Установить задание
	 * @param {String} text текст задания
	 * @param {String} analys текст разбора задания
	 * @param {String|Number|String[]|Number[]} answers правильные ответы
	 * @param {String|Number|String[]|Number[]} wrongAnswers неправильные ответы
	 * @param {String[]} tags теги
	 * @param {Function} checkAnswer функция проверки ответа
	 * @param {Function} draw функция отрисовки
	 */
	setTask : function(o) {
		chas2.task._.normalizeTask(o);
		chas2.task._.validateTask(o);

		window.vopr.podg();
		window.vopr.txt = o.text;
		window.vopr.rsh = o.analys;
		window.vopr.ver = o.answers;
		window.vopr.nev = o.wrongAnswers;
		if (o.checkAnswer) {
			window.vopr.vrn = o.checkAnswer;
		}
		if (o.draw) {
			window.vopr.dey = o.draw;
		}

		window.vopr.kat.importFrom(o.tags);

		var voprcheck = dvig.validateVopr();
		if (voprcheck) {
			chas2.Lwarn('Результат проверки вопроса:\n\t' + voprcheck);
		}
	},

	/** @function chas2.task.getTask
	 * Получить задание - то же, что setTask, только наоборот
	 */
	getTask : function() {
		var o = {
			text : window.vopr.txt,
			analys : window.vopr.rsh,
			answers : window.vopr.ver,
			wrongAnswers : window.vopr.nev,
			checkAnswer : window.vopr.vrn,
			draw : window.vopr.dey,
			tags : {},
		};
		chas2.task._.normalizeTask(o);
		chas2.task._.validateTask(o);

		o.tags.importFrom(window.vopr.kat);

		var voprcheck = dvig.validateVopr();
		if (voprcheck) {
			chas2.Lwarn('Результат проверки вопроса:\n\t' + voprcheck);
		}
		return o;
	},

	/** @function chas2.task.setCountableTask
	 * Установить задание на движке расчётных задач
	 * @param {Object[]} mainList основной массив величин
	 * @param {String} mainList[].vel: название величины
	 * @param {Number} mainList[].rod: род существительного
		0: мужской
		1: женский
		2: средний
		3: только во множественном числе
	 * @param {String} mainList[].bkv: буква, которой обозначается величина. Если её нет, не упоминается.
	 * @param {String|Number} mainList[].zna: значение величины
	 * @param {String} mainList[].nmn: размерность величины. Опять же, если не указано - лесом.
	 * @param {Number|Boolean} mainList[].nah: можно ли требовать найти величину
	 * @param {String} mainList[].pre: префикс, то есть то, что пишется перед названием величины
	 * @param {String} mainList[].utv: альтернативное величине утвердительное высказывание
	 * @param {String} mainList[].vpr: альтернативный вопрос
	 * @param {String|Number} mainList[].vin: величина в винительном падеже. Если равна 1, то именительный и винительный падежи совпадают. Если не определена, то конструкции, где нужен в. п., избегаются.
	 * @param {Object} options: дополнительные опции
	 * @param {String} options.preambula то, что пишется в вопросе перед задачей
	 * @param {Object} taskOptions: дополнительные опции, передаваемые setTask
	 */
	setCountableTask : function(mainList, options, taskOptions) {
		var tmpObject = svVel(mainList);
		if (options) {
			if (options.preambula) {
				tmpObject.text = options.preambula + tmpObject.text;
			}
		}
		tmpObject.importFrom(taskOptions);
		chas2.task.setTask(tmpObject);
	},


	/** @function chas2.task.setJscppTask
	 * Установить задание из кода на C++, используя JSCPP
	 * @param {String} code
	 */
	setJscppTask : function(code) {

		var input = '';
		var output = '';
		var config = {
			stdio: {
				write: function(s) {
					output += s;
				}
			}
		};
		var exitCode = JSCPP.run(code, input, config);
		//В переменной output хранится всё, что отправлялось на cout

		chas2.task.setHumanReadableTask(output);
	},


	/** @function chas2.task.setHumanReadableTask
	 * Установить задание из человекочитаемого формата
	 * @param {String} output
	 */
	setHumanReadableTask : function(output) {
		var parsedOptions = output.parseHumanReadableToJSON();
		if (parsedOptions[0]) {
			parsedOptions['Задание'] = 'Необходимо указать ключевые слова! <br/> Текущий вывод: ' +
			                            output.vTag('pre') + '<br/>' + (parsedOptions['Задание'] || ' ');
		}
		chas2.task.setTask({
			text: parsedOptions['Задание'],
			answers: parsedOptions['Ответ'],
			analys: parsedOptions['Решение'],
		});
	},


	/** @function NApi.task.setEquationTask
	 * Составить задание типа 'уравнение'
	 * @param {Array} o.parts части уравнения (левая и правая)
	 * @param {String} o.handleMultipleRoots способ обработки случая, когда корней два или более
	 * @param {String} o.customPreamble фраза на замену "Найдите корень уравнения"
	 * @param {Number|String|Number[]|String[]} o.roots корни уравнения
	 * @param {Boolean} o.enablePartsExchange можно ли менять части уравнения местами?
	 * @param {Boolean} o.filterWholeRoots отобрать ли только целые корни?
	 * @param {Boolean[]} o.enablePartsSubtraction можно ли вычитать эту часть уравнения из другой?
	 * @param {Boolean[]} o.enablePartsDivision можно ли делить на эту часть уравнения?
	 * @param {String[]} o.wrapper обёртка для частей - иногда возникает
	 * @param {Object} taskOptions - то, что будет передано setTask (тэги, решение и т. д.)
	 */
	setEquationTask : function(o, taskOptions) {
		function exchangeParts() {
			//Функция обмена частей уравнения местами. Если, конечно, можно!
			if (o.enablePartsExchange == 0) {
				return;
			}
			o.parts.reverse();
			o.enablePartsSubtraction.reverse();
			o.enablePartsDivision.reverse();
		}
		//Приводим необязательные параметры к массивам
		(o.enablePartsSubtraction != undefined) || (o.enablePartsSubtraction == 0);
		(o.enablePartsDivision != undefined) || (o.enablePartsDivision == 1);
		o.enablePartsSubtraction = chaslib.toArray(o.enablePartsSubtraction, 2);
		o.enablePartsDivision = chaslib.toArray(o.enablePartsDivision, 2);

		//Заводим taskOptions, если он не указан
		if (taskOptions === undefined) {
			taskOptions = {};
		}

		//Применяем обёртку - ДО преобразований
		if (o.wrapper) {
			o.parts[0] = o.wrapper[0] + o.parts[0] + o.wrapper[1];
			o.parts[1] = o.wrapper[0] + o.parts[1] + o.wrapper[1];
		}

		if (sl1()) {
			//Случайным образом меняем части местами
			exchangeParts();
		}
		//Если среди частей уравнения есть голое число и не указано иное, то число всегда справа
		if (('' + o.parts[0]).isNumeric() && !('' + o.parts[1]).isNumeric() && o.enablePartsExchange != 1) {
			exchangeParts();
			o.enablePartsExchange = 0;
		}
		//Если справа ноль - делить нельзя, вычитать - только ставить минус
		if (o.parts[1] == 0) {
			//Если можно и есть на то воля случая, перед левой частью ставим минус
			if (o.enablePartsSubtraction[0] && !sl(3)) {
				o.parts[0] = '-' + o.parts[0];
			}
			//Делить нельзя!
			o.enablePartsDivision = [0, 0];
			//Вычитать тоже больше нельзя
			o.enablePartsSubtraction = [0, 0];
		} else if (o.enablePartsSubtraction[0] && o.enablePartsSubtraction[1] && !sl(4)) {
			//Если можно вычитать обе части, то с вероятностью 1/5 ставим перед обоими минус
			o.parts[0] = '-' + o.parts[0];
			o.parts[1] = '-' + o.parts[1];
		} else if (o.enablePartsSubtraction[0] && !sl(3)) {
			//Если можно, вычитаем левую часть из правой
			o.parts[0] = o.parts[1] + '-' + o.parts[0];
			o.parts[1] = 0;
		} else if (o.enablePartsSubtraction[1] && !sl(3)) {
			//Или правую из левой...
			o.parts[0] = o.parts[0] + '-' + o.parts[1];
			o.parts[1] = 0;
		} else if (o.enablePartsDivision[0] && o.enablePartsDivision[1] && !sl(4)) {
			//Если можно делить на обе части, то с вероятностью 1/5 ставим обе в знаменатель
			var numerator = sl(1, 99).pm();
			o.parts[0] = numerator.texfrac(o.parts[0]);
			o.parts[1] = numerator.texfrac(o.parts[1]);
		} else if (o.enablePartsDivision[0] && !sl(3)) {
			//Если можно, правую часть на левую
			o.parts[0] = o.parts[1].frac(o.parts[0]);
			o.parts[1] = 1;
		} else if (o.enablePartsDivision[1] && !sl(3)) {
			//Или, опять же, наоборот
			o.parts[0] = o.parts[0].frac(o.parts[1]);
			o.parts[1] = 1;
		}
		//Если ничего из вышеперечисленного не получилось - стало быть, не судьба!

		//Теперь разбираемся с корнями

		o.roots = chaslib.toArray(o.roots, 1);

		if (o.filterWholeRoots) {
			//Если нужно, отбираем целые корни
			var wholeRoots = [];
			for (var i = 0; i < o.roots.length; i++) {
				if (('' + o.roots[i]).isNumeric() && (1 * o.roots[i]).isZ()) {
					wholeRoots.push(o.roots[i]);
				}
			}
			o.roots = wholeRoots;
		}
		//Если множество корней пусто - ошибка!
		if (o.roots.length == 0) {
			throw new Error('Множество корней уравнения не должно быть пусто');
		}

		var multiRoots = (o.roots.length > 1);
		o.roots = o.roots.sortDelDubl();

		var notListVariants = ['sum', 'production', 'min', 'max'];
		if (o.handleMultipleRoots == 'random') {
			o.handleMultipleRoots = ['list'].concat(notListVariants).iz();
		} else if (o.handleMultipleRoots == 'randomExceptList') {
			o.handleMultipleRoots = notListVariants.iz();
		}
		var multipleRootsPhrase = '';
		switch (o.handleMultipleRoots) {
			default:
			case 'sum':
				taskOptions.answers = o.roots.sum();
				multipleRootsPhrase = 'их сумму';
			break;
			case 'production':
				taskOptions.answers = o.roots.production();
				multipleRootsPhrase = 'их произведение';
			break;
			case 'min':
				taskOptions.answers = o.roots.minE();
				multipleRootsPhrase = 'меньший из них';
			break;
			case 'max':
				taskOptions.answers = o.roots.maxE();
				multipleRootsPhrase = 'больший из них';
			break;
			case 'any':
				taskOptions.answers = o.roots;
				multipleRootsPhrase = 'любой из них';
			break;
			case 'list':
				taskOptions.answers = o.roots.join(';');
				multipleRootsPhrase = 'перечислите их через точку с запятой (;) в любом порядке';
				taskOptions.checkAnswer = vopr.vrn_list;
			break;
		}

		var preamble = o.customPreamble || 'Найдите корень уравнения';


		taskOptions.text = preamble + ' $$' + o.parts[0].plusminus() + '=' + o.parts[1].plusminus() + '$$' +
			' В ответе укажите только целый корень. '.esli(o.filterWholeRoots) +
			//При желании форсированно вызвать обработку нескольких корней - просто указать два одинаковых корня
			(' Если ' + 'таких '.esli(o.filterWholeRoots) + 'корней несколько, в ответе укажите ' + multipleRootsPhrase + '.').
				esli(multiRoots);

		//Наконец, устанавливаем задание
		chas2.task.setTask(taskOptions);
		//И на всякий случай
		chas2.task.modifiers.beautifyAlgebraicNotation();
	},


	/** @function NApi.task.setAdditiveEquationTask
	 * Составить задание типа 'уравнение, имеющее в основе сложение'
	 * @param {Array} o.parts части уравнения (слагаемые, как будто справа 0)
	 * @param {String} o.handleMultipleRoots способ обработки случая, когда корней два или более
	 * @param {Number|String|Number[]|String[]} o.roots корни уравнения
	 * @param {Boolean} o.filterWholeRoots отобрать ли только целые корни?
	 * @param {Boolean[]} o.enablePartsDivision можно ли делить на эту часть уравнения?
	 * @param {String[]} o.wrapper обёртка для частей - иногда возникает
	 * @param {Object} taskOptions - то, что будет передано setTask (тэги, решение и т. д.)
	 */
	setAdditiveEquationTask : function(o, taskOptions) {
		//Сами всё, что нужно, вычтем!
		o.enablePartsSubtraction = 0;
		//И местами поменяем!
		o.enablePartsExchange = 0;

		o.parts = o.parts.shuffle();
		var leftCount = sl(1, o.parts.length);
		var left = o.parts.splice(0, leftCount);
		var right = o.parts.length ? o.parts : ['0'];
		//Ставим минусы в левой части
		for (var i = 0; i < left.length; i++) {
			left[i] = '-' + left[i];
		}
		o.parts = [left.slag(), right.slag()];
		chas2.task.setEquationTask(o, taskOptions);
	},


	/** @function NApi.task.setTwoStatementTask
	 * Составить задание о двух утверждениях
	 * @param {String|Object[]} stA первое утверждение (или массив утверждений)
	 * @param {Boolean} trueA истинность первого утверждения
	 * @param {String} stB второе утверждение
	 * @param {Boolean} trueB истинность второго утверждения
	 * @param {String|String[]} pre префикс задания
	 */
	setTwoStatementTask : function(stA, trueA, stB, trueB, pre) {
		if (stA.isArray) {
			var two = stA.iz(2);
			chas2.task.setTwoStatementTask(two[0][0], two[0][1], two[1][0], two[1][1], trueA);
			return;
		}
		if (!pre) {
			pre = [[
					'Какое утверждение является истинным?',
					'Какое утверждение верно?',
				], [
					'Какое утверждение не является истинным?',
					'Какое утверждение является ложным?',
					'Какое утверждение неверно?',
				]];
		}
		if (pre.isArray && pre[1] && sl1()) {
			if (pre[1].isArray) {
				pre = pre[1].iz();
			} else {
				pre = pre[1];
			}
			trueA = !trueA;
			trueB = !trueB;
		} else if (pre.isArray) {
			if (pre[0].isArray) {
					pre = pre[0].iz();
			} else {
				pre = pre[0];
			}
		}
		var wrongAnswers = [
			'Ни А, ни Б',
			'Только Б',
			'Только А',
			'А и Б',
		];
		var answers = wrongAnswers.splice(2 * trueA + trueB, 1);
		var br = '<br/>';
		var text = pre + br + br + 'А) ' + stA + br + 'Б) ' + stB + br + br;
		chas2.task.setTask({
			text: text,
			answers: answers,
			wrongAnswers: wrongAnswers,
		});
		AtoB();
	},


	/** @function chas2.task.replaceCodeInText
	 * Заменить специальный код на пояснения
	 * @param {String} code код
	 * @param {String|String[]} explanations пояснения
	 */
	replaceCodeInText : function(code, explanations) {
		vopr.txt = vopr.txt.replaceCode(code, explanations[i]);
	},


	modifiers : {
		/** @function chas2.task.modifiers.beautifyAlgebraicNotation
		 * Превращает (1x+-1) в (x-1) и тому подобное
		 */
		beautifyAlgebraicNotation : function(m) {
			var o = chas2.task.getTask();
			o.text = o.text.plusminus();
			o.analys = o.analys.plusminus();
			chas2.task.setTask(o);
		},


		/** @function chas2.task.modifiers.addJqplot
		 * Добавить график с применением jqplot
		 * Нет, можно, конечно, и в лоб, но зачем?
		 * @param {Array} dataArray массив, передаваемый jqplot согласно его документации (второй параметр вызова $.jqplot)
		 * @param {Array} options опции, передаваемые jqplot согласно его документации (третий параметр вызова $.jqplot)
		 * @param {String} height высота иллюстрации в единицах CSS либо пикселях
		 * @param {String} width ширина иллюстрации в единицах CSS либо пикселях
		 */
		addJqplot : function(m) {
			var o = chas2.task.getTask();
			var randomDivId = 'jqplotTarget' + sl(1000000);
			var height = m.height || '320px';
			var width = m.width || 'auto';
			typeof(height) == 'string' || (height += 'px');
			typeof(width) == 'string' || (width += 'px');
			o.text = '<div id="' + randomDivId + '" style="text-align:center;height:' + height + ';width:' + width +
				'" data-html-differentiator="' + Math.random() + '"></div>' + o.text;
			var previousDraw = o.draw;
			o.draw = function() {
				//Замыкание же!
				previousDraw();
				$.jqplot(randomDivId, m.dataArray, m.options);
			};
			chas2.task.setTask(o);
		},


		/** @function chas2.task.modifiers.variativeABC
		 * Перемешать буквы латинского алфавита в заданиях, например, на геометрию
		 */
		variativeABC : (function() {
			var alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
			return function() {
				var alph2 = alph.slice().shuffle();
				chas2.task.setTask(
					mapRecursive(
						chas2.task.getTask(),
						function(str) {
							return ('' + str).cepZamena(alph, alph2);
						}
					)
				);
			};
		})(),

		/** @function chas2.task.modifiers.roundUpTo
		 * Добавить фразу "Округлить до ..." и округлить сам ответ.
		 * @param {Number} n степень 10 (округлить до 10^n)
		 */
		roundUpTo : function(n) {
			var rndInt = [
				'десятков',
				'сотен',
				'тысяч',
				'десятков тысяч',
				'сотен тысяч',
				'миллионов',
				'десятков миллионов',
				'сотен миллионов',
				'миллиардов',
			];
			var rndFrac = [
				'десятых',
				'сотых',
				'тысячных',
				'десятитысячных',
				'стотысячных',
				'миллионных',
				'десятимилионных',
				'стомиллионных',
				'миллиардных',
			];
			var o = chas2.task.getTask();
			var ans = Number(o.answers[0].replace(',', '.')); //меняем запятую на точку для корректной работы Number
			var cntFrac = String(ans).includes('.') ? String(ans).split('.')[1].length : 0;
			var cntInt = String(ans).includes('.') ? String(ans).split('.')[0].length : String(ans).length;
			if(n < 0){
				var nAuto = (cntFrac < -n) || ((-n - 1) > 8) ? cntFrac : -n;
				nAuto = Math.min(nAuto, rndFrac.length);
				o.text += ' Ответ округлите до ' + (nAuto ? rndFrac[nAuto - 1] : 'целого') + '.';
				o.answers = Math.round(ans * Math.pow(10, nAuto)) / Math.pow(10, nAuto);
			}
			else if(n > 0) {
				var nAuto = (cntInt < n) || ((n - 1) > 8) ? cntInt : n;
				nAuto = Math.min(nAuto, rndInt.length);
				o.text += ' Ответ округлите до ' + (nAuto ? rndInt[nAuto - 1] : 'целого') + '.';
				o.answers = Math.round(ans / Math.pow(10, nAuto)) * Math.pow(10, nAuto);
			}
			else { //если параметр n не задан или равен 0
				o.text += ' Ответ округлите до целого.';
				o.answers = Math.round(ans);
			}
			chas2.task.setTask(o);
		},

		/** @function chas2.task.modifiers.addCanvasIllustration
		 * Привести опции canvas к нормальному виду
		 * @param {Number} o.width ширина canvas
		 * @param {Number} o.height высота canvas
		 * @param {String} o.style стиль canvas
		 * @param {Function} o.paint функция отрисовки
		 */
		addCanvasIllustration : function(o) {
			chas2.task._.normalizeCanvasOptions(o);
			var currentTask = chas2.task.getTask();
			var randomId = getRandomInt(1, 1000000000); // Случайный идентификатор canvas (на случай, если их окажется несколько).
			// Math.random() использовать нельзя - в id тэга не должно быть точки

			currentTask.text = chas2.task._.generateCanvasTag(o, randomId) + currentTask.text;
			var savedDrawFunction = currentTask.draw;
			var paint = o.paint; // На всякий случай сохраняем ссылку прямо на свойство объекта

			currentTask.draw = function() {
				if (savedDrawFunction instanceof Function) {
					savedDrawFunction();
				}
				var currentCanvas = document.getElementById('canvas' + randomId);
				var ct = currentCanvas.getContext('2d');
				paint(ct);

				$(currentCanvas).attr('id', '');
			};
			chas2.task.setTask(currentTask);

		},

	},
};
