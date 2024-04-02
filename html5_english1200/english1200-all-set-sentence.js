//題幹的字型大小
questionFontSize = 48; 

//題幹的顏色
questionFontColor = "#ff0000";

//是否自動顯示選項供作答(預設為 true; false 時需按[開始作答]鈕才會出現選項)
auto_show_options = true;

//選項的字型顏色
optionsFontColor = "#fffeef";

//選項的背景顏色
optionsBackgroundColor = "#0000ff"; 

//選項的字型大小
optionsFontSize = 35;

//每題有幾個選項
numberOfOptions = 3;

//每列最多可以有幾個選項
numberOfOptionsPerRow = 1;	

//每回合抽幾題題目
numberOfQuestionsPerRound = 25;

//出題時選擇題目的方式 true:亂數選題  false:按題庫順序
select_questions_in_random = true; 

//------------------------------
//選單按鈕上的文字，空白表示不出現按鈕
//------------------------------

//按鈕1: 聽音找第1欄位
item_button1_caption = "聽音找英文";

//按鈕2: 聽音找第2欄位 
item_button2_caption = "聽音找中文";

//按鈕3: 看第2欄位找第1欄位
item_button3_caption = "看中文找英文";

//按鈕4: 看第1欄位找第2欄位
item_button4_caption = "看英文找中文";

//聲音檔路徑的前置網址
//也就是會為 questionLines 的左欄前面自動加上的字串
//
// English 1200
soundBaseURL = 'https://gsyan888.github.io/english1200/';

//語音播放的速度(使用大於 0 的數字。例如:1.0 正常, 0.75 較慢速, 0.5 慢速, 1.5 快速, 2.0 兩倍速)
audioPlaybackRate = 1.0; 

//語音自動播放的次數。 
audioAutoPlayLoop = 1;

//隔多久重播(單位秒)
audioAutoPlayDelay = 0;


//是否使用 TTS 的語音
tts_enabled = false;

//----------------
//Google TTS 文字轉語音的設定
//----------------
tts_language = 'en';  // en : 英語,   zh_tw : 中文
tts_speed = 0.3;  //語音的速度 0 ~ 1 (可用小數)
tts_base_url = 'https://translate.google.com/translate_tts?ie=UTF-8&tl='+tts_language+'&client=tw-ob&ttsspeed='+tts_speed+'&q=';


//題庫
//欄位分隔符號為兩個井字號(##)
seperator = '##';

