var foodsH=["猪肉", "排骨", "猪肉末", "五花肉", "猪蹄", "瘦肉", "里脊", "猪肝", "猪排", "猪肚", "猪皮", "猪骨", "肥肠", "猪油", "猪腰", "猪耳朵", "猪心", "猪血", "猪肺", "肉末","鸡翅", "鸡胸", "鸡腿", "鸡爪", "鸡肉", "乌鸡", "鸡胗", "土鸡仔鸡", "三黄鸡", "鸡肝", "老母鸡", "鸡心", "柴鸡", "童子鸡","牛肉牛腩", "牛排", "肥牛", "牛里脊", "牛腱牛尾", "牛肉末", "牛筋", "牛百叶", "牛骨", "牛肉馅","羊肉", "羊排", "羊腿", "羊肉片", "羊蝎子","鸭腿", "鸭肉", "老鸭", "鸭胗", "鸭血", "鸭掌", "鸭翅", "鸭舌", "鸭肠", "鸭脖", "鸭肝", "鸭爪","海水鱼", "淡水鱼", "鱼头", "鱼干", "鱼籽", "鱼肚", "虾仁", "海米", "虾皮", "明虾", "基围虾", "龙虾", "小龙虾", "河虾", "海虾", "皮皮虾", "北极虾", "虾干", "青虾", "草虾", "海白虾", "虾米", "蛤蜊", "干贝", "鲍鱼", "扇贝", "牡蛎", "青口", "蛏子", "鲜贝", "北极贝", "河蚌", "梭子蟹", "大闸蟹", "蟹肉", "蟹黄"]
	, foodsS=["彩椒", "番茄", "南瓜", "玉米", "茄子", "黄瓜", "豇豆", "青椒", "苦瓜", "冬瓜", "丝瓜", "秋葵", "西葫芦", "毛豆", "豌豆", "四季豆", "荷兰豆", "蚕豆", "圣女果", "扁豆", "刀豆", "瓠瓜", "玉米笋", "西红柿","芹菜", "白菜", "韭菜", "菠菜", "西兰花", "圆白菜", "花椰菜", "莴苣", "青菜", "娃娃菜", "生菜", "甘蓝", "蒜薹", "紫甘蓝", "空心菜", "油菜", "荠菜", "香椿", "茼蒿", "菜心", "芥兰", "黄花菜", "韭黄", "苋菜", "紫苏", "芥菜", "油麦菜", "豌豆苗", "苦菊", "青蒜", "鱼腥草", "马兰", "蕨菜", "西洋菜", "水芹", "儿菜", "豌豆尖", "芝麻菜", "芦蒿", "穿心莲", "孢子甘蓝", "萝卜苗", "红菜苔", "牛至", "蒿子杆", "包菜", "莴笋", "花菜", "蒜苔", "豆苗", "披萨草","香菇", "杏鲍菇", "银耳", "木耳", "金针菇", "蘑菇", "茶树菇", "平菇", "松茸", "鸡腿菇", "草菇", "竹荪", "蟹味菇", "花菇", "猴头菇", "牛肝菌", "灵芝", "榛蘑", "白玉菇", "姬松茸", "滑子菇", "发菜", "白灵菇", "袖珍菇", "双孢菇", "秀珍菇","鸡蛋", "咸蛋", "皮蛋", "鹌鹑蛋", "鸭蛋", "咸鸭蛋","豆腐", "香干", "豆渣", "千张", "腐竹", "素鸡", "油豆皮", "豆干", "豆腐皮"];

var h={
	interval:10,
	wrapper:".fh .list",
	trigger:".fh h4 button",
	data:foodsH
}
,s={
	interval:1,
	wrapper:".fs .list",
	trigger:".fs h4 button",
	data:foodsS
}

Wte(h);
Wte(s);

function Wte(obj){
	if(!obj.wrapper||!obj.trigger||!obj.data){
		console.log("参数错误");
		return;
	}
	var t = obj.interval||10
		, isRunning = false
		,wrapper=obj.wrapper
		,trigger=obj.trigger
		,initBottom = parseInt($(wrapper).css("bottom"))
		,bottom = initBottom
		,timer=null
		,num=2
		,index=num
		,data=obj.data;

	var items=[];
	for(var i=0;i<num;i++){
		items.push(data[i]);
	}
	function run() {
		if(!isRunning){
			timer=setInterval(function(){
				start();
			},t);
		}else{
			stop();
			clearInterval(timer);
			timer = null;
		}
	}

	function start() {
		if(isListEnd($(wrapper))){
			$(wrapper).html(createData());
		}
		bottom+=10;
		$(wrapper).css("bottom",bottom);
		if(bottom>0) bottom=initBottom;
	}

	function isListEnd(target){
		if(parseInt(target.css("bottom"))>=0){
			return true;
		}else{
			return false;
		}
	}

	function createHtml(items){
		var html="";
		for(var i=0;i<items.length;i++){
			html+="<li>"+items[i]+"</li>";
		}
		return html;
	}

	function createData(){
		items.shift();
		items.push(data[index]);
		console.log(items);
		index++;
		if(index>data.length-1) index=0;
		return createHtml(items);
	}

	function stop(){
		$(wrapper).html("<li>"+items[0]+"</li>");
		$(wrapper).css("bottom",0);
	}

	$(trigger).click(function() {
		run();
		isRunning=!isRunning;
	});
}