(function(){'use strict';

var v1=sl1();//Если 1, то ищем ошибку

window.vopr.txt=
	(v1?
		'В каком слове до­пу­ще­на ошиб­ка в по­ста­нов­ке уда­ре­ния: не­вер­но вы­де­ле­на буква, обо­значающая удар­ный глас­ный звук?':
		'В каком слове верно вы­де­ле­на буква, обо­зна­ча­ю­щая удар­ный глас­ный звук?'
	)+'<br/>';
	
var ver=[//Список (на самом деле массив) правильных слов
	"афЁра",
	'ба­лО­ван­ный',
	"бралА",
	"бралАсь",
	"валовОй(продукт)",
	"вернА",
	"взялАсь",
	"влилАсь",
	"вручИт",
	"гналА",
	"гналАсь",
	'до­зво­нЯт­ся',
	"зАняли ",
	"зАпертый",
	"запертА",
	"квартАл",
	"клАла",
	"коклЮш",
	"корЫсть",
	"нАчал ",
	"нАчали",
	"началА",
	"нефтепровОд",
	"облегчИт",
	"освЕдомишься",
	"плодоносИть",
	"повторИт",
	"позвонИт",
	"сОгнутый",
	"слЕсари",
	"слИвовый",
	"смазлИва",
	"снЯтый",
	"снятА",
	'чЕр­пать',
];//Лучше их располагать по алфавиту

var nev=[//Список (на самом деле массив) неправильных слов
	"афЕра",
	"брАла",
	"брАлась",
	"валовой",
	"взЯлась",
	"влИлась",
	"гнАла",
	"зАперта",
	"занЯли",
	"кОклюш ",
	"квАр­тал",
	"квАртал",
	"клалА",
	"мест­но­стЕй",
	"нефтепрОвод",
	"облЕгчит",
	"осведомИшься",
	"плодоНосить",
	"повтОрит",
	"позвОнит",
	"прО­сты­ня",
	"слесарЯ",
	"сливОвый",
	"снЯта",
	"согнУтый.",
	"тортЫ",
	"шарфЫ",
];//Внимание: после последнего элемента тоже ставится запятая. Её можно и не ставить, но так удобнее.

window.vopr.ver=v1?nev:ver;
window.vopr.nev=v1?ver:nev;
AtoB();

})();


