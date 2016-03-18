angular.module("application").controller("DefaultController",["$scope","$stateParams","$state",function($scope,$stateParams,$state){var params=[];angular.forEach($stateParams,function(value,key){params[key]=value}),$scope.params=params,$scope.current=$state.current.name,$state.current.views?($scope.vars=$state.current.data.vars,$scope.composed=$state.current.data.vars.children):$scope.vars=$state.current.data.vars}]),angular.module("application").controller("NavController",["$scope","$state",function($scope,$state){$scope.current=$state.current.name;var routes=angular.copy(foundationRoutes);$scope.routing=[],$scope.typedText="",foundationRoutes&&angular.forEach(routes,function(r){var title=r.title||r.name.replace("."," ");$scope.routing.push(title)}),$scope.selectRoute=function(routeName){var name=routeName.replace(" ",".");angular.forEach(routes,function(r){return r.title&&r.title===routeName?void $state.go(r.name):name===r.name?void $state.go(r.name):void 0})}}]),angular.module("application").controller("MotionUIController",["$scope","$state","FoundationApi","$animate","$window",function($scope,$state,FoundationApi,$animate,$window){$scope.current=$state.current.name,$scope.element={},$scope.speeds=["linear","ease","easeIn","easeOut","easeInOut","bounceIn","bounceOut","bounceInOut"],$scope.transitions=[{direction:"enter",type:"Slide",classes:["slideInDown","slideInUp","slideInLeft","slideInRight"]},{direction:"leave",type:"Slide",classes:["slideOutBottom","slideOutUp","slideOutLeft","slideOutRight"]},{direction:"enter",type:"Fade",classes:["fadeIn"]},{direction:"leave",type:"Fade",classes:["fadeOut"]},{direction:"enter",type:"Hinge",classes:["hingeInFromTop","hingeInFromBottom","hingeInFromRight","hingeInFromLeft","hingeInFromMiddleX","hingeInFromMiddleY"]},{direction:"leave",type:"Hinge",classes:["hingeOutFromTop","hingeOutFromBottom","hingeOutFromRight","hingeOutFromLeft","hingeOutFromMiddleX","hingeOutFromMiddleY"]},{direction:"enter",type:"Scale",classes:["zoomIn"]},{direction:"leave",type:"Scale",classes:["zoomOut"]},{direction:"enter",type:"Spin",classes:["spinIn","spinInCCW"]},{direction:"leave",type:"Spin",classes:["spinOut","spinOutCCW"]}],$scope.update=function(){var kitty=angular.element('<img id="kitty" src="http://placekitten.com/g/600/300" />'),presentKitty=$window.document.getElementById("kitty"),demoElementParent=$window.document.getElementById("demo-card-parent"),animationClasses="";for(prop in $scope.element)"default"!==$scope.element[prop]&&"undefined"!==$scope.element[prop]&&(animationClasses+=$scope.element[prop]+" ");kitty.addClass(animationClasses),"enter"===$scope.animationFilter?(presentKitty&&presentKitty.remove(),$animate.enter(kitty,demoElementParent).then(function(){kitty.removeClass(animationClasses)})):($animate.enter(kitty,demoElementParent),$animate.leave(kitty),presentKitty&&presentKitty.remove())}}]);
angular.module("foundation.common.animations",["ngAnimate"]),angular.module("foundation.common.animations").animation(".ui-animation",["$state","$rootScope",function($state,$rootScope){var events=["webkitAnimationEnd","mozAnimationEnd","MSAnimationEnd","oanimationend","animationend","webkitTransitionEnd","otransitionend","transitionend"],parentStyle="position-absolute";return{enter:function(element,done){var scope=element.scope();if(scope.vars&&scope.vars.animationIn){var animationIn=scope.vars.animationIn,animationOut=scope.vars.animationOut||"",initial="ng-enter",activate="ng-enter-active";element.parent().addClass(parentStyle),element.removeClass(activate+" "+initial+" "+animationIn+" "+animationOut),element[0].style.transitionDuration=0,element.addClass(animationIn),element.addClass(initial),$rootScope.$digest(),element[0].style.transitionDuration="",element.addClass(activate),element.one(events.join(" "),function(){element.parent().removeClass(parentStyle),element.removeClass(activate+" "+initial+" "+animationIn+" "+animationOut),done()})}else done();return function(){}},leave:function(element,done){var scope=element.scope();if(scope.vars&&scope.vars.animationOut){var animationIn=scope.vars.animationIn||"",animationOut=scope.vars.animationOut,initial="ng-leave",activate="ng-leave-active";element.removeClass(activate+" "+initial+" "+animationIn+" "+animationOut),element[0].style.transitionDuration=0,element.addClass(animationOut),element.addClass(initial),$rootScope.$digest(),element[0].style.transitionDuration="",element.addClass(activate),element.one(events.join(" "),function(){element.removeClass(activate+" "+initial+" "+animationIn+" "+animationOut),element.parent().removeClass(parentStyle),done()})}else done();return function(){}}}}]);
angular.module("foundation.common.directives",[]),angular.module("foundation.common.directives").directive("zfClose",["FoundationApi",function(foundationApi){return{restrict:"A",link:function(scope,element){for(var parentElement=!1,tempElement=element.parent();parentElement===!1;)"BODY"==tempElement[0].nodeName&&(parentElement=""),"undefined"!=typeof tempElement.attr("zf-closable")&&tempElement.attr("zf-closable")!==!1&&(parentElement=tempElement),tempElement=tempElement.parent();element.on("click",function(e){foundationApi.publish(parentElement.attr("id"),"close"),e.preventDefault()})}}}]),angular.module("foundation.common.directives").directive("zfOpen",["FoundationApi",function(foundationApi){return{restrict:"A",link:function(scope,element,attrs){element.on("click",function(e){foundationApi.publish(attrs.zfOpen,"open"),e.preventDefault()})}}}]),angular.module("foundation.common.directives").directive("zfToggle",["FoundationApi",function(foundationApi){return{restrict:"A",link:function(scope,element,attrs){element.on("click",function(e){foundationApi.publish(attrs.zfToggle,"toggle"),e.preventDefault()})}}}]),angular.module("foundation.common.directives").directive("zfAnimate",["FoundationApi",function(foundationApi){return{restrict:"A",priority:100,link:function(scope,element,attrs){var isActive=!1,animationIn=attrs.animationIn,animationOut=attrs.animationOut,activeClass="is-active",reflow=function(){return element[0].offsetWidth},reset=function(){element[0].style.transitionDuration=0,element.removeClass(activeClass+" "+animationIn+" "+animationOut)},animate=function(animationClass,activation){reset(),element.addClass(animationClass),reflow(),element[0].style.transitionDuration="",element.addClass(activeClass),isActive=activation};foundationApi.subscribe(attrs.id,function(msg){if("show"===msg||"open"===msg)animate(animationIn,!0);else if("hide"===msg||"close"===msg)animate(animationOut,!1);else if("toggle"===msg){var newState=!isActive,newAnimation=newState?animationIn:animationOut;setTimeout(function(){animate(newAnimation,newState)},1)}})}}}]);
angular.module("foundation.common.services",[]),angular.module("foundation.common.services").service("FoundationApi",function(){var listeners=[],settings={},uniqueIds=[];return{subscribe:function(name,callback){return listeners[name]||(listeners[name]=[]),listeners[name].push(callback),!0},publish:function(name,msg){listeners[name]||(listeners[name]=[]),listeners[name].forEach(function(cb){cb(msg)})},getSettings:function(){return settings},modifySettings:function(tree){return settings=angular.extend(settings,tree)},generateUuid:function(){var uuid="";do{uuid+="zf-uuid-";for(var i=0;15>i;i++)uuid+=Math.floor(16*Math.random()).toString(16)}while(!uniqueIds.indexOf(uuid));return uniqueIds.push(uuid),uuid},toggleAnimation:function(element,futureState){var activeClass="is-active";futureState?element.addClass(activeClass):element.removeClass(activeClass)},animate:function(element,futureState,animationIn,animationOut){var initClasses=["ng-enter","ng-leave"],activeClasses=["ng-enter-active","ng-leave-active"],activeGenericClass="is-active",events=["webkitAnimationEnd","mozAnimationEnd","MSAnimationEnd","oanimationend","animationend","webkitTransitionEnd","otransitionend","transitionend"],reflow=function(){return element[0].offsetWidth},reset=function(){element[0].style.transitionDuration=0,element.removeClass(initClasses.join(" ")+" "+activeClasses.join(" ")+" "+animationIn+" "+animationOut)},animate=function(animationClass,activation){var initClass=activation?initClasses[0]:initClasses[1],activeClass=activation?activeClasses[0]:activeClasses[1];reset(),element.addClass(animationClass),element.addClass(initClass),element.addClass(activeGenericClass),reflow(),element[0].style.transitionDuration="",element.addClass(activeClass),element.one(events.join(" "),function(){reset(),element.removeClass(activation?"":activeGenericClass),reflow()})};animate(futureState?animationIn:animationOut,futureState)}}}),angular.module("foundation.common.services").filter("prepareRoute",function(){return function(input){return"route-"+input.replace(/\./,"-").toLowerCase()}}),angular.module("foundation.common.services").factory("Utils",function(){return{prepareRoute:function(input){return"route-"+input.replace(/\./,"-").toLowerCase()},throttle:function(func,delay){var timer=null;return function(){var context=this,args=arguments;null===timer&&(timer=setTimeout(function(){func.apply(context,args),timer=null},delay))}}}});
angular.module("foundation.init",["foundation.common.services"]),angular.module("foundation.init").factory("FoundationInit",["helpers","FoundationApi","Utils",function(helpers,foundationApi,u){return{init:function(){var mediaQueries,extractedMedia;helpers.headerHelper(["foundation-mq"]),extractedMedia=helpers.getStyle(".foundation-mq","font-family"),mediaQueries=helpers.processStyleToJSON(extractedMedia);for(var key in mediaQueries)mediaQueries[key]="only screen and (min-width: "+mediaQueries[key].replace("rem","em")+")";foundationApi.modifySettings({media_queries:mediaQueries}),window.addEventListener("resize",u.throttle(function(){foundationApi.publish("resize","window resized")},50))}}}]),angular.module("foundation.init").factory("helpers",function(){return{headerHelper:function(classArray){for(var i=classArray.length,head=angular.element(document.querySelectorAll("head"));i--;)head.append('<meta class="'+classArray[i]+'" />')},getStyle:function(selector){var elem=document.querySelectorAll(selector)[0],style=window.getComputedStyle(elem,null);return style.getPropertyValue("font-family")},processStyleToJSON:function(str){var clean=str.replace(/\'/g,"");try{return JSON.parse(clean)}catch(e){return JSON.parse(clean.slice(1,-1))}}}}),angular.module("foundation.init.state",["ui.router"]).provider("$FoundationState",["$stateProvider",function($stateProvider){var complexViews={};this.registerDynamicRoutes=function(routes){var dynamicRoutes=routes||foundationRoutes;angular.forEach(dynamicRoutes,function(page){if(page.hasComposed===!0)angular.isDefined(complexViews[page.parent])||(complexViews[page.parent]={children:{}}),complexViews[page.parent].children[page.name]=page;else if(page.composed===!0)angular.isDefined(complexViews[page.name])||(complexViews[page.name]={children:{}}),angular.extend(complexViews[page.name],page);else{var state={url:page.url,templateUrl:page.path,parent:page.parent||"",controller:page.controller||"DefaultController",data:{vars:page}};$stateProvider.state(page.name,state)}}),angular.forEach(complexViews,function(page){var state={url:page.url,parent:page.parent||"",data:{vars:page},views:{"":{templateUrl:page.path,controller:page.controller||"DefaultController"}}};angular.forEach(page.children,function(sub){state.views[sub.name+"@"+page.name]={templateUrl:sub.path,controller:page.controller||"DefaultController"}}),$stateProvider.state(page.name,state)})},this.$get=function(){return{}}}]);
angular.module("foundation.accordion",[]),angular.module("foundation.accordion").controller("ZfAccordionController",["$scope",function($scope){var controller=this,sections=controller.sections=$scope.sections=[],autoOpen=(controller.multiOpen=!1,controller.autoOpen=$scope.autoOpen=$scope.autoOpen||"true");controller.select=function(selectSection){sections.forEach(function(section){controller.multiOpen?section.scope===selectSection&&(section.scope.active=!section.scope.active):(section.scope.active=!1,section.scope===selectSection&&(section.scope.active=!0))})},controller.addSection=function(sectionScope){sections.push({scope:sectionScope}),1===sections.length&&"true"===autoOpen&&(sections[0].active=!0,sections[0].scope.active=!0)},controller.closeAll=function(){sections.forEach(function(section){section.scope.active=!1})}}]),angular.module("foundation.accordion").directive("zfAccordion",function(){return{restrict:"EA",transclude:"true",replace:!0,templateUrl:"partials/accordion.html",controller:"ZfAccordionController",scope:{multiOpen:"@?",autoOpen:"@?"},link:function(scope,element,attrs,controller){controller.multiOpen="true"===scope.multiOpen?!0:!1}}}),angular.module("foundation.accordion").directive("zfAccordionItem",function(){return{restrict:"EA",templateUrl:"partials/accordion-item.html",transclude:!0,scope:{title:"@"},require:"^zfAccordion",replace:!0,controller:function(){},link:function(scope,element,attrs,controller){scope.active=!1,controller.addSection(scope),scope.activate=function(){controller.select(scope)}}}});
angular.module("foundation.actionsheet",["foundation.common.services"]),angular.module("foundation.actionsheet").controller("ZfActionSheetController",["$scope","FoundationApi",function($scope){var controller=this,content=controller.content=$scope.content;controller.registerContent=function(scope){content=scope,content.active=!1},controller.toggle=function(){content.toggle(),content.$apply()},controller.hide=function(){content.hide(),content.$apply()}}]),angular.module("foundation.actionsheet").directive("zfActionSheet",["FoundationApi",function(foundationApi){return{restrict:"A",transclude:!0,replace:!0,templateUrl:"partials/actionsheet.html",controller:"ZfActionSheetController",compile:function(){return{pre:function(scope,iElement,iAttrs){iAttrs.$set("zf-closable","actionsheet")},post:function(scope,element,attrs,controller){foundationApi.subscribe(attrs.id,function(msg){"toggle"==msg&&controller.toggle(),("hide"===msg||"close"===msg)&&controller.hide()})}}}}}]),angular.module("foundation.actionsheet").directive("zfAsContent",["FoundationApi",function(){return{restrict:"EA",transclude:!0,replace:!0,templateUrl:"partials/actionsheet-content.html",require:"^zfActionSheet",scope:{position:"@?"},link:function(scope,element,attrs,controller){scope.active=!1,scope.position=scope.position||"bottom",controller.registerContent(scope),scope.toggle=function(){scope.active=!scope.active},scope.hide=function(){scope.active=!1}}}}]),angular.module("foundation.actionsheet").directive("zfAsButton",["FoundationApi",function(){return{restrict:"EA",transclude:!0,replace:!0,templateUrl:"partials/actionsheet-button.html",require:"^zfActionSheet",scope:{title:"@?"},link:function(scope,element,attrs,controller){element.on("click",function(e){controller.toggle(),e.preventDefault()})}}}]);
angular.module("foundation.iconic",[]),angular.module("foundation.iconic").service("Iconic",function(){var iconic=IconicJS();return{getAccess:function(){return iconic}}}),angular.module("foundation.iconic").directive("zfIconic",["Iconic",function(iconic){return{restrict:"A",link:function(scope,element){var ico=iconic.getAccess();ico.inject(element[0])}}}]);
angular.module("foundation.interchange",["foundation.common.services"]),angular.module("foundation.interchange").directive("zfInterchange",["FoundationApi","$compile","$http","$templateCache","$animate",function(foundationApi,$compile,$http,$templateCache){var templateLoader=function(templateUrl){return $http.get(templateUrl,{cache:$templateCache})};return{restrict:"EA",transclude:"element",scope:{position:"@"},replace:!0,template:"<div></div>",link:function(scope,element,attrs,ctrl,transclude){var childScope,current,scenarios,innerTemplates,named_queries={"default":"only screen",landscape:"only screen and (orientation: landscape)",portrait:"only screen and (orientation: portrait)",retina:"only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min--moz-device-pixel-ratio: 2),only screen and (-o-min-device-pixel-ratio: 2/1),only screen and (min-device-pixel-ratio: 2),only screen and (min-resolution: 192dpi),only screen and (min-resolution: 2dppx)"},globalQueries=foundationApi.getSettings().media_queries;named_queries=angular.extend(named_queries,globalQueries);var matched=function(){var count=scenarios.length,matches=[];if(count>0)for(;count--;){var mq,rule=scenarios[count].media;mq=matchMedia(named_queries[rule]?named_queries[rule]:rule),mq.matches&&matches.push({ind:count})}return matches},collectInformation=function(parentElement){scenarios=[],innerTemplates=[];var elements=parentElement.children(),i=0;angular.forEach(elements,function(el){var elem=angular.element(el);elem.attr("src")&&elem.attr("src").match(/.html$/)?scenarios[i]={media:elem.attr("media"),src:elem.attr("src")}:(innerTemplates[i]=elem,scenarios[i]={media:elem.attr("media"),templ:i}),i++})},checkScenario=function(scenario){return!current||current!==scenario};foundationApi.subscribe("resize",function(){transclude(function(clone,newScope){scenarios&&innerTemplates||collectInformation(clone);var ruleMatches=matched(),scenario=0===ruleMatches.length?null:scenarios[ruleMatches[0].ind];if(scenario&&checkScenario(scenario)){if(childScope&&(childScope.$destroy(),childScope=null),"undefined"!=typeof scenario.templ){childScope=newScope;var tmp=document.createElement("div");tmp.appendChild(innerTemplates[scenario.templ][0]),element.html(tmp.innerHTML),$compile(element.contents())(childScope),current=scenario}else{var loader=templateLoader(scenario.src);loader.success(function(html){childScope=newScope,element.html(html)}).then(function(){$compile(element.contents())(childScope),current=scenario})}}})}),foundationApi.publish("resize","initial resize")}}}]);
angular.module("foundation.modal",["foundation.common.services"]),angular.module("foundation.modal").directive("zfModal",["FoundationApi",function(foundationApi){return{restrict:"EA",templateUrl:"partials/modal.html",transclude:!0,scope:{overlay:"@",overlayClose:"@"},replace:!0,compile:function(){var type="modal";return{pre:function(scope,iElement,iAttrs){iAttrs.$set("zf-closable",type)},post:function(scope,element,attrs){var dialog=angular.element(element.children()[0]);scope.active=!1,scope.overlay=scope.overlay||scope.overlayClose||!1,scope.overlayClose=scope.overlayClose||!1;var animationIn=attrs.animationIn||"fadeIn",animationOut=attrs.animationOut||"fadeOut",overlayIn="fadeIn",overlayOut="fadeOut";foundationApi.subscribe(attrs.id,function(msg){"show"==msg||"open"==msg?scope.show():"close"==msg||"hide"==msg?scope.hide():"toggle"==msg&&scope.toggle(),scope.$apply()});var animate=function(){scope.overlay?(foundationApi.animate(element,scope.active,overlayIn,overlayOut),foundationApi.animate(dialog,scope.active,animationIn,animationOut)):foundationApi.animate(element,scope.active,overlayIn,overlayOut)};scope.hide=function(){scope.active=!1,animate()},scope.show=function(){scope.active=!0,animate()},scope.toggle=function(){scope.active=!scope.active,animate()}}}}}}]);
angular.module("foundation.notification",["foundation.common.services"]),angular.module("foundation.notification").controller("ZfNotificationController",["$scope","FoundationApi",function($scope,foundationApi){var controller=this,notifications=controller.notifications=$scope.notifications=[];controller.addNotification=function(info){var id=foundationApi.generateUuid();info.id=id,notifications.push(info)},controller.removeNotification=function(id){notifications.forEach(function(notification){if(notification.id===id){var ind=notifications.indexOf(notification);notifications.splice(ind,1)}})},controller.clearAll=function(){notifications=[]}}]),angular.module("foundation.notification").directive("zfNotificationSet",["FoundationApi",function(foundationApi){return{restrict:"EA",templateUrl:"partials/notification-set.html",controller:"ZfNotificationController",scope:!0,link:function(scope,element,attrs,controller){foundationApi.subscribe(attrs.id,function(msg){"clearall"===msg?controller.clearAll():controller.addNotification(msg),scope.$apply()})}}}]),angular.module("foundation.notification").directive("zfNotification",["FoundationApi",function(foundationApi){return{restrict:"EA",templateUrl:"partials/notification.html",replace:!0,transclude:!0,require:"^zfNotificationSet",controller:function(){},scope:{title:"=?",content:"=?",image:"=?",notifId:"=",position:"=?",color:"=?"},compile:function(){return{pre:function(scope,iElement,iAttrs){iAttrs.$set("zf-closable","notification")},post:function(scope,element,attrs,controller){scope.active=!1,scope.position=scope.position?scope.position.split(" ").join("-"):"top-right";var animationIn=attrs.animationIn||"fadeIn",animationOut=attrs.animationOut||"fadeOut";setTimeout(function(){scope.active=!0,foundationApi.animate(element,scope.active,animationIn,animationOut)},50),scope.remove=function(){scope.active=!1,foundationApi.animate(element,scope.active,animationIn,animationOut),setTimeout(function(){controller.removeNotification(scope.notifId)},50)}}}}}}]),angular.module("foundation.notification").directive("zfNotificationStatic",["FoundationApi",function(foundationApi){return{restrict:"EA",templateUrl:"partials/notification.html",replace:!0,transclude:!0,scope:{title:"@?",content:"@?",image:"@?",position:"@?",color:"@?"},compile:function(){var type="notification";return{pre:function(scope,iElement,iAttrs){iAttrs.$set("zf-closable",type)},post:function(scope,element,attrs){scope.position=scope.position?scope.position.split(" ").join("-"):"top-right";var animationIn=attrs.animationIn||"fadeIn",animationOut=attrs.animationOut||"fadeOut";foundationApi.subscribe(attrs.id,function(msg){"show"==msg||"open"==msg?scope.show():"close"==msg||"hide"==msg?scope.hide():"toggle"==msg&&scope.toggle(),scope.$apply()}),scope.hide=function(){scope.active=!1,foundationApi.animate(element,scope.active,animationIn,animationOut)},scope.remove=function(){scope.hide(),foundationApi.animate(element,scope.active,animationIn,animationOut)},scope.show=function(){scope.active=!0,foundationApi.animate(element,scope.active,animationIn,animationOut)},scope.toggle=function(){scope.active=!scope.active,foundationApi.animate(element,scope.active,animationIn,animationOut)}}}}}}]),angular.module("foundation.notification").directive("zfNotify",["FoundationApi",function(foundationApi){return{restrict:"A",scope:{title:"@?",content:"@?",position:"@?",color:"@?",image:"@?"},link:function(scope,element,attrs){element.on("click",function(e){e.preventDefault(),foundationApi.publish(attrs.zfNotify,{title:scope.title,content:scope.content,position:scope.position,color:scope.color,image:scope.image})})}}}]);
angular.module("foundation.offcanvas",["foundation.common.services"]),angular.module("foundation.offcanvas").directive("zfOffcanvas",["FoundationApi",function(foundationApi){return{restrict:"EA",templateUrl:"partials/offcanvas.html",transclude:!0,scope:{position:"@"},replace:!0,compile:function(){var type="offcanvas";return{pre:function(scope,iElement,iAttrs){iAttrs.$set("zf-closable",type),document.body.classList.add("has-off-canvas")},post:function(scope,element,attrs){scope.position=scope.position||"left",scope.active=!1,foundationApi.subscribe(attrs.id,function(msg){"show"==msg||"open"==msg?scope.show():"close"==msg||"hide"==msg?scope.hide():"toggle"==msg&&scope.toggle(),scope.$apply()}),scope.hide=function(){scope.active=!1},scope.show=function(){scope.active=!0},scope.toggle=function(){scope.active=!scope.active}}}}}}]);
angular.module("foundation.panel",["foundation.common.services"]),angular.module("foundation.panel").directive("zfPanel",["FoundationApi",function(foundationApi){return{restrict:"EA",templateUrl:"partials/panel.html",transclude:!0,scope:{position:"@?"},replace:!0,compile:function(){var type="panel";return{pre:function(scope,iElement,iAttrs){iAttrs.$set("zf-closable",type)},post:function(scope,element,attrs){var animationIn,animationOut;scope.position=scope.position||"left",scope.active=!1,"left"===scope.position?(animationIn=attrs.animationIn||"slideInRight",animationOut=attrs.animationOut||"slideOutLeft"):"right"===scope.position?(animationIn=attrs.animationIn||"slideInLeft",animationOut=attrs.animationOut||"slideOutRight"):"top"===scope.position?(animationIn=attrs.animationIn||"slideInDown",animationOut=attrs.animationOut||"slideOutUp"):"bottom"===scope.position&&(animationIn=attrs.animationIn||"slideInUp",animationOut=attrs.animationOut||"slideOutDown"),foundationApi.subscribe(attrs.id,function(msg){"show"==msg||"open"==msg?scope.show():"close"==msg||"hide"==msg?scope.hide():"toggle"==msg&&scope.toggle(),foundationApi.animate(element,scope.active,animationIn,animationOut),scope.$apply()}),scope.hide=function(){scope.active=!1},scope.show=function(){scope.active=!0},scope.toggle=function(){scope.active=!scope.active}}}}}}]);
angular.module("foundation.popup",["foundation.common.services"]),angular.module("foundation.popup").directive("zfPopup",["FoundationApi",function(foundationApi){return{restrict:"EA",transclude:!0,replace:!0,templateUrl:"partials/popup.html",scope:{pinTo:"@?",pinAt:"@?"},link:function(scope,element,attrs){scope.active=!1,scope.target=scope.target||!1,attrs.$set("zf-closeable","popup");var attachment=scope.pinTo||"top center",tetherInit=!1,tether={},tetherElement=function(target){tetherInit||(scope.target=document.getElementById(scope.target?scope.target:target),tether=new Tether({element:element[0],target:scope.target,attachment:attachment,enable:!1}),tetherInit=!0)};foundationApi.subscribe(attrs.id,function(msg){"show"===msg[0]||"open"===msg[0]?scope.show(msg[1]):"close"===msg[0]||"hide"===msg[0]?scope.hide():"toggle"===msg[0]&&scope.toggle(msg[1]),scope.$apply()}),scope.hide=function(){scope.active=!1,tetherElement(newTarget),tether.disable()},scope.show=function(newTarget){scope.active=!0,tetherElement(newTarget),tether.enable()},scope.toggle=function(newTarget){scope.active=!scope.active,tetherElement(newTarget),scope.active?tether.enable():tether.disable()}}}}]),angular.module("foundation.popup").directive("zfPopupToggle",["FoundationApi",function(foundationApi){return{restrict:"A",link:function(scope,element,attrs){var target=attrs.zfPopupToggle,id=attrs.id||foundationApi.generateUuid();attrs.$set("id",id),element.on("click",function(e){foundationApi.publish(target,["toggle",id]),e.preventDefault()})}}}]);
angular.module("foundation.tabs",["foundation.common.services"]),angular.module("foundation.tabs").controller("ZfTabsController",["$scope","FoundationApi",function($scope,foundationApi){var controller=this,tabs=controller.tabs=$scope.tabs=[],id="";controller.select=function(selectTab){tabs.forEach(function(tab){tab.active=!1,tab.scope.active=!1,tab.scope==selectTab&&(foundationApi.publish(id,["activate",tab]),tab.active=!0,tab.scope.active=!0)})},controller.addTab=function(tabScope){tabs.push({scope:tabScope,active:!1,parentContent:controller.id}),1===tabs.length&&(tabs[0].active=!0,tabScope.active=!0)},controller.getId=function(){return id},controller.setId=function(newId){id=newId}}]),angular.module("foundation.tabs").directive("zfTabs",["FoundationApi",function(foundationApi){return{restrict:"EA",transclude:"true",replace:!0,templateUrl:"partials/tabs.html",controller:"ZfTabsController",scope:{displaced:"@?"},link:function(scope,element,attrs,controller){scope.id=attrs.id||foundationApi.generateUuid(),scope.showTabContent="true"!==scope.displaced,attrs.$set("id",scope.id),controller.setId(scope.id);var updateTabs=function(){foundationApi.publish(scope.id+"-tabs",scope.tabs)};foundationApi.subscribe(scope.id+"-get-tabs",function(){updateTabs()})}}}]),angular.module("foundation.tabs").directive("zfTabContent",["FoundationApi",function(foundationApi){return{restrict:"A",transclude:"true",replace:!0,scope:{tabs:"=?",target:"@"},templateUrl:"partials/tab-content.html",link:function(scope){scope.tabs=scope.tabs||[];var id=scope.target;foundationApi.subscribe(id,function(msg){if("activate"==msg[0]){{msg[1]}scope.tabs.forEach(function(tab){tab.scope.active=!1,tab.active=!1,tab.scope.id===id&&(tab.scope.active=!0,tab.active=!0)})}}),0===scope.tabs.length&&(foundationApi.subscribe(id+"-tabs",function(tabs){scope.tabs=tabs}),foundationApi.publish(id+"-get-tabs",""))}}}]),angular.module("foundation.tabs").directive("zfTab",["FoundationApi",function(foundationApi){return{restrict:"EA",templateUrl:"partials/tab.html",transclude:!0,scope:{title:"@"},require:"^zfTabs",replace:!0,link:function(scope,element,attrs,controller,transclude){scope.id=attrs.id||foundationApi.generateUuid(),scope.active=!1,scope.transcludeFn=transclude,controller.addTab(scope),foundationApi.subscribe(scope.id,function(msg){("show"===msg||"open"===msg||"activate"===msg)&&scope.makeActive()}),scope.makeActive=function(){controller.select(scope)}}}}]),angular.module("foundation.tabs").directive("zfTabIndividual",["FoundationApi",function(foundationApi){return{restrict:"EA",transclude:"true",link:function(scope,element,attrs){{var tab=scope.$eval(attrs.tab);tab.scope.id}tab.scope.transcludeFn(tab.scope,function(tabContent){element.append(tabContent)}),foundationApi.subscribe(tab.scope.id,function(){foundationApi.publish(tab.parentContent,["activate",tab.scope.id]),scope.$apply()})}}}]),angular.module("foundation.tabs").directive("zfTabHref",["FoundationApi",function(foundationApi){return{restrict:"A",replace:!1,link:function(scope,element,attrs){var target=attrs.zfTabHref,makeActive=function(){element.parent().children().removeClass("is-active"),element.addClass("is-active")};foundationApi.subscribe(target,function(msg){("activate"===msg||"show"===msg||"open"===msg)&&makeActive()}),element.on("click",function(e){foundationApi.publish(target,"activate"),makeActive(),e.preventDefault()})}}}]),angular.module("foundation.tabs").directive("zfTabCustom",["FoundationApi",function(){return{restrict:"A",replace:!1,link:function(scope,element){var children=element.children();angular.element(children[0]).addClass("is-active")}}}]),angular.module("foundation.tabs").directive("zfTabContentCustom",["FoundationApi",function(foundationApi){return{restrict:"A",link:function(scope,element){var tabs=[],children=element.children(),activateTabs=function(tabId){var tabNodes=element.children();angular.forEach(tabNodes,function(node){var el=angular.element(node);el.removeClass("is-active"),el.attr("id")===tabId&&el.addClass("is-active")})};angular.forEach(children,function(node){if(node.id){var tabId=node.id;if(tabs.push(tabId),foundationApi.subscribe(tabId,function(msg){("activate"===msg||"show"===msg||"open"===msg)&&activateTabs(tabId)}),1===tabs.length){var el=angular.element(node);el.addClass("is-active")}}})}}}]);
angular.module("markdown",[]).directive("markdown",function(){return{restrict:"A",link:function(scope,element){element.html(marked(element.html()))}}});