//左欄為聲音檔路徑
//右欄為中文
questionLines = function(){/*--這一行請勿更改--
letter_a/sounds/a_few01.mp3##只有一些人通過數學測驗。##Only a few people passed the math exam.
letter_a/sounds/a_little01.mp3##Harry 口袋裡只有一些錢。##Harry has just a little money in his pocket.
letter_a/sounds/a_lot01.mp3##非常感謝你的幫忙。##Thanks a lot for your help.
letter_a/sounds/able01.mp3##Carol 今天早上不能夠趕上公車。##Carol was not able to catch the bus this morning.
letter_a/sounds/about02.mp3##告訴我有關他的事。##Tell me about him.
letter_a/sounds/above01.mp3##你同意以上的規定嗎 ?##Do you agree with the above regulations?
letter_a/sounds/afraid01.mp3##Michelle 怕黑 , 她總是開燈睡覺。##Michelle is afraid of the dark. She always sleeps with the light on.
letter_a/sounds/after02.mp3##我吃早餐後上學。##I go to school after I eat breakfast.
letter_a/sounds/afternoon01.mp3##我今天下午發生了車禍。##I had a car accident this afternoon.
letter_a/sounds/again01.mp3##你可以再說一遍嗎 ?##Would you say that again?
letter_a/sounds/age01.mp3##我妹妹今年三歲。##The age of my sister is three.
letter_a/sounds/ago01.mp3##幾分鐘前，媽媽外出去市場。##Several minutes ago, Mom went out to the market.
letter_a/sounds/agree01.mp3##我贊同他。##I agree with him.
letter_a/sounds/air01.mp3##今天的空氣相當清新。##The air is quite clear today.
letter_a/sounds/airplane(plane)01.mp3##Adam 搭機到日本旅行。##Adam traveled to Japan by airplane (by plane).
letter_a/sounds/airport01.mp3##恐怖份子威脅以炸彈攻擊機場。##Terrorists threatened to bomb the airport.
letter_a/sounds/all01.mp3##他窮畢生之力致力於世界和平。##He spent all his life working toward world peace.
letter_a/sounds/almost01.mp3##再給我十分鐘 , 已經快完成了。##Give me ten more minutes. It's almost done.
letter_a/sounds/along01.mp3##我父母每晚沿著河堤散步。##My parents walk along the riverbank every evening.
letter_a/sounds/already01.mp3##Jane18 歲 , 她已經是成年人了。##Jane is 18 now. She is already a grownup.
letter_a/sounds/also01.mp3##A:我昨天看到紅色星球 , 火星。B:我也看到了。真神奇！##B: I also saw it. It's really amazing!
letter_a/sounds/always01.mp3##Ken 總是晚起。##Ken always gets up late.
letter_a/sounds/a.m.01.mp3##現在是早上 2 點 , 你為什麼在吃飯呢 ?##It's 2:00 a.m. right now. Why are you eating?
letter_a/sounds/America01.mp3##我叔父即將拜訪一位在美國的老友。##My uncle is going to visit an old friend in America.
letter_a/sounds/American01.mp3##我和美國人練習講英語。##I practiced speaking English with an American.
letter_a/sounds/a(an)02.mp3##他 16:00 有英語課。##He has an English class at 16:00 .
letter_a/sounds/and01.mp3##Sue 和 Peter 是鄰居。##Sue and Peter are neighbors.
letter_a/sounds/angel01.mp3##Lucy 看起來像天使。##Lucy looks like an angel.
letter_a/sounds/angry01.mp3##Kate 覺得很生氣因為她男朋友又遲到了。##Kate felt very angry because her boyfriend was late again.
letter_a/sounds/animal01.mp3##在動物園 , 我們可以看到許多種類的動物。##We can see many kinds of animals in the zoo.
letter_a/sounds/another01.mp3##說是一回事；做又是另一回事。##To say is one thing; to do is another.
letter_a/sounds/answer02.mp3##請回答我。##Please answer me.
letter_a/sounds/any01.mp3##你有任何主意嗎？##Do you have any ideas?
letter_a/sounds/anyone(anybody)01.mp3##在這裡我不認識任何人。 我今天剛搬來。##I don't know anyone here. I just moved in today.
letter_a/sounds/anything01.mp3##在黑暗中我們看不到任何事物。##We can't see anything in the dark.
letter_a/sounds/apartment01.mp3##這是 Smith 家住的公寓。##This is the apartment where the Smiths live.
letter_a/sounds/apologize02.mp3##讓我在這裡等這麼久，你必須道歉。##You should apologize for keeping me wait here so long.
letter_a/sounds/appear01.mp3##突然間 , 一個陌生人出現在我前面。##Suddenly, a stranger appeared in front of me.
letter_a/sounds/apple01.mp3##吃蘋果有益健康。##Eating apples is good for your health.
letter_a/sounds/April01.mp3##四月的陣雨帶來五月的花。##April showers bring May flowers.
letter_a/sounds/argue01.mp3##不要和老師爭辯，你知道她是對的.##Don't argue with your teacher. You know she's right.
letter_a/sounds/arm01.mp3##Danny 有強壯的手臂。他可以舉起汽車。##Danny has strong arms. He can lift a car.
letter_a/sounds/army01.mp3##中學畢業後他入伍從軍。##He joined the army after he graduated from high school.
letter_a/sounds/around01.mp3##假如你須要任何協助，我就在附近。##If you need any help, I'll be around.
letter_a/sounds/arrive01.mp3##當 Paul 到達時，每個人對他唱生日快樂歌。##When Paul arrived, everyone sang “Happy Birthday to You.”
letter_a/sounds/art01.mp3##沒有了藝術 , 人類很難生活。##It would be difficult to live without art.
letter_a/sounds/as02.mp3##這項工作不像你想像的那麼困難。##The work is not so difficult as you imagine.
letter_a/sounds/ask01.mp3##我可以問你一個問題嗎？##Can I ask you a question?
letter_a/sounds/asleep01.mp3##她如此疲倦以致很快就睡著了。##She was so tired that she fell asleep quickly.
letter_a/sounds/at01.mp3##鬧鐘早上六點響起。##The alarm clock rings at 6:00 a.m.
letter_a/sounds/August01.mp3##我計畫八月出國旅行。你要任何紀念品嗎？##I'm planning to travel abroad in August.Do youwant any souvenirs?
letter_a/sounds/aunt01.mp3##我姑姑送我一件新洋裝。它看起來很漂亮。##My aunt sent me a new dress. It looks beautiful.
letter_a/sounds/autumn(fall)01.mp3##很多人在秋天感冒。##Many people catch the flu in autumn.
letter_a/sounds/available02.mp3##我下星期天有空。##I am available next Sunday.
letter_a/sounds/away01.mp3##走開。我不要再看見你。##Go away. I don't want to see you again!
letter_b/sounds/baby01.mp3##在父母眼中，每個人都是小嬰兒。##Everyone is like a baby to his/her parents.
letter_b/sounds/back01.mp3##Tim 今晚剛從紐約回來。##Tim just came back from New York this evening.
letter_b/sounds/backward01.mp3##從十倒數到一。##Count backward from ten to one.
letter_b/sounds/bad01.mp3##那是壞主意。##That's a bad idea!
letter_b/sounds/bag01.mp3##她的袋子在桌上。##Her bag is on the desk.
letter_b/sounds/bakery01.mp3##附近有一家有名的麵包店。##There is a famous bakery in this neighborhood.
letter_b/sounds/ball01.mp3##他把球踢出公園外。##He hit the ball out of the park.
letter_b/sounds/balloon01.mp3##她用許多彩色汽球佈置宴會房間。##He decorated his party room with ballons of manycolors.
letter_b/sounds/banana01.mp3##那些猴子似乎很高興看到香蕉。##Those monkeys seemed happy to see the bananas.
letter_b/sounds/band01.mp3##這個樂團演奏到淩晨三點。##The band played until three in the morning.
letter_b/sounds/bank01.mp3##請將付款轉到我的銀行帳戶。##Please transfer the payment to my bank account.
letter_b/sounds/barbecue01.mp3##在中秋節時，台灣幾乎每個家庭都烤肉慶祝這個特殊的日子。##On Moon Festival, almost every family in Taiwan have barbecues to celebrate this special day.
letter_b/sounds/base01.mp3##藝術家的名字印在花瓶底部。##The name of the artist is printed on the baseof the vase.
letter_b/sounds/baseball01.mp3##棒球是台灣受歡迎運動之一。##Baseball is one of the many popular sports in Taiwan.
letter_b/sounds/basic01.mp3##米飯是中餐的主食。##Rice is the basic food for Chinese meals.
letter_b/sounds/basket01.mp3##John 提一籃藍莓。##John carries a basket of blueberries.
letter_b/sounds/basketball01.mp3##我最喜歡的籃球選手是 Michael Jordan 。##My favorite basketball player is Michael Jordan.
letter_b/sounds/bath01.mp3##寒冬的晚上洗熱水澡真棒。##Taking a hot bath in a cold winter's night is wonderful.
letter_b/sounds/bathe01.mp3##對西方人來說，沐浴在夏威夷的溫暖日光是一大享受。##It's great for westerners to bathe in the warm sunlight in Hawaii.
letter_b/sounds/bathroom01.mp3##A: 浴室在那裡？ B: 就在右手邊轉角。##B: It's at the right –hand corner.
letter_b/sounds/be(am, are, is, was, were, been)01.mp3##我是 Sam 。你是 Pedro 。 她是 Jenny 。##I am Sam. You are Pedro. She is Jenny.
letter_b/sounds/beach01.mp3##去年夏天，我在海邊遇見一位女孩。##Last summer, I met a beautiful girl at the beach.
letter_b/sounds/bear02.mp3##熊是一種危險但有趣的動物。##The bear is a dangerous but playful animal.
letter_b/sounds/beautiful01.mp3##夕陽很美麗。##The sunset is so beautiful.
letter_b/sounds/beauty01.mp3##Tom 對她的美貌印象深刻。##Tom was impressed by her beauty.
letter_b/sounds/because01.mp3##Sally 之所以會離開是因為在宴會上感到不愉快。##Sally walked away because she felt upset at the party.
letter_b/sounds/become01.mp3##每一個人將來有一天都會變老。##Everyone will become old one day.
letter_b/sounds/bed01.mp3##你現在就給我去睡覺，要不然明天又要遲到。##You had better go to bed now, or you'll wake up late again.
letter_b/sounds/bedroom01.mp3##Johnson 正在臥室看書。##Johnson is reading in his bedroom.
letter_b/sounds/beef01.mp3##A: 你要多少斤牛肉？B: 一公斤。謝謝。##A: How much beef do you want? B: One kilogram. Thanks.
letter_b/sounds/before01.mp3##天黑之前 , 你最好趕快。##You'd better hurry up before it's too late.
letter_b/sounds/begin01.mp3##我們第一節課開始於八點三十分。##Our first class begins at eight thirty.
letter_b/sounds/beginner01.mp3##你有電腦初學者的指導嗎？##Do you have a beginner's guide to computer?
letter_b/sounds/behind01.mp3##Ken 跑得如此快以致其他競爭者遠落於後。##Ken runs so fast that other competitors are left far behind.
letter_b/sounds/believe01.mp3##我真不敢相信！我最好的朋友明天要結婚。##I can't believe it! My best friend is getting married tomorrow!
letter_b/sounds/bell01.mp3##門鈴在響。去看看外面是誰。##The bell is ringing. Go and see who is outside.
letter_b/sounds/belong01.mp3##這個鑽石項鍊是我媽媽的。它是我父親送她的結婚禮物。##This diamond necklace belongs to my mother. It was her wedding gift from my father.
letter_b/sounds/below01.mp3##以下是我最喜歡的菜：菲力牛排、麻婆豆腐、燻鮭魚。##The below are my favorite dishes: Filet Steak, Ma-Po Tofu, and Smoked Salmon.
letter_b/sounds/belt01.mp3##我必須減肥。我的腰帶最近似乎太緊了。##I must lose some weight now. My belt seems too tight lately.
letter_b/sounds/beside01.mp3##我最喜歡的明星正坐在我旁邊！你相信嗎？##My favorite movie star is sitting beside me! Can you believe that?
letter_b/sounds/besides01.mp3##我不想出去玩，而且我有很多功課要做。##I don't want to play outside. Besides, I have much homework to do.
letter_b/sounds/between01.mp3##七在六和八之間。##Seven is between six and eight.
letter_b/sounds/beyond01.mp3##玉山的美非言語所能形容。##The beauty of Mt.Jade is beyond description.
letter_b/sounds/bicycle(bike)01.mp3##媽媽今天早上買給我一輛新腳踏車。##Mother bought me a new bicycle this morning.
letter_b/sounds/big01.mp3##這塊石頭如此巨大以致我們無法將它搬離路面。##The rock is so big that we can't move it off the road.
letter_b/sounds/bike01.mp3##父親買給我一輛腳踏車作為生日禮物。##My father bought me a bike as my birthday present.
letter_b/sounds/biology01.mp3##生物學是我在學時最喜歡的科目之一。##Biology is one of my favorite subjects at school.
letter_b/sounds/bird01.mp3##鳥類應該在天空自由飛翔。##Birds are supposed to fly freely in the sky.
letter_b/sounds/birthday01.mp3##下星期日是我 15 歲生日。##Next Sunday is my fifteenth birthday.
letter_b/sounds/bite01.mp3##我妹妹的狗昨天咬了我。##My sister's dog bit me yesterday.
letter_b/sounds/black01.mp3##我的腳踏車是銀色的。你的是黑色。##My bike is silver. Yours is black.
letter_b/sounds/blackboard01.mp3##老師將功課寫在黑板上給學生。##The teacher writes down the homework for the students on the blackboard.
letter_b/sounds/blame01.mp3##假如有任何差錯，不要責備我。##If it all goes wrong, don't blame me.
letter_b/sounds/blind01.mp3##Kerry 幫助盲人過街。##Kerry helps a blind person cross the street.
letter_b/sounds/block02.mp3##Ted 技巧地阻擋對手的攻擊。##Ted skillfully blocks the opponent offense.
letter_b/sounds/blood01.mp3##人類是由血肉所形成的。##Human beings are made of flesh and blood.
letter_b/sounds/blow01.mp3##這陣風吹著樹葉上下搖曳。##The wind blows the leaves up and down.
letter_b/sounds/blue02.mp3##我今天覺得有些憂鬱。##I feel a little blue today.
letter_b/sounds/boat01.mp3##許多船隻聚集在那裡捕魚。##Many boats gathered there to catch the fish.
letter_b/sounds/body01.mp3##你必須好好照顧你自己的身體。##You must take very good care of your own body.
letter_b/sounds/book01.mp3##我昨天從圖書館借了一些書。##I borrowed some books from the library yesterday.
letter_b/sounds/bookstore01.mp3##在書店看書是我的休閒活動之一。##One of my leisure activities is reading in the bookstores.
letter_b/sounds/bored01.mp3##他感到如此無聊以致整天睡覺。##He feels so bored that he sleeps all day.
letter_b/sounds/boring01.mp3##這本書很無聊。##This book is boring.
letter_b/sounds/born01.mp3##你出生的那一天是你的生日。##The day when you were born was your birthday.
letter_b/sounds/borrow01.mp3##今晚我可否借你的車？##Can I borrow your car tonight?
letter_b/sounds/boss01.mp3##我老闆昨天請我到一家很棒的義大利餐廳吃晚餐。##My boss treated me to a very nice Italianrestaurant for dinner yesterday.
letter_b/sounds/both01.mp3##你們二位，請進。##Come in, both of you!
letter_b/sounds/bother01.mp3##抱歉在這時候打擾你。##I am sorry to bother you at this time.
letter_b/sounds/bottle01.mp3##有些塑膠和玻璃瓶是可回收的。##Some plastic and glass bottles are recyclable.
letter_b/sounds/bottom01.mp3##你將可以在湖底找到那枚硬幣。##You will find the coin at the bottom of the lake.
letter_b/sounds/bowl01.mp3##吃完一碗麵後我就感到飽了。##Aftering a bowl of noodles, I feel full.
letter_b/sounds/box01.mp3##我將多餘的衣服放置到那個箱子。##I put the extra clothes into that box.
letter_b/sounds/boy01.mp3##你看到那邊那個男孩了嗎？##Do you see the boy over there?
letter_b/sounds/bread01.mp3##我喜歡剛出爐的麵包。##I like fresh baked bread.
letter_b/sounds/break02.mp3##我們短暫休息五分鐘吧！##Let's take a short break for five minutes.
letter_b/sounds/breakfast01.mp3##早上我匆匆忙忙的所以沒吃早餐。##I didn't have any breakfast because I was in a hurry.
letter_b/sounds/bridge01.mp3##颱風造成山區主要橋樑毀損。##The typhoon caused great damage to the main bridges in the mountains.
letter_b/sounds/bright01.mp3##今夜的月亮是如此的明亮。##The moon is so bright tonight.
letter_b/sounds/bring01.mp3##可以請你幫我倒杯茶嗎?##Would you please bring me some tea?
letter_b/sounds/brother01.mp3##Tom 只有 Bob 一個兄弟。##Tom has only one brother, Bob.
letter_b/sounds/brown01.mp3##這間咖啡店以棕色裝潢。##The coffee shop is decorated in brown .
letter_b/sounds/brush01.mp3##你今天早上刷牙了嗎？##Did you brush your teeth this morning?
letter_b/sounds/build01.mp3##建造這家購物商場需費時兩年。##It will take two years to build up this shopping mall.
letter_b/sounds/burn01.mp3##乾柴易燃。##Dry wood burns easily.
letter_b/sounds/bus01.mp3##騎得太近公車不安全。##It's not safe to ride near to a bus.
letter_b/sounds/business01.mp3##生意如何？##How is business?
letter_b/sounds/businessman01.mp3##Todd 是成功的生意人。##Todd is a successful businessman.
letter_b/sounds/busy01.mp3##她最近似乎很忙碌。##She seems so busy recently.
letter_b/sounds/but01.mp3##她看起來很年輕，但她已經 30 好幾了。##She looks very young, but she is already in her 30's.
letter_b/sounds/butter01.mp3##我喜歡吃土司夾花生奶油。##I like eating toast with peanut butter.
letter_b/sounds/button01.mp3##按下按鈕你就可以啟動機器。##Press the button and you can start the machine.
letter_b/sounds/buy01.mp3##我買給你一些飲料。 ( 我請你喝飲料。 )##Let me buy you some drinks.
letter_b/sounds/by03.mp3##他以寫小說為生。##He makes money by writing novels.
letter_c/sounds/cake01.mp3##請給我一片起司蛋糕和一杯咖啡。## I'd like to have one piece of cheesecake and a cup of coffee, please. 
letter_c/sounds/call02.mp3##你昨天晚上有打電話給我嗎？##Did you call me last night?
letter_c/sounds/camera01.mp3##這台數位相機是小巧型的。##This new digital camera is mini-sized.
letter_c/sounds/camp01.mp3##Jason 和他的朋友去山中露營。##Jason went camping in the mountains with his friends.
letter_c/sounds/can_could01.mp3##我能為你做什麼？##What can I do for you?
letter_c/sounds/candy01.mp3##全世界的小孩都喜歡吃糖果。##Children all over the world like to eat candy.
letter_c/sounds/cap01.mp3##戴紅色鴨舌帽的那個人是我哥哥。##My brother is the guy who wears a red cap.
letter_c/sounds/car01.mp3##他車開得很快。##He drove his car very fast.
letter_c/sounds/card01.mp3##我很高興收到你來自倫敦塔的明信片。##I was very happy to get your post card from London Tower.
letter_c/sounds/care01.mp3##我們的父母關心我們的健康、思維及未來計劃。##Our parents care about our health, our thoughts, and our future plans.
letter_c/sounds/careful01.mp3##路上開車小心。##Be careful when you drive on the road.
letter_c/sounds/carry01.mp3##卡車攜帶重貨往南前行。##The truck carries heavy cargo toward the south.
letter_c/sounds/cartoon01.mp3##米老鼠是我最喜歡的卡通人物。##Mickey Mouse is my favorite cartoon character.
letter_c/sounds/case02.mp3##她從盒中取出眼鏡。##She took her glasses out of the case.
letter_c/sounds/cat01.mp3##我愛貓甚於狗。##I love cats more than dogs.
letter_c/sounds/catch01.mp3##在球落地前接住它。##Catch the ball before it falls down on the ground!
letter_c/sounds/cause01.mp3##海下地震會引起巨大海嘯。##Earthquakes under the sea will cause a huge tsunami.
letter_c/sounds/celebrate01.mp3##我們舉辦一個宴會以慶祝我們的成功。##We had a party to celebrate our success.
letter_c/sounds/cell_phone01.mp3##近年來幾乎每個人都有手機。##Recently, it seems almost everyone has a cell phone.
letter_c/sounds/cent01.mp3##打這通電話花了我五十分錢。##It cost me fifty cents to make this phone call.
letter_c/sounds/center01.mp3##台灣每一個鄉鎮都有文化中心。##Every county in Taiwan has its cultural center.
letter_c/sounds/century01.mp3##21 世紀是從 2000 年到 2099 年。##The 21st century is the period from 2000 to 2099.
letter_c/sounds/certain01.mp3##我們無法確定誰會贏。##We can't be certain who is going to win.
letter_c/sounds/chair01.mp3##讓我搬一張椅子坐下吧。##Let me get a chair and sit down.
letter_c/sounds/chalk01.mp3##我們粉筆快用完了。##We are almost running out of the chalks.
letter_c/sounds/chance01.mp3##這是打敗敵人的大好機會。##It's a great chance to defeat the enemy.
letter_c/sounds/change01.mp3##Tina 將頭髮改變成金黃色。##Tina changes the color of her hair to blond.
letter_c/sounds/chart01.mp3##請觀看一下圓形圖上的結果。##Please look at the result on the pie chart.
letter_c/sounds/cake.mp3##A:今天的豬肉很便宜。你要不要買？B:不 , 謝謝。##A:The pork is cheap today. Do you want some?B: No, thanks.
letter_c/sounds/cheat01.mp3##他從不在考試時作弊。##He never cheated on exams.
letter_c/sounds/check01.mp3##我已經檢查過你的答案。##I had checked your answer.
letter_c/sounds/cheer01.mp3##打起精神。不要沮喪。##Cheer up. Don't be upset.
letter_c/sounds/cheese01.mp3##你要加些乳酪在你的義大利麵上嗎？##Would you like to add some cheese to your spaghetti?
letter_c/sounds/chemistry01.mp3##化學是我以前在學時最喜歡的科目。##Chemistry was her favorite subject at school.
letter_c/sounds/chicken01.mp3##炸雞含高卡路里。吃太多會變胖。##Fried chicken contains very high calories. You'll get fat if you eat too much.
letter_c/sounds/child01.mp3##Jimmy 只是小孩。不用跟他生氣。##Jimmy is just a child. Don't be angry with him.
letter_c/sounds/childhood01.mp3##她有一個不快樂的童年。##She had an unhappy childhood.
letter_c/sounds/china01.mp3##中國有全世界五分之一的人口。##China has almost one-fifth of the world's population.
letter_c/sounds/chinese01.mp3##Karen 非常喜歡中國菜。##Karen enjoys Chinese food very much.
letter_c/sounds/chocolate01.mp3##巧克力是可可製成的。##Chocolate is made from cocoa.
letter_c/sounds/choice01.mp3##小孩很難做正確的選擇。##It's difficult for a child to make a right choice.
letter_c/sounds/chopsticks01.mp3##Helen 不習慣使用筷子。##Helen is not used to using the chopsticks.
letter_c/sounds/christmas01.mp3##聖誕節快到了。##Christmas is coming.
letter_c/sounds/church01.mp3##Mary 上教堂向上帝禱告。##Mary went to the church and said a prayer to God.
letter_c/sounds/circle02.mp3##請將答案圈出來。##Please circle the correct answer.
letter_c/sounds/city01.mp3##台北是台灣人口最稠密的都市。##Taipei is the most highly populated city in Taiwan .
letter_c/sounds/class01.mp3##Louisa 下午四點有鋼琴課。##Louisa has a piano class at 4:00 p.m.
letter_c/sounds/classmate01.mp3##歡迎我們的新同學，Jack 。##Welcome our new classmate, Jack.
letter_c/sounds/classroom01.mp3##我們教室太小無法再容納一個位子。##Our classroom is too small to fit in one more seat.
letter_c/sounds/clean01.mp3##我們上週末清掃海灘。##We cleaned up the beach last weekend.
letter_c/sounds/clear01.mp3##這水乾淨到我們可以看到魚兒游。##The water is so clear that we can see the fish swimming.
letter_c/sounds/climb01.mp3##王先生明天要和我們一起去爬山。##Mr. Wang will go climbing with us tomorrow.
letter_c/sounds/clock01.mp3##我們需要新時鐘。##We need a new clock.
letter_c/sounds/close01.mp3##請關門 !##Close the door, please!
letter_c/sounds/clothes01.mp3##珍今天買了許多新衣 。##Jane bought many new clothes today.
letter_c/sounds/cloud01.mp3##天空沒有雲。##There were no clouds in the sky.
letter_c/sounds/cloudy01.mp3##今天多雲 . 但願放學後不會下雨 .##It's cloudy today. I hope it won't rain after school.
letter_c/sounds/club01.mp3##爸爸通常和他的朋友們去高爾夫球俱樂部 .##Father usually goes to the golf club with his friends.
letter_c/sounds/coast01.mp3##每年三月到七月間，飛魚沿著蘭嶼海岸悠遊。##Every year between March and July, flying fish swim along the Lanyu coast.
letter_c/sounds/coat01.mp3##外面很冷 ! 務必要穿上你的外套 .##It`s cold outside! Make sure to put your coat on.
letter_c/sounds/coffee01.mp3##現烘培的咖啡是我的最愛因為它有最濃厚的香味。##Fresh roasted coffee is my favorite because it has the richest aroma.
letter_c/sounds/Coke01.mp3##你喜歡喝什麼飲料 , 可樂還是七喜 ?##Which beverage do you prefer, Coke or 7-up?
letter_c/sounds/cold01.mp3##我覺得冷 . 請把冷氣關掉。##I feel cold now. Please turn off the air conditioner.
letter_c/sounds/collect01.mp3##收集郵票是我的嗜好之一。##Collecting stamps is one of my hobbies.
letter_c/sounds/color01.mp3##這支筆是藍色的。##This pen is blue in color.
letter_c/sounds/colorful01.mp3##Susan 在加拿大過著多采多姿的生活。##Susan had a colorful life in Canada .
letter_c/sounds/come01.mp3##救護車來了 , 咱們讓路吧。##An ambulance is coming. Let's make way for it.
letter_c/sounds/comfortable01.mp3##在這兒我覺得很不舒服 , 太熱了。##I don't feel comfortable here. It's too hot.
letter_c/sounds/comic01.mp3##當我是個青年時 , 我喜歡看漫畫。##When I was a teenage boy, I like to read comic strips.
letter_c/sounds/common01.mp3##在英國 Smith 是個常見的名字。##Smith is a very common name in England .
letter_c/sounds/computer01.mp3##我們用電腦從網路上吸收新資訊 .##We use computers to absorb new information from the Internet.
letter_c/sounds/concern01.mp3##巨大海嘯之後，許多人關心斯里蘭卡的人們。##Many people show their concern over the people in Sri Lanka after a huge tsunami.
letter_c/sounds/considerate01.mp3##當我睡覺時，你不拉小提琴，真體貼。##It was very considerate of you not to play violin while I was sleeping.
letter_c/sounds/convenient01.mp3##住在購物中心附近是很方便的。##It's very convenient to live near a shopping mall.
letter_c/sounds/cook01.mp3##媽媽正在廚房煮飯 . 她是個好廚師 .##Mom is cooking in the kitchen. She is a good cook.
letter_c/sounds/cookie01.mp3##我哥喜歡吃餅乾 , 特別是巧克力口味的 .##My brother loves eating cookies, especially chocolate one.
letter_c/sounds/cool03.mp3##冷靜好嗎 ? 停止在瑣碎的事情上爭吵 。##Cool off, okay? Stop quarreling over the trivial matter.
letter_c/sounds/copy02.mp3##你可以給我一份那個報告的影本嗎 ?##Can you give me a copy of that report?
letter_c/sounds/corner01.mp3##再走三個街區，百貨公司就在公園路和市場街的轉角。##Go along three blocks and the department store is on the corner of Park Road and Market Street .
letter_c/sounds/correct01.mp3##恭喜 ! 你的答案是正確的 .##Congratulations! Your answer is correct.
letter_c/sounds/cost01.mp3##這件洋裝要多少錢 ?##How much does this dress cost?
letter_c/sounds/couch01.mp3##不要只是坐在沙發上 . 起來做點運動 .##Don't just sit on the couch. Get up and do some exercise.
letter_c/sounds/count01.mp3##請數一數那間房間的椅子 .##Please count the chairs in that room.
letter_c/sounds/country01.mp3##他住在一個不允許言論自由的國家。##He lives in a country where free speech is not allowed.
letter_c/sounds/cousin01.mp3##我有很多的堂兄妹 , 以致於我幾乎無法記住他們的名字。##I have so many cousins that I can hardly remember their names.
letter_c/sounds/cover01.mp3##這本雜誌的封面很吸引人。##The cover of this magazine is very attractive.
letter_c/sounds/cow01.mp3##他養了一頭牛他可以每天擠牛奶。##He has a cow that he milks every day.
letter_c/sounds/cowboy01.mp3##John 戴著牛仔帽參加聖誕宴會。##John wore a cowboy hat to the Christmas party.
letter_c/sounds/crayon01.mp3##Marsha 用臘筆畫一張蒙娜麗莎的畫。##Marsha used crayons to draw a picture of Mona Lisa.
letter_c/sounds/crazy01.mp3##每個人都認為他瘋了##Everybody thinks he is totally crazy.
letter_c/sounds/cross02.mp3##Marie 是個虔誠的基督徒 . 她帶十字架 .##Marie is a pious Christian. She wears a cross.
letter_c/sounds/cry01.mp3##因為她看見她的狗被卡車輾過 , 所以她哭了##She cried because she saw her dog get run over by a truck.
letter_c/sounds/cup01.mp3##請給我一杯熱茶。##Please give me a hot cup of tea.
letter_c/sounds/current01.mp3##請填入你現在的住址。##Fill in your current address, please.
letter_c/sounds/cut01.mp3##那個人把他後院的那棵老樹砍掉了.##The man cut down the old tree in his backyard.
letter_c/sounds/cute01.mp3##我弟弟微笑時看起來是那麼的可愛 .##My little brother looks so cute when he smiles.
letter_d/sounds/dance01.mp3##你可以和我跳舞嗎 ?##will you dance with me?
letter_d/sounds/dangerous01.mp3##不戴安全帽騎摩托車是危險的 .##It's dangerous not to wear a helmet when riding a motorcycle.
letter_d/sounds/dark01.mp3##天色漸漸暗下來了##It`s getting dark.
letter_d/sounds/date01.mp3##今天是幾月幾號 ?##What is today's date?
letter_d/sounds/daughter01.mp3##May 是李氏夫婦最小的女兒##May is the youngest daughter of Mr. And Mrs. Lee.
letter_d/sounds/dawn01.mp3##我父母決定天亮時離開。##My parents decided to leave here at dawn.
letter_d/sounds/day01.mp3##今天是星期幾 ?##What day is today?
letter_d/sounds/dead01.mp3##在一場激烈的槍戰後這些罪犯們死了##The criminals were dead after a fierce gunfight.
letter_d/sounds/dear01.mp3##請不要帶走我親愛的兒子 .##Please don't take away my dear son.
letter_d/sounds/december01.mp3##十二月是一年的最後一個月 .##December is the last month of the year.
letter_d/sounds/decide01.mp3##她決定要住在倫敦 .##She decided to live in London .
letter_d/sounds/decrease01.mp3##學生人數已降至 500 人。##Student numbers have decreased by 500.
letter_d/sounds/delicious01.mp3##這熱狗真好吃 . 我可以再吃一個嗎 ?##The hotdog tastes delicious. Can I have one more?
letter_d/sounds/department_store01.mp3##週末時百貨公司通常是擁擠的 .##Department stores are usually crowded on weekends.
letter_d/sounds/describe01.mp3##言語無法形容黛安娜王妃的美麗##Words cannot describe the beauty of Princess Diana.
letter_d/sounds/desk01.mp3##桌上有四枝筆 .##There are four pens on the desk.
letter_d/sounds/develop01.mp3##他們的友誼從中學開始。##Their friendship developed at high school.
letter_d/sounds/dictionary01.mp3##如果你不知道這個字的意思 , 查字典吧 .##If you are not sure what the word means, look it up in a dictionary.
letter_d/sounds/die01.mp3##他昨晚死於肺癌 .##He died of lung cancer last night.
letter_d/sounds/diet01.mp3##節食是減重的方法之一。##Going on a diet is a way of losing weight.
letter_d/sounds/different01.mp3##雖然他們是雙胞胎但他們看起來非常不像 .##Though they are twins, they look very different from each other.
letter_d/sounds/difficult01.mp3##這題數學問題很難 .##This math question is difficult.
letter_d/sounds/dig01.mp3##我叔叔挖了一個池塘養魚 .##My uncle dug a pond to raise the fish in.
letter_d/sounds/dining_room01.mp3##我們在飯廳開了家庭會議 .##We held a family meeting in the dining room.
letter_d/sounds/dinner01.mp3##咱們去吃晚餐 .##Let's go out for dinner.
letter_d/sounds/dinosaur01.mp3##玩具恐龍是 Peter 的最愛。##The toy dinosaur was Peter's favorite.
letter_d/sounds/diplomat01.mp3##你將來想成為外交官嗎？##Do you want to be a diplomat in the future?
letter_d/sounds/dirty01.mp3##我的鞋子髒了因為我在雨中踩到了泥巴 .##My shoes are dirty because it is raining and I stepped in the mud .
letter_d/sounds/discuss01.mp3##在我們執行這個計畫前可否仔細討論？##Can we discuss this plan carefully before we carry it out?
letter_d/sounds/dish01.mp3##洗碗盤時要小心 .##Be careful when you wash the dishes.
letter_d/sounds/distant01.mp3##我無法想像在遙遠的將來我會成為什麼。##I can't imagine where will I be in the distant future.
letter_d/sounds/divide01.mp3##老師將全班分為六組。##The teacher divided the whole class into 6 groups.
letter_d/sounds/do01.mp3##A: 你爸爸是做什麼的 ? B: 他是個工程師 .##A: What does your father do?B: He is an engineer.
letter_d/sounds/doctor01.mp3##今天早上我媽媽帶我去看醫生 , 因為昨晚我發燒了 .##Mother took me to a doctor this morning because I had a fever last night.
letter_d/sounds/dog01.mp3##我不明白為何廣東人喜歡吃狗肉。##I can't understand why the Cantonese like to eat dogs.
letter_d/sounds/doll01.mp3##Gina 看起來好像洋娃娃 .##Gina looks so much like a doll.
letter_d/sounds/dollar01.mp3##你可以借我五元嗎 ?##Can you lend me 5 dollars?
letter_d/sounds/door01.mp3##讓我替你開門 .##Let me open the door for you.
letter_d/sounds/down01.mp3##一個杯子掉到地上了 .##A cup fell down to the ground.
letter_d/sounds/dozen01.mp3##Peter , 可以請你幫我買一打啤酒嗎 ?##Peter, would you please buy a dozen beers for me?
letter_d/sounds/dr01.mp3##Walker 博士寫了很多有關愛的書籍。##Dr. Walker writes a lot of books about love.
letter_d/sounds/draw01.mp3##她喜歡在素描簿上畫畫 .##She likes to draw in a sketchbook.
letter_d/sounds/dream01.mp3##不要作夢了。面對現實吧。##Stop dreaming. Face reality.
letter_d/sounds/dress01.mp3##她穿那件漂亮的洋裝去參加舞會 .##She wore that pretty dress to the party.
letter_d/sounds/drink01.mp3##青少年不應該喝含酒精的飲料 .##Teenagers are not supposed to drink alcohol.
letter_d/sounds/drive01.mp3##在山路開車要慢且小心 .##Drive slowly and carefully on the road in the mountains.
letter_d/sounds/driver01.mp3##Peter 是個粗心的司機 . 他常在開車的時候睡著 .##Peter is a careless driver. He often falls asleep when driving.
letter_d/sounds/drop01.mp3##當我聽到這個消息 , 我的淚如雨下 .##My tear dropped like rain when I heard the sad news.
letter_d/sounds/dry01.mp3##在雨季衣服乾的慢 .##Clothes dry slowly in the rainy season.
letter_d/sounds/during01.mp3##在暑假期間很多人出國旅行來放鬆 .##During summer vacation, many people go abroad to relax.
letter_d/sounds/duty01.mp3##身為學生，你的職責是完成你每天的功課。##As a student, it's your duty to finish your homework every day.
letter_e/sounds/each01.mp3##你們每個人對我而言都是重要的 。##Each one of you is important to me.
letter_e/sounds/eagle01.mp3##老鷹有銳利的眼力。##Eagles have good eyes.
letter_e/sounds/ear01.mp3##兔子有一對長耳朵 。##A rabbit has a pair of long ears.
letter_e/sounds/early02.mp3##你這麼早就到了。##You came here so early.
letter_e/sounds/ease01.mp3##喝熱茶可以舒緩你的感冒。##Drinking warm water might ease your cold.
letter_e/sounds/east01.mp3##太陽從西邊升起 , 從東邊落下 。##The sun rises in the east and sets in the west.
letter_e/sounds/easy01.mp3##對一個小孩而言要明辨是非是不容易的 。##It is not easy for a child to tell right from wrong.
letter_e/sounds/eat01.mp3##你想吃哪一個 , 派或蛋糕 ?##Which would you like to eat, the pie or the cake?
letter_e/sounds/edge01.mp3##Vincent 正坐在床邊。##Vincent is sitting on the edge of the bed.
letter_e/sounds/education01.mp3##他要他的小孩接受良好的教育。##He wants his children to have a good education.
letter_e/sounds/effort01.mp3##Rudy 必須更努力他的工作。##Rudy must put more effort into his work.
letter_e/sounds/egg01.mp3##記得要買一些蛋給我 。##Remember to buy me some eggs.
letter_e/sounds/eight01.mp3##你可以在明早八點到嗎 ?##Can you be here at eight tomorrow morning?
letter_e/sounds/eighteen01.mp3##Jenny18 歲 。 她現在是一個成年人了 。##Jenny is eighteen years old. She is an adult now.
letter_e/sounds/eighth01.mp3##Paul 是他家裡第八個小孩 。##Paul is the eighth child in his family .
letter_e/sounds/eighty01.mp3##明天是我爺爺的八十歲生日 。##Tomorrow is my grandfather's 80th birthday.
letter_e/sounds/either02.mp3##不是你就是他應該幫我買鹽 。##Either you or he should buy the salt for me.
letter_e/sounds/electric01.mp3##你可否教我使用這個電熨斗？##Can you tell me how to use this electric iron?
letter_e/sounds/elementary_school01.mp3##Helen 住的很靠近那所小學 。##Helen lives very close to the elementary school.
letter_e/sounds/elephant01.mp3##我們可以在動物園裡看到大象 。##We can see elephants in the zoo.
letter_e/sounds/eleven01.mp3##我十一歲 。##I`m eleven years old.
letter_e/sounds/else01.mp3##你還要什麼 ?##What else do you want?
letter_e/sounds/email01.mp3##當你回芝加哥時 , 請寫電子郵件給我 。##Please write me an e-mail when you go back to Chicago.
letter_e/sounds/embarrass01.mp3##別在公共場所喧嘩，這會讓我們窘迫不堪。##Stop shouting in public. It really embarrass us.
letter_e/sounds/empty01.mp3##在大城市找空的停車位很困難。##It's difficult to find an empty parking space in big cities.
letter_e/sounds/end02.mp3##並不是每個人都喜歡皆大歡喜的結局 。##Not everyone likes happy endings.
letter_e/sounds/energetic01.mp3##每天早上喝一杯咖啡使我活力充沛。##Drinking a cup of coffee every morning makes me feel energetic.
letter_e/sounds/english01.mp3##學英文是沒有捷徑的 。##There is no shortcut to learning English.
letter_e/sounds/enjoy01.mp3##在漫長的一天工作後 , 我媽喜歡做 Spa 。##My mother enjoys going to the Spa after a long day's work.
letter_e/sounds/enough01.mp3##我沒有足夠的錢來買新背包 。##I don't have enough money to buy the new backpack.
letter_e/sounds/enter01.mp3##當 Susie 進入教室時 , 每個人都安靜地看著她 。##When Susie entered the classroom, everyone looked at her quietly.
letter_e/sounds/envy01.mp3##我一直羡慕你的好運。##I have always envied your good luck.
letter_e/sounds/equal01.mp3##Daniel 認為男女生而平等。##Daniel believes that men and women are equal.
letter_e/sounds/eraser01.mp3##我弄丟了我的橡皮擦 。 你可以把你的借我嗎 ?##I lost my eraser. Can you lend me yours?
letter_e/sounds/eve01.mp3##在除夕夜 , 很多人聚在一起為新年倒數 。##On New Year's Eve, many people gather together to count down for the coming year.
letter_e/sounds/even01.mp3##這一方面連上帝都幫不了你 。##Even God can't help you with this.
letter_e/sounds/evening01.mp3##今天傍晚我阿姨要來 。##My aunt is coming this evening.
letter_e/sounds/ever01.mp3##他是我見過最棒的演員 。##He is the best actor I've ever seen.
letter_e/sounds/every01.mp3##每一天都要享受人生 。##Enjoy your life every day.
letter_e/sounds/everyone01.mp3##每個人都認同她是個很好的歌手 。##Everyone agrees that she is a great singer .
letter_e/sounds/everything01.mp3##直到每件事都就緒我們才會走。##We can't go until everything is ready.
letter_e/sounds/example01.mp3##請給我個例子。##Please give me an example.
letter_e/sounds/excellent01.mp3##你的表演很棒 ! 好 !##Your performance is excellent! Bravo!
letter_e/sounds/except01.mp3##除了John 之外每個人都要出門。 他感冒了 。##Everyone is going out except John. He has a cold.
letter_e/sounds/excited01.mp3##Queenie 對即將來臨的周杰倫演唱會感到興奮 。##Queenie gets so excited about Jay's coming music concert.
letter_e/sounds/exciting01.mp3##我不認為這部電影很刺激 。##I don`t think this movie is very exciting.
letter_e/sounds/excuse01.mp3##不准有藉口 。##There`s no excuse.
letter_e/sounds/exercise01.mp3##我認為你應該多運動 。##I think you should exercise more.
letter_e/sounds/exist01.mp3##火星有生命存在嗎？##Does life exist on Mars?
letter_e/sounds/exit01.mp3##乘客必須在最近的出口下車。##Passengers should leave the train by the nearest exit.
letter_e/sounds/expensive01.mp3##我愛這個鑽石戒指 。 不過太貴了 。##I love this diamond ring. But it's so expensive.
letter_e/sounds/experience01.mp3##你有任何經驗嗎 ?##Do you have any experience?
letter_e/sounds/eye01.mp3##有東西跑到我的眼睛裡 。##Something has gotten into my eye.
letter_f/sounds/face02.mp3##當覺得你的臉油油的時候洗一洗就行了 。##When your face feels oily, just wash it.
letter_f/sounds/fact01.mp3##事實上 ,Danny 不是我的小孩 。##In fact, Danny is not my child.
letter_f/sounds/factory01.mp3##在你工廠裡有可能找到工作嗎 ?##Is it possible to find a job in your factory?
letter_f/sounds/fall01.mp3##Jimmy 從腳踏車上摔下來 。##Jimmy falls off the bicycle.
letter_f/sounds/false01.mp3##鯨魚是魚，對或錯？##A whale is a fish. True or false?
letter_f/sounds/family02.mp3##你的家人好嗎 ?##How is your family ?
letter_f/sounds/famous01.mp3##李小龍以他的動作電影聞名 。##Bruce Lee was famous for his kung fu movies.
letter_f/sounds/fan01.mp3##我是湯姆克魯斯的忠實影迷 。##I'm a big fan of Tom Cruise.
letter_f/sounds/fancy01.mp3##當我們到倫敦旅行時，我們全家住在一間很棒的旅館。##Our family stayed at a very fancy hotel when we took a trip to London .
letter_f/sounds/fantastic01.mp3##你做得真好。##You've done a fantastic job!
letter_f/sounds/farm01.mp3##Teddy 的媽媽正在田裡工作 。##Teddy's mother is working on the farm.
letter_f/sounds/farmer01.mp3##在今日 , 越來越少人想當農夫 。##Fewer and fewer people want to work as farmers these days.
letter_f/sounds/fashionable01.mp3##Mindy 今晚穿的洋裝很時髦。##The dress Mindy wore tonight was very fashionable.
letter_f/sounds/fast01.mp3##搭飛機旅行較迅速 。##It's faster to travel by plane.
letter_f/sounds/fat01.mp3##少吃垃圾食物 , 否則你會變胖 。##Eat less junk food, or you'll get fat.
letter_f/sounds/father01.mp3##對我而言 , 你一直像個爸爸 。##You have been like a father to me.
letter_f/sounds/favorite01.mp3##我愛吃冰淇淋 。 我最愛的口味是瑞士巧克力 。##I love eating ice cream. My favorite flavor is Swiss Chocolate.
letter_f/sounds/february01.mp3##二月十四日是情人節 。##February 14 th is called Valentine's Day.
letter_f/sounds/fee01.mp3##你們學校學費多少？##What's the tuition fee in your school?
letter_f/sounds/feed01.mp3##我的祖父母用廚餘餵豬。##My grandparents feed their pigs with leftovers.
letter_f/sounds/feel01.mp3##她在太陽下覺得不舒服 。##She didn't feel comfortable under the sun.
letter_f/sounds/female01.mp3##男性的聲音比女性低沈。##The male voice is deeper than the female.
letter_f/sounds/festival01.mp3##我們在中秋節吃月餅 。##We eat moon cakes during the Mid-Autumn Festival.
letter_f/sounds/few01.mp3##她們之中幾乎沒有人很瞭解我 。##Few of them know me well.
letter_f/sounds/fifteen01.mp3##Benny 數學考試只拿十五分， 真是一團糟 。##Benny only got fifteen points on his math exam.It was a mess.
letter_f/sounds/fifth01.mp3##我現在是五年級生 。##I'm a fifth grade student now.
letter_f/sounds/fifty01.mp3##A: 多少錢 ? B: 五十元 。##A: How much is it? B: It's fifty dollars.
letter_f/sounds/fill01.mp3##請在面試前將空格填滿 。##Please fill in the blanks before the interview.
letter_f/sounds/finally01.mp3##洛磯隊最後贏得了冠軍 。##The Rockies finally won the Major League championships.
letter_f/sounds/find01.mp3##我找不到我的皮夾 。##I can't find my wallet.
letter_f/sounds/fine02.mp3##A: 你最近好嗎 ? B: 很好 , 你呢 ?##A: how have you been lately? B: Fine, and you?
letter_f/sounds/finger01.mp3##Kate 在切肉的時候意外地切傷了她的食指 。##Kate accidentally cut her index finger when cutting the meat.
letter_f/sounds/finish01.mp3##你必須在今天完成你的作業否則明天你必須留在家裡。##You must finish your homework today, or you'll have to stay home tomorrow.
letter_f/sounds/fire01.mp3##不要玩火 。##Don't play with fire.
letter_f/sounds/first01.mp3##Mandy 是第一個找到金磚的人 。##Mandy was the first one to find the gold bricks.
letter_f/sounds/fish01.mp3##今天他抓到了一隻很大的魚 。##He caught a very huge fish today.
letter_f/sounds/fisherman01.mp3##Fisher 先生是個有名的漁夫 。##Mr. Fisher is a famous fisherman.
letter_f/sounds/five01.mp3##請再給我五分鐘 。##Please give me five more minutes.
letter_f/sounds/fix01.mp3##可以請你幫我修門嗎 ?##Can you fix the door for me ,please?
letter_f/sounds/flag01.mp3##國慶日，到處都可以看到國旗。##You can see our national flags everywhere on Double Tenth Day.
letter_f/sounds/floor01.mp3##地板上有一個十元的硬幣 。##There is a ten-dollar coin on the floor.
letter_f/sounds/flower01.mp3##蜜蜂被花香所吸引 。##The bees are attracted to the fragrant flowers.
letter_f/sounds/fly01.mp3##明天我就要飛往倫敦了 。##I`ll fly to London tomorrow.
letter_f/sounds/follow01.mp3##你必須遵照手冊上的指示否則你可能損壞這部機器。##You must follow the instructions in the manual, otherwise you might damage the machine.
letter_f/sounds/food01.mp3##非洲難民急需食物跟避難所 。##African refugees are in need of food and shelter.
letter_f/sounds/foot01.mp3##他走路去台南 。##He goes to Tainan on foot.
letter_f/sounds/for02.mp3##你在等什麼 ?##What are you waiting for?
letter_f/sounds/foreign01.mp3##在過去的 5 年裡，我已經去過許多國家 。##I have been to several foreign countries in the past five years.
letter_f/sounds/foreigner01.mp3##Sandy 在機場和外國人練習講英文 。##Sandy practices speaking English with foreigners at the airport.
letter_f/sounds/forget02.mp3##我們必須學習會原諒和遺忘 。##We must learn to forgive and forget.
letter_f/sounds/fork01.mp3##你為什麼給我叉子 。##Why did you give me a fork?
letter_f/sounds/formal01.mp3##爸爸說今晚我們要吃一頓正式的晚餐。##Daddy said we will join a very formal dinner tonight.
letter_f/sounds/forty01.mp3##我還需要四十元買那張票 。##I still need forty dollars so that I can buy the ticket.
letter_f/sounds/forward01.mp3##警察跑向前捕捉小偷。##The police ran forward to catch the thief.
letter_f/sounds/four01.mp3##我的家庭中有 4 位成員 。##There are four people in our family.
letter_f/sounds/fourteen01.mp3##當她十四歲的時候，她媽媽幾乎每天帶她去學校 。##When she was fourteen, her mother took her to school almost every day.
letter_f/sounds/fourth01.mp3##在這場競賽中， Bill 得了第四名 。##Bill won fourth place in the contest.
letter_f/sounds/free02.mp3##今天的啤酒是免費的 。##The beer is free today.
letter_f/sounds/fresh01.mp3##這魚不新鮮，聞起來味道很不好 。##The fish is not fresh. It smells terrible.
letter_f/sounds/friday01.mp3##每逢週五的晚上，許多人都會去逛夜市 。##On Friday nights, many people go to the night markets.
letter_f/sounds/friend01.mp3##患難見真情 。##A friend in need is a friend indeed.
letter_f/sounds/friendly01.mp3##當我們和 Linda 說話的時候，她顯現的很和善的樣子##Linda appears friendly when we talk to her.
letter_f/sounds/friendship01.mp3##我母親和老師有密切的友誼。##My mother has a strong friendship with my teacher.
letter_f/sounds/from01.mp3##States . A: 你從哪裡來 ? B: 我來自美國 。##A: Where are you from? B: I'm from the United
letter_f/sounds/front01.mp3##這個女士在醫院前昏倒 。##The woman fainted in front of a hospital.
letter_f/sounds/fruit01.mp3##請吃一點水果 。##Eat some fruit, please.
letter_f/sounds/fry01.mp3##Joe 通常會吃煎蛋當早餐。##Joe usually fies an egg for breakfast.
letter_f/sounds/full02.mp3##這個地方充滿著驚奇 。##This place is full of surprises.
letter_f/sounds/fun01.mp3##你在這玩的還開心嗎 ?##Are you having fun here?
letter_f/sounds/funny02.mp3##難到你不想聽一些好笑的事嗎 ?##Do you want to hear something funny?
letter_f/sounds/furniture01.mp3##Rhett 住在一間沒有傢俱的房子。##Rhett lives in a house without any furniture.
letter_f/sounds/future01.mp3##你將來計劃要做什麼 ?##What are you planning to do in the future?
letter_g/sounds/game01.mp3##不要這麼嚴肅嘛，這只是個遊戲 。##Don't be so serious. It's just a game.
letter_g/sounds/garbage01.mp3##這垃圾車車每晚 6:30 會進入我們的社區附近 。##The garbage truck enters our neighborhood at 18:30 every evening.
letter_g/sounds/garden01.mp3##小孩們在花園裡玩耍 。##The children are playing in the garden.
letter_g/sounds/gas01.mp3##瓦斯快要用完了 。##The gas is running out.
letter_g/sounds/gather01.mp3##除夕，居住各地的小孩都會回家團聚。##On Chinese New Year's Eve, children from all places will come back home and gather together.
letter_g/sounds/general01.mp3##美術老師今天介紹我們達文西繪畫的概念。##The art teacher gave us a general idea of Da Vinci's paintings today.
letter_g/sounds/genius01.mp3##Neil 是數學天才。##Neil is a math genius.
letter_g/sounds/get02.mp3##在我生日那天，我從我父母那拿到一個禮物 。##I got a present from my parents on my birthday.
letter_g/sounds/giant01.mp3##他是全家最高的。##He's the giant of the family.= He's the tallest person of the family.
letter_g/sounds/gift02.mp3##Andy 天生很會唱歌 。##Andy is gifted in singing.
letter_g/sounds/girl01.mp3##我在學校遇見一位非常漂亮的女孩 。##I met a very pretty girl in school.
letter_g/sounds/give01.mp3##這位老婆婆給了我一盒的糖果 。##The old lady gave me a box of candy.
letter_g/sounds/glad01.mp3##如果你能來的話，我將會很高興 。##I'll be glad if you can come.
letter_g/sounds/glass01.mp3##David 點了一杯柳橙汁 。##David ordered a glass of orange juice.
letter_g/sounds/glove01.mp3##當冬天來臨的時候，街上的人們帶手套來保暖 。##When winter comes, people on the streets wear gloves to keep them warm.
letter_g/sounds/go01.mp3##你能和我一起去嗎 ?##Can you go with me?
letter_g/sounds/goat01.mp3##山羊和綿羊是不一樣的 。##Goats are different from sheep.
letter_g/sounds/good_bye01.mp3##May 跟我說再見後，便上火車了 。##May said goodbye to me and got on the train.
letter_g/sounds/good01.mp3##Jerry 是一個好學生 。##Jerry is a good student.
letter_g/sounds/grade02.mp3##Kim 現在讀四年級 。##Kim is studying in fourth grade now.
letter_g/sounds/gram01.mp3##一公斤有一千公克。##There are 1000 grams in a kilogram.
letter_g/sounds/grandfather01.mp3##她祖父上星期日來看她 。##Her grandfather came to visit her last Sunday.
letter_g/sounds/grandmother01.mp3##當我是小女孩的時候，我祖母告訴我一個故事 。##My grandmother told me a story when I was a little girl.
letter_g/sounds/grass01.mp3##不要踐踏草皮 。##Don't step on the grass.
letter_g/sounds/gray01.mp3##Petty 就是那個穿灰色套裝的 。##Petty is the one who wears the gray suit.
letter_g/sounds/great01.mp3##今天真的很高興見到你 。##It's great meeting with you today.
letter_g/sounds/green01.mp3##Larry 想念他家鄉的綠草 。##Larry misses the green grass in his hometown.
letter_g/sounds/ground01.mp3##我的玻璃杯掉到地上而且破掉了 。##My glasses fell to the ground and broke.
letter_g/sounds/group01.mp3##一群學生在環保上很努力的推行 。##A group of students work very hard on environmental protection.
letter_g/sounds/grow02.mp3##這個農夫在田裡種稻米和蔬菜 。##The farmer grows rice and vegetables in the field.
letter_g/sounds/guess01.mp3##他一直猜但仍然猜不到。##He guesses and guesses, but still can't find the answer.
letter_h/sounds/habit01.mp3##抽煙不是個好習慣 。##It's not a good habit to smoke.
letter_h/sounds/hair01.mp3##Helena 昨天去剪頭髮 。##Helena had her hair cut yesterday.
letter_h/sounds/haircut01.mp3##我的頭髮太長，我該去剪頭髮。##My hair is getting too long. I need a haircut.
letter_h/sounds/half02.mp3##半小時前， Tom 出去打籃球 。##Half an hour ago, Tom went out to play basketball.
letter_h/sounds/ham01.mp3##我喜歡火腿蛋三明治 。##I like ham and egg sandwiches .
letter_h/sounds/hamburger01.mp3##吃太多漢堡會影響健康 。##Eating too many hamburgers is not good for your health.
letter_h/sounds/hand01.mp3##吃東西前要先洗手 。##Wash your hands before eating.
letter_h/sounds/handsome01.mp3##Judy 和那個很帥的男生談戀愛 。##Judy fell in love with a handsome boy.
letter_h/sounds/hang01.mp3##她把袋子掛在椅子上。##She hung her bag over the chair.
letter_h/sounds/happen01.mp3##不好的事情一直在發生 。##Bad things happen all the time.
letter_h/sounds/happy01.mp3##你不是魚，你怎麼知道它快不快樂 ?##You are not the fish. How would you know if it was happy?
letter_h/sounds/hard02.mp3##這個石頭太硬很難穿過它 。##The stone is too hard to break through.
letter_h/sounds/hard_working01.mp3##John 是一個認真工作的青年 。##John is a hard-working young man.
letter_h/sounds/hat01.mp3##這頂藍色的帽子適合你 。##This blue hat suits you.
letter_h/sounds/hate01.mp3##Randy 討厭吃香蕉 。##Randy hates eating the banana.
letter_h/sounds/have04.mp3##我們學校去年辦聖誕派對。##(3) Our school had a Christmas party last year.
letter_h/sounds/he05.mp3##Ted 自己做功課嗎？##(4) Does Ted do his homework by himself?
letter_h/sounds/head01.mp3##他頭上戴一頂黃色帽子 。##He wears a yellow hat on his head.
letter_h/sounds/headache01.mp3##Nancy 今天早上頭痛 。##Nancy had a headache this morning.
letter_h/sounds/health01.mp3##我親愛的爸爸，請您好好照顧自己的健康 。##Take good care of your health, my dear father.
letter_h/sounds/healthy01.mp3##父母親總是希望他們的孩子身體健康 。##Parents always want their children to be healthy.
letter_h/sounds/hear01.mp3##我聽不到你說什麼，講大聲一點 。##I can't hear you. Speak louder!
letter_h/sounds/heart01.mp3##Louis 昨晚心臟病發 。##Louis had a heart attack last night.
letter_h/sounds/heat01.mp3##Wendy 在炎熱的太陽下，流了許多汗 。##Wendy sweated under the heat of the sun.
letter_h/sounds/heavy01.mp3##這手提箱太重了 。##This case is too heavy.
letter_h/sounds/hello01.mp3##向你的新朋友說哈囉 。##Say hello to your new friend.
letter_h/sounds/help01.mp3##天助自助者 。##God helps those who help themselves.
letter_h/sounds/helpful01.mp3##服用阿斯匹靈也許有助於減輕一些你的頭痛 。##Taking an aspirin might be helpful in easing your headache.
letter_h/sounds/here02.mp3##我在這 。##Here I am.
letter_h/sounds/hi01.mp3##嗨，我的名字叫 Donald ，很高興見到你 。##Hi, my name is Donald. Nice to meet you.
letter_h/sounds/hide01.mp3##你背後是不是有藏什麼東西 ?##Did you hide something behind your back?
letter_h/sounds/high01.mp3##這架飛機在天空高高的飛行著 。##The plane flies high in the sky.
letter_h/sounds/hill01.mp3##在我家前面有一座山丘 。##There is a hill in front of my house.
letter_h/sounds/history01.mp3##James 在高中教歷史 。##James teaches history in the high school.
letter_h/sounds/hit01.mp3##Barry Bonds 昨天打出了兩隻全壘打 。##Barry Bonds hit two homeruns yesterday.
letter_h/sounds/hobby01.mp3##下象棋是我的興趣之一 。##One of my hobbies is playing chess.
letter_h/sounds/hold01.mp3##Luke 把紙緊緊的拿在他手上 。##Luke holds the paper tightly in his hands.
letter_h/sounds/holiday01.mp3##你在假日的時候通常都做些什麼 ?##What do you usually do on holidays?
letter_h/sounds/home01.mp3##我整天待在家裡看電視 。##I stayed home and watched TV all day.
letter_h/sounds/homework01.mp3##Grace 這個週末沒有很多回家功課 。##Grace doesn't have much homework to do this weekend.
letter_h/sounds/honest01.mp3##老實說，我來自火星 。##To be honest, I am from Mars.
letter_h/sounds/hope01.mp3##我世界和平的希望有一天將會成真 。##My hope for world peace will come true one day.
letter_h/sounds/horse01.mp3##在古時候，武士都騎在馬上作戰 。##In ancient times, warriors fought on horses.
letter_h/sounds/hospital01.mp3##如果你覺得不舒服，去醫院看病吧 。##If you don't feel good, go to the hospital.
letter_h/sounds/hot01.mp3##這鍋子很熱，不要碰它 。##The pot is hot. Don't touch it.
letter_h/sounds/hot_dog01.mp3##這個日本人在一分鐘內吃了 52 根熱狗 。##The Japanese person ate 52 hot dogs in one minute.
letter_h/sounds/hotel01.mp3##我 2 天前預訂了那間旅館 。##I made a reservation at that hotel two days ago.
letter_h/sounds/hour01.mp3##請在 2 小時後叫我起床，謝謝！##Wake me up in two hours . Thanks!
letter_h/sounds/house01.mp3##這間房子是空的 。##This house is empty.
letter_h/sounds/how01.mp3##我們不知道怎麼煮 。##We don't know how to cook.
letter_h/sounds/however01.mp3##這個男的很生氣，然而他沒有說什麼就走了 。##The man was angry; however, he walked away without saying anything.
letter_h/sounds/hundred01.mp3##這皮包價值 700 塊 。##This wallet costs seven hundred dollars.
letter_h/sounds/hungry01.mp3##我現在餓到可以吃下一隻雞 。##I'm so hungry right now that I could eat a whole chicken .
letter_h/sounds/hurry01.mp3##現在沒有需要這麼趕，我們還有 30 分鐘 。##There's no need to be in a hurry. We still have thirty minutes.
letter_h/sounds/hurt01.mp3##我不是故意傷害你的感覺 。##I don't mean to hurt your feelings.
letter_h/sounds/husband01.mp3##Kerry 的丈夫是大公司的經理 。##Kerry's husband is a manager in a big company.
letter_i/sounds/i01.mp3##我覺得我父親將不會相信我 。##I don't think my father will believe me.
letter_i/sounds/ice01.mp3##Debra 加一些冰在果汁裡 。##Debra adds some ice to the juice.
letter_i/sounds/ice_cream01.mp3##香草冰淇淋是我的最愛 。##Vanilla ice cream is my favorite.
letter_i/sounds/idea01.mp3##William 有許多很奇怪的點子 。##William has many strange ideas.
letter_i/sounds/if01.mp3##如果我是你，我會和 Daisy 約會 。##If I were you, I would date Daisy.
letter_i/sounds/ignore01.mp3##她全然忽略他而一直往前走。##She totally ignored him and kept on walking.
letter_i/sounds/importance01.mp3##你知道誠實的重要嗎？##Do you know the importance of being honest?
letter_i/sounds/important01.mp3##我在 5 分鐘後有一個重要的會議 。##I have an important meeting in five minutes .
letter_i/sounds/in01.mp3##我弟在他房裡睡覺 。##My brother is sleeping in his room.
letter_i/sounds/income01.mp3##Robert 成長於一個低收入家庭。##Robert grew up in a low income family.
letter_i/sounds/increase01.mp3##乘客人數每年增加。##The number of the passengers has increased every year.
letter_i/sounds/indicate01.mp3##交通號誌指示我們正確的方向。##This traffic sign indicates us the right way to go.
letter_i/sounds/information01.mp3##在網路上你可以獲得你想要的資訊。##You can get any information you want on the Internet.
letter_i/sounds/inside01.mp3##請進來裡面 。##Please come inside.
letter_i/sounds/insist01.mp3##我堅持你要去看醫生。##I insisted that you should go to see a doctor.
letter_i/sounds/interest01.mp3##他在學習新事物時都表現極大的興趣 。##He showed great interest in learning new things.
letter_i/sounds/interested01.mp3##Jones 對於游泳感到非常有興趣 。##Jones is very interested in swimming.
letter_i/sounds/interesting01.mp3##Billy 是一個很有趣的人 。##Billy is an interesting person.
letter_i/sounds/internet01.mp3##我們能從網路上獲得許多資訊 。##We can get all kinds of information from the Internet.
letter_i/sounds/into01.mp3##不要走進這間屋裡，裡面有一隻瘋狗 。##Don't step into the house. There is a mad dog.
letter_i/sounds/island01.mp3##台灣不是一個大島嶼 。##Taiwan is not a big island.
letter_i/sounds/it01.mp3##睡太晚不是件好事 。##It is not good to sleep late.
letter_j/sounds/jacket01.mp3##穿上夾克，現在天氣變冷了。##Put on the jacket. It's getting cold now.
letter_j/sounds/january01.mp3##一月是一年的第一個月。##January is the first month of the year.
letter_j/sounds/jeans01.mp3##她穿那件牛仔褲看起來很好看。##She looks nice in those jeans.
letter_j/sounds/job01.mp3##Peter 在銷售部門找到一個工作。##Peter got a job in the Marketing Department.
letter_j/sounds/jog01.mp3##有些人在早上很早的時候慢跑。##Some people jog very early in the morning.
letter_j/sounds/join01.mp3##Lucy 在畢業後想要從軍。##Lucy wants to join the army after she graduates.
letter_j/sounds/joy01.mp3##這些士兵因為嬴了這場戰役高興的哭了。##The soldiers cried for joy because they won the battle.
letter_j/sounds/juice01.mp3##可不可以請你給我一點蘋果汁?##Can I have some apple juice?
letter_j/sounds/july01.mp3##7月4號是美國獨立紀念日。##July 4 th is the famous Independence Day of America.
letter_j/sounds/jump01.mp3##這些猴子在樹上跳上跳下的。##The monkeys jumped up and down in the trees.
letter_j/sounds/june01.mp3##May 在六月從高中畢業 。##May graduated from high school in June.
letter_j/sounds/junior_high_school01.mp3##Jack 是一個國中老師 。##Jack is a junior high school teacher.
letter_j/sounds/just01.mp3##不要只是站在那 , 過來幫我 !##Don't just stand there. Come and help me!
letter_k/sounds/keep01.mp3##讓我們保持聯絡，好嗎 ?##Let's keep in touch, okay?
letter_k/sounds/key02.mp3##我把鑰匙忘在辦公室裡 。##I forgot my keys in the office.
letter_k/sounds/kick01.mp3##Danny 把罐子踢的飛開了 。##Danny kicked the can and it flew away.
letter_k/sounds/kid01.mp3##這些小孩真的很頑皮 。##Those kids are really naughty.
letter_k/sounds/kill01.mp3##那個人在一場車禍中被殺害 。##The man was killed in a car accident.
letter_k/sounds/kilogram01.mp3##她很壯所以能輕易的舉起 100 公斤 。##She is so strong that she can lift 100 kilograms easily.
letter_k/sounds/kilometer01.mp3##從我家到學校大約８公里。##There are almost 8 kilometers from my house to my school.
letter_k/sounds/kind02.mp3##有許多不同種類的鳥在天空中飛翔 。##There are many kinds of birds flying in the sky.
letter_k/sounds/king01.mp3##這個國王太老以致無法在這場戰爭中打仗 。##The king is too old to fight in the war.
letter_k/sounds/kiss01.mp3##我親吻我的媽媽並向她道晚安 。##I kissed my mother and said goodbye to her.
letter_k/sounds/kitchen01.mp3##媽媽從不使用廚房 。##Mom never uses the kitchen.
letter_k/sounds/kite01.mp3##在台北縣布一個風箏博物館，你想一起去嗎 ?##There is a kite museum in Taipei County. Would you like to go?
letter_k/sounds/knee01.mp3##我的膝蓋在一次意外中受傷 。##My knees were hurt in an accident.
letter_k/sounds/knife01.mp3##停止玩刀子 !##Stop playing with the knife.
letter_k/sounds/knock01.mp3##在進入別人的房裡前，沒有先敲門是很不禮貌的 。##It is not polite to enter someone else's room without knocking on the door first.
letter_k/sounds/know01.mp3##他不知道該去哪裡 。##He doesn't know where to go.
letter_k/sounds/knowledge01.mp3##在這個摩登的世界，知識就是力量 。##Knowledge is power in the modern world.
letter_l/sounds/lake01.mp3##在公園裡有一座小湖 。##There is a small lake in the park.
letter_l/sounds/lamp01.mp3##一些技術員正在維修壞掉的檯燈 。##Some technicians are fixing the broken lamps.
letter_l/sounds/land01.mp3##一艘小船正航向陸地 。##A small boat is sailing toward land.
letter_l/sounds/language01.mp3##英文是世上主要的語言之一 。##English is one of the major languages in the world.
letter_l/sounds/large01.mp3##我需要一杯大杯的檸檬茶 。##I need a large cup of lemon tea, please.
letter_l/sounds/last01.mp3##最後， Billy 出現在舞會上 。##At last, Billy showed up at the party.
letter_l/sounds/late01.mp3##在太遲前我們必須告訴她這個事實 。##We have to tell her the truth before it's too late.
letter_l/sounds/later01.mp3##我現在很忙，我稍後會回電話給你 。##I'm busy right now. I'll call you back later.
letter_l/sounds/latest01.mp3##電影院最近在上映什麼影片？##What's the latest movie at the theater?
letter_l/sounds/latter01.mp3##假如你讓我選擇夏威夷或倫敦，我較喜歡後者。##If you give me a choice between Hawaii and London , I prefer the latter.
letter_l/sounds/laugh01.mp3##Sammy 總是笑的很大聲 。##Sammy always laughs in a loud voice.
letter_l/sounds/lazy01.mp3##每個人都說 Ken 是個懶骨頭 。##Everyone calls Ken lazy bones.
letter_l/sounds/lead01.mp3##孫逸仙博士帶領中國人民邁向自由 。##Dr. Sun Yat-sen led the Chinese people to a free country.
letter_l/sounds/leader01.mp3##比爾蓋茲是微軟成功的領導者 。##Bill Gates is the successful leader of Microsoft.
letter_l/sounds/leaf01.mp3##他撿起一片楓葉作為對加拿大的回憶。##He picked up a leaf of Maple Tree as a memory in Canada .
letter_l/sounds/learn01.mp3##我今天學了一個新的片語 。##I learned a new phrase today.
letter_l/sounds/least01.mp3##他每天至少花兩小時看電視 。##He spends at least two hours watching TV every day.
letter_l/sounds/leave01.mp3##請不要離開我 。##Don't leave me, please!
letter_l/sounds/left01.mp3##向左轉，然後你會看見公車站 。##Turn left, and you'll see the bus station.
letter_l/sounds/leg01.mp3##我在回家的路上看見一隻只有三隻腳的可憐小狗 。##I saw a poor dog with three legs on my way home.
letter_l/sounds/lemon01.mp3##我們從超市買了一公斤的檸檬 。##We bought a kilogram of lemons from the supermarket.
letter_l/sounds/lend01.mp3##能不能請你借我腳踏車一小時呢？##Please lend me your bike for just one hour, ok?
letter_l/sounds/less01.mp3##吃少一點，多做運動你能將能減重。##Eat less and do more exercise, and you'll lose some weight.
letter_l/sounds/lesson01.mp3##第九課對我而言太難了。##Lesson Nine is too hard for me.
letter_l/sounds/let01.mp3##讓我獨自試穿一下這件裙子。##Let me try this skirt on alone.
letter_l/sounds/letter01.mp3##Daisy 收到一封她父母寫來的信。##Daisy received a letter from her parents.
letter_l/sounds/level01.mp3##Allen 在閱讀的小說是中學程度的。##The novel Allen reads now is at high school level.
letter_l/sounds/library01.mp3##我必須到圖書館繼續我的研究。##I have to go to the library to continue the research.
letter_l/sounds/lick01.mp3##他舔著手指。##He licked his fingers.
letter_l/sounds/lie02.mp3##不要對任何人說謊。##Don't lie to anyone.
letter_l/sounds/life01.mp3##他在 30 歲以前過著不幸的人生。##He led a miserable life before he was 30 years old.
letter_l/sounds/light02.mp3##今晚會停電，把這些蠟燭點亮吧。##Light up those candles. The power is out tonight.
letter_l/sounds/like01.mp3##你喜歡我新剪的髮型嗎？##Do you like my new haircut?
letter_l/sounds/likely01.mp3##好像要下雨了。##It is likely to rain.
letter_l/sounds/line01.mp3##請你走直線  。##Walk in a straight line, please.
letter_l/sounds/lion01.mp3##這隻獅子正生氣的吼叫著。##The lion is roaring in anger.
letter_l/sounds/lip01.mp3##Linda 在她唇上塗口紅。##Linda uses a lipstick on her lips.
letter_l/sounds/list01.mp3##你被列入勝利者的名單上。##Congratulations! You are on the winners' list.
letter_l/sounds/listen01.mp3##你聽!!樹林中傳來一些奇怪的聲音。##Listen! There are some weird sounds in the woods.
letter_l/sounds/liter01.mp3##我的車子還要２公升汽油。##My car still needs 2 liters of gasline.
letter_l/sounds/little01.mp3##有一隻小貓在這裏。##There is a little kitty over there.
letter_l/sounds/live01.mp3##Tom 住在台北市區的一個小公寓。##Tom lives in a small apartment in downtown Taipei.
letter_l/sounds/living_room01.mp3##我沒有客廳，我住在一個套房。##I don't have a living room. I live in a suite.
letter_l/sounds/lonely01.mp3##Helen 感到很寂寞並開始哭了起來。##Helen felt very lonely and began to weep.
letter_l/sounds/long02.mp3##10 年是一段很漫長的時間。##Ten years is a long time!
letter_l/sounds/look02.mp3##Lawrence 在教室給了我一個奇怪的眼神。##Lawrence gave me a strange look in the classroom.
letter_l/sounds/lose01.mp3##你沒有什麼後顧之憂。##You have nothing to lose.
letter_l/sounds/loud01.mp3##這噪音好大聲，我快被它弄瘋了！##The noise is so loud that it drives me crazy.
letter_l/sounds/love02.mp3##我愛貓咪。##I love cats.
letter_l/sounds/low02.mp3##如果你要躲某人就要低調點。##Stay low if you are hiding from somebody.
letter_l/sounds/lucky01.mp3##John 和 Mary 結婚了。他真是個幸運的傢伙。##John got married to Mary. He is a lucky guy.
letter_l/sounds/lunch01.mp3##你想和我一起吃午餐嗎？##Would you like to have lunch with me?
letter_m/sounds/machine01.mp3##機器有時候會故障。##Machines may not work sometimes.
letter_m/sounds/magic01.mp3##我喜歡看電視魔術表演節目。##I love watching magic shows on TV.
letter_m/sounds/mail01.mp3##Ted 郵寄了一張明信片給他最好的朋友 Wilson 。##Ted mailed a postcard to his best friend, Wilson.
letter_m/sounds/mailman01.mp3##這個郵差穿了一件綠色的制服。##The mailman wears a green uniform.
letter_m/sounds/major01.mp3##空氣污染是大都市的首要問題。##Air pollution is a major problem in big cities.
letter_m/sounds/make02.mp3##在還不會太遲前下你的決定。##Make your decision before it's too late!
letter_m/sounds/man01.mp3##在電視上的這個男人是一個有名的電影明星。##The man on TV is a famous movie star.
letter_m/sounds/many01.mp3##Felix 有許多好朋友。##Felix has many good friends.
letter_m/sounds/map01.mp3##當旅行到一個陌生的地方時，常看地圖總沒錯。##Always consult a map when you travel to a new place.
letter_m/sounds/March01.mp3##三月二號是 Judy 的生日。##March 2nd is Judy's birthday.
letter_m/sounds/mark01.mp3##Lisa 在她讀不懂的段落前標上圈圈做為記號。##Lisa drew a circle to mark the paragraph that she couldn't understand.
letter_m/sounds/market01.mp3##中國是全世界最大的市場。##China is the biggest market in the world.
letter_m/sounds/married01.mp3##他們快樂地結婚了並且在婚禮後出發去蜜月旅行。##They were happily married and went on their honeymoon right after the wedding.
letter_m/sounds/marvelous01.mp3##莎士比亞是一個很了不起的人。##Shakespeare is a marvelous man.
letter_m/sounds/master01.mp3##大部分的狗怕他們的主人。##Most of the dogs fear their masters.
letter_m/sounds/match02.mp3##你的鞋子顏色和洋裝很搭配。##The color of your shoes matches your dress very well.
letter_m/sounds/math01.mp3##Helen 在高中教數學。##Helen teaches math in a senior high school.
letter_m/sounds/matter01.mp3##沒關係，如果你不想跟我們一起去。##It doesn't matter if you don't want to come with us.
letter_m/sounds/may(might)01.mp3##她在畢業後也許會出國唸書。##She might study abroad after graduation.
letter_m/sounds/May01.mp3##在五月氣候變暖。##The weather turns warmer in May.
letter_m/sounds/maybe01.mp3##她可能等一下就會回來了。##Maybe she will be back in a moment.
letter_m/sounds/meal01.mp3##爸爸在我昨天畢業時請我吃一頓大餐。##Father treated me to a big meal for my graduation yesterday.
letter_m/sounds/mean01.mp3##你這樣做是什麼意思？##What do you mean by doing this?
letter_m/sounds/meat01.mp3##這肉很新鮮。我們買一些。##The meat is fresh. Let's buy some.
letter_m/sounds/media01.mp3##Tom Hanks 是個我們可以經常在媒體上看到的明星。##Tom Hanks is the star we can ofen see in the media.
letter_m/sounds/medicine02.mp3##Jack 主修醫藥學。##Jack majors in medicine.
letter_m/sounds/medium01.mp3##請給我一杯中杯的可樂。##I want a medium Coke, please.
letter_m/sounds/meet01.mp3##很高興遇見你。##Nice to meet you.
letter_m/sounds/meeting01.mp3##今天早晨的會議我缺席了。##I was absent from the meeting this morning.
letter_m/sounds/menu01.mp3##我想看一下菜單。##I'd like to see the menu for a moment.
letter_m/sounds/mile01.mp3##離這最近的城市有七英哩遠。##The nearest town is seven miles away.
letter_m/sounds/milk01.mp3##Kim 在超市買了兩瓶牛奶。##Kim bought two bottles of milk at the supermarket.
letter_m/sounds/million01.mp3##我計劃在二十五歲以前賺第一個一百萬。##I plan to earn my first million dollars before age 25.
letter_m/sounds/mind02.mp3##如果我提早離開你會介意嗎？##Would you mind if I left earlier?
letter_m/sounds/minute01.mp3##當我在等廁所的時候是我人生中最長的一分鐘。##This minute, waiting for the toilet, is the longest in my life.
letter_m/sounds/Miss01.mp3##李小姐是一位非常年輕漂亮的淑女。##Miss Lee is a pretty young lady.
letter_m/sounds/miss_102.mp3##我親愛的好友們，我有多麼的想念你們。##How I miss you, my dear old friend!
letter_m/sounds/mistake01.mp3##在結婚典禮中我們不許有任何的錯誤發生。##We won't allow any mistake in the wedding ceremony.
letter_m/sounds/modern01.mp3##在現代化的城市中，生活較便利。##Life is more convenient in a modern city.
letter_m/sounds/moment01.mp3##等一下，我馬上來。##Wait a moment. I'm coming.
letter_m/sounds/Monday01.mp3##星期一是一個星期裏最忙碌的一天。##Monday is the busiest day of the week.
letter_m/sounds/money01.mp3##Sherry 花了太多錢在買新衣服上。##Sherry spent too much money buying new clothes.
letter_m/sounds/monkey01.mp3##在動物園的這些猴子好頑皮。##The monkeys in the zoo are naughty.
letter_m/sounds/month01.mp3##一年裏有十二個月。##There are twelve months in a year.
letter_m/sounds/moon01.mp3##月亮被一片雲遮住了。##The moon is covered by part of a cloud.
letter_m/sounds/more01.mp3##越來越多人喜歡在週末的時候到外面用餐。##More and more people enjoy dining out on weekends.
letter_m/sounds/morning01.mp3##今晨我忘了吃早餐。##I forgot to eat my breakfast this morning.
letter_m/sounds/most01.mp3##最近，大部份的學生相較之下有比較多的機會受到高等教育。##Most students today have better chances for higher education.
letter_m/sounds/mother01.mp3##Jim 的媽媽將要買一台新電腦給他。##Jim's mother is going to buy him a new computer.
letter_m/sounds/motorcycle01.mp3##當你騎摩托車時記得戴安全帽。##Remember to wear a helmet when riding a motorcycle.
letter_m/sounds/mountain01.mp3##這群山中的景色令人嘆為觀止！##The view in the mountains is amazing.
letter_m/sounds/mouse01.mp3##我看見一隻大老鼠跑進我們房子裡。##I saw a big mouse running into our house!
letter_m/sounds/mouth01.mp3##張開你的大嘴並說 ” 啊 ” ！##Open your big mouth and say “Ah~~”!
letter_m/sounds/move03.mp3##請幫我把這顆大石頭從路上搬開。##Please help me move this big stone away from the road.
letter_m/sounds/movie01.mp3##Miranda 不喜歡動作片。##Miranda doesn't like action movies.
letter_m/sounds/Mr.01.mp3##黃先生是一位藝術家。##Mr. Huang is an artist.
letter_m/sounds/Mrs.01.mp3##黃太太在高中教音樂。##Mrs. Huang teaches music in a high school.
letter_m/sounds/Ms.01.mp3##Jones 小姐今天覺得不舒服。##Ms. Jones doesn't feel very well today.
letter_m/sounds/much01.mp3##不要吃太多油炸食物，這對你的健康不好。##Don't eat too much fried food. It's not good for your health.
letter_m/sounds/museum01.mp3##在故宮博物院裏有許多珍貴的藝術品。##There are many precious works of art in the National Palace Museum.
letter_m/sounds/music01.mp3##這音樂很柔順溫和。##The music is soft and tender.
letter_m/sounds/must01.mp3##你必須告訴我昨晚發生什麼事情。##You must tell me what happened last night.
letter_n/sounds/name01.mp3##每個人有一個名字。##Everyone has a name.
letter_n/sounds/national01.mp3##國旗代表我們的國家。##The national flag represents our country.
letter_n/sounds/near01.mp3##我住在靠近這個大的購物中心。##I live near the big mall.
letter_n/sounds/neck01.mp3##我脖子覺得很冷。##My neck feels cold .
letter_n/sounds/need01.mp3##你還需要其它的嗎？##What else do you need?
letter_n/sounds/never01.mp3##Linda 從沒有和任何人談過戀愛。##Linda has never fallen in love with anyone else.
letter_n/sounds/new01.mp3##李家在台北買了一間新房子。##The Lees bought a new house in Taipei.
letter_n/sounds/news01.mp3##特報指出有一個颱風正在接近。##The typhoon's approach was breaking news .
letter_n/sounds/next01.mp3##誰將是下一個挑戰的人。##Who is the next one to take the challenge?
letter_n/sounds/nice01.mp3##你真的是一個很好的人。##You are a really nice guy.
letter_n/sounds/night01.mp3##晚上不要太晚睡。##Don't go to sleep too late at night.
letter_n/sounds/nine01.mp3##這瓶可樂10元，我只有9元。##TheCoke is ten dollars. I only have nine.
letter_n/sounds/nineteen01.mp3##19個老師參加爬山團隊。##Nineteenteachers joined in the climbing team.
letter_n/sounds/ninety01.mp3##請幫我把這頁複製90份。##Pleasemake ninety copies of this page.
letter_n/sounds/ninth01.mp3##在旅行的第9天，巴黎下起一場大雨。##Onthe ninth day of the trip, it rained heavily in Paris.
letter_n/sounds/no01.mp3##我不知道那件事。##Ihave no idea about that.
letter_n/sounds/nobody01.mp3##這間房間裏面沒有人。##Thereis nobody in this room.
letter_n/sounds/nod02.mp3##當John對Sally求婚時，她點頭了。##Sallygave a nod when John proposed to her.
letter_n/sounds/noise01.mp3##停止製造噪音，我無法專心。##Stopmaking noises. I can't concentrate.
letter_n/sounds/noodle01.mp3##吃一杯麵就飽了。##Eatinga cup noodles is enough.
letter_n/sounds/noon01.mp3##在中午的時候，太陽昇上了天空的中央。##Atnoon, the sun goes to the center of the sky.
letter_n/sounds/north01.mp3##往北方開，我們很快能到台北。##Driveto the north, and we'll get to Taipei soon.
letter_n/sounds/nose01.mp3##Jenny有一個很漂亮的鼻子。##Jennyhas a very pretty nose.
letter_n/sounds/not01.mp3##這隻筆不是你的，是我的。##It'snot your pen; it's mine.
letter_n/sounds/notebook02.mp3##筆記型電腦相當方便。##Notebookcomputers are convenient.
letter_n/sounds/nothing01.mp3##我們不知道有關於那個新來鄰居的事情。##Weknow nothing about the new neighbor.
letter_n/sounds/notice01.mp3##我沒注意她站在我後面。##Ididn't notice that she was standing behind me.
letter_n/sounds/novel01.mp3##這是我過去中學閱讀多次的小說。##Thisis the novel I used to read many times in junior high school.
letter_n/sounds/November01.mp3##這個首長將會在十一月十三日拜訪德國。##ThePremier will visit Germany on November 13th.
letter_n/sounds/now01.mp3##現在天氣漸漸變冷了。##It'sgetting cold now.
letter_n/sounds/number01.mp3##我不記得你的電話號碼。##Idon't remember your phone numbers.
letter_n/sounds/nurse01.mp3##我姐姐是一位護士，她在一間醫院工作。##Mysister is a nurse. She works in a hospital.
letter_o/sounds/oclock01.mp3##我最愛的電視節目每天在八點鐘開始。##My favorite TV show begins at eight o'clock every day.
letter_o/sounds/October01.mp3##十月十日也叫做雙十節。##October 10 th is also called Double Ten Day.
letter_o/sounds/of01.mp3##這是一個愛的故事。##It is a story of love.
letter_o/sounds/off02.mp3##我的兄弟昨天從腳踏車跌落。##My brother fell off the bicycle yesterday.
letter_o/sounds/office01.mp3##Kelly 把她的皮包留在辦公室裏。##Kelly left her purse in the office.
letter_o/sounds/officer01.mp3##警官，請問你能否告訴我到台北火車站的路？##Officer, would you please show me how to reach Taipei Train Station?
letter_o/sounds/often01.mp3##Marisa 經常和 Lisa 練習英文會話。##Marisa often practices English conversation with Lisa.
letter_o/sounds/oil01.mp3##油炸食物裡有太多油了。##There is too much oil in fried food.
letter_o/sounds/OK01.mp3##你準備好要去了嗎？沒問題##A: Are you ready to go now? B: OK. Let's go.
letter_o/sounds/old01.mp3##我看見一個老人走在街道徘徊。##I saw an old man walking to and fro in this street.
letter_o/sounds/on01.mp3##茶几上有一個杯子。## There is a cup on the table.
letter_o/sounds/once01.mp3##Helen 一星期到醫院一次。##Helen goes to the hospital once a week.
letter_o/sounds/one01.mp3##我需要一磅的牛肉。##I need one pound of beef, please.
letter_o/sounds/oneself01.mp3##每個人必須小心不要傷到自己。##One should be careful not to harm onself.
letter_o/sounds/only01.mp3##你是我在這裏唯一的朋友。##You are the only friend I have here.
letter_o/sounds/open01.mp3##打開你的嘴吃漢堡。##Open your mouth and eat your hamburger!
letter_o/sounds/or01.mp3##你喜歡玫瑰花還是向日葵？##Do you like roses or sunflowers?
letter_o/sounds/orange01.mp3##他正在尋找一位身穿橘色夾克的罪犯。##He is looking for a criminal in an orange jacket.
letter_o/sounds/order03.mp3##我點了一個三明治和一杯可樂。##I ordered a sandwich and a cup of Coke.
letter_o/sounds/other01.mp3##兩個男人中一個是高的，一個是矮的。##One of the two boys is tall, and the other is short.
letter_o/sounds/out02.mp3##我們今晚出去吃飯吧！##Let's eat out this evening.
letter_o/sounds/outside01.mp3##你看，外面在下雪咧！##Look! It's snowing outside.
letter_o/sounds/over01.mp3##海鳥飛翔在海的上方。##Seagulls are flying over the sea.
letter_o/sounds/own01.mp3##Brown 先生有一間小咖啡廳。##Mr. Brown owns a small coffee shop.
letter_p/sounds/p.m.01.mp3##Louis 叔叔將會在下午 3:00 到達。##Uncle Louis will arrive here at 3:00 p.m.
letter_p/sounds/pack01.mp3##他放太多的東西在他的背包裏。##He put too many things into his pack.
letter_p/sounds/package01.mp3##有人在我桌上看到任何包裹嗎？##Did anyone see the package on my desk?
letter_p/sounds/page01.mp3##學生們，請翻開第 23 頁。##Students, please open to Page 23.
letter_p/sounds/paint01.mp3##工人將牆壁漆成深藍色。##The workers painted the walls with dark blue paint.
letter_p/sounds/pair01.mp3##Frank 昨天買一雙新鞋。##Frank bought a new pair of shoes yesterday.
letter_p/sounds/pants01.mp3##你的褲子有一個大洞。##There is a big hole in your pants.
letter_p/sounds/paper01.mp3##根據紙上的指示，你將會找到真正的答案。##Follow the instructions on this paper, and you'll find out the real answer.
letter_p/sounds/parent01.mp3##父母親總是關心他們小孩的每一件事情。##Parents always care about everything having to do with their children.
letter_p/sounds/park02.mp3##你的車不被允許停在這。##You are not allowed to park your car here.
letter_p/sounds/part01.mp3##這只是計劃中的一小部份。##This is just a small part of the plan.
letter_p/sounds/party01.mp3##你今晚會和我一起參加這個宴會嗎？##Will you go to the party with me tonight?
letter_p/sounds/pass01.mp3##除了 John 每個人都通過這個考試。##Everyone except John passed the exam.
letter_p/sounds/past01.mp3##過去發生的事情無法改變。##Things that occurred in the past cannot be changed.
letter_p/sounds/pay01.mp3##如果你想買東西就必須付錢。##You have to pay if you want to buy something.
letter_p/sounds/PE01.mp3##我在下午二點有一堂體育課。##I have a PE class at 2:00 p.m.
letter_p/sounds/pen01.mp3##這隻筆真的很貴。##This pen is really expensive.
letter_p/sounds/pencil01.mp3##今天我把鉛筆搞丟了。##I lost my pencils today.
letter_p/sounds/people01.mp3##許多人在展覽館裏凝視著同一張照片。##Many people stared at the same picture in thegallery.
letter_p/sounds/perhaps01.mp3##也許你是下一個贏得彩券的人。##Perhaps you will be the next one to win the lottery.
letter_p/sounds/person01.mp3##Anderson 先生是一個很仁慈的人，他喜歡幫助別人。##Mr. Anderson is a very kind person. He likes to help others.
letter_p/sounds/pet01.mp3##Laurie嬸嬸討厭寵物。##Auntie Laurie hates pets.
letter_p/sounds/photo01.mp3##田野之旅我們照了很多照片。##We took a lot of photos during field trip.
letter_p/sounds/physics01.mp3##物理在本世紀有很大的進步。##Physics has made a lot of progress in this century.
letter_p/sounds/piano01.mp3##Linda 每星期日必須練習彈鋼琴。##Linda has to practice playing piano every Sunday.
letter_p/sounds/pick01.mp3##今天傍晚六點來接我。##Come and pick me up at 6:00 p.m. this evening.
letter_p/sounds/picnic01.mp3##你這個星期六想去野餐嗎？##Do you want to go on a picnic this Saturday?
letter_p/sounds/picture01.mp3##你可以在這張照片裏看到我的男朋友。##You can see my boyfriend in this picture.
letter_p/sounds/pie01.mp3##媽媽今天早上做了一個很大的蘋果派。##Mother made a big apple pie this morning.
letter_p/sounds/piece01.mp3##這張紙被撕成碎片。##The paper was torn into pieces.
letter_p/sounds/pig01.mp3##在過去許多的農夫也養豬。##Many farmers also raised pigs in the past.
letter_p/sounds/pink01.mp3##Debby 今天穿粉紅色的洋裝。##Debby wears a pink dress today.
letter_p/sounds/pizza01.mp3##我們今晚將吃一個大披薩當晚餐。##We will have a big pizza for dinner this evening.
letter_p/sounds/place01.mp3##這地方太冷了。##This place is so cold.
letter_p/sounds/plan01.mp3##Nancy 上週計畫去爬山。##Nancy planned to go climbing last week.
letter_p/sounds/planet01.mp3##地球是太陽系的星球之一。##The Earth is one of the planet of our solar system.
letter_p/sounds/play01.mp3##這個男孩和其它的小朋友在游泳池裏玩。##The boy is playing with other children in the pool.
letter_p/sounds/player01.mp3##對球迷而言，在這場遊戲中的所有球員都是超級巨星。##All the players in this game are super stars to the fans.
letter_p/sounds/playground01.mp3##Danny 在運動場裏哭。##Danny is crying on the playground.
letter_p/sounds/please01.mp3##請你下一次來拜訪我。##Please come and visit me next time.
letter_p/sounds/pocket01.mp3##他把手放在口袋保暖。##He put his hands in the pockets to keep them warm.
letter_p/sounds/point01.mp3##我們不能瞭解你的觀點，但能否解釋一下？##We can't understand your point. Could you explain?
letter_p/sounds/police01.mp3##這個警察在我們這鄰近地區抓到一個罪犯。##The police caught a criminal in our neighborhood.
letter_p/sounds/polite01.mp3##請禮貌的對待在這裡遇到的每一個人。##Be polite to everyone you meet here.
letter_p/sounds/poor01.mp3##在 我們家前面有一隻可憐的小狗被發現。##A poor little dog was found in front of my house.
letter_p/sounds/popcorn01.mp3##你想要一點爆米花嗎？##Do you want some popcorn?
letter_p/sounds/popular01.mp3##Jerry 是一位受人歡迎的人，每個人都喜歡他。##Jerry is a popular person. Everyone likes him.
letter_p/sounds/pork01.mp3##這豬肉一點都不新鮮。##The pork is not fresh at all.
letter_p/sounds/possible01.mp3##任何事都是有可能的。##Anything is possible.
letter_p/sounds/post office01.mp3##郵局在週末不開門。##The post office is not open on weekends.
letter_p/sounds/postcard01.mp3##當你到巴黎旅行時，記得寄一張明信片給我。##Remember to send me a postcard when you travel to Paris.
letter_p/sounds/pound01.mp3##我想買一磅咖啡豆。##I'd like to buy a pound of coffee beans.
letter_p/sounds/powder01.mp3##雪和粉一樣乾燥。##The snow was as dry as powder.
letter_p/sounds/practice01.mp3##練習會成就完美。 ( 熟能生巧 )##Practice makes perfect.
letter_p/sounds/prepare01.mp3##為你自己即將到來的演講比賽做準備。##Prepare yourself for the coming speech contest.
letter_p/sounds/present03.mp3##今天早上的會議我沒有出席，因為我遲到了。##I wasn't present at the meeting this morning. I was late.
letter_p/sounds/pretty01.mp3##你穿這件裙子看起來好漂亮。##You look so pretty in this skirt!
letter_p/sounds/price01.mp3##這件裙子多少錢？##What's the price of the skirt?
letter_p/sounds/problem01.mp3##我們在溝通上有一個問題。##We have a problem with communication.
letter_p/sounds/professor01.mp3##他很年輕就成為教授。##He became a professor at a very young age.
letter_p/sounds/program02.mp3##Tina 負責這個計畫。##Tina is responsible for this program.
letter_p/sounds/proud01.mp3##我以你為榮。##I am proud of you.
letter_p/sounds/public01.mp3##他在公共場合說了一個可怕的謊言。##He told a terrible lie in public.
letter_p/sounds/pull01.mp3##把門拉開，不是推開。##Pull the door open; don't push!
letter_p/sounds/purple01.mp3##在一些國家，紫色被視為高貴的顏色。##In some countries, purple is considered a noble color.
letter_p/sounds/push01.mp3##按這按鈕，這導彈就會發射。##Push the button and the missiles will be launched.
letter_p/sounds/put01.mp3##你把我的 CD 放在哪裡？##Where did you put my new CD?
letter_q/sounds/queen01.mp3##伊莉莎白女王今天仍然活著。##Queen Elizabeth is still alive today.
letter_q/sounds/question01.mp3##你能回 答我的問題嗎？##Can you answer my question?
letter_q/sounds/quick01.mp3##快！我們已經趕不及這場電影。##Quick! We're already late for the movie.
letter_q/sounds/quiet01.mp3##這房間裡很安靜。##It's quiet in this room.
letter_q/sounds/quite01.mp3##他今天非常忙碌。##He's quite busy today.
letter_r/sounds/rabbit01.mp3##驕傲的兔子在賽跑中輸了。##The proud rabbit lost the race.
letter_r/sounds/race01.mp3##運動會最重要的競賽是合作競賽。##The most important race on the field day is rely race.
letter_r/sounds/radio01.mp3##打開收音機。我最喜歡的廣播員在廣播。##Turn on the radio. My favorite DJ is on the air.
letter_r/sounds/railway01.mp3##在鐵路上走是危險的。##It's dangerous to walk on a railway.
letter_r/sounds/rain01.mp3##我們需要更多的雨水去度過夏天。##We need more rain to get through the summer.
letter_r/sounds/rainbow01.mp3##雷陣雨過後，我們在天空中看到彩虹。##After the thundershower, we saw a rainbow in the sky.
letter_r/sounds/rainy01.mp3##未來的禮拜將會是下雨天。##The coming week will be rainy .
letter_r/sounds/reach01.mp3##我們希望在天黑前到家。##We hope to reach home before dark.
letter_r/sounds/read01.mp3##傑西喜愛閱讀神話。##Jessie loves to read fables.
letter_r/sounds/ready01.mp3##你為驚喜做好準備了嗎 ?##Are you ready for the surprise?
letter_r/sounds/real01.mp3##丹尼不是我真實的父親。他是我的繼父。##Danny is not my real father. He is my stepfather.
letter_r/sounds/really01.mp3##真的？我不能相信！##Really? I can't believe this!
letter_r/sounds/recorder01.mp3##Mike 用錄音機錄下這令人印象深刻的演講。##Mike uses tape recorder to record this impressing speech.
letter_r/sounds/recycle01.mp3##我們應該回收我們使用過的紙類。##We should recycle the paper we had used.
letter_r/sounds/red01.mp3##他的臉頰變紅了。##Her cheeks are turning red now.
letter_r/sounds/refrigerator01.mp3##不要把所有的東西放在冰箱裡。##Don't put everything into the refrigerator.
letter_r/sounds/regular01.mp3##我們將每個月有個例行會議。##We will have a regular meeting every month.
letter_r/sounds/remember01.mp3##你記得溫蒂的電話號碼嗎？##Can you remember Wendy's phone numbers?
letter_r/sounds/repeat01.mp3##永不重複相同的錯誤。##Never repeat a mistake.
letter_r/sounds/report01.mp3##老師要求我們下星期五前繳交社會研究報告。##The teacher asked us to hand in the social studies report next Friday.
letter_r/sounds/reporter01.mp3##Henry 的媽媽是記者。##Henry's mother is a reporter.
letter_r/sounds/rest02.mp3##大部分學生在玩，其他的在睡覺。##Most of the students are playing, and the rest are sleeping.
letter_r/sounds/restaurant01.mp3##在一個好餐廳用餐是奢華的。##Dining in a good restaurant is luxurious.
letter_r/sounds/restroom01.mp3##不好意思，我現在想要去洗手間。##Excuse me. I'd like to go to the restroom for a moment.
letter_r/sounds/result01.mp3##土石流是颱風的結果。##Mudflows are the results of typhoons.
letter_r/sounds/return01.mp3##有一天， Irene 走出去並從此沒回來。##One day, Irene just walked out and never returned.
letter_r/sounds/rice01.mp3##我們快把米吃完了。##We are running out of rice.
letter_r/sounds/rich01.mp3##羅柏是一個富有的年輕人。##Robert is a rich young man.
letter_r/sounds/ride01.mp3##沒有人相信他會騎馬。##No one believes that he can ride a horse.
letter_r/sounds/right03.mp3##一切還好吧！##Is everything all right?
letter_r/sounds/ring01.mp3##魔戒系列電影很刺激。##The Lord of the Rings series is exciting.
letter_r/sounds/river01.mp3##不要在那條河游泳，這很危險。##Don't swim in that river. It's dangerous.
letter_r/sounds/road01.mp3##「不走的路」是羅伯佛羅斯特所寫的名詩。##The Road Not Taken is a famous poem by Robert Frost.
letter_r/sounds/ROC01.mp3##ROC 指中華民國。##ROC means the Republic of China.
letter_r/sounds/rock01.mp3##在颱風侵襲台灣後，人們必須注意山區落石。##After a typhoon hit Taiwan, people should be careful of the falling rocks in the mountain area.
letter_r/sounds/role01.mp3##大哥大在現代世界扮演一個重要角色。##Cell phones play an important role in our modern world.
letter_r/sounds/Roller-blade01.mp3##我不知道如何溜直排輪。##I don't know how to roller-blade.
letter_r/sounds/room01.mp3##John 在房間讀書。##John is studying in the room.
letter_r/sounds/root01.mp3##橄欖樹有很深的根。##Oliver trees have deep roots.
letter_r/sounds/rose01.mp3##花園裡的玫瑰正盛開。##The roses in the garden are blooming.
letter_r/sounds/round01.mp3##地球是圓的。##The earth is round.
letter_r/sounds/row01.mp3##新來的英文老師只和前排的學生說話。##The new English teacher only speaks to the students at the front row.
letter_r/sounds/rule01.mp3##「嚴禁抽菸」是校規。##No smoking is the school rule.
letter_r/sounds/ruler01.mp3##你能借我尺嗎？##Could you lend me the ruler?
letter_r/sounds/run01.mp3##印度豹跑得非常快。##The cheetah runs very fast.
letter_s/sounds/sad01.mp3##我對於失去了狗覺得很傷心。##I am sad for losing the dog.
letter_s/sounds/safe01.mp3##把錢放在安全的地方。##Keep the money in a safe place.
letter_s/sounds/salad01.mp3##我要一份沙拉，一份無骨牛排，和一杯柳橙汁。##I want a salad, a fillet steak, and a cup of orange juice, please.
letter_s/sounds/sale01.mp3##這房子要出售。##This house is for sale.
letter_s/sounds/salt01.mp3##請傳鹽巴給我。##Please pass me the salt .
letter_s/sounds/same01.mp3##我們正在談的是相同的事情。##We are talking about the same thing.
letter_s/sounds/sand01.mp3##颱風來臨時，多準備一些沙袋較安全。##It's safe to prepare more sand bags when a typhoon comes.
letter_s/sounds/sandwich01.mp3##這個三明治太大。##This sandwich is too big.
letter_s/sounds/Saturday01.mp3##星期六，我們將會有個大派對。##We will have a party on Saturday.
letter_s/sounds/save01.mp3##他為了孩子存了一筆遺產。##He has saved a fortune for his children.
letter_s/sounds/say01.mp3##若你已拿定主意，我還能說些什麼呢？##What else can I say if you have already made up your mind?
letter_s/sounds/scene01.mp3##這齣戲的首映令人難忘。##The opening scene of this drama is unforgettable.
letter_s/sounds/scenery01.mp3##陽明山國家公園有很棒的景色。##Yangmingshan National Park has some wonderful scenery.
letter_s/sounds/school01.mp3##週末我們不用去上學。##We don't have to go to school on weekends.
letter_s/sounds/scooter01.mp3##青少年總是想要騎滑板車。##Teenagers always want a scooter to ride.
letter_s/sounds/sea01.mp3##船在海上航行。##There are boats sailing on the sea.
letter_s/sounds/season01.mp3##一年裡有四個季節－春天、夏天、秋天和冬天。##There are four seasons in the year—spring, summer, autumn, and winter.
letter_s/sounds/seat01.mp3##請座。##Have a seat, please.
letter_s/sounds/second02.mp3##等一下！我立刻回來。##Wait a second! I'll be right back.
letter_s/sounds/see01.mp3##你看到我的皮夾嗎？它是藍色的。##Did you see my wallet? It's a blue one.
letter_s/sounds/seed01.mp3##到市場的途中，他遺失了一袋種子。##He lost a bag of seed on his way to market.
letter_s/sounds/seek01.mp3##我們一生都在追尋幸福。##We seek happiness all our lives.
letter_s/sounds/seldom01.mp3##彼得很少與我們閒蕩。##Peter seldom hangs out with us.
letter_s/sounds/sell01.mp3##我明天將賣這台舊汽車。##I'm going to sell this old car tomorrow.
letter_s/sounds/send01.mp3##我的姊姊從日本寄了一張明信片給我。##My sister sent me a postcard from Japan.
letter_s/sounds/senior_high_school01.mp3##肯恩是個高中生。##Ken is a senior high school student.
letter_s/sounds/sense01.mp3##Pete 缺乏幽默感。##Pete has no sense of humor.
letter_s/sounds/sentence01.mp3##李老師，我不明白這句子。##Miss Lee, I don't understand this sentence.
letter_s/sounds/September01.mp3##9 月 28 日是教師節。##September 28 th is Teacher's Day.
letter_s/sounds/serious02.mp3##你當真嗎？##Are you serious?
letter_s/sounds/set01.mp3##台灣有五百多萬台電視。##There are over 5 million TV sets in Taiwan.
letter_s/sounds/seven01.mp3##你是 7 號。請等待。##You are number seven. Please wait.
letter_s/sounds/seventeen01.mp3##黛碧只有 17 歲，她不算是個成人。##Debby is only seventeen years old. She is not an adult yet.
letter_s/sounds/seventh01.mp3##一個星期的第七天是星期幾？##What day is the seventh day of the week?
letter_s/sounds/seventy01.mp3##一個古老的諺語說：「人生七十才開始」。##An old saying goes, “Life just begins when you reach the age of seventy.”
letter_s/sounds/several01.mp3##數分鐘前好幾個陌生人到這裡。##Several strangers came here a few minutes ago.
letter_s/sounds/shall01.mp3##A: 我們跳舞嗎？ B: 這是我的榮幸。##A: Shall we dance? B: It's my honor.
letter_s/sounds/shape01.mp3##那雲的形狀像一根香蕉。##The shape of the cloud is like a banana.
letter_s/sounds/share01.mp3##沒人與我分享快樂。##No one shares the joy with me.
letter_s/sounds/sharp01.mp3##他用銳利的刀子切西瓜。##He cut the melon with a sharp knife.
letter_s/sounds/she(her,hers,herself)03.mp3##她昨夜 獨自工作。##She worked all by herself last night.
letter_s/sounds/sheep01.mp3##綿羊與山羊是不同的。##Sheep are different from goats.
letter_s/sounds/ship01.mp3##今晨我看見向東行駛的大船 。##I saw a huge ship sailing east this morning.
letter_s/sounds/shirt01.mp3##現在脫下骯髒的襯衫。##Take off the dirty shirt now.
letter_s/sounds/shoe(s)01.mp3##穿著一雙滿是泥的鞋子進別人的房子是不禮貌的。##It's impolite to wear a pair of muddy shoes into someone's house.
letter_s/sounds/shoot01.mp3##他們正射擊樹上的小鳥。##They were shooting the birds on the tree.
letter_s/sounds/shop01.mp3##我在鞋店工作。##That shop was robbed ten minutes ago.
letter_s/sounds/shopkeeper01.mp3##店主被擊中了一隻腿。##The shopkeeper was shot in one leg.
letter_s/sounds/short01.mp3##這盜賊是個矮傢伙。##The robber was a short guy.
letter_s/sounds/should01.mp3##我們應該幫助警察尋找這個盜賊。##We should help the police find this robber.
letter_s/sounds/shoulder01.mp3##他們在廣場裡並肩地站著。##They stand shoulder to shoulder in the square.
letter_s/sounds/show02.mp3##魔術秀總是充滿著驚喜。##A magic show is always surprising.
letter_s/sounds/shy01.mp3##這女孩太害羞了，不敢直接看我。##The girl was too shy to look at me directly.
letter_s/sounds/sick02.mp3##我對你感到感冒。##I feel sick at you.
letter_s/sounds/side02.mp3##我永遠站在你這邊##I'll always be by your side.
letter_s/sounds/sidewalk01.mp3##這年輕的情侶在人行道慢慢地走。##The young lovers walk slowly on the sidewalk.
letter_s/sounds/sight01.mp3##他們一見鍾情並在三天後結婚。##It was love at first sight, and they got married 3 days later.
letter_s/sounds/simple01.mp3##這個遊戲太簡單。##This game is too simple.
letter_s/sounds/since01.mp3##自從 1955 年，我就沒有看見到她。##I haven't seen her since 1995.
letter_s/sounds/sing01.mp3##珊迪喜歡唱歌。##Sandy just loves to sing.
letter_s/sounds/singer01.mp3##她常常想有朝一日成為一位歌手。##She has always wanted to become a singer someday.
letter_s/sounds/sir01.mp3##早安，先生。 我能為你做什麼嗎？##Good day, sir. What can I do for you?
letter_s/sounds/sister01.mp3##琳達是我最小的妹妹。##Linda is my youngest sister.
letter_s/sounds/sit01.mp3##請坐稍作休息好嗎？##Would you please sit down and take a little break?
letter_s/sounds/six01.mp3##在中國，六被視為是一個幸運號碼。##Six is considered a lucky number in China.
letter_s/sounds/sixteen01.mp3##在這個房間裡有 16 張椅子。##There are sixteen chairs in this room.
letter_s/sounds/sixth01.mp3##貝蒂是第六個發表演說的參賽者。##Betty is the sixth contestant to deliver the speech.
letter_s/sounds/sixty01.mp3##在我的數學考試中，我只得 60 分。##I only got sixty on my math exam.
letter_s/sounds/size01.mp3##我想買一件特大尺寸的 T 恤。##I want to get an Extra Large size T-shirt.
letter_s/sounds/skate01.mp3##我們去年在法國冰上溜冰。##We went ice skating in France last year.
letter_s/sounds/ski01.mp3##我以前從未滑草。##I have never grass skiing before.
letter_s/sounds/skillful01.mp3##Smith 先生是一個一流的裁縫。##Mr. Smith is a skillful tailor.
letter_s/sounds/skirt01.mp3##穿著裙子的年輕女孩看起來非常可愛。##Young girls look very cute in skirts.
letter_s/sounds/sky01.mp3##看天空！ 它不是飛碟嗎？##Look at the sky! Isn't it a UFO?
letter_s/sounds/sleep01.mp3##我從未看過他睡覺。 他是人類嗎？##I've never seen him sleep. Is he a human?
letter_s/sounds/sleepy01.mp3##午餐後，我很想睡。##I felt very sleepy after lunch.
letter_s/sounds/slow01.mp3##公車司機慢下來並且讓乘客下車。##The bus driver slowed down and let the passengers off.
letter_s/sounds/small01.mp3##這真是個小的世界！##What a small world!
letter_s/sounds/smart01.mp3##約翰是如此聰明，他能輕鬆地解答最困難的數學問題。##John is so smart that he can solve the most difficult math questions with ease.
letter_s/sounds/smell02.mp3##什麼味道？ 好噁心喔！##What's that smell? It's disgusting!
letter_s/sounds/smile01.mp3##保持微笑，你看起來更有吸引力。##Keep smiling and you'll look more attractive.
letter_s/sounds/smoke01.mp3##你抽煙嗎？##Do you smoke?
letter_s/sounds/snack01.mp3##.  便利商店裡有所有種類的點心。##There are all kinds of snacks in the convenience store
letter_s/sounds/snake01.mp3##「 Snake Alley 」在華西街夜市頗著名。##The Snake Alley is quite famous in Hua-Shi Street Night Market.
letter_s/sounds/snow01.mp3##在台灣甚少下雪。##It seldom snows in Taiwan .
letter_s/sounds/so02.mp3##小男孩向母親要 10 元付糖果##The little boy asked his mother for 10 dollars so that he could pay for the candy.
letter_s/sounds/soap01.mp3##浴室沒肥皂了。##There's no soap in the bathroom.
letter_s/sounds/socks01.mp3##在以前的時代，大部分人在工作時不穿襪子。##Olden times, most people did not wear socks while at work.
letter_s/sounds/sofa01.mp3##坐在舒服的沙發上讓我想睡。##Sitting on the comfortable sofa makes me sleepy.
letter_s/sounds/some01.mp3##我有一些 10 元硬幣。##I have some ten-dollar coins.
letter_s/sounds/someone(somebody)01.mp3##有人告訴我你在找我。##Someone told me that you were looking for me.
letter_s/sounds/something01.mp3##我聽聞一些關於你的有趣的事情。##I heard something interesting about you.
letter_s/sounds/sometimes01.mp3##有時候我的心臟會無原因地痛。##Sometimes my heart aches for no reason.
letter_s/sounds/somewhere01.mp3##這罪犯一定藏在附近某處。##The criminal must be hiding somewhere in this neighborhood.
letter_s/sounds/son01.mp3##諷刺地是，他是一個警察的兒子。##Ironically, he is the son of a policeman.
letter_s/sounds/song01.mp3##我不懂如何唱這些新歌曲。##I don't know how to sing these new songs.
letter_s/sounds/soon01.mp3##這刺激的動作片不久就上映。##The exciting action movie is coming soon.
letter_s/sounds/sorry02.mp3##聽到這悲傷的消息，我感到遺憾。##I'm sorry to hear the sad news.
letter_s/sounds/soul01.mp3##誰是你的靈魂伴侶。##Who is your soul mate?
letter_s/sounds/sound02.mp3##這主意聽起來很瘋狂。##This idea sounds crazy.
letter_s/sounds/soup01.mp3##母親正在煮我最喜歡的雞肉湯。##Mother is now cooking my favorite chicken soup.
letter_s/sounds/south01.mp3##開往南方，你會發現好天氣。##Drive south and you'll find good weather.
letter_s/sounds/space02.mp3##科學家現在往外太空探索。##Scientists are now exploring outer space.
letter_s/sounds/speak01.mp3##A: 你說英文嗎？ B: 是，我會。##A: Do you speak English? B: Yes, I do.
letter_s/sounds/special01.mp3##麗莎收到一份由父母送的特別禮物。##Lisa received a special present from her parents.
letter_s/sounds/speed01.mp3##爸爸因為這部腳踏車速度很快而購買它。##Dad bought this bike because of its high speed.
letter_s/sounds/spell01.mp3##請拼出單字「 fight 」 F-I-G-H-T 。##Please spell the word “FIGHT”. F-I-G-H-T.
letter_s/sounds/spend01.mp3##路易士花了他大部分儲蓄去買一個新房子。##Louis spent most of his savings buying a new house.
letter_s/sounds/spoon01.mp3##這個湯匙太油膩，拿一個清潔的。##This spoon is too oily. Get a clean one.
letter_s/sounds/sports01.mp3##丹尼做所有種類的運動。##Danny plays all kinds of sports.
letter_s/sounds/spring01.mp3##在四月我們將會有春假。##We'll have spring break in April.
letter_s/sounds/square02.mp3##房間是 40 坪大。##This room measures 40 square meters.
letter_s/sounds/stand01.mp3##不要只站在那裡，幫我一下。##Don't just stand there. Give me a hand!
letter_s/sounds/star01.mp3##宇宙中有無數的星星。##There are countless stars in the universe.
letter_s/sounds/start01.mp3##表演將會在 8 點開始。##The show will start at eight o'clock .
letter_s/sounds/state01.mp3##五月即將舉行五個州的選舉。##Five state elections will be held in May.
letter_s/sounds/station01.mp3##請帶我去台北火車站。謝謝！##Please take me to Taipei Train Station. Thanks!
letter_s/sounds/stationery01.mp3##有任何商店可讓我們購買文具嗎？##Is there any shop for us to buy stationery?
letter_s/sounds/stay01.mp3##這男孩昨晚獨自留在家裡。##The boy stayed at home alone last night.
letter_s/sounds/steak01.mp3##我喜歡吃牛排，尤其是肋排。##I love eating steak, especially the rib eyes.
letter_s/sounds/step01.mp3##他往前一步。##He took a step forward.
letter_s/sounds/still01.mp3##雖然正下著大雨，這男人沒有雨傘仍然在街上走。##Though it's raining heavily, the man still walks on the street without an umbrella.
letter_s/sounds/stomach01.mp3##我覺得我的胃不舒服##My stomach doesn't feel well .
letter_s/sounds/stone01.mp3##這是那一型的石頭？##What type of stone is this?
letter_s/sounds/stop02.mp3##別為自己找藉口。##Stop making excuses for yourself.
letter_s/sounds/store01.mp3##請在角落附近的便利商店接我。##Please pick me up at the convenience store around the corner.
letter_s/sounds/story01.mp3##我只是虛構故事，不要太認真。##I just made up the story. Don't take it too seriously.
letter_s/sounds/strange01.mp3##這裏的氣氛很奇怪。##The atmosphere here is strange.
letter_s/sounds/stranger01.mp3##不要跟陌生人說太多話。##Don't talk too much to a stranger.
letter_s/sounds/street01.mp3##在尖峰時間街道很熱鬧。##The streets are busy during rush hour.
letter_s/sounds/strong02.mp3##我喜歡重口味的食物。##I like food with very strong flavor.
letter_s/sounds/student01.mp3##學生被認為每星期一至星期五都要去上學。##Students are supposed to go to school every Monday through Friday.
letter_s/sounds/study01.mp3##讀書多用功點，你將會通過期末考試。##Study harder and you'll pass the final exam.
letter_s/sounds/stupid01.mp3##與一頭獅子打架是一個愚蠢的想法。##What a stupid idea to fight with a lion!
letter_s/sounds/subject01.mp3##我們不該因英文是學科而研讀它，而因應它有趣且有用而學習。##We should not study English because it is a school subject. We should learn it because it's interesting and useful.
letter_s/sounds/successful01.mp3##成為一位成功的領袖並不簡單。##Being a successful leader is not easy.
letter_s/sounds/sugar01.mp3##他過去常常在茶裡加糖。##He used to add sugar to the tea.
letter_s/sounds/suggest01.mp3##Danny 建議我們應該先吃晚餐然後去看電影。##Danny suggests that we should have dinner first and then watch the movie.
letter_s/sounds/summer01.mp3##去年夏天，丹尼遇見一位可愛的女孩，珊迪。##Last summer, Danny met a lovely girl, Sandy.
letter_s/sounds/sun01.mp3##太陽幾乎把我燒起來，這是那麼熱。##The sun almost burns me up! It's so hot.
letter_s/sounds/Sunday01.mp3##我們不知道這個星期天要去哪裡。##We don't know where to go this Sunday.
letter_s/sounds/sunny01.mp3##在晴天時照相通常很棒。##It's always wonderful to take pictures in sunny days.
letter_s/sounds/super01.mp3##父親是孩子心中永遠的超級英雄。##Daddy is always the super hero in children's minds.
letter_s/sounds/supermarket01.mp3##母親和我去超市，但我們沒有買東西。##Mom and I went to the supermarket, but we bought nothing.
letter_s/sounds/sure01.mp3##我不肯定我是否記得你。##I'm not sure if I remember you.
letter_s/sounds/surf01.mp3##你多久上網一次 ?##How often do you surf the Internet?
letter_s/sounds/surprise01.mp3##你真是給我一個驚喜。##What a surprise you gave me!
letter_s/sounds/surprised01.mp3##曼蒂對於他祖母突然拜訪感到驚訝。##Mandy is surprised at her grandmother's sudden visit.
letter_s/sounds/sweater01.mp3##你為何在炎熱的夏天穿毛線衣？##Why are you wearing a sweater on a hot summer day?
letter_s/sounds/sweet02.mp3##你很貼心為我送午餐。##It's so sweet of you to bring me the lunch.
letter_s/sounds/swim01.mp3##救命！我不會游泳！##Help! I can't swim!
letter_s/sounds/system01.mp3##捷運是建來解決交通問題。##MRT systems are built to solve traffic problems.
letter_t/sounds/table01.mp3##你的早餐在桌上。##Yourbreakfast is on the table.
letter_t/sounds/Taiwan01.mp3##台灣有另一個漂亮的名字，「福爾摩沙」。##Taiwan has another beautiful name, Formosa.
letter_t/sounds/take02.mp3##昨天路意絲帶她的小孩到迪士耐樂園 。##Louisa took her children to Disney Land yesterday.
letter_t/sounds/talent01.mp3##你的理想伴侶必須具備什麼特殊天分？##What special talents should your ideal mate have?
letter_t/sounds/talk01.mp3##我們有非常長的時間沒有與對方說話。##We didn't talk to each other for a very long time.
letter_t/sounds/tall01.mp3##這棟建築物非常高，它有 101 層。##This building is very tall. It has 101 floors.
letter_t/sounds/tape02.mp3##我們需要膠帶封這個盒子。##We need the tape to seal this box.
letter_t/sounds/taste02.mp3##他對音樂有獨特的品味。##He has a special taste for music.
letter_t/sounds/taxi01.mp3##讓我為你找一計程車。##Let me get a taxi for you.
letter_t/sounds/tea01.mp3##你較喜歡哪一個，茶或咖啡？##Which do you prefer, tea or coffee?
letter_t/sounds/teach01.mp3##王老師教我們英國文學。##Mr. Wang teaches us English Literature.
letter_t/sounds/teacher01.mp3##他是一個有趣的老師。##He is a funny teacher.
letter_t/sounds/team01.mp3##這個棒球隊贏得奧林匹克運動會的冠軍。##This baseball team won the Olympic Games championship.
letter_t/sounds/teenager01.mp3##很多青少年喜歡嘻哈音樂。##Many teenagers like hip-hop music.
letter_t/sounds/telephone01.mp3##我有榮幸得到你的電話號碼嗎？##May I have the honor at getting your phone number?
letter_t/sounds/television01.mp3##我們的電視故障，我們看不到任何節目。##Our television is out of order. We can't see any shows on it.
letter_t/sounds/tell01.mp3##你能告訴我發生了什麼事嗎？##Can you tell me what happened?
letter_t/sounds/ten01.mp3##給我十分鐘，我就會給你答案。##Give me ten minutes, and I'll give you the answer.
letter_t/sounds/tennis01.mp3##彼得山普拉斯是位著名的專業網球選手。現在他退休了 。##Pete Sampras was a famous professional tennis player. Now he is retired.
letter_t/sounds/tenth01.mp3##從明天開始第 10 天是我們的結婚紀念日。##The tenth day from tomorrow is our wedding anniversary.
letter_t/sounds/terrific01.mp3##我今天覺得好極了。##I feel terrific today!
letter_t/sounds/test01.mp3##這是我參加過最難的測驗。##It's the most difficult test I've ever had.
letter_t/sounds/than01.mp3##幾米比班上其他學生更聰明。##Jimmy is smarter than all the other students in this class.
letter_t/sounds/thank01.mp3##感謝你的讚賞。##Thanks for your compliment.
letter_t/sounds/Thankgiving01.mp3##感恩節你要去見你的家人嗎？##Will you see your family on Thanksgiving?
letter_t/sounds/that01.mp3##那隻狗會吠每一個經過的人。##That dog barks at everyone who walks by.
letter_t/sounds/the01.mp3##在電影「駭客任務」中尼歐是 ' 佼佼者 ' 。##Neo is “the One” in the movie “Matrix.”
letter_t/sounds/theater01.mp3##週末時戲院擠滿了人。##The theater is crowded with people on weekends.
letter_t/sounds/then01.mp3##他不知道那時他的母親在那兒。##He didn't know his mother was there then.
letter_t/sounds/there02.mp3##在森林有許多的危險動物。##There are many dangerous animals in the forest.
letter_t/sounds/therefore01.mp3##這裡很危險，因此我們必須跑。##This place is very dangerous; therefore, we must run.
letter_t/sounds/these01.mp3##這些是我最喜歡的相片。##These are my favorite photos.
letter_t/sounds/they05.mp3##他們全背自己的背包。##They all carry the backpacks by themselves.
letter_t/sounds/thick01.mp3##這牆壁不很厚，所以不要製造太大的聲響。##The wall is not very thick, so try not to make too much noise.
letter_t/sounds/thin01.mp3##她看起來比以前瘦。##She looks thinner than before.
letter_t/sounds/thing01.mp3##說謊並不是一件好事情。##Lying is not a good thing.
letter_t/sounds/think01.mp3##你不覺得我很漂亮嗎？##Don't you think I'm pretty?
letter_t/sounds/third01.mp3##你是這個家庭出生的第三個孩子。##You are the third child to be born in this family.
letter_t/sounds/thirsty01.mp3##在沙漠上走讓人很容易口渴。##Walking in the desert makes people thirsty easily.
letter_t/sounds/thirteen01.mp3##當我十三歲時，我的父親買給我一台漂亮的腳踏車。##When I was thirteen, my father bought me a cool bicycle.
letter_t/sounds/thirty01.mp3##珍妮是個 30 歲的女士。##Jenny is a thirty-year-old lady.
letter_t/sounds/this01.mp3##這是個頻果。##This is a red apple.
letter_t/sounds/those01.mp3##那些小孩正快樂地玩樂。##Those kids are playing happily.
letter_t/sounds/though01.mp3##雖然你富有，你買不到愛情。##Though you are rich, you can't buy love.
letter_t/sounds/thousand01.mp3##上千台灣人在電視機上看棒球比賽。##Thousands of people in Taiwan watched the baseball game on TV.
letter_t/sounds/three01.mp3##三年前，我們不認識對方。##Three years ago, we didn't know each other.
letter_t/sounds/Thursday01.mp3##下星期四我將會到日本旅遊。##I'll travel to Japan next Thursday.
letter_t/sounds/ticket01.mp3##請你能幫我買票嗎？##Can you buy the ticket for me?
letter_t/sounds/tiger01.mp3##老虎有美麗的條紋。##Tigers have beautiful stripes.
letter_t/sounds/time01.mp3##現在是幾點？##What's the time?
letter_t/sounds/tip01.mp3##這本書提供我們很多做餅的訣竅。##This book gives us a lot of tips on making a pie.
letter_t/sounds/tired01.mp3##班尼是如此的疲累，以至於他不能張開眼睛。##Benny is so tired that he can't open his eyes.
letter_t/sounds/to01.mp3##他指向牆上的圖畫。##He pointed to the picture on the wall.
letter_t/sounds/today01.mp3##今天不是我順利的日子。##It's not my day today.
letter_t/sounds/together01.mp3##雖然我們是兄弟，我們不住在一起。##Though we are brothers, we don't live together.
letter_t/sounds/tomato01.mp3##蕃茄對健康有益。##Tomatoes are said to be good for your health.
letter_t/sounds/tomorrow01.mp3##氣象報導說明天將會是晴朗的日子。##The weather report said tomorrow would be a sunny day.
letter_t/sounds/tonight01.mp3##愛麗斯今晚跟我約會。##Alice has a date with me tonight.
letter_t/sounds/too02.mp3##你也很聰明。##You are smart, too.
letter_t/sounds/tooth01.mp3##我們用牙膏和牙刷清潔牙齒。##We use toothpaste and tooth brushes to clean our teeth.
letter_t/sounds/top01.mp3##我們最後終於到達山頂。##We finally reached the top of the mountain.
letter_t/sounds/total01.mp3##投票總數超過１００萬。##The total number of votes was over one million.
letter_t/sounds/touch01.mp3##不要碰這隻貓。它會咬人。##Don't touch the cat. It bites.
letter_t/sounds/towel01.mp3##請你給我一條清潔的毛巾？##Can you give me a clean towel?
letter_t/sounds/town01.mp3##下一個城鎮在 20 英里以外。##The next town is twenty miles away.
letter_t/sounds/toy01.mp3##小巴比有很多玩具在他的房間裡面。##Little Bob has a lot of toys in his room.
letter_t/sounds/traffic01.mp3##大城市的交通總是一團糟。##The traffic in a big city is always a mess.
letter_t/sounds/train01.mp3##我坐錯了火車，我覺得尷尬。##I took the wrong train. I'm embarrassed.
letter_t/sounds/trash01.mp3##你將報紙放到垃圾桶了嗎？##Did you put the newspaper in the trash can?
letter_t/sounds/travel01.mp3##Ken 的夢想是環遊全世界。##Ken's dream is to travel the world.
letter_t/sounds/tree01.mp3##在夏天，有時你能在樹的附近找到毛毛蟲。##In summer, sometimes you can find caterpillars around the tree.
letter_t/sounds/trick01.mp3##假如你不想緊張，秘訣就是微笑。##If you don't want to be nervous, the trick is to smile.
letter_t/sounds/trip01.mp3##你的峇里島之旅如何呢？##How's your trip to Bali ?
letter_t/sounds/trouble01.mp3##我們跟他溝通上有麻煩。##We had trouble communicating with him.
letter_t/sounds/truck01.mp3##這貨車裝滿了炸彈。##The truck is loaded with bombs.
letter_t/sounds/true01.mp3##他說的每件事都是真實的。##Everything he said was true.
letter_t/sounds/try01.mp3##你想要嘗試我們的新茶嗎？##Do you want to try our new tea?
letter_t/sounds/Tuesday01.mp3##星期二我們沒有英文課。##We don't have English class on Tuesdays.
letter_t/sounds/turn02.mp3##現在換你了。##It's your turn now.
letter_t/sounds/twelve01.mp3##他最小的弟弟 12 歲。##His youngest brother is twelve years old.
letter_t/sounds/twenty01.mp3##他妹妹 20 歲。##His younger sister is twenty years old.
letter_t/sounds/twice01.mp3##我每天刷牙兩次。##I brush my teeth twice a day.
letter_t/sounds/two01.mp3##他的兒子只有兩歲。##His son is only two years old.
letter_t/sounds/typhoon01.mp3##秋天時來的颱風通常導致更多的破壞。##Typhoons that come in autumn usually cause more damages.
letter_u/sounds/umbrella01.mp3##下雨了，但麗莎忘了帶她的雨傘。##It's raining, but Lisa forgot to bring her umbrella.
letter_u/sounds/uncle01.mp3##我有一個常自言自語的怪叔叔。##I have a strange uncle who always talks to himself.
letter_u/sounds/under01.mp3##工人在太陽下流著汗。##Workers are sweating under the sun.
letter_u/sounds/understand01.mp3##你了解這句子的意思嗎？##Can you understand this sentence?
letter_u/sounds/unhappy01.mp3##小貓看到你似乎不高興。##The little kitten seems unhappy to see you.
letter_u/sounds/uniform01.mp3##穿著制服的男人看起來非常帥。##The man looks very handsome in his uniform.
letter_u/sounds/university01.mp3##將來你想上哪所大學?##Which university will you enter in the future?
letter_u/sounds/until01.mp3##我不會跟你說話直到你對我說抱歉。##I will not talk to you until you say sorry to me!
letter_u/sounds/up02.mp3##向上走至 14 樓，謝謝。##Go up to Floor 14. Thanks.
letter_u/sounds/upper01.mp3##他的上唇在一次車禍後受傷 。##His upper lip got hurt after a car accident.
letter_u/sounds/USA01.mp3##USA 是美利堅共和國。##The USA is the United States of America .
letter_u/sounds/use02.mp3##這程式的用途是什麼？##What's the use of this program?
letter_u/sounds/useful01.mp3##這本字典非常有用。##This dictionary is very useful.
letter_u/sounds/usually01.mp3##我經常在字典中查閱新字。##I usually look up new words in a dictionary.
letter_v/sounds/vacation01.mp3##你寒假有任何計畫嗎？##Do you have any plan for the winter vacation?
letter_v/sounds/Valentine01.mp3##你怎麼過情人節?##How did you spend your Valentine's Day?
letter_v/sounds/vegetable01.mp3##若你不吃蔬菜，那是不好的。##It's not good if you don't eat vegetables.
letter_v/sounds/vendor01.mp3##馬先生從街頭攤販買了一副眼鏡。##Mr. Ma bought a pair of glasses from a street vendor.
letter_v/sounds/very01.mp3##我的父母一直非常忙碌 。##My parents are very busy all the time.
letter_v/sounds/video01.mp3##我唯一做的事是在家看影片。##The only thing I did was watch videos at home.
letter_v/sounds/visit01.mp3##下次來拜訪我，好嗎？##Come and visit me next time, will you?
letter_v/sounds/voice02.mp3##請你的音量放小。##Lower your voices, please.
letter_w/sounds/wait01.mp3##等我！我幾乎到哪裡了。##Wait for me! I'm almost there.
letter_w/sounds/waiter01.mp3##文生在餐廳當服務生。##Vincent works as a waiter in a restaurant.
letter_w/sounds/waitress01.mp3##瑪莉在咖啡店當服務生 。##Mary works as a waitress in a coffee shop.
letter_w/sounds/wake01.mp3##每天早上鬧鐘把我喚醒。##The alarm clock wakes me up every morning.
letter_w/sounds/walk01.mp3##每天莎莉走路去上班。##Sally walks to work every day.
letter_w/sounds/wall01.mp3##蜘蛛人能非常容易地爬牆壁。##Spiderman can climb walls very easily.
letter_w/sounds/want01.mp3##他的母親想買給她一個洋娃娃。##Her mother wants to buy her a doll.
letter_w/sounds/warm01.mp3##今天的天氣很溫暖。##The weather today is warm.
letter_w/sounds/wash01.mp3##傑瑞為他的母親洗餐具。##Jerry washes the dishes for his mother.
letter_w/sounds/watch02.mp3##你想看電視嗎？## Do you want to watch TV?
letter_w/sounds/water01.mp3##每種活著的東西都需要水。##Every living thing needs water.
letter_w/sounds/waterfall01.mp3##你知道世界上最大的瀑布叫什麼嗎?##Do you know the name of the largest waterfall in the world?
letter_w/sounds/way02.mp3##讓路。##Don't stand in my way.
letter_w/sounds/we04.mp3##我們能打扮更美麗。##We can make ourselves more beautiful.
letter_w/sounds/weak01.mp3##他很虛弱因為他生病了。##He is weak because he is sick.
letter_w/sounds/wear01.mp3##她忘記穿毛衣。她覺得冷。##She forgot to wear the sweater. She felt cold.
letter_w/sounds/weather01.mp3##天氣變化迅速。##The weather changes rapidly.
letter_w/sounds/Wednesday01.mp3##在星期三時很熱，星期四時卻很冷。##It's hot on Wednesday, but freezing on Thursday.
letter_w/sounds/week01.mp3##下星期她將出發到美國。##She will leave for the US next week.
letter_w/sounds/weekday01.mp3##Cindy 工作日很少吃午餐。##Cindy seldom eats lunch on weekdays.
letter_w/sounds/weekend01.mp3##這個週末我們將舉行野餐。##We will go on a picnic this weekend.
letter_w/sounds/welcome01.mp3##他們為新來者舉辦歡迎派對。##They held a welcome party for the new comer.
letter_w/sounds/well01.mp3##凱瑞今天覺得身體不適。##Kerry doesn't feel well today.
letter_w/sounds/west01.mp3##太陽從西方落下。##The sun sets in the west.
letter_w/sounds/wet01.mp3##在雨天時馬路是濕的。##The roads are wet on rainy days.
letter_w/sounds/what01.mp3##先生，我能為你做什麼嗎？##What can I do for you, sir?
letter_w/sounds/when01.mp3##你什麼時候回來？##When will you be back?
letter_w/sounds/where01.mp3##我的筆在哪裡？##Where is my pen?
letter_w/sounds/whether01.mp3##無論是你贏或輸，我都不在乎。##I don't care whether you win or lose.
letter_w/sounds/which01.mp3##你較喜歡哪一個，柳橙汁或綠茶？##Which do you prefer, orange juice or green tea?
letter_w/sounds/white01.mp3##肯尼駕駛一台白色的汽車。##Kenny drives a white car.
letter_w/sounds/who01.mp3##這矮傢伙是誰？##Who is that short guy?
letter_w/sounds/whose01.mp3##這是誰的車子？##Whose car is this?
letter_w/sounds/why01.mp3##你為何這樣說？##Why do you say so?
letter_w/sounds/wife01.mp3##黃先生尚未娶妻。##Mr. Huang doesn't have a wife yet.
letter_w/sounds/wild01.mp3##政府應保護台灣的野生動物。##Our government should protect the wild animals in Taiwan.
letter_w/sounds/will02.mp3##你跟我說你會來。##You told me you would come.
letter_w/sounds/win01.mp3##這次約翰中樂透。##John won the lottery this time.
letter_w/sounds/wind01.mp3##風如此的冷，以致我打噴嚏很多次。##The wind is so cold that I sneezed for many times.
letter_w/sounds/window01.mp3##看窗外！是傑克。##Look out the window! It's Jack.
letter_w/sounds/windy01.mp3##新竹據說是風城。##Hsin-Chu is said to be a windy city.
letter_w/sounds/winter01.mp3##在冬天，每個人穿著厚毛衣和外套。##In winter, everyone wears thick sweaters and coats.
letter_w/sounds/wise01.mp3##一個有智慧的老人告訴我一個故事。##A wise old man told me a story.
letter_w/sounds/wish01.mp3##我但願我能為你做些事。##I wish I could do something for you.
letter_w/sounds/with01.mp3##我想要與你去那裡。##I want to go there with you.
letter_w/sounds/without01.mp3##沒有你，我不能去那裡。##I can't go there without you.
letter_w/sounds/woman01.mp3##凱蒂是個可愛的女人。##Katie is a lovely woman.
letter_w/sounds/wonderful01.mp3##你的演講很棒。##Your speech is wonderful.
letter_w/sounds/wood01.mp3##祖父通常到樹林溜狗。##Grandpa usually walked the dog in the woods.
letter_w/sounds/word01.mp3##小孩子能非常快速地學習新字。##Children can learn new words very quickly.
letter_w/sounds/work01.mp3##A : 你在哪裡工作？ B: 我在一家超市工作。##A: Where do you work? B: I work in a supermarket.
letter_w/sounds/workbook01.mp3##同學們，打開你們的作業本。##Students, open your workbooks now.
letter_w/sounds/worker01.mp3##蘇西的父親是工廠工人。##Susie's father is a factory worker.
letter_w/sounds/world01.mp3##在 40 歲前我會環遊世界。##I will travel all over the world before 40.
letter_w/sounds/worry01.mp3##我是如此擔憂你的健康。##I'm so worried about your health.
letter_w/sounds/write01.mp3##希爾達寫了一封情書給比爾。##Hilda wrote a love letter to Bill.
letter_w/sounds/writer01.mp3##昨天我在街上看到一個著名的作家。##I saw a famous writer on the street yesterday.
letter_w/sounds/wrong01.mp3##有任何錯誤嗎？##Is there anything wrong?
letter_y/sounds/year01.mp3##今年很多電影明星來台灣。##Many movie stars visited Taiwan this year.
letter_y/sounds/yellow01.mp3##我看見一位穿黃色洋裝的漂亮女孩。##I met a pretty girl in a yellow dress.
letter_y/sounds/yes(yeah)01.mp3##A: 你在跟我講話嗎？ B: 是的。##A: Are you talking to me? B: Yes, I am.
letter_y/sounds/yesterday01.mp3##昨天我與我的朋友去參加一個宴會。##I went to a party with my friends yesterday.
letter_y/sounds/yet01.mp3##他尚未來到這裡。##He hasn't come here yet.
letter_y/sounds/you04.mp3##保重。##Take good care of yourself.　
letter_y/sounds/young01.mp3##年輕人協助長者過馬路。##The young man helps the old man cross the road.
letter_z/sounds/zoo01.mp3##上星期六父母帶我去動物園。##My parents took me to the zoo last Saturday.
-----*/}.toString().replace(/\r/g,"").slice("function(){/*--這一行請勿更改--".length+1,-9);
