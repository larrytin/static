function $cancel(this$static){
  if (!this$static.running) {
    return;
  }
  $remove_13(animations, this$static);
  $layout(this$static.this$0, 0, null);
  this$static.this$0.animation = null;
  this$static.started = false;
  this$static.running = false;
}

function $run(this$static, duration, startTime){
  $cancel(this$static);
  this$static.running = true;
  this$static.duration = duration;
  this$static.startTime = startTime;
  if ($update(this$static, (new Date).getTime())) {
    return;
  }
  if (!animations) {
    animations = new ArrayList_0;
    animationTimer = new Animation$1_0;
  }
  $add_9(animations, this$static);
  animations.size_0 == 1 && $schedule(animationTimer, 25);
}

function $update(this$static, curTime){
  var finished, progress;
  finished = curTime >= this$static.startTime + this$static.duration;
  if (this$static.started && !finished) {
    progress = (curTime - this$static.startTime) / this$static.duration;
    $onUpdate(this$static, (1 + Math.cos(3.141592653589793 + progress * 3.141592653589793)) / 2);
    return false;
  }
  if (!this$static.started && curTime >= this$static.startTime) {
    this$static.started = true;
    $onUpdate(this$static, (1 + Math.cos(3.141592653589793)) / 2);
  }
  if (finished) {
    $layout(this$static.this$0, 0, null);
    this$static.this$0.animation = null;
    this$static.started = false;
    this$static.running = false;
    return true;
  }
  return false;
}

function updateAnimations(){
  var animation, animation$index, animation$max, curAnimations, curTime;
  curAnimations = initDim(_3Lcom_google_gwt_animation_client_Animation_2_classLit, {3:1, 9:1, 66:1}, 67, animations.size_0, 0);
  curAnimations = dynamicCast($toArray_1(animations, curAnimations), 3);
  curTime = (new Date).getTime();
  for (animation$index = 0 , animation$max = curAnimations.length; animation$index < animation$max; ++animation$index) {
    animation = curAnimations[animation$index];
    animation.running && $update(animation, curTime) && $remove_13(animations, animation);
  }
  animations.size_0 > 0 && $schedule(animationTimer, 25);
}

function Animation(){
}

_ = Animation.prototype = new Object_0;
_.getClass$ = function getClass_2(){
  return Lcom_google_gwt_animation_client_Animation_2_classLit;
}
;
_.castableTypeMap$ = {67:1};
_.duration = -1;
_.running = false;
_.startTime = -1;
_.started = false;
var animationTimer = null, animations = null;
function Animation$1_0(){
  $clinit_3();
}

function Animation$1(){
}

_ = Animation$1_0.prototype = Animation$1.prototype = new Timer;
_.getClass$ = function getClass_4(){
  return Lcom_google_gwt_animation_client_Animation$1_2_classLit;
}
;
_.run = function run(){
  updateAnimations();
}
;
_.castableTypeMap$ = {52:1};
function getHostPageBaseURL(){
  var s = $doc.location.href;
  var i = s.indexOf('#');
  i != -1 && (s = s.substring(0, i));
  i = s.indexOf('?');
  i != -1 && (s = s.substring(0, i));
  i = s.lastIndexOf('/');
  i != -1 && (s = s.substring(0, i));
  return s.length > 0?s + '/':'';
}

function $flushPostEventPumpCommands(this$static){
  var oldDeferred;
  if (this$static.deferredCommands) {
    oldDeferred = this$static.deferredCommands;
    this$static.deferredCommands = null;
    !this$static.incrementalCommands && (this$static.incrementalCommands = []);
    runScheduledTasks(oldDeferred, this$static.incrementalCommands);
  }
  !!this$static.incrementalCommands && (this$static.incrementalCommands = runRepeatingTasks(this$static.incrementalCommands));
}

function $isWorkQueued(this$static){
  return !!this$static.deferredCommands || !!this$static.incrementalCommands;
}

function $maybeSchedulePostEventPumpCommands(this$static){
  if (!this$static.shouldBeRunning) {
    this$static.shouldBeRunning = true;
    !this$static.flusher && (this$static.flusher = new SchedulerImpl$Flusher_0(this$static));
    scheduleFixedDelayImpl(this$static.flusher, 1);
    !this$static.rescue && (this$static.rescue = new SchedulerImpl$Rescuer_0(this$static));
    scheduleFixedDelayImpl(this$static.rescue, 50);
  }
}

function $scheduleDeferred(this$static, cmd){
  this$static.deferredCommands = push(this$static.deferredCommands, [cmd, false]);
  $maybeSchedulePostEventPumpCommands(this$static);
}

function runRepeatingTasks(tasks){
  var canceledSomeTasks, i, length_0, newTasks, start, t;
  length_0 = tasks.length;
  if (length_0 == 0) {
    return null;
  }
  canceledSomeTasks = false;
  start = (new Date).getTime();
  while ((new Date).getTime() - start < 100) {
    for (i = 0; i < length_0; ++i) {
      t = tasks[i];
      if (!t) {
        continue;
      }
      if (!t[0].execute()) {
        tasks[i] = null;
        canceledSomeTasks = true;
      }
    }
  }
  if (canceledSomeTasks) {
    newTasks = [];
    for (i = 0; i < length_0; ++i) {
      !!tasks[i] && (newTasks[newTasks.length] = tasks[i] , undefined);
    }
    return newTasks.length == 0?null:newTasks;
  }
   else {
    return tasks;
  }
}

function SchedulerImpl$Flusher_0(this$0){
  this.this$0 = this$0;
}

function SchedulerImpl$Flusher(){
}

_ = SchedulerImpl$Flusher_0.prototype = SchedulerImpl$Flusher.prototype = new Object_0;
_.execute = function execute_0(){
  this.this$0.flushRunning = true;
  $flushPostEventPumpCommands(this.this$0);
  this.this$0.flushRunning = false;
  return this.this$0.shouldBeRunning = $isWorkQueued(this.this$0);
}
;
_.getClass$ = function getClass_18(){
  return Lcom_google_gwt_core_client_impl_SchedulerImpl$Flusher_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function SchedulerImpl$Rescuer_0(this$0){
  this.this$0 = this$0;
}

function SchedulerImpl$Rescuer(){
}

_ = SchedulerImpl$Rescuer_0.prototype = SchedulerImpl$Rescuer.prototype = new Object_0;
_.execute = function execute_1(){
  this.this$0.flushRunning && scheduleFixedDelayImpl(this.this$0.flusher, 1);
  return this.this$0.shouldBeRunning;
}
;
_.getClass$ = function getClass_19(){
  return Lcom_google_gwt_core_client_impl_SchedulerImpl$Rescuer_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function $scrollIntoView(elem){
  var left = elem.offsetLeft, top_0 = elem.offsetTop;
  var width = elem.offsetWidth, height = elem.offsetHeight;
  if (elem.parentNode != elem.offsetParent) {
    left -= elem.parentNode.offsetLeft;
    top_0 -= elem.parentNode.offsetTop;
  }
  var cur = elem.parentNode;
  while (cur && cur.nodeType == 1) {
    left < cur.scrollLeft && (cur.scrollLeft = left);
    left + width > cur.scrollLeft + cur.clientWidth && (cur.scrollLeft = left + width - cur.clientWidth);
    top_0 < cur.scrollTop && (cur.scrollTop = top_0);
    top_0 + height > cur.scrollTop + cur.clientHeight && (cur.scrollTop = top_0 + height - cur.clientHeight);
    var offsetLeft = cur.offsetLeft, offsetTop = cur.offsetTop;
    if (cur.parentNode != cur.offsetParent) {
      offsetLeft -= cur.parentNode.offsetLeft;
      offsetTop -= cur.parentNode.offsetTop;
    }
    left += offsetLeft - cur.scrollLeft;
    top_0 += offsetTop - cur.scrollTop;
    cur = cur.parentNode;
  }
}

function $createInputRadioElement(doc, name_0){
  var elem = doc.createElement('INPUT');
  elem.type = 'radio';
  elem.name = name_0;
  return elem;
}

function $getTabIndex(elem){
  return typeof elem.tabIndex != 'undefined'?elem.tabIndex:-1;
}

function $createUniqueId(this$static){
  !this$static.gwt_uid && (this$static.gwt_uid = 1);
  return 'gwt-uid-' + this$static.gwt_uid++;
}

function is_0(o){
  if (!!o && !!o.nodeType) {
    return !!o && o.nodeType == 1;
  }
  return false;
}

function $clinit_76(){
  $clinit_76 = nullMethod;
  VISIBLE = new Style$Overflow$1_0;
  HIDDEN = new Style$Overflow$2_0;
  SCROLL = new Style$Overflow$3_0;
  AUTO = new Style$Overflow$4_0;
  $VALUES_1 = initValues(_3Lcom_google_gwt_dom_client_Style$Overflow_2_classLit, {9:1, 66:1, 166:1}, 71, [VISIBLE, HIDDEN, SCROLL, AUTO]);
}

function valueOf_3(name_0){
  $clinit_76();
  return valueOf_0(($clinit_81() , $MAP_1), name_0);
}

function values_2(){
  $clinit_76();
  return $VALUES_1;
}

function Style$Overflow(){
}

_ = Style$Overflow.prototype = new Enum;
_.getClass$ = function getClass_40(){
  return Lcom_google_gwt_dom_client_Style$Overflow_2_classLit;
}
;
_.castableTypeMap$ = {4:1, 9:1, 10:1, 63:1, 71:1};
var $VALUES_1, AUTO, HIDDEN, SCROLL, VISIBLE;
function Style$Overflow$1_0(){
  this.name_1 = 'VISIBLE';
  this.ordinal = 0;
}

function Style$Overflow$1(){
}

_ = Style$Overflow$1_0.prototype = Style$Overflow$1.prototype = new Style$Overflow;
_.getClass$ = function getClass_41(){
  return Lcom_google_gwt_dom_client_Style$Overflow$1_2_classLit;
}
;
_.castableTypeMap$ = {4:1, 9:1, 10:1, 63:1, 71:1};
function Style$Overflow$2_0(){
  this.name_1 = 'HIDDEN';
  this.ordinal = 1;
}

function Style$Overflow$2(){
}

_ = Style$Overflow$2_0.prototype = Style$Overflow$2.prototype = new Style$Overflow;
_.getClass$ = function getClass_42(){
  return Lcom_google_gwt_dom_client_Style$Overflow$2_2_classLit;
}
;
_.castableTypeMap$ = {4:1, 9:1, 10:1, 63:1, 71:1};
function Style$Overflow$3_0(){
  this.name_1 = 'SCROLL';
  this.ordinal = 2;
}

function Style$Overflow$3(){
}

_ = Style$Overflow$3_0.prototype = Style$Overflow$3.prototype = new Style$Overflow;
_.getClass$ = function getClass_43(){
  return Lcom_google_gwt_dom_client_Style$Overflow$3_2_classLit;
}
;
_.castableTypeMap$ = {4:1, 9:1, 10:1, 63:1, 71:1};
function Style$Overflow$4_0(){
  this.name_1 = 'AUTO';
  this.ordinal = 3;
}

function Style$Overflow$4(){
}

_ = Style$Overflow$4_0.prototype = Style$Overflow$4.prototype = new Style$Overflow;
_.getClass$ = function getClass_44(){
  return Lcom_google_gwt_dom_client_Style$Overflow$4_2_classLit;
}
;
_.castableTypeMap$ = {4:1, 9:1, 10:1, 63:1, 71:1};
function $clinit_81(){
  $clinit_81 = nullMethod;
  $MAP_1 = createValueOfMap(($clinit_76() , $VALUES_1));
}

var $MAP_1;
function $clinit_82(){
  $clinit_82 = nullMethod;
  STATIC = new Style$Position$1_0;
  RELATIVE = new Style$Position$2_0;
  ABSOLUTE = new Style$Position$3_0;
  FIXED = new Style$Position$4_0;
  $VALUES_2 = initValues(_3Lcom_google_gwt_dom_client_Style$Position_2_classLit, {9:1, 66:1, 166:1}, 72, [STATIC, RELATIVE, ABSOLUTE, FIXED]);
}

function valueOf_4(name_0){
  $clinit_82();
  return valueOf_0(($clinit_87() , $MAP_2), name_0);
}

function values_3(){
  $clinit_82();
  return $VALUES_2;
}

function Style$Position(){
}

_ = Style$Position.prototype = new Enum;
_.getClass$ = function getClass_45(){
  return Lcom_google_gwt_dom_client_Style$Position_2_classLit;
}
;
_.castableTypeMap$ = {4:1, 9:1, 10:1, 63:1, 72:1};
var $VALUES_2, ABSOLUTE, FIXED, RELATIVE, STATIC;
function Style$Position$1_0(){
  this.name_1 = 'STATIC';
  this.ordinal = 0;
}

function Style$Position$1(){
}

_ = Style$Position$1_0.prototype = Style$Position$1.prototype = new Style$Position;
_.getClass$ = function getClass_46(){
  return Lcom_google_gwt_dom_client_Style$Position$1_2_classLit;
}
;
_.castableTypeMap$ = {4:1, 9:1, 10:1, 63:1, 72:1};
function Style$Position$2_0(){
  this.name_1 = 'RELATIVE';
  this.ordinal = 1;
}

function Style$Position$2(){
}

_ = Style$Position$2_0.prototype = Style$Position$2.prototype = new Style$Position;
_.getClass$ = function getClass_47(){
  return Lcom_google_gwt_dom_client_Style$Position$2_2_classLit;
}
;
_.castableTypeMap$ = {4:1, 9:1, 10:1, 63:1, 72:1};
function Style$Position$3_0(){
  this.name_1 = 'ABSOLUTE';
  this.ordinal = 2;
}

function Style$Position$3(){
}

_ = Style$Position$3_0.prototype = Style$Position$3.prototype = new Style$Position;
_.getClass$ = function getClass_48(){
  return Lcom_google_gwt_dom_client_Style$Position$3_2_classLit;
}
;
_.castableTypeMap$ = {4:1, 9:1, 10:1, 63:1, 72:1};
function Style$Position$4_0(){
  this.name_1 = 'FIXED';
  this.ordinal = 3;
}

function Style$Position$4(){
}

_ = Style$Position$4_0.prototype = Style$Position$4.prototype = new Style$Position;
_.getClass$ = function getClass_49(){
  return Lcom_google_gwt_dom_client_Style$Position$4_2_classLit;
}
;
_.castableTypeMap$ = {4:1, 9:1, 10:1, 63:1, 72:1};
function $clinit_87(){
  $clinit_87 = nullMethod;
  $MAP_2 = createValueOfMap(($clinit_82() , $VALUES_2));
}

var $MAP_2;
_ = Style$Unit$1.prototype;
_.getType = function getType(){
  return 'px';
}
;
_ = Style$Unit$2.prototype;
_.getType = function getType_0(){
  return '%';
}
;
_ = Style$Unit$3.prototype;
_.getType = function getType_1(){
  return 'em';
}
;
_ = Style$Unit$4.prototype;
_.getType = function getType_2(){
  return 'ex';
}
;
_ = Style$Unit$5.prototype;
_.getType = function getType_3(){
  return 'pt';
}
;
_ = Style$Unit$6.prototype;
_.getType = function getType_4(){
  return 'pc';
}
;
_ = Style$Unit$7.prototype;
_.getType = function getType_5(){
  return 'in';
}
;
_ = Style$Unit$8.prototype;
_.getType = function getType_6(){
  return 'cm';
}
;
_ = Style$Unit$9.prototype;
_.getType = function getType_7(){
  return 'mm';
}
;
function $clinit_107(){
  $clinit_107 = nullMethod;
  TYPE = new DomEvent$Type_0('blur', new BlurEvent_0);
}

function BlurEvent_0(){
}

function BlurEvent(){
}

_ = BlurEvent_0.prototype = BlurEvent.prototype = new DomEvent;
_.dispatch = function dispatch(handler){
  dynamicCast(handler, 22);
}
;
_.getAssociatedType_0 = function getAssociatedType_0(){
  return TYPE;
}
;
_.getClass$ = function getClass_64(){
  return Lcom_google_gwt_event_dom_client_BlurEvent_2_classLit;
}
;
_.castableTypeMap$ = {};
var TYPE;
function $clinit_109(){
  $clinit_109 = nullMethod;
  TYPE_0 = new DomEvent$Type_0('change', new ChangeEvent_0);
}

function $dispatch(handler){
  handler.this$0.categoryFilter = $getValue_2(handler.this$0.categoryDropBox, handler.this$0.categoryDropBox.element.selectedIndex);
  $filter(handler.this$0, $getPropertyString(handler.this$0.gadgetFilter.element, 'value'));
}

function ChangeEvent_0(){
}

function ChangeEvent(){
}

_ = ChangeEvent_0.prototype = ChangeEvent.prototype = new DomEvent;
_.dispatch = function dispatch_0(handler){
  $dispatch(dynamicCast(handler, 23));
}
;
_.getAssociatedType_0 = function getAssociatedType_1(){
  return TYPE_0;
}
;
_.getClass$ = function getClass_65(){
  return Lcom_google_gwt_event_dom_client_ChangeEvent_2_classLit;
}
;
_.castableTypeMap$ = {};
var TYPE_0;
function ValueChangeEvent_0(value){
  this.value_0 = value;
}

function fire_1(source, value){
  var event_0;
  if (TYPE_11) {
    event_0 = new ValueChangeEvent_0(value);
    !!source.handlerManager && $fireEvent(source.handlerManager, event_0);
  }
}

function fireIfNotEqual(source, oldValue, newValue){
  var event_0;
  if (!!TYPE_11 && oldValue != newValue && (!oldValue || !(!!newValue && newValue.value_0 == oldValue.value_0))) {
    event_0 = new ValueChangeEvent_0(newValue);
    !!source.handlerManager && $fireEvent(source.handlerManager, event_0);
  }
}

function ValueChangeEvent(){
}

_ = ValueChangeEvent_0.prototype = ValueChangeEvent.prototype = new GwtEvent;
_.dispatch = function dispatch_11(handler){
  dynamicCast(handler, 36).onValueChange(this);
}
;
_.getAssociatedType = function getAssociatedType_12(){
  return TYPE_11;
}
;
_.getClass$ = function getClass_82(){
  return Lcom_google_gwt_event_logical_shared_ValueChangeEvent_2_classLit;
}
;
_.castableTypeMap$ = {};
_.value_0 = null;
var TYPE_11 = null;
function encode(decodedURL){
  throwIfNull('decodedURL', decodedURL);
  return encodeURI(decodedURL);
}

function AutoDirectionHandler_0(){
}

function addTo(){
  var autoDirHandler;
  autoDirHandler = new AutoDirectionHandler_0;
  return autoDirHandler;
}

function AutoDirectionHandler(){
}

_ = AutoDirectionHandler_0.prototype = AutoDirectionHandler.prototype = new Object_0;
_.getClass$ = function getClass_99(){
  return Lcom_google_gwt_i18n_client_AutoDirectionHandler_2_classLit;
}
;
_.onKeyUp = function onKeyUp(event_0){
}
;
_.castableTypeMap$ = {29:1, 37:1};
function $runCallbacks_0(){
  var next;
  while (callbacksHead_0) {
    next = callbacksHead_0;
    callbacksHead_0 = callbacksHead_0.next;
    !callbacksHead_0 && (callbacksTail_0 = null);
    $onSuccess_0(next.callback);
  }
}

function AsyncLoader2_0(){
}

function onLoad_0(){
  instance_3 = new AsyncLoader2_0;
  $fragmentHasLoaded(($clinit_21() , BROWSER_LOADER), 2);
  !!$stats && $stats($createStatsEvent('runCallbacks2', 'begin', -1, -1));
  instance_3.runCallbacks();
  !!$stats && $stats($createStatsEvent('runCallbacks2', 'end', -1, -1));
}

function AsyncLoader2(){
}

_ = AsyncLoader2_0.prototype = AsyncLoader2.prototype = new Object_0;
_.getClass$ = function getClass_127(){
  return Lcom_google_gwt_lang_asyncloaders_AsyncLoader2_2_classLit;
}
;
_.runCallbacks = function runCallbacks_0(){
  $runCallbacks_0();
}
;
_.castableTypeMap$ = {};
function $adjustHorizontalConstraints(this$static, parentWidth, l_0){
  var leftPx, rightPx, widthPx;
  leftPx = l_0.left * $getUnitSize(this$static, l_0.leftUnit, false);
  rightPx = l_0.right * $getUnitSize(this$static, l_0.rightUnit, false);
  widthPx = l_0.width_0 * $getUnitSize(this$static, l_0.widthUnit, false);
  if (l_0.setLeft && !l_0.setTargetLeft) {
    l_0.setLeft = false;
    if (l_0.setWidth) {
      l_0.setTargetRight = true;
      l_0.sourceRight = (parentWidth - (leftPx + widthPx)) / $getUnitSize(this$static, l_0.targetRightUnit, false);
    }
     else {
      l_0.setTargetWidth = true;
      l_0.sourceWidth = (parentWidth - (leftPx + rightPx)) / $getUnitSize(this$static, l_0.targetWidthUnit, false);
    }
  }
   else if (l_0.setWidth && !l_0.setTargetWidth) {
    l_0.setWidth = false;
    if (l_0.setLeft) {
      l_0.setTargetRight = true;
      l_0.sourceRight = (parentWidth - (leftPx + widthPx)) / $getUnitSize(this$static, l_0.targetRightUnit, false);
    }
     else {
      l_0.setTargetLeft = true;
      l_0.sourceLeft = (parentWidth - (rightPx + widthPx)) / $getUnitSize(this$static, l_0.targetLeftUnit, false);
    }
  }
   else if (l_0.setRight && !l_0.setTargetRight) {
    l_0.setRight = false;
    if (l_0.setWidth) {
      l_0.setTargetLeft = true;
      l_0.sourceLeft = (parentWidth - (rightPx + widthPx)) / $getUnitSize(this$static, l_0.targetLeftUnit, false);
    }
     else {
      l_0.setTargetWidth = true;
      l_0.sourceWidth = (parentWidth - (leftPx + rightPx)) / $getUnitSize(this$static, l_0.targetWidthUnit, false);
    }
  }
  l_0.setLeft = l_0.setTargetLeft;
  l_0.setRight = l_0.setTargetRight;
  l_0.setWidth = l_0.setTargetWidth;
  l_0.leftUnit = l_0.targetLeftUnit;
  l_0.rightUnit = l_0.targetRightUnit;
  l_0.widthUnit = l_0.targetWidthUnit;
}

function $adjustVerticalConstraints(this$static, parentHeight, l_0){
  var bottomPx, heightPx, topPx;
  topPx = l_0.top_0 * $getUnitSize(this$static, l_0.topUnit, true);
  bottomPx = l_0.bottom * $getUnitSize(this$static, l_0.bottomUnit, true);
  heightPx = l_0.height_0 * $getUnitSize(this$static, l_0.heightUnit, true);
  if (l_0.setTop && !l_0.setTargetTop) {
    l_0.setTop = false;
    if (l_0.setHeight) {
      l_0.setTargetBottom = true;
      l_0.sourceBottom = (parentHeight - (topPx + heightPx)) / $getUnitSize(this$static, l_0.targetBottomUnit, true);
    }
     else {
      l_0.setTargetHeight = true;
      l_0.sourceHeight = (parentHeight - (topPx + bottomPx)) / $getUnitSize(this$static, l_0.targetHeightUnit, true);
    }
  }
   else if (l_0.setHeight && !l_0.setTargetHeight) {
    l_0.setHeight = false;
    if (l_0.setTop) {
      l_0.setTargetBottom = true;
      l_0.sourceBottom = (parentHeight - (topPx + heightPx)) / $getUnitSize(this$static, l_0.targetBottomUnit, true);
    }
     else {
      l_0.setTargetTop = true;
      l_0.sourceTop = (parentHeight - (bottomPx + heightPx)) / $getUnitSize(this$static, l_0.targetTopUnit, true);
    }
  }
   else if (l_0.setBottom && !l_0.setTargetBottom) {
    l_0.setBottom = false;
    if (l_0.setHeight) {
      l_0.setTargetTop = true;
      l_0.sourceTop = (parentHeight - (bottomPx + heightPx)) / $getUnitSize(this$static, l_0.targetTopUnit, true);
    }
     else {
      l_0.setTargetHeight = true;
      l_0.sourceHeight = (parentHeight - (topPx + bottomPx)) / $getUnitSize(this$static, l_0.targetHeightUnit, true);
    }
  }
  l_0.setTop = l_0.setTargetTop;
  l_0.setBottom = l_0.setTargetBottom;
  l_0.setHeight = l_0.setTargetHeight;
  l_0.topUnit = l_0.targetTopUnit;
  l_0.bottomUnit = l_0.targetBottomUnit;
  l_0.heightUnit = l_0.targetHeightUnit;
}

function $attachChild(this$static, child, userObject){
  var container, layer;
  container = $attachChild_0(this$static.parentElem, child);
  layer = new Layout$Layer_0(container, child, userObject);
  $add_9(this$static.layers, layer);
  return layer;
}

function $getUnitSize(this$static, unit, vertical){
  return $getUnitSizeInPixels(this$static.impl, this$static.parentElem, unit, vertical);
}

function $layout(this$static, duration, callback){
  var l_0, l$iterator, parentHeight, parentWidth;
  if (duration == 0) {
    for (l$iterator = new AbstractList$IteratorImpl_0(this$static.layers); l$iterator.i < l$iterator.this$0_0.size_1();) {
      l_0 = dynamicCast($next_4(l$iterator), 50);
      l_0.left = l_0.sourceLeft = l_0.targetLeft;
      l_0.top_0 = l_0.sourceTop = l_0.targetTop;
      l_0.right = l_0.sourceRight = l_0.targetRight;
      l_0.bottom = l_0.sourceBottom = l_0.targetBottom;
      l_0.width_0 = l_0.sourceWidth = l_0.targetWidth;
      l_0.height_0 = l_0.sourceHeight = l_0.targetHeight;
      l_0.setLeft = l_0.setTargetLeft;
      l_0.setTop = l_0.setTargetTop;
      l_0.setRight = l_0.setTargetRight;
      l_0.setBottom = l_0.setTargetBottom;
      l_0.setWidth = l_0.setTargetWidth;
      l_0.setHeight = l_0.setTargetHeight;
      l_0.leftUnit = l_0.targetLeftUnit;
      l_0.topUnit = l_0.targetTopUnit;
      l_0.rightUnit = l_0.targetRightUnit;
      l_0.bottomUnit = l_0.targetBottomUnit;
      l_0.widthUnit = l_0.targetWidthUnit;
      l_0.heightUnit = l_0.targetHeightUnit;
      $layout_0(l_0);
    }
    return;
  }
  parentWidth = this$static.parentElem.clientWidth;
  parentHeight = this$static.parentElem.clientHeight;
  for (l$iterator = new AbstractList$IteratorImpl_0(this$static.layers); l$iterator.i < l$iterator.this$0_0.size_1();) {
    l_0 = dynamicCast($next_4(l$iterator), 50);
    $adjustHorizontalConstraints(this$static, parentWidth, l_0);
    $adjustVerticalConstraints(this$static, parentHeight, l_0);
  }
  !!this$static.animation && $cancel(this$static.animation);
  this$static.animation = new Layout$1_0(this$static, callback);
  $run(this$static.animation, duration, (new Date).getTime());
}

function $removeChild_0(this$static, layer){
  $removeChild_1(layer.container, layer.child);
  $remove_13(this$static.layers, layer);
}

function Layout_0(parent_0){
  this.impl = new LayoutImpl_0;
  this.layers = new ArrayList_0;
  this.parentElem = parent_0;
  $initParent(this.impl, parent_0);
}

function Layout(){
}

_ = Layout_0.prototype = Layout.prototype = new Object_0;
_.getClass$ = function getClass_130(){
  return Lcom_google_gwt_layout_client_Layout_2_classLit;
}
;
_.castableTypeMap$ = {};
_.animation = null;
_.parentElem = null;
function $onUpdate(this$static, progress){
  var l_0, l$iterator, child;
  for (l$iterator = new AbstractList$IteratorImpl_0(this$static.this$0.layers); l$iterator.i < l$iterator.this$0_0.size_1();) {
    l_0 = dynamicCast($next_4(l$iterator), 50);
    l_0.setTargetLeft && (l_0.left = l_0.sourceLeft + (l_0.targetLeft - l_0.sourceLeft) * progress);
    l_0.setTargetRight && (l_0.right = l_0.sourceRight + (l_0.targetRight - l_0.sourceRight) * progress);
    l_0.setTargetTop && (l_0.top_0 = l_0.sourceTop + (l_0.targetTop - l_0.sourceTop) * progress);
    l_0.setTargetBottom && (l_0.bottom = l_0.sourceBottom + (l_0.targetBottom - l_0.sourceBottom) * progress);
    l_0.setTargetWidth && (l_0.width_0 = l_0.sourceWidth + (l_0.targetWidth - l_0.sourceWidth) * progress);
    l_0.setTargetHeight && (l_0.height_0 = l_0.sourceHeight + (l_0.targetHeight - l_0.sourceHeight) * progress);
    $layout_0(l_0);
    !!this$static.val$callback && (child = l_0.userObject , child != null && child.castableTypeMap$ && !!child.castableTypeMap$[54] && dynamicCast(child, 54).onResize() , undefined);
  }
}

function Layout$1_0(this$0, val$callback){
  this.this$0 = this$0;
  this.val$callback = val$callback;
}

function Layout$1(){
}

_ = Layout$1_0.prototype = Layout$1.prototype = new Animation;
_.getClass$ = function getClass_131(){
  return Lcom_google_gwt_layout_client_Layout$1_2_classLit;
}
;
_.castableTypeMap$ = {67:1};
_.this$0 = null;
_.val$callback = null;
function $clinit_248(){
  $clinit_248 = nullMethod;
  BEGIN = new Layout$Alignment_0('BEGIN', 0);
  END = new Layout$Alignment_0('END', 1);
  STRETCH = new Layout$Alignment_0('STRETCH', 2);
  $VALUES_6 = initValues(_3Lcom_google_gwt_layout_client_Layout$Alignment_2_classLit, {9:1, 66:1, 166:1}, 77, [BEGIN, END, STRETCH]);
}

function Layout$Alignment_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function valueOf_8(name_0){
  $clinit_248();
  return valueOf_0(($clinit_249() , $MAP_6), name_0);
}

function values_7(){
  $clinit_248();
  return $VALUES_6;
}

function Layout$Alignment(){
}

_ = Layout$Alignment_0.prototype = Layout$Alignment.prototype = new Enum;
_.getClass$ = function getClass_132(){
  return Lcom_google_gwt_layout_client_Layout$Alignment_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 77:1};
var $VALUES_6, BEGIN, END, STRETCH;
function $clinit_249(){
  $clinit_249 = nullMethod;
  $MAP_6 = createValueOfMap(($clinit_248() , $VALUES_6));
}

var $MAP_6;
function $setBottomHeight(this$static, bottom, bottomUnit, height, heightUnit){
  this$static.setTargetBottom = this$static.setTargetHeight = true;
  this$static.setTargetTop = false;
  this$static.targetBottom = bottom;
  this$static.targetHeight = height;
  this$static.targetBottomUnit = bottomUnit;
  this$static.targetHeightUnit = heightUnit;
}

function $setLeftRight(this$static, left, leftUnit, right, rightUnit){
  this$static.setTargetLeft = this$static.setTargetRight = true;
  this$static.setTargetWidth = false;
  this$static.targetLeft = left;
  this$static.targetRight = right;
  this$static.targetLeftUnit = leftUnit;
  this$static.targetRightUnit = rightUnit;
}

function $setLeftWidth(this$static, left, leftUnit, width, widthUnit){
  this$static.setTargetLeft = this$static.setTargetWidth = true;
  this$static.setTargetRight = false;
  this$static.targetLeft = left;
  this$static.targetWidth = width;
  this$static.targetLeftUnit = leftUnit;
  this$static.targetWidthUnit = widthUnit;
}

function $setRightWidth(this$static, right, rightUnit, width, widthUnit){
  this$static.setTargetRight = this$static.setTargetWidth = true;
  this$static.setTargetLeft = false;
  this$static.targetRight = right;
  this$static.targetWidth = width;
  this$static.targetRightUnit = rightUnit;
  this$static.targetWidthUnit = widthUnit;
}

function $setTopBottom(this$static, top_0, topUnit, bottom, bottomUnit){
  this$static.setTargetTop = this$static.setTargetBottom = true;
  this$static.setTargetHeight = false;
  this$static.targetTop = top_0;
  this$static.targetBottom = bottom;
  this$static.targetTopUnit = topUnit;
  this$static.targetBottomUnit = bottomUnit;
}

function $setTopHeight(this$static, top_0, topUnit, height, heightUnit){
  this$static.setTargetTop = this$static.setTargetHeight = true;
  this$static.setTargetBottom = false;
  this$static.targetTop = top_0;
  this$static.targetHeight = height;
  this$static.targetTopUnit = topUnit;
  this$static.targetHeightUnit = heightUnit;
}

function Layout$Layer_0(container, child, userObject){
  this.targetLeftUnit = ($clinit_88() , PX);
  this.targetTopUnit = PX;
  this.targetRightUnit = PX;
  this.targetBottomUnit = PX;
  this.hPos = ($clinit_248() , STRETCH);
  this.vPos = STRETCH;
  this.container = container;
  this.child = child;
  this.userObject = userObject;
}

function Layout$Layer(){
}

_ = Layout$Layer_0.prototype = Layout$Layer.prototype = new Object_0;
_.getClass$ = function getClass_133(){
  return Lcom_google_gwt_layout_client_Layout$Layer_2_classLit;
}
;
_.castableTypeMap$ = {50:1};
_.bottom = 0;
_.bottomUnit = null;
_.child = null;
_.container = null;
_.height_0 = 0;
_.heightUnit = null;
_.left = 0;
_.leftUnit = null;
_.right = 0;
_.rightUnit = null;
_.setBottom = false;
_.setHeight = false;
_.setLeft = false;
_.setRight = false;
_.setTargetBottom = true;
_.setTargetHeight = false;
_.setTargetLeft = true;
_.setTargetRight = true;
_.setTargetTop = true;
_.setTargetWidth = false;
_.setTop = false;
_.setWidth = false;
_.sourceBottom = 0;
_.sourceHeight = 0;
_.sourceLeft = 0;
_.sourceRight = 0;
_.sourceTop = 0;
_.sourceWidth = 0;
_.targetBottom = 0;
_.targetHeight = 0;
_.targetHeightUnit = null;
_.targetLeft = 0;
_.targetRight = 0;
_.targetTop = 0;
_.targetWidth = 0;
_.targetWidthUnit = null;
_.top_0 = 0;
_.topUnit = null;
_.userObject = null;
_.width_0 = 0;
_.widthUnit = null;
function $clinit_252(){
  $clinit_252 = nullMethod;
  fixedRuler = createRuler(($clinit_88() , CM), CM);
  $doc.body.appendChild(fixedRuler);
}

function $attachChild_0(parent_0, child){
  var container, style;
  container = $doc.createElement('div');
  container.appendChild(child);
  container.style['position'] = ($clinit_82() , 'absolute');
  container.style['overflow'] = ($clinit_76() , 'hidden');
  style = child.style;
  style['position'] = 'absolute';
  style['left'] = 0 + ($clinit_88() , 'px');
  style['top'] = '0px';
  style['right'] = '0px';
  style['bottom'] = '0px';
  parent_0.insertBefore(container, null);
  return container;
}

function $getUnitSizeInPixels(this$static, parent_0, unit, vertical){
  if (!unit) {
    return 1;
  }
  switch (unit.ordinal) {
    case 1:
      return (vertical?parent_0.clientHeight:parent_0.clientWidth) / 100;
    case 2:
      return (this$static.relativeRuler.offsetWidth || 0) / 10;
    case 3:
      return (this$static.relativeRuler.offsetHeight || 0) / 10;
    case 7:
      return (fixedRuler.offsetWidth || 0) * 0.1;
    case 8:
      return (fixedRuler.offsetWidth || 0) * 0.01;
    case 6:
      return (fixedRuler.offsetWidth || 0) * 0.254;
    case 4:
      return (fixedRuler.offsetWidth || 0) * 0.00353;
    case 5:
      return (fixedRuler.offsetWidth || 0) * 0.0423;
    default:case 0:
      return 1;
  }
}

function $initParent(this$static, parent_0){
  parent_0.style['position'] = ($clinit_82() , 'relative');
  parent_0.appendChild(this$static.relativeRuler = createRuler(($clinit_88() , EM), EX));
}

function $layout_0(layer){
  var style;
  style = layer.container.style;
  style['display'] = '';
  style['left'] = layer.setLeft?layer.left + 'px':'';
  style['top'] = layer.setTop?layer.top_0 + 'px':'';
  style['right'] = layer.setRight?layer.right + 'px':'';
  style['bottom'] = layer.setBottom?layer.bottom + 'px':'';
  style['width'] = layer.setWidth?layer.width_0 + 'px':'';
  style['height'] = layer.setHeight?layer.height_0 + 'px':'';
  style = layer.child.style;
  switch (layer.hPos.ordinal) {
    case 0:
      style['left'] = 0 + ($clinit_88() , 'px');
      style['right'] = '';
      break;
    case 1:
      style['left'] = '';
      style['right'] = 0 + ($clinit_88() , 'px');
      break;
    case 2:
      style['left'] = 0 + ($clinit_88() , 'px');
      style['right'] = '0px';
  }
  switch (layer.vPos.ordinal) {
    case 0:
      style['top'] = 0 + ($clinit_88() , 'px');
      style['bottom'] = '';
      break;
    case 1:
      style['top'] = '';
      style['bottom'] = 0 + ($clinit_88() , 'px');
      break;
    case 2:
      style['top'] = 0 + ($clinit_88() , 'px');
      style['bottom'] = '0px';
  }
}

function $removeChild_1(container, child){
  var style;
  $removeFromParent(container);
  $getParentElement(child) == container && $removeFromParent(child);
  style = child.style;
  style['position'] = '';
  style['left'] = '';
  style['top'] = '';
  style['width'] = '';
  style['height'] = '';
}

function LayoutImpl_0(){
  $clinit_252();
}

function createRuler(widthUnit, heightUnit){
  var ruler, style;
  ruler = $doc.createElement('div');
  ruler.innerHTML = '&nbsp;';
  style = ruler.style;
  style['position'] = ($clinit_82() , 'absolute');
  style['zIndex'] = '-32767';
  style['top'] = -20 + heightUnit.getType();
  style['width'] = 10 + widthUnit.getType();
  style['height'] = 10 + heightUnit.getType();
  return ruler;
}

function LayoutImpl(){
}

_ = LayoutImpl_0.prototype = LayoutImpl.prototype = new Object_0;
_.getClass$ = function getClass_134(){
  return Lcom_google_gwt_layout_client_LayoutImpl_2_classLit;
}
;
_.castableTypeMap$ = {};
_.relativeRuler = null;
var fixedRuler = null;
function AbstractRenderer(){
}

_ = AbstractRenderer.prototype = new Object_0;
_.getClass$ = function getClass_136(){
  return Lcom_google_gwt_text_shared_AbstractRenderer_2_classLit;
}
;
_.castableTypeMap$ = {};
function PassthroughParser_0(){
}

function PassthroughParser(){
}

_ = PassthroughParser_0.prototype = PassthroughParser.prototype = new Object_0;
_.getClass$ = function getClass_137(){
  return Lcom_google_gwt_text_shared_testing_PassthroughParser_2_classLit;
}
;
_.castableTypeMap$ = {};
var INSTANCE_0 = null;
function PassthroughRenderer_0(){
}

function PassthroughRenderer(){
}

_ = PassthroughRenderer_0.prototype = PassthroughRenderer.prototype = new AbstractRenderer;
_.getClass$ = function getClass_138(){
  return Lcom_google_gwt_text_shared_testing_PassthroughRenderer_2_classLit;
}
;
_.castableTypeMap$ = {};
var INSTANCE_1 = null;
function attachToDom(element){
  var origParent, origSibling;
  ensureHiddenDiv();
  origParent = $getParentElement(element);
  origSibling = $getNextSiblingElement(element);
  hiddenDiv.appendChild(element);
  return new UiBinderUtil$TempAttachment_0(origParent, origSibling, element);
}

function orphan(node){
  node.parentNode.removeChild(node);
}

function UiBinderUtil$TempAttachment_0(origParent, origSibling, element){
  this.origParent = origParent;
  this.origSibling = origSibling;
  this.element = element;
}

function UiBinderUtil$TempAttachment(){
}

_ = UiBinderUtil$TempAttachment_0.prototype = UiBinderUtil$TempAttachment.prototype = new Object_0;
_.getClass$ = function getClass_139(){
  return Lcom_google_gwt_uibinder_client_UiBinderUtil$TempAttachment_2_classLit;
}
;
_.castableTypeMap$ = {};
_.element = null;
_.origParent = null;
_.origSibling = null;
function sinkEvents_0(elem, eventBits){
  $maybeInitializeEventSystem();
  $sinkEventsImpl(elem, eventBits);
}

function $eventGetFromElement(evt){
  if ($equals_3(evt.type, 'mouseover')) {
    return evt.relatedTarget;
  }
  if ($equals_3(evt.type, 'mouseout')) {
    return evt.target;
  }
  return null;
}

function $eventGetToElement(evt){
  if ($equals_3(evt.type, 'mouseover')) {
    return evt.target;
  }
  if ($equals_3(evt.type, 'mouseout')) {
    return evt.relatedTarget;
  }
  return null;
}

function $getChild(elem, index){
  var count = 0, child = elem.firstChild;
  while (child) {
    if (child.nodeType == 1) {
      if (index == count)
        return child;
      ++count;
    }
    child = child.nextSibling;
  }
  return null;
}

function $getChildCount(elem){
  var count = 0, child = elem.firstChild;
  while (child) {
    child.nodeType == 1 && ++count;
    child = child.nextSibling;
  }
  return count;
}

function $insertChild(parent_0, toAdd, index){
  var count = 0, child = parent_0.firstChild, before = null;
  while (child) {
    if (child.nodeType == 1) {
      if (count == index) {
        before = child;
        break;
      }
      ++count;
    }
    child = child.nextSibling;
  }
  parent_0.insertBefore(toAdd, before);
}

function $replaceNode(node, newNode){
  var p = node.parentNode;
  if (!p) {
    return;
  }
  p.insertBefore(newNode, node);
  p.removeChild(node);
}

function $setHeight(this$static, height){
  this$static.element.style['height'] = height;
}

function $setStyleName(this$static, style){
  setStyleName_0(this$static.element, style, true);
}

function getStylePrimaryName(elem){
  var fullClassName, spaceIdx;
  fullClassName = elem['className'] == null?null:String(elem['className']);
  spaceIdx = fullClassName.indexOf(fromCodePoint(32));
  if (spaceIdx >= 0) {
    return fullClassName.substr(0, spaceIdx - 0);
  }
  return fullClassName;
}

function $addHandler_1(this$static, handler, type){
  return $addHandler_0((!this$static.handlerManager?(this$static.handlerManager = new HandlerManager_0(this$static)):this$static.handlerManager).eventBus, type, handler);
}

function $replaceElement(this$static, elem){
  this$static.attached && (this$static.element.__listener = null , undefined);
  !!this$static.element && $replaceNode(this$static.element, elem);
  this$static.element = elem;
  this$static.attached && (this$static.element.__listener = this$static , undefined);
}

function $clear_1(this$static){
  var it;
  it = new WidgetCollection$WidgetIterator_0(this$static.children_0);
  while (it.index_0 < it.this$0.size_0 - 1) {
    $next_1(it);
    $remove_6(it);
  }
}

function $adjustIndex(this$static, child, beforeIndex){
  var idx;
  $checkIndexBoundsForInsertion(this$static, beforeIndex);
  if (child.parent_0 == this$static) {
    idx = $indexOf(this$static.getChildren(), child);
    idx < beforeIndex && --beforeIndex;
  }
  return beforeIndex;
}

function $checkIndexBoundsForInsertion(this$static, index){
  if (index < 0 || index > this$static.getChildren().size_0) {
    throw new IndexOutOfBoundsException_0;
  }
}

function $doLogicalClear(this$static){
  !this$static.orphanCommand && (this$static.orphanCommand = new ComplexPanel$1_0);
  try {
    tryCommand(this$static, this$static.orphanCommand);
  }
   finally {
    this$static.children_0 = new WidgetCollection_0(this$static);
  }
}

function $insert(this$static, child, container, beforeIndex){
  beforeIndex = $adjustIndex(this$static, child, beforeIndex);
  $removeFromParent_0(child);
  $insert_2(this$static.getChildren(), child, beforeIndex);
  $insertChild(container, child.element, beforeIndex);
  $setParent(child, this$static);
}

function AbstractImagePrototype(){
}

_ = AbstractImagePrototype.prototype = new Object_0;
_.getClass$ = function getClass_153(){
  return Lcom_google_gwt_user_client_ui_AbstractImagePrototype_2_classLit;
}
;
_.castableTypeMap$ = {};
function $clinit_299(){
  $clinit_299 = nullMethod;
  impl_0 = ($clinit_401() , $clinit_401() , implWidget);
}

function FocusWidget(){
}

_ = FocusWidget.prototype = new Widget;
_.getClass$ = function getClass_157(){
  return Lcom_google_gwt_user_client_ui_FocusWidget_2_classLit;
}
;
_.getTabIndex = function getTabIndex(){
  return $getTabIndex(this.element);
}
;
_.onAttach = function onAttach_0(){
  var tabIndex;
  $onAttach(this);
  tabIndex = this.getTabIndex();
  -1 == tabIndex && this.setTabIndex(0);
}
;
_.setTabIndex = function setTabIndex(index){
  this.element.tabIndex = index;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
var impl_0;
function ButtonBase(){
}

_ = ButtonBase.prototype = new FocusWidget;
_.getClass$ = function getClass_158(){
  return Lcom_google_gwt_user_client_ui_ButtonBase_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
function Button_0(){
  var e;
  $clinit_299();
  this.element = (e = $doc.createElement('BUTTON') , e.setAttribute('type', 'button') , e);
  this.element['className'] = 'gwt-Button';
}

function Button_1(html){
  $clinit_299();
  Button_0.call(this);
  this.element.innerHTML = html || '';
}

function Button_2(html, handler){
  $clinit_299();
  Button_0.call(this);
  this.element.innerHTML = html || '';
  $addDomHandler(this, handler, ($clinit_112() , $clinit_112() , TYPE_1));
}

function Button(){
}

_ = Button_2.prototype = Button_1.prototype = Button_0.prototype = Button.prototype = new ButtonBase;
_.getClass$ = function getClass_159(){
  return Lcom_google_gwt_user_client_ui_Button_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
function CellPanel_0(){
  this.children_0 = new WidgetCollection_0(this);
  this.table = $doc.createElement('table');
  this.body_0 = $doc.createElement('tbody');
  this.table.appendChild(this.body_0);
  this.element = this.table;
}

function CellPanel(){
}

_ = CellPanel.prototype = new ComplexPanel;
_.getClass$ = function getClass_160(){
  return Lcom_google_gwt_user_client_ui_CellPanel_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 59:1};
_.body_0 = null;
_.table = null;
function $addValueChangeHandler(this$static, handler){
  if (!this$static.valueChangeHandlerInitialized) {
    this$static.ensureDomEventHandlers();
    this$static.valueChangeHandlerInitialized = true;
  }
  return $addHandler_1(this$static, handler, (!TYPE_11 && (TYPE_11 = new GwtEvent$Type_0) , TYPE_11));
}

function $getValue_1(this$static){
  return this$static.attached?($clinit_415() , this$static.inputElem.checked?TRUE_0:FALSE_0):($clinit_415() , this$static.inputElem.defaultChecked?TRUE_0:FALSE_0);
}

function $setValue_1(this$static, value){
  var oldValue;
  !value && (value = ($clinit_415() , FALSE_0));
  oldValue = this$static.attached?($clinit_415() , this$static.inputElem.checked?TRUE_0:FALSE_0):($clinit_415() , this$static.inputElem.defaultChecked?TRUE_0:FALSE_0);
  this$static.inputElem.checked = value.value_0;
  this$static.inputElem.defaultChecked = value.value_0;
  if (!!oldValue && oldValue.value_0 == value.value_0) {
    return;
  }
}

function CheckBox_1(label){
  var e;
  $clinit_299();
  CheckBox_2.call(this, (e = $doc.createElement('INPUT') , e.type = 'checkbox' , e));
  this.element['className'] = 'gwt-CheckBox';
  this.labelElem.textContent = label || '';
}

function CheckBox_2(elem){
  var uid;
  this.element = $doc.createElement('span');
  this.inputElem = elem;
  this.labelElem = $doc.createElement('label');
  this.element.appendChild(this.inputElem);
  this.element.appendChild(this.labelElem);
  uid = $createUniqueId($doc);
  this.inputElem['id'] = uid;
  this.labelElem.htmlFor = uid;
  !!this.inputElem && (this.inputElem.tabIndex = 0 , undefined);
}

function CheckBox(){
}

_ = CheckBox_1.prototype = CheckBox.prototype = new ButtonBase;
_.ensureDomEventHandlers = function ensureDomEventHandlers(){
  $addDomHandler(this, new CheckBox$1_0(this), ($clinit_112() , $clinit_112() , TYPE_1));
}
;
_.getClass$ = function getClass_161(){
  return Lcom_google_gwt_user_client_ui_CheckBox_2_classLit;
}
;
_.getTabIndex = function getTabIndex_0(){
  return $getTabIndex(this.inputElem);
}
;
_.onLoad = function onLoad_2(){
  this.inputElem.__listener = this;
}
;
_.onUnload = function onUnload_0(){
  this.inputElem.__listener = null;
  $setValue_1(this, this.attached?($clinit_415() , this.inputElem.checked?TRUE_0:FALSE_0):($clinit_415() , this.inputElem.defaultChecked?TRUE_0:FALSE_0));
}
;
_.setTabIndex = function setTabIndex_0(index){
  !!this.inputElem && (this.inputElem.tabIndex = index , undefined);
}
;
_.sinkEvents = function sinkEvents_2(eventBitsToAdd){
  this.eventsToSink == -1?sinkEvents_0(this.inputElem, eventBitsToAdd | (this.inputElem.__eventBits || 0)):this.eventsToSink == -1?sinkEvents(this.element, eventBitsToAdd | (this.element.__eventBits || 0)):(this.eventsToSink |= eventBitsToAdd);
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
_.inputElem = null;
_.labelElem = null;
_.valueChangeHandlerInitialized = false;
function CheckBox$1_0(this$0){
  this.this$0 = this$0;
}

function CheckBox$1(){
}

_ = CheckBox$1_0.prototype = CheckBox$1.prototype = new Object_0;
_.getClass$ = function getClass_162(){
  return Lcom_google_gwt_user_client_ui_CheckBox$1_2_classLit;
}
;
_.onClick = function onClick(event_0){
  fire_1(this.this$0, $getValue_1(this.this$0));
}
;
_.castableTypeMap$ = {24:1, 37:1};
_.this$0 = null;
function ComplexPanel$1_0(){
}

function ComplexPanel$1(){
}

_ = ComplexPanel$1_0.prototype = ComplexPanel$1.prototype = new Object_0;
_.execute_1 = function execute_6(w){
  $setParent(w, null);
}
;
_.getClass$ = function getClass_163(){
  return Lcom_google_gwt_user_client_ui_ComplexPanel$1_2_classLit;
}
;
_.castableTypeMap$ = {};
function $doLayout(this$static){
  var bottom, child, child$iterator, data, layer, left, right, top_0;
  left = 0;
  top_0 = 0;
  right = 0;
  bottom = 0;
  for (child$iterator = new WidgetCollection$WidgetIterator_0(this$static.children_0); child$iterator.index_0 < child$iterator.this$0.size_0 - 1;) {
    child = $next_1(child$iterator);
    data = child.layoutData;
    layer = data.layer;
    switch ($getResolvedDirection(data.direction).ordinal) {
      case 0:
        $setLeftRight(layer, left, this$static.unit, right, this$static.unit);
        $setTopHeight(layer, top_0, this$static.unit, data.size_0, this$static.unit);
        top_0 += data.size_0;
        break;
      case 2:
        $setLeftRight(layer, left, this$static.unit, right, this$static.unit);
        $setBottomHeight(layer, bottom, this$static.unit, data.size_0, this$static.unit);
        bottom += data.size_0;
        break;
      case 3:
        $setTopBottom(layer, top_0, this$static.unit, bottom, this$static.unit);
        $setLeftWidth(layer, left, this$static.unit, data.size_0, this$static.unit);
        left += data.size_0;
        break;
      case 1:
        $setTopBottom(layer, top_0, this$static.unit, bottom, this$static.unit);
        $setRightWidth(layer, right, this$static.unit, data.size_0, this$static.unit);
        right += data.size_0;
        break;
      case 4:
        $setLeftRight(layer, left, this$static.unit, right, this$static.unit);
        $setTopBottom(layer, top_0, this$static.unit, bottom, this$static.unit);
    }
  }
}

function $getResolvedDirection(direction){
  if (direction == ($clinit_309() , LINE_START)) {
    return $clinit_204() , WEST;
  }
   else if (direction == LINE_END) {
    return $clinit_204() , EAST;
  }
  return direction;
}

function $insert_0(this$static, widget, direction, size){
  var children, data, layer;
  $removeFromParent_0(widget);
  children = this$static.children_0;
  $insert_2(children, widget, children.size_0);
  direction == ($clinit_309() , CENTER) && (this$static.center = widget);
  layer = $attachChild(this$static.layout, widget.element, widget);
  data = new DockLayoutPanel$LayoutData_0(direction, size, layer);
  widget.layoutData = data;
  $setParent(widget, this$static);
  $schedule_0(this$static.layoutCmd);
}

function DockLayoutPanel_0(unit){
  this.children_0 = new WidgetCollection_0(this);
  this.unit = unit;
  this.element = $doc.createElement('div');
  this.layout = new Layout_0(this.element);
  this.layoutCmd = new DockLayoutPanel$DockAnimateCommand_0(this, this.layout);
}

function DockLayoutPanel(){
}

_ = DockLayoutPanel_0.prototype = DockLayoutPanel.prototype = new ComplexPanel;
_.getClass$ = function getClass_166(){
  return Lcom_google_gwt_user_client_ui_DockLayoutPanel_2_classLit;
}
;
_.onLoad = function onLoad_3(){
}
;
_.onResize = function onResize(){
  var child, child$iterator;
  for (child$iterator = new WidgetCollection$WidgetIterator_0(this.children_0); child$iterator.index_0 < child$iterator.this$0.size_0 - 1;) {
    child = $next_1(child$iterator);
    child != null && child.castableTypeMap$ && !!child.castableTypeMap$[54] && dynamicCast(child, 54).onResize();
  }
}
;
_.onUnload = function onUnload_1(){
}
;
_.remove_2 = function remove_4(w){
  var data, removed;
  removed = $remove_1(this, w);
  if (removed) {
    w == this.center && (this.center = null);
    data = w.layoutData;
    $removeChild_0(this.layout, data.layer);
  }
  return removed;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 54:1, 57:1, 59:1};
_.center = null;
_.layout = null;
_.layoutCmd = null;
_.unit = null;
function $clinit_309(){
  $clinit_309 = nullMethod;
  NORTH = new DockLayoutPanel$Direction_0('NORTH', 0);
  EAST = new DockLayoutPanel$Direction_0('EAST', 1);
  SOUTH = new DockLayoutPanel$Direction_0('SOUTH', 2);
  WEST = new DockLayoutPanel$Direction_0('WEST', 3);
  CENTER = new DockLayoutPanel$Direction_0('CENTER', 4);
  LINE_START = new DockLayoutPanel$Direction_0('LINE_START', 5);
  LINE_END = new DockLayoutPanel$Direction_0('LINE_END', 6);
  $VALUES_7 = initValues(_3Lcom_google_gwt_user_client_ui_DockLayoutPanel$Direction_2_classLit, {9:1, 66:1, 166:1}, 78, [NORTH, EAST, SOUTH, WEST, CENTER, LINE_START, LINE_END]);
}

function DockLayoutPanel$Direction_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function valueOf_9(name_0){
  $clinit_309();
  return valueOf_0(($clinit_310() , $MAP_7), name_0);
}

function values_8(){
  $clinit_309();
  return $VALUES_7;
}

function DockLayoutPanel$Direction(){
}

_ = DockLayoutPanel$Direction_0.prototype = DockLayoutPanel$Direction.prototype = new Enum;
_.getClass$ = function getClass_167(){
  return Lcom_google_gwt_user_client_ui_DockLayoutPanel$Direction_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 78:1};
var $VALUES_7, CENTER, EAST, LINE_END, LINE_START, NORTH, SOUTH, WEST;
function $clinit_310(){
  $clinit_310 = nullMethod;
  $MAP_7 = createValueOfMap(($clinit_309() , $VALUES_7));
}

var $MAP_7;
function $schedule_0(this$static){
  this$static.duration = 0;
  this$static.canceled = false;
  if (!this$static.scheduled) {
    this$static.scheduled = true;
    $scheduleFinally(($clinit_30() , INSTANCE), this$static);
  }
}

function LayoutCommand(){
}

_ = LayoutCommand.prototype = new Object_0;
_.doBeforeLayout = function doBeforeLayout(){
}
;
_.execute_0 = function execute_7(){
  this.scheduled = false;
  if (this.canceled) {
    return;
  }
  this.doBeforeLayout();
  $layout(this.layout, this.duration, new LayoutCommand$1_0);
}
;
_.getClass$ = function getClass_168(){
  return Lcom_google_gwt_user_client_ui_LayoutCommand_2_classLit;
}
;
_.castableTypeMap$ = {41:1};
_.canceled = false;
_.duration = 0;
_.layout = null;
_.scheduled = false;
function DockLayoutPanel$DockAnimateCommand_0(this$0, layout){
  this.this$0 = this$0;
  this.layout = layout;
}

function DockLayoutPanel$DockAnimateCommand(){
}

_ = DockLayoutPanel$DockAnimateCommand_0.prototype = DockLayoutPanel$DockAnimateCommand.prototype = new LayoutCommand;
_.doBeforeLayout = function doBeforeLayout_0(){
  $doLayout(this.this$0);
}
;
_.getClass$ = function getClass_169(){
  return Lcom_google_gwt_user_client_ui_DockLayoutPanel$DockAnimateCommand_2_classLit;
}
;
_.castableTypeMap$ = {41:1};
_.this$0 = null;
function DockLayoutPanel$LayoutData_0(direction, size, layer){
  this.direction = direction;
  this.size_0 = size;
  this.layer = layer;
}

function DockLayoutPanel$LayoutData(){
}

_ = DockLayoutPanel$LayoutData_0.prototype = DockLayoutPanel$LayoutData.prototype = new Object_0;
_.getClass$ = function getClass_170(){
  return Lcom_google_gwt_user_client_ui_DockLayoutPanel$LayoutData_2_classLit;
}
;
_.castableTypeMap$ = {};
_.direction = null;
_.layer = null;
_.size_0 = 0;
function FileUpload_0(){
  var e;
  this.element = (e = $doc.createElement('INPUT') , e.type = 'file' , e);
  this.element['className'] = 'gwt-FileUpload';
}

function FileUpload(){
}

_ = FileUpload_0.prototype = FileUpload.prototype = new Widget;
_.getClass$ = function getClass_171(){
  return Lcom_google_gwt_user_client_ui_FileUpload_2_classLit;
}
;
_.onBrowserEvent = function onBrowserEvent_1(event_0){
  $onBrowserEvent(this, event_0);
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
function $add_2(this$static, w){
  $add_0(this$static, w, this$static.element);
}

function $clear_2(this$static){
  var child;
  try {
    $doLogicalClear(this$static);
  }
   finally {
    child = this$static.element.firstChild;
    while (child) {
      this$static.element.removeChild(child);
      child = this$static.element.firstChild;
    }
  }
}

function $insert_1(this$static, w, beforeIndex){
  $insert(this$static, w, this$static.element, beforeIndex);
}

function FlowPanel_0(){
  this.children_0 = new WidgetCollection_0(this);
  this.element = $doc.createElement('div');
}

function FlowPanel(){
}

_ = FlowPanel_0.prototype = FlowPanel.prototype = new ComplexPanel;
_.getClass$ = function getClass_172(){
  return Lcom_google_gwt_user_client_ui_FlowPanel_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 59:1};
function $add_3(this$static, w){
  if (this$static.widget) {
    throw new IllegalStateException_1('SimplePanel can only contain one child widget');
  }
  $setWidget(this$static, w);
}

function $remove_3(this$static, w){
  if (this$static.widget != w) {
    return false;
  }
  try {
    $setParent(w, null);
  }
   finally {
    this$static.getContainerElement().removeChild(w.element);
    this$static.widget = null;
  }
  return true;
}

function $setWidget(this$static, w){
  if (w == this$static.widget) {
    return;
  }
  !!w && $removeFromParent_0(w);
  !!this$static.widget && $remove_3(this$static, this$static.widget);
  this$static.widget = w;
  if (w) {
    this$static.getContainerElement().appendChild(this$static.widget.element);
    $setParent(w, this$static);
  }
}

function SimplePanel_0(){
  this.element = $doc.createElement('div');
}

_ = SimplePanel_0.prototype = SimplePanel.prototype;
_.getClass$ = function getClass_173(){
  return Lcom_google_gwt_user_client_ui_SimplePanel_2_classLit;
}
;
_.getContainerElement = function getContainerElement(){
  return this.element;
}
;
_.iterator_0 = function iterator_2(){
  return new SimplePanel$1_0(this);
}
;
_.remove_2 = function remove_5(w){
  return $remove_3(this, w);
}
;
function $clinit_318(){
  $clinit_318 = nullMethod;
  impl_1 = ($clinit_401() , $clinit_401() , implPanel);
}

var impl_1;
function $fireSubmitEvent(this$static){
  var event_0;
  event_0 = new FormPanel$SubmitEvent_0;
  !!this$static.handlerManager && $fireEvent(this$static.handlerManager, event_0);
  return true;
}

function $submit_0(this$static){
  if (!$fireSubmitEvent(this$static)) {
    return;
  }
  $submit_1(this$static.element, this$static.synthesizedFrame);
}

function FormPanel_0(){
  this.element = $doc.createElement('form');
  this.frameName = 'FormPanel_' + $moduleName + '_' + ++formId;
  this.element.target = this.frameName;
  this.eventsToSink == -1?sinkEvents(this.element, 32768 | (this.element.__eventBits || 0)):(this.eventsToSink |= 32768);
}

function FormPanel(){
}

_ = FormPanel_0.prototype = FormPanel.prototype = new SimplePanel;
_.getClass$ = function getClass_174(){
  return Lcom_google_gwt_user_client_ui_FormPanel_2_classLit;
}
;
_.onAttach = function onAttach_2(){
  var dummy;
  $onAttach(this);
  if (this.frameName != null) {
    dummy = $doc.createElement('div');
    dummy.innerHTML = "<iframe src=\"javascript:''\" name='" + this.frameName + "' style='position:absolute;width:0;height:0;border:0'>" || '';
    this.synthesizedFrame = $getFirstChildElement(dummy);
    $doc.body.appendChild(this.synthesizedFrame);
  }
  $hookEvents(this.synthesizedFrame, this.element, this);
}
;
_.onDetach = function onDetach_1(){
  $onDetach(this);
  $unhookEvents(this.synthesizedFrame, this.element);
  if (this.synthesizedFrame) {
    $doc.body.removeChild(this.synthesizedFrame);
    this.synthesizedFrame = null;
  }
}
;
_.onFormSubmit = function onFormSubmit(){
  return $fireSubmitEvent(this);
}
;
_.onFrameLoad = function onFrameLoad(){
  addCommand(new FormPanel$1_0(this));
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 59:1};
_.frameName = null;
_.synthesizedFrame = null;
var formId = 0;
function FormPanel$1_0(this$0){
  this.this$0 = this$0;
}

function FormPanel$1(){
}

_ = FormPanel$1_0.prototype = FormPanel$1.prototype = new Object_0;
_.execute_0 = function execute_8(){
  $fireEvent_1(this.this$0, new FormPanel$SubmitCompleteEvent_0($getContents(this.this$0.synthesizedFrame)));
}
;
_.getClass$ = function getClass_175(){
  return Lcom_google_gwt_user_client_ui_FormPanel$1_2_classLit;
}
;
_.castableTypeMap$ = {41:1, 51:1};
_.this$0 = null;
function FormPanel$SubmitCompleteEvent_0(resultsHtml){
  this.resultHtml = resultsHtml;
}

function FormPanel$SubmitCompleteEvent(){
}

_ = FormPanel$SubmitCompleteEvent_0.prototype = FormPanel$SubmitCompleteEvent.prototype = new GwtEvent;
_.dispatch = function dispatch_13(handler){
  $onSubmitComplete(dynamicCast(handler, 55), this);
}
;
_.getAssociatedType = function getAssociatedType_14(){
  return TYPE_13;
}
;
_.getClass$ = function getClass_176(){
  return Lcom_google_gwt_user_client_ui_FormPanel$SubmitCompleteEvent_2_classLit;
}
;
_.castableTypeMap$ = {};
_.resultHtml = null;
var TYPE_13 = null;
function $clinit_324(){
  $clinit_324 = nullMethod;
  TYPE_14 = new GwtEvent$Type_0;
}

function FormPanel$SubmitEvent_0(){
  $clinit_324();
}

function FormPanel$SubmitEvent(){
}

_ = FormPanel$SubmitEvent_0.prototype = FormPanel$SubmitEvent.prototype = new GwtEvent;
_.dispatch = function dispatch_14(handler){
  dynamicCast(handler, 56);
}
;
_.getAssociatedType = function getAssociatedType_15(){
  return TYPE_14;
}
;
_.getClass$ = function getClass_177(){
  return Lcom_google_gwt_user_client_ui_FormPanel$SubmitEvent_2_classLit;
}
;
_.castableTypeMap$ = {};
var TYPE_14;
function Label_2(element){
  LabelBase_2.call(this, element, $equalsIgnoreCase('span', element.tagName));
}

function HTML_1(html){
  Label_2.call(this, $doc.createElement('div'));
  this.element['className'] = 'gwt-HTML';
  $setTextOrHtml(this.directionalTextHelper, html, true);
}

function HTML(){
}

_ = HTML_1.prototype = HTML.prototype = new Label;
_.getClass$ = function getClass_181(){
  return Lcom_google_gwt_user_client_ui_HTML_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
function $add_4(this$static, widget, elem){
  var clientElem;
  clientElem = elem;
  $removeFromParent_0(widget);
  $add_7(this$static.getChildren(), widget);
  clientElem.appendChild(widget.element);
  $setParent(widget, this$static);
}

function HTMLPanel_0(html){
  this.children_0 = new WidgetCollection_0(this);
  this.element = $doc.createElement('div');
  this.element.innerHTML = html || '';
}

function HTMLPanel(){
}

_ = HTMLPanel_0.prototype = HTMLPanel.prototype = new ComplexPanel;
_.getClass$ = function getClass_182(){
  return Lcom_google_gwt_user_client_ui_HTMLPanel_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 59:1};
function $clinit_347(){
  $clinit_347 = nullMethod;
  new HasVerticalAlignment$VerticalAlignmentConstant_0('bottom');
  new HasVerticalAlignment$VerticalAlignmentConstant_0('middle');
  ALIGN_TOP = new HasVerticalAlignment$VerticalAlignmentConstant_0('top');
}

var ALIGN_TOP;
function HasVerticalAlignment$VerticalAlignmentConstant_0(verticalAlignString){
  this.verticalAlignString = verticalAlignString;
}

function HasVerticalAlignment$VerticalAlignmentConstant(){
}

_ = HasVerticalAlignment$VerticalAlignmentConstant_0.prototype = HasVerticalAlignment$VerticalAlignmentConstant.prototype = new Object_0;
_.getClass$ = function getClass_185(){
  return Lcom_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_2_classLit;
}
;
_.castableTypeMap$ = {};
_.verticalAlignString = null;
function $setName_0(this$static, name_0){
  if (name_0 == null) {
    throw new NullPointerException_1('Name cannot be null');
  }
   else if ($equals_3(name_0, '')) {
    throw new IllegalArgumentException_1('Name cannot be an empty string.');
  }
  this$static.element.name = name_0;
}

function Hidden_0(){
  var e;
  this.element = (e = $doc.createElement('INPUT') , e.type = 'hidden' , e);
}

function Hidden(){
}

_ = Hidden_0.prototype = Hidden.prototype = new Widget;
_.getClass$ = function getClass_186(){
  return Lcom_google_gwt_user_client_ui_Hidden_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
function $add_5(this$static, w){
  var td, td_0;
  td = (td_0 = $doc.createElement('td') , td_0['align'] = this$static.horzAlign.textAlignString , td_0.style['verticalAlign'] = this$static.vertAlign.verticalAlignString , td_0);
  this$static.tableRow.appendChild(td);
  $removeFromParent_0(w);
  $add_7(this$static.getChildren(), w);
  td.appendChild(w.element);
  $setParent(w, this$static);
}

function HorizontalPanel_0(){
  CellPanel_0.call(this);
  this.horzAlign = ($clinit_340() , ALIGN_DEFAULT);
  this.vertAlign = ($clinit_347() , ALIGN_TOP);
  this.tableRow = $doc.createElement('tr');
  this.body_0.appendChild(this.tableRow);
  this.table['cellSpacing'] = '0';
  this.table['cellPadding'] = '0';
}

function HorizontalPanel(){
}

_ = HorizontalPanel_0.prototype = HorizontalPanel.prototype = new CellPanel;
_.getClass$ = function getClass_187(){
  return Lcom_google_gwt_user_client_ui_HorizontalPanel_2_classLit;
}
;
_.remove_2 = function remove_6(w){
  var removed, td, parent_0;
  td = (parent_0 = w.element.parentNode , (!parent_0 || parent_0.nodeType != 1) && (parent_0 = null) , parent_0);
  removed = $remove_1(this, w);
  removed && this.tableRow.removeChild(td);
  return removed;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 59:1};
_.tableRow = null;
function $clinit_354(){
  $clinit_354 = nullMethod;
  new HashMap_0;
}

function Image_1(resource){
  $clinit_354();
  this.state = new Image$ClippedState_0(this, resource.url, resource.left, resource.top_0, resource.width_0, resource.height_0);
  this.element['className'] = 'gwt-Image';
}

function Image_0(){
}

_ = Image_1.prototype = Image_0.prototype = new Widget;
_.getClass$ = function getClass_188(){
  return Lcom_google_gwt_user_client_ui_Image_2_classLit;
}
;
_.onBrowserEvent = function onBrowserEvent_2(event_0){
  $eventGetTypeInt(event_0.type) == 32768 && !!this.state && (this.element['__gwtLastUnhandledEvent'] = '' , undefined);
  $onBrowserEvent(this, event_0);
}
;
_.onLoad = function onLoad_4(){
  var unhandledEvent;
  unhandledEvent = $getPropertyString(this.element, '__gwtLastUnhandledEvent');
  $equals_3('load', unhandledEvent) && addCommand(new Image$State$1_0(this));
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
_.state = null;
function Image$State(){
}

_ = Image$State.prototype = new Object_0;
_.getClass$ = function getClass_189(){
  return Lcom_google_gwt_user_client_ui_Image$State_2_classLit;
}
;
_.castableTypeMap$ = {};
function Image$ClippedState_0(image, url, left, top_0, width, height){
  var tmp, style_1;
  $replaceElement(image, (tmp = $doc.createElement('span') , tmp.innerHTML = (style_1 = 'width: ' + width + 'px; height: ' + height + 'px; background: url(' + url + ') no-repeat ' + -left + 'px ' + -top_0 + 'px' , "<img onload='this.__gwtLastUnhandledEvent=\"load\";' src='" + $moduleBase + "clear.cache.gif' style='" + style_1 + "' border='0'>") || '' , $getFirstChildElement(tmp)));
  image.eventsToSink == -1?sinkEvents(image.element, 163967 | (image.element.__eventBits || 0)):(image.eventsToSink |= 163967);
}

function Image$ClippedState(){
}

_ = Image$ClippedState_0.prototype = Image$ClippedState.prototype = new Image$State;
_.getClass$ = function getClass_190(){
  return Lcom_google_gwt_user_client_ui_Image$ClippedState_2_classLit;
}
;
_.castableTypeMap$ = {};
function Image$State$1_0(val$image){
  this.val$image = val$image;
}

function Image$State$1(){
}

_ = Image$State$1_0.prototype = Image$State$1.prototype = new Object_0;
_.execute_0 = function execute_9(){
  var evt, evt_0;
  evt = (evt_0 = $doc.createEvent('HTMLEvents') , evt_0.initEvent('load', false, false) , evt_0);
  this.val$image.element.dispatchEvent(evt);
}
;
_.getClass$ = function getClass_191(){
  return Lcom_google_gwt_user_client_ui_Image$State$1_2_classLit;
}
;
_.castableTypeMap$ = {41:1, 51:1};
_.val$image = null;
function LayoutCommand$1_0(){
}

function LayoutCommand$1(){
}

_ = LayoutCommand$1_0.prototype = LayoutCommand$1.prototype = new Object_0;
_.getClass$ = function getClass_192(){
  return Lcom_google_gwt_user_client_ui_LayoutCommand$1_2_classLit;
}
;
_.castableTypeMap$ = {};
function $addItem(this$static, item){
  var option, select;
  select = this$static.element;
  option = $doc.createElement('option');
  option.text = item;
  option.value = item;
  select.add(option, null);
}

function $checkIndex(this$static, index){
  if (index < 0 || index >= this$static.element.children.length) {
    throw new IndexOutOfBoundsException_0;
  }
}

function $getValue_2(this$static, index){
  $checkIndex(this$static, index);
  return this$static.element.children[index].value;
}

function ListBox_0(){
  $clinit_299();
  this.element = $doc.createElement('select');
  this.element['className'] = 'gwt-ListBox';
}

function ListBox(){
}

_ = ListBox_0.prototype = ListBox.prototype = new FocusWidget;
_.getClass$ = function getClass_193(){
  return Lcom_google_gwt_user_client_ui_ListBox_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
function $clearItems(this$static){
  var container, item, item$iterator;
  container = this$static.vertical?this$static.body_0:$getChild(this$static.body_0, 0);
  while ($getChildCount(container) > 0) {
    container.removeChild($getChild(container, 0));
  }
  for (item$iterator = new AbstractList$IteratorImpl_0(this$static.allItems); item$iterator.i < item$iterator.this$0_0.size_1();) {
    item = dynamicCast($next_4(item$iterator), 57);
    item.element['colSpan'] = 1;
    throwClassCastExceptionUnlessNull(item).nullMethod();
  }
  $clear_4(this$static.items);
  $clear_4(this$static.allItems);
}

function $doItemAction(){
  if (!null.nullMethod()) {
    return;
  }
}

function $findItem(this$static, hItem){
  var item, item$iterator;
  for (item$iterator = new AbstractList$IteratorImpl_0(this$static.items); item$iterator.i < item$iterator.this$0_0.size_1();) {
    item = throwClassCastExceptionUnlessNull($next_4(item$iterator));
    if ($isOrHasChild(null.nullMethod(), hItem)) {
      return item;
    }
  }
  return null;
}

function $init_0(this$static, vertical){
  var outer, table, tr;
  table = $doc.createElement('table');
  this$static.body_0 = $doc.createElement('tbody');
  table.appendChild(this$static.body_0);
  if (!vertical) {
    tr = $doc.createElement('tr');
    this$static.body_0.appendChild(tr);
  }
  this$static.vertical = vertical;
  outer = ($clinit_318() , createFocusable0(($clinit_401() , focusHandler_0)?focusHandler_0:(focusHandler_0 = $createFocusHandler())));
  outer.appendChild(table);
  this$static.element = outer;
  this$static.element.setAttribute('role', 'menubar');
  this$static.eventsToSink == -1?sinkEvents(this$static.element, 2225 | (this$static.element.__eventBits || 0)):(this$static.eventsToSink |= 2225);
  this$static.element['className'] = 'gwt-MenuBar';
  vertical?$setStyleName(this$static, getStylePrimaryName(this$static.element) + '-vertical'):$setStyleName(this$static, getStylePrimaryName(this$static.element) + '-horizontal');
  this$static.element.style['outline'] = '0px';
  this$static.element.setAttribute('hideFocus', 'true');
  $addDomHandler(this$static, new MenuBar$2_0, ($clinit_107() , $clinit_107() , TYPE));
}

function $moveSelectionDown(this$static){
  if ($selectFirstItemIfNoneSelected(this$static)) {
    return;
  }
  if (this$static.vertical)
  ;
  else {
    if (null.nullMethod() != null && !null.nullMethod().nullMethod().nullMethod()) {
      $doItemAction();
      null.nullMethod().nullMethod();
    }
  }
}

function $moveSelectionUp(this$static){
  if ($selectFirstItemIfNoneSelected(this$static)) {
    return;
  }
}

function $moveToNextItem(this$static){
  if ($selectFirstItemIfNoneSelected(this$static)) {
    return;
  }
  if (this$static.vertical) {
    if (null.nullMethod() != null && !null.nullMethod().nullMethod().nullMethod()) {
      $doItemAction();
      null.nullMethod().nullMethod();
    }
  }
}

function $moveToPrevItem(this$static){
  if ($selectFirstItemIfNoneSelected(this$static)) {
    return;
  }
}

function $onBrowserEvent_0(this$static, event_0){
  var keyCode;
  $findItem(this$static, event_0.target);
  switch ($eventGetTypeInt(event_0.type)) {
    case 1:
      {
        $focus_0(($clinit_318() , this$static.element));
        break;
      }

    case 2048:
      {
        $selectFirstItemIfNoneSelected(this$static);
        break;
      }

    case 128:
      {
        keyCode = event_0.keyCode || 0;
        switch (keyCode) {
          case 37:
            $clinit_204();
            $moveToPrevItem(this$static);
            event_0.cancelBubble = true;
            event_0.preventDefault();
            break;
          case 39:
            $clinit_204();
            $moveToNextItem(this$static);
            event_0.cancelBubble = true;
            event_0.preventDefault();
            break;
          case 38:
            $moveSelectionUp(this$static);
            event_0.cancelBubble = true;
            event_0.preventDefault();
            break;
          case 40:
            $moveSelectionDown(this$static);
            event_0.cancelBubble = true;
            event_0.preventDefault();
            break;
          case 27:
            event_0.cancelBubble = true;
            event_0.preventDefault();
            break;
          case 13:
            if (!$selectFirstItemIfNoneSelected(this$static)) {
              $doItemAction();
              event_0.cancelBubble = true;
              event_0.preventDefault();
            }

        }
        break;
      }

  }
  $onBrowserEvent(this$static, event_0);
}

function $selectFirstItemIfNoneSelected(this$static){
  var nextItem$iterator;
  for (nextItem$iterator = new AbstractList$IteratorImpl_0(this$static.items); nextItem$iterator.i < nextItem$iterator.this$0_0.size_1();) {
    throwClassCastExceptionUnlessNull($next_4(nextItem$iterator));
    if (null.nullMethod()) {
      break;
    }
  }
  return true;
}

function MenuBar_1(){
  this.allItems = new ArrayList_0;
  this.items = new ArrayList_0;
  $init_0(this, true, new ClippedImagePrototype_0(($clinit_367() , menuBarSubMenuIcon).height_0));
}

function MenuBar(){
}

_ = MenuBar.prototype = new Widget;
_.getClass$ = function getClass_194(){
  return Lcom_google_gwt_user_client_ui_MenuBar_2_classLit;
}
;
_.onBrowserEvent = function onBrowserEvent_3(event_0){
  $onBrowserEvent_0(this, event_0);
}
;
_.onDetach = function onDetach_2(){
  $onDetach(this);
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
_.body_0 = null;
_.vertical = false;
function MenuBar$2_0(){
}

function MenuBar$2(){
}

_ = MenuBar$2_0.prototype = MenuBar$2.prototype = new Object_0;
_.getClass$ = function getClass_195(){
  return Lcom_google_gwt_user_client_ui_MenuBar$2_2_classLit;
}
;
_.castableTypeMap$ = {22:1, 37:1};
function $clinit_367(){
  $clinit_367 = nullMethod;
  menuBarSubMenuIcon = new ImageResourcePrototype_0(($clinit_204() , 'data:image/gif;base64,R0lGODlhBQAJAIAAAAAAAAAAACH5BAEAAAEALAAAAAAFAAkAAAIMRB5gp9v2YlJsJRQKADs='), 5, 9);
}

var menuBarSubMenuIcon = null;
function $sinkEvents_1(this$static, eventBitsToAdd){
  if (this$static.eventsToSink == -1) {
    sinkEvents_0(this$static.inputElem, eventBitsToAdd | (this$static.inputElem.__eventBits || 0));
    sinkEvents_0(this$static.labelElem, eventBitsToAdd | (this$static.labelElem.__eventBits || 0));
  }
   else {
    this$static.eventsToSink == -1?sinkEvents_0(this$static.inputElem, eventBitsToAdd | (this$static.inputElem.__eventBits || 0)):this$static.eventsToSink == -1?sinkEvents(this$static.element, eventBitsToAdd | (this$static.element.__eventBits || 0)):(this$static.eventsToSink |= eventBitsToAdd);
  }
}

function RadioButton_1(name_0, label){
  $clinit_299();
  CheckBox_2.call(this, $createInputRadioElement($doc, name_0));
  this.element['className'] = 'gwt-RadioButton';
  $sinkEvents_1(this, 1);
  $sinkEvents_1(this, 8);
  $sinkEvents_1(this, 4096);
  $sinkEvents_1(this, 128);
  this.labelElem.textContent = label || '';
}

function RadioButton(){
}

_ = RadioButton_1.prototype = RadioButton.prototype = new CheckBox;
_.ensureDomEventHandlers = function ensureDomEventHandlers_0(){
}
;
_.getClass$ = function getClass_197(){
  return Lcom_google_gwt_user_client_ui_RadioButton_2_classLit;
}
;
_.onBrowserEvent = function onBrowserEvent_4(event_0){
  var target;
  switch ($eventGetTypeInt(event_0.type)) {
    case 8:
    case 4096:
    case 128:
      this.oldValue = this.attached?($clinit_415() , this.inputElem.checked?TRUE_0:FALSE_0):($clinit_415() , this.inputElem.defaultChecked?TRUE_0:FALSE_0);
      break;
    case 1:
      target = event_0.target;
      if (is_0(target) && $isOrHasChild(this.labelElem, target)) {
        this.oldValue = this.attached?($clinit_415() , this.inputElem.checked?TRUE_0:FALSE_0):($clinit_415() , this.inputElem.defaultChecked?TRUE_0:FALSE_0);
        return;
      }

      $onBrowserEvent(this, event_0);
      fireIfNotEqual(this, this.oldValue, this.attached?($clinit_415() , this.inputElem.checked?TRUE_0:FALSE_0):($clinit_415() , this.inputElem.defaultChecked?TRUE_0:FALSE_0));
      return;
  }
  $onBrowserEvent(this, event_0);
}
;
_.sinkEvents = function sinkEvents_3(eventBitsToAdd){
  $sinkEvents_1(this, eventBitsToAdd);
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 227:1};
_.oldValue = null;
function ScrollPanel_0(){
  this.element = $doc.createElement('div');
  this.element.style['overflow'] = 'auto';
  this.containerElem = $doc.createElement('div');
  this.element.appendChild(this.containerElem);
  this.element.style['position'] = 'relative';
  this.containerElem.style['position'] = 'relative';
  this.element.style['zoom'] = '1';
  this.containerElem.style['zoom'] = '1';
}

function ScrollPanel(){
}

_ = ScrollPanel_0.prototype = ScrollPanel.prototype = new SimplePanel;
_.getClass$ = function getClass_202(){
  return Lcom_google_gwt_user_client_ui_ScrollPanel_2_classLit;
}
;
_.getContainerElement = function getContainerElement_0(){
  return this.containerElem;
}
;
_.onResize = function onResize_0(){
  var child;
  child = this.widget;
  !!child && child != null && child.castableTypeMap$ && !!child.castableTypeMap$[54] && dynamicCast(child, 54).onResize();
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 54:1, 57:1, 59:1};
_.containerElem = null;
function $next_0(this$static){
  if (!this$static.hasElement || !this$static.this$0.widget) {
    throw new NoSuchElementException_0;
  }
  this$static.hasElement = false;
  return this$static.returned = this$static.this$0.widget;
}

function SimplePanel$1_0(this$0){
  this.this$0 = this$0;
  this.hasElement = !!this.this$0.widget;
}

function SimplePanel$1(){
}

_ = SimplePanel$1_0.prototype = SimplePanel$1.prototype = new Object_0;
_.getClass$ = function getClass_203(){
  return Lcom_google_gwt_user_client_ui_SimplePanel$1_2_classLit;
}
;
_.hasNext = function hasNext_0(){
  return this.hasElement;
}
;
_.next_0 = function next_8(){
  return $next_0(this);
}
;
_.remove_1 = function remove_7(){
  !!this.returned && $remove_3(this.this$0, this.returned);
}
;
_.castableTypeMap$ = {};
_.returned = null;
_.this$0 = null;
function $selectAll(this$static){
  var length_0;
  length_0 = $getPropertyString(this$static.element, 'value').length;
  length_0 > 0 && $setSelectionRange(this$static, length_0);
}

function $setSelectionRange(this$static, length_0){
  if (!this$static.attached) {
    return;
  }
  if (length_0 < 0) {
    throw new IndexOutOfBoundsException_1('Length must be a positive integer. Length: ' + length_0);
  }
  if (length_0 > $getPropertyString(this$static.element, 'value').length) {
    throw new IndexOutOfBoundsException_1('From Index: 0  To Index: ' + length_0 + '  Text Length: ' + $getPropertyString(this$static.element, 'value').length);
  }
  $setSelectionRange_0(this$static.element, 0, length_0);
}

function $setText_1(this$static, text){
  this$static.element['value'] = text != null?text:'';
}

function ValueBoxBase_0(elem){
  $clinit_299();
  this.element = elem;
  addTo($clinit_204());
}

function ValueBoxBase(){
}

_ = ValueBoxBase.prototype = new FocusWidget;
_.getClass$ = function getClass_204(){
  return Lcom_google_gwt_user_client_ui_ValueBoxBase_2_classLit;
}
;
_.onBrowserEvent = function onBrowserEvent_5(event_0){
  var type;
  type = $eventGetTypeInt(event_0.type);
  (type & 896) != 0?$onBrowserEvent(this, event_0):$onBrowserEvent(this, event_0);
}
;
_.onLoad = function onLoad_5(){
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
function $clinit_387(){
  $clinit_387 = nullMethod;
  $clinit_299();
  $clinit_390();
}

function TextBoxBase(){
}

_ = TextBoxBase.prototype = new ValueBoxBase;
_.getClass$ = function getClass_205(){
  return Lcom_google_gwt_user_client_ui_TextBoxBase_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
function TextArea_1(){
  $clinit_387();
  ValueBoxBase_0.call(this, $doc.createElement('textarea'), (!INSTANCE_1 && (INSTANCE_1 = new PassthroughRenderer_0) , !INSTANCE_0 && (INSTANCE_0 = new PassthroughParser_0)));
  this.element['className'] = 'gwt-TextArea';
}

function TextArea_0(){
}

_ = TextArea_1.prototype = TextArea_0.prototype = new TextBoxBase;
_.getClass$ = function getClass_206(){
  return Lcom_google_gwt_user_client_ui_TextArea_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
function TextBox_0(){
  var e;
  $clinit_387();
  ValueBoxBase_0.call(this, (e = $doc.createElement('INPUT') , e.type = 'text' , e), (!INSTANCE_1 && (INSTANCE_1 = new PassthroughRenderer_0) , !INSTANCE_0 && (INSTANCE_0 = new PassthroughParser_0)));
  this.element['className'] = 'gwt-TextBox';
}

function TextBox(){
}

_ = TextBox_0.prototype = TextBox.prototype = new TextBoxBase;
_.getClass$ = function getClass_207(){
  return Lcom_google_gwt_user_client_ui_TextBox_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
function $clinit_390(){
  $clinit_390 = nullMethod;
  CENTER_0 = new ValueBoxBase$TextAlignment$1_0;
  JUSTIFY = new ValueBoxBase$TextAlignment$2_0;
  LEFT = new ValueBoxBase$TextAlignment$3_0;
  RIGHT = new ValueBoxBase$TextAlignment$4_0;
  $VALUES_8 = initValues(_3Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_2_classLit, {9:1, 66:1, 166:1}, 79, [CENTER_0, JUSTIFY, LEFT, RIGHT]);
}

function valueOf_10(name_0){
  $clinit_390();
  return valueOf_0(($clinit_395() , $MAP_8), name_0);
}

function values_9(){
  $clinit_390();
  return $VALUES_8;
}

function ValueBoxBase$TextAlignment(){
}

_ = ValueBoxBase$TextAlignment.prototype = new Enum;
_.getClass$ = function getClass_208(){
  return Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 79:1};
var $VALUES_8, CENTER_0, JUSTIFY, LEFT, RIGHT;
function ValueBoxBase$TextAlignment$1_0(){
  this.name_1 = 'CENTER';
  this.ordinal = 0;
}

function ValueBoxBase$TextAlignment$1(){
}

_ = ValueBoxBase$TextAlignment$1_0.prototype = ValueBoxBase$TextAlignment$1.prototype = new ValueBoxBase$TextAlignment;
_.getClass$ = function getClass_209(){
  return Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$1_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 79:1};
function ValueBoxBase$TextAlignment$2_0(){
  this.name_1 = 'JUSTIFY';
  this.ordinal = 1;
}

function ValueBoxBase$TextAlignment$2(){
}

_ = ValueBoxBase$TextAlignment$2_0.prototype = ValueBoxBase$TextAlignment$2.prototype = new ValueBoxBase$TextAlignment;
_.getClass$ = function getClass_210(){
  return Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$2_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 79:1};
function ValueBoxBase$TextAlignment$3_0(){
  this.name_1 = 'LEFT';
  this.ordinal = 2;
}

function ValueBoxBase$TextAlignment$3(){
}

_ = ValueBoxBase$TextAlignment$3_0.prototype = ValueBoxBase$TextAlignment$3.prototype = new ValueBoxBase$TextAlignment;
_.getClass$ = function getClass_211(){
  return Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$3_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 79:1};
function ValueBoxBase$TextAlignment$4_0(){
  this.name_1 = 'RIGHT';
  this.ordinal = 3;
}

function ValueBoxBase$TextAlignment$4(){
}

_ = ValueBoxBase$TextAlignment$4_0.prototype = ValueBoxBase$TextAlignment$4.prototype = new ValueBoxBase$TextAlignment;
_.getClass$ = function getClass_212(){
  return Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$4_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 79:1};
function $clinit_395(){
  $clinit_395 = nullMethod;
  $MAP_8 = createValueOfMap(($clinit_390() , $VALUES_8));
}

var $MAP_8;
function $add_6(this$static, w){
  var td, tr, td_0;
  tr = $doc.createElement('tr');
  td = (td_0 = $doc.createElement('td') , td_0['align'] = this$static.horzAlign.textAlignString , td_0.style['verticalAlign'] = this$static.vertAlign.verticalAlignString , td_0);
  tr.appendChild(td);
  this$static.body_0.appendChild(tr);
  $removeFromParent_0(w);
  $add_7(this$static.getChildren(), w);
  td.appendChild(w.element);
  $setParent(w, this$static);
}

function VerticalPanel_0(){
  CellPanel_0.call(this);
  this.horzAlign = ($clinit_340() , ALIGN_DEFAULT);
  this.vertAlign = ($clinit_347() , ALIGN_TOP);
  this.table['cellSpacing'] = '0';
  this.table['cellPadding'] = '0';
}

function VerticalPanel(){
}

_ = VerticalPanel_0.prototype = VerticalPanel.prototype = new CellPanel;
_.getClass$ = function getClass_213(){
  return Lcom_google_gwt_user_client_ui_VerticalPanel_2_classLit;
}
;
_.remove_2 = function remove_8(w){
  var removed, td, parent_0;
  td = (parent_0 = w.element.parentNode , (!parent_0 || parent_0.nodeType != 1) && (parent_0 = null) , parent_0);
  removed = $remove_1(this, w);
  removed && this.body_0.removeChild($getParentElement(td));
  return removed;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 59:1};
function $get_4(this$static){
  if (0 >= this$static.size_0) {
    throw new IndexOutOfBoundsException_0;
  }
  return this$static.array[0];
}

function ClippedImagePrototype_0(){
}

function ClippedImagePrototype(){
}

_ = ClippedImagePrototype_0.prototype = ClippedImagePrototype.prototype = new AbstractImagePrototype;
_.getClass$ = function getClass_216(){
  return Lcom_google_gwt_user_client_ui_impl_ClippedImagePrototype_2_classLit;
}
;
_.castableTypeMap$ = {};
function $clinit_401(){
  $clinit_401 = nullMethod;
  implPanel = new FocusImplSafari_0;
  implWidget = implPanel?new FocusImpl_0:implPanel;
}

function FocusImpl_0(){
}

function FocusImpl(){
}

_ = FocusImpl_0.prototype = FocusImpl.prototype = new Object_0;
_.focus_1 = function focus_14(elem){
  elem.focus();
}
;
_.getClass$ = function getClass_217(){
  return Lcom_google_gwt_user_client_ui_impl_FocusImpl_2_classLit;
}
;
_.castableTypeMap$ = {};
var implPanel, implWidget;
function $createFocusHandler(){
  return function(evt){
    var div = this.parentNode;
    div.onfocus && $wnd.setTimeout(function(){
      div.focus();
    }
    , 0);
  }
  ;
}

function createFocusable0(focusHandler){
  $clinit_401();
  var div = $doc.createElement('div');
  div.tabIndex = 0;
  var input = $doc.createElement('input');
  input.type = 'text';
  input.tabIndex = -1;
  var style = input.style;
  style.opacity = 0;
  style.height = '1px';
  style.width = '1px';
  style.zIndex = -1;
  style.overflow = 'hidden';
  style.position = 'absolute';
  input.addEventListener('focus', focusHandler, false);
  div.appendChild(input);
  return div;
}

function FocusImplStandard(){
}

_ = FocusImplStandard.prototype = new FocusImpl;
_.getClass$ = function getClass_218(){
  return Lcom_google_gwt_user_client_ui_impl_FocusImplStandard_2_classLit;
}
;
_.castableTypeMap$ = {};
var focusHandler_0 = null;
function $focus_0(elem){
  $wnd.setTimeout(function(){
    elem.focus();
  }
  , 0);
}

function FocusImplSafari_0(){
}

function FocusImplSafari(){
}

_ = FocusImplSafari_0.prototype = FocusImplSafari.prototype = new FocusImplStandard;
_.focus_1 = function focus_15(elem){
  $focus_0(elem);
}
;
_.getClass$ = function getClass_219(){
  return Lcom_google_gwt_user_client_ui_impl_FocusImplSafari_2_classLit;
}
;
_.castableTypeMap$ = {};
function $getContents(iframe){
  try {
    if (!iframe.contentWindow || !iframe.contentWindow.document)
      return null;
    return iframe.contentWindow.document.body.innerHTML;
  }
   catch (e) {
    return null;
  }
}

function $hookEvents(iframe, form, listener){
  iframe && (iframe.onload = $entry(function(){
    if (!iframe.__formAction)
      return;
    listener.onFrameLoad();
  }
  ));
  form.onsubmit = $entry(function(){
    iframe && (iframe.__formAction = form.action);
    return listener.onFormSubmit();
  }
  );
}

function $setEncoding(form, encoding){
  form.enctype = encoding;
  form.encoding = encoding;
}

function $submit_1(form, iframe){
  iframe && (iframe.__formAction = form.action);
  form.submit();
}

function $unhookEvents(iframe, form){
  iframe && (iframe.onload = null);
  form.onsubmit = null;
}

function $setSelectionRange_0(elem, pos, length_0){
  try {
    elem.setSelectionRange(pos, pos + length_0);
  }
   catch (e) {
  }
}

function addAll_2(c, a_0){
  var old;
  $clinit_467();
  var e, e$index, e$max, result;
  result = false;
  for (e$index = 0 , e$max = a_0.length; e$index < e$max; ++e$index) {
    e = a_0[e$index];
    result |= (old = c.map.put(e, c) , old == null);
  }
  return result;
}

function max_3(coll){
  var outerIter, entry, entry_0;
  $clinit_467();
  var it, max, t;
  $clinit_484();
  it = (outerIter = coll.val$entrySet.iterator_0() , new AbstractMap$1$1_0(outerIter));
  max = (entry = dynamicCast(it.val$outerIter.next_0(), 11) , entry.getKey());
  while (it.val$outerIter.hasNext()) {
    t = (entry_0 = dynamicCast(it.val$outerIter.next_0(), 11) , entry_0.getKey());
    dynamicCast(t, 10).compareTo$(max) > 0 && (max = t);
  }
  return max;
}

function reverse_0(l_0){
  var t, previous;
  $clinit_467();
  var head, headElem, iBack, iFront, tail, tailElem;
  if (l_0) {
    for (iFront = 0 , iBack = l_0.size_0 - 1; iFront < iBack; ++iFront , --iBack) {
      t = (checkIndex(iFront, l_0.size_0) , l_0.array[iFront]);
      $set_4(l_0, iFront, (checkIndex(iBack, l_0.size_0) , l_0.array[iBack]));
      previous = (checkIndex(iBack, l_0.size_0) , l_0.array[iBack]);
      setCheck(l_0.array, iBack, t);
    }
  }
   else {
    head = new AbstractList$ListIteratorImpl_0(null, 0);
    tail = new AbstractList$ListIteratorImpl_0(null, null.nullField);
    while (head.i < tail.i - 1) {
      headElem = $next_4(head);
      tailElem = $previous(tail);
      $set_3(head, tailElem);
      $set_3(tail, headElem);
    }
  }
}

function copyOf(c){
  var clazz, first, it, set, outerIter, entry, entry_0;
  it = (outerIter = c.val$entrySet.iterator_0() , new AbstractMap$1$1_0(outerIter));
  first = dynamicCast((entry = dynamicCast(it.val$outerIter.next_0(), 11) , entry.getKey()), 63);
  clazz = $getDeclaringClass(first);
  set = noneOf(clazz);
  $add_11(set, first);
  while (it.val$outerIter.hasNext()) {
    $add_11(set, dynamicCast((entry_0 = dynamicCast(it.val$outerIter.next_0(), 11) , entry_0.getKey()), 63));
  }
  return set;
}

function HashMap_3(toBeCopied){
  $clearImpl(this);
  $putAll(this, toBeCopied);
}

_ = HashMap_3.prototype = HashMap.prototype;
function $createEditSession(this$static){
  var address, documents, focus_0, panel, selectionExtractor, sessionId, stageOne, views, edit, e_0;
  stageOne = this$static.stageTwo.stageOne;
  panel = stageOne.getWavePanel();
  focus_0 = stageOne.getFocusFrame();
  views = $getModelAsViewProvider(this$static.stageTwo);
  documents = $getDocumentRegistry(this$static.stageTwo);
  address = $getSignedInUser(this$static.stageTwo).address;
  !instance_7 && (instance_7 = new BrowserBackedScheduler_0 , setDefaultTimerService() , undefined);
  sessionId = $getSessionId(this$static.stageTwo);
  selectionExtractor = new SelectionExtractor_0(address, sessionId);
  return $clinit_1285() , edit = new EditSession_0(views, documents, panel.panel, selectionExtractor) , $add_33(focus_0.listeners, edit) , !!panel.main && undefined , $add_33(panel.listeners, focus_0) , $clinit_749() , e_0 = $doc.createElement('div') , e_0.className = 'editor' , new EditorImplWebkitMobile_0(true, e_0) , edit;
}

function StageThree$DefaultProvider(){
}

_ = StageThree$DefaultProvider.prototype = new AsyncHolder$Impl;
_.create = function create_7(whenReady){
  var actions, edit, focus_0, models, panel, profiles, blipQueue, docs, edit_0, focus_1, stageOne, views, controller, views_0, wave, switcher, controller_0, controller_1;
  this.onStageInit();
  get_22().enableUndercurrentEditing.value_0 && ($clinit_741() , popupProvider = (!provider_1 && (provider_1 = new MobilePopupProvider_0) , provider_1) , $clinit_741() , !provider_0 && (provider_0 = new MobilePopupChromeProvider_0) , panel = this.stageTwo.stageOne.getWavePanel() , focus_0 = this.stageTwo.stageOne.getFocusFrame() , $getSignedInUser(this.stageTwo) , models = $getModelAsViewProvider(this.stageTwo) , profiles = $getProfileManager(this.stageTwo) , actions = !this.actions?(this.actions = (stageOne = this.stageTwo.stageOne , stageOne.getWavePanel() , focus_1 = stageOne.getFocusFrame() , views = $getModelAsViewProvider(this.stageTwo) , docs = $getDocumentRegistry(this.stageTwo) , blipQueue = $getBlipQueue(this.stageTwo) , edit_0 = !this.edit?(this.edit = $createEditSession(this)):this.edit , new ActionsImpl_0(views, docs, blipQueue, focus_1, edit_0))):this.actions , edit = !this.edit?(this.edit = $createEditSession(this)):this.edit , controller = new MenuController_0(actions, panel.views) , $register_0(panel.panel.clickHandlers, ($clinit_1506() , dynamicCast($get_10(CODES, ($clinit_1428() , MENU_ITEM)), 1)), controller) , switcher = new ToolbarSwitcher_0(this.stageTwo.stageOne.getWavePanel(), !this.edit?(this.edit = $createEditSession(this)):this.edit, !this.viewToolbar?(this.viewToolbar = (views_0 = $getModelAsViewProvider(this.stageTwo) , wave = $getConversations(this.stageTwo) , create_37(this.stageTwo.stageOne.getFocusFrame(), views_0, wave, this.stageTwo.reader))):this.viewToolbar, !this.editToolbar?(this.editToolbar = create_36($getSignedInUser(this.stageTwo), $getIdGenerator(this.stageTwo), $getWave(this.stageTwo).waveId)):this.editToolbar) , $init_9(switcher.viewToolbar) , $init_7(switcher.editToolbar) , $add_33(switcher.editSession.listeners, switcher) , switcher.editSession.editing?$startEditSession(switcher, switcher.editSession.editor):!!switcher.panel.main && ($setToolbar_1($getContents_0(switcher.panel), switcher.viewToolbar.toolbarUi.element) , $doAdopt(switcher.panel.panel, switcher.viewToolbar.toolbarUi)) , new WaveTitleHandler_0(edit, models) , controller_0 = new ReplyIndicatorController_0(actions, edit, panel.views) , $register_0(panel.panel.mouseDownHandlers, dynamicCast($get_10(CODES, REPLY_BOX), 1), controller_0) , $register_0(panel.panel.mouseDownHandlers, dynamicCast($get_10(CODES, CONTINUATION_INDICATOR), 1), controller_0) , $clinit_1284() , $install_5(new EditController_0(new FocusedActions_0(focus_0, actions), DEFAULT_BINDINGS), panel.keys) , controller_1 = new ParticipantController_0(panel.views, models, profiles) , $install_6(controller_1, panel.panel) , $init_6(new KeepFocusInView_0(edit, panel)) , $upgrade($getDiffController(this.stageTwo), edit) , undefined);
  this.onStageLoaded();
  $use(whenReady, this);
}
;
_.getClass$ = function getClass_315(){
  return Lorg_waveprotocol_wave_client_StageThree$DefaultProvider_2_classLit;
}
;
_.onStageInit = function onStageInit_0(){
}
;
_.onStageLoaded = function onStageLoaded_0(){
}
;
_.castableTypeMap$ = {173:1, 177:1};
_.actions = null;
_.edit = null;
_.editToolbar = null;
_.stageTwo = null;
_.viewToolbar = null;
function $getBlipQueue(this$static){
  return !this$static.queueRenderer?(this$static.queueRenderer = $createBlipQueueRenderer(this$static)):this$static.queueRenderer;
}

function $getConversations(this$static){
  return !this$static.conversations?(this$static.conversations = create_54(!this$static.wave?(this$static.wave = $createWave(this$static)):this$static.wave, !this$static.idGenerator?(this$static.idGenerator = $createIdGenerator(this$static)):this$static.idGenerator)):this$static.conversations;
}

function $getDiffController(this$static){
  return !this$static.diffController?(this$static.diffController = new DiffController_0(!this$static.conversations?(this$static.conversations = create_54(!this$static.wave?(this$static.wave = $createWave(this$static)):this$static.wave, !this$static.idGenerator?(this$static.idGenerator = $createIdGenerator(this$static)):this$static.idGenerator)):this$static.conversations, !this$static.supplement?(this$static.supplement = $createSupplement(this$static)):this$static.supplement, !this$static.documentRegistry?(this$static.documentRegistry = $createDocumentRegistry()):this$static.documentRegistry, !this$static.modelAsView?(this$static.modelAsView = new ModelAsViewProviderImpl_0(!this$static.viewIdMapper?(this$static.viewIdMapper = new ViewIdMapper_0(new ModelIdMapperImpl_0(!this$static.conversations?(this$static.conversations = create_54(!this$static.wave?(this$static.wave = $createWave(this$static)):this$static.wave, !this$static.idGenerator?(this$static.idGenerator = $createIdGenerator(this$static)):this$static.idGenerator)):this$static.conversations))):this$static.viewIdMapper, this$static.stageOne.getDomAsViewProvider())):this$static.modelAsView)):this$static.diffController;
}

function $getIdGenerator(this$static){
  return !this$static.idGenerator?(this$static.idGenerator = $createIdGenerator(this$static)):this$static.idGenerator;
}

function $getModelAsViewProvider(this$static){
  return !this$static.modelAsView?(this$static.modelAsView = new ModelAsViewProviderImpl_0(!this$static.viewIdMapper?(this$static.viewIdMapper = new ViewIdMapper_0(new ModelIdMapperImpl_0(!this$static.conversations?(this$static.conversations = create_54(!this$static.wave?(this$static.wave = $createWave(this$static)):this$static.wave, !this$static.idGenerator?(this$static.idGenerator = $createIdGenerator(this$static)):this$static.idGenerator)):this$static.conversations))):this$static.viewIdMapper, this$static.stageOne.getDomAsViewProvider())):this$static.modelAsView;
}

function $getSignedInUser(this$static){
  return !this$static.signedInuser?(this$static.signedInuser = ofUnsafe('nobody@example.com')):this$static.signedInuser;
}

function $getWave(this$static){
  return !this$static.wave?(this$static.wave = $createWave(this$static)):this$static.wave;
}

function $finish(this$static){
  if (this$static.whenFinished) {
    showInfo(this$static.whenFinished.val$timeline);
    this$static.whenFinished = null;
  }
}

function $onSuccess_0(this$static){
  $call($createStageThreeLoader(this$static.this$0, this$static.val$two), new Stages$4$1_0(this$static));
}

function $use_5(this$static){
  $finish(this$static.this$1.this$0);
}

function Stages$4$1_0(this$1){
  this.this$1 = this$1;
}

function Stages$4$1(){
}

_ = Stages$4$1_0.prototype = Stages$4$1.prototype = new Object_0;
_.getClass$ = function getClass_333(){
  return Lorg_waveprotocol_wave_client_Stages$4$1_2_classLit;
}
;
_.use = function use_4(x){
  $use_5(this, dynamicCast(x, 173));
}
;
_.castableTypeMap$ = {177:1};
_.this$1 = null;
function $getFullName(this$static){
  this$static.fullName == null && $buildNames(this$static);
  return this$static.fullName;
}

function deserialize_0(serialized){
  var annotations, innerSplit, s, s$index, s$max, split, regexp, regexp_0;
  split = $split(serialized, ':', 0);
  annotations = new ArrayList_0;
  for (s$index = 0 , s$max = split.length; s$index < s$max; ++s$index) {
    s = split[s$index];
    if (s.length) {
      innerSplit = $split(s, ',', 0);
      innerSplit.length == 4 && $add_9(annotations, new RangedAnnotationImpl_0((throwIfNull('encodedURLComponent', innerSplit[2]) , regexp = /\+/g , decodeURIComponent(innerSplit[2].replace(regexp, '%20'))), (throwIfNull('encodedURLComponent', innerSplit[3]) , regexp_0 = /\+/g , decodeURIComponent(innerSplit[3].replace(regexp_0, '%20'))), __parseAndValidateInt(innerSplit[0], 10), __parseAndValidateInt(innerSplit[1], 10)));
    }
  }
  return annotations;
}

function serializeAnnotation(rangedAnnotations){
  var ann, ann$iterator, entries;
  entries = new AnnotationSerializer$Builder_0;
  for (ann$iterator = new AbstractList$IteratorImpl_0(rangedAnnotations); ann$iterator.i < ann$iterator.this$0_0.size_1();) {
    ann = dynamicCast($next_4(ann$iterator), 176);
    ann.value_0 != null && $pushEntry(entries, ann.start, ann.end, ann.key, dynamicCast(ann.value_0, 1));
  }
  return entries.builder.impl.string;
}

function $pushEntry(this$static, start, end, key, value){
  var regexp, regexp_0;
  $append_11($append_11($append_11($append_11($append_11($append_9($append_11($append_9(this$static.builder, start), ','), end), ','), (throwIfNull('decodedURLComponent', key) , regexp = /%20/g , encodeURIComponent(key).replace(regexp, '+'))), ','), (throwIfNull('decodedURLComponent', value) , regexp_0 = /%20/g , encodeURIComponent(value).replace(regexp_0, '+'))), ':');
}

function AnnotationSerializer$Builder_0(){
  this.builder = new StringBuilder_0;
}

function AnnotationSerializer$Builder(){
}

_ = AnnotationSerializer$Builder_0.prototype = AnnotationSerializer$Builder.prototype = new Object_0;
_.getClass$ = function getClass_337(){
  return Lorg_waveprotocol_wave_client_clipboard_AnnotationSerializer$Builder_2_classLit;
}
;
_.toString$ = function toString_38(){
  return this.builder.impl.string;
}
;
_.castableTypeMap$ = {};
function $clinit_570(){
  var pasteBuffer;
  $clinit_570 = nullMethod;
  LOG = new DomLogger_0('clipboard');
  INSTANCE_2 = new Clipboard_0((pasteBuffer = new PasteBufferImpl_0 , pasteBuffer.element = $doc.createElement('div') , pasteBuffer.element.setAttribute('contentEditable', 'true') , pasteBuffer.element.style['white-space'] = 'pre-wrap' , pasteBuffer.element.style['overflow'] = ($clinit_76() , 'hidden') , $positionPasteBuffer(pasteBuffer.element) , $doc.body.appendChild(pasteBuffer.element) , pasteBuffer));
}

function $fillBufferAndSetSelection(this$static, htmlFragment, selection, waveXml, normalizedAnnotation){
  $setContent(this$static.pasteBuffer, htmlFragment);
  !!waveXml && !!normalizedAnnotation && $hijackFragment(waveXml.builder.impl.string, serializeAnnotation(normalizedAnnotation), selection);
  $clinit_1024();
  cache_1 = null;
}

function $hijackFragment(xmlInRange, annotations, origRange){
  var newEnd, origEnd, origStart, spanForXml, t, trailingSpan, parent_0, parent_1;
  origStart = origRange.first;
  origEnd = origRange.second;
  spanForXml = $doc.createElement('span');
  spanForXml.setAttribute('data-wave-xml', xmlInRange);
  spanForXml.setAttribute('data-wave-annotations', annotations);
  spanForXml.className = '__wave_paste';
  $log_0(LOG.traceLogger, 'original point: ' + origStart);
  trailingSpan = $doc.createElement('span');
  trailingSpan.innerHTML = '&nbsp;';
  if (origEnd.offset >= 0) {
    t = dynamicCastJso(origEnd.container);
    $setData(t, t.data.substr(0, $getTextOffset(origEnd) - 0));
    $insertAfter((parent_0 = dynamicCastJso(origEnd.container).parentNode , (!parent_0 || parent_0.nodeType != 1) && (parent_0 = null) , parent_0), spanForXml, t);
    $insertAfter((parent_1 = dynamicCastJso(origEnd.container).parentNode , (!parent_1 || parent_1.nodeType != 1) && (parent_1 = null) , parent_1), trailingSpan, spanForXml);
  }
   else {
    $insertAfter(dynamicCastJso(origEnd.container), spanForXml, dynamicCastJso($getNodeAfter(origEnd)));
    $insertAfter(dynamicCastJso(origEnd.container), trailingSpan, spanForXml);
  }
  newEnd = new Point$El_0($getParentElement(spanForXml), trailingSpan.nextSibling);
  $log_0(LOG.traceLogger, 'new point: ' + newEnd);
  $logPlainText(LOG.traceLogger, 'parent: ' + $getParentElement(spanForXml).innerHTML);
  return new PointRange_1(origStart, newEnd);
}

function $maybeGetAttributeFromContainer(srcContainer, attribName){
  var elementsByClassName;
  elementsByClassName = getElementsByClassName(srcContainer);
  if (!!elementsByClassName && elementsByClassName.length > 0) {
    return elementsByClassName[0].getAttribute(attribName) || '';
  }
  return null;
}

function $maybeGetWaveXml(srcContainer){
  var waveXml, regex, replacement;
  waveXml = $maybeGetAttributeFromContainer(srcContainer, 'data-wave-xml');
  srcContainer.innerHTML;
  if (waveXml != null) {
    $logPlainText(LOG.traceLogger, 'found serialized waveXml: ' + waveXml);
    waveXml = (regex = $replaceAll('\n', '([/\\\\\\.\\*\\+\\?\\|\\(\\)\\[\\]\\{\\}$^])', '\\\\$1') , replacement = $replaceAll($replaceAll('', '\\\\', '\\\\\\\\'), '\\$', '\\\\$') , $replaceAll(waveXml, regex, replacement));
  }
  return waveXml;
}

function Clipboard_0(pasteBuffer){
  this.pasteBuffer = pasteBuffer;
}

function Clipboard(){
}

_ = Clipboard_0.prototype = Clipboard.prototype = new Object_0;
_.getClass$ = function getClass_338(){
  return Lorg_waveprotocol_wave_client_clipboard_Clipboard_2_classLit;
}
;
_.castableTypeMap$ = {};
_.pasteBuffer = null;
var INSTANCE_2, LOG;
function $positionPasteBuffer(element){
  element.style['position'] = ($clinit_82() , 'absolute');
  element.style['top'] = -100 + ($clinit_88() , 'px');
  element.style['height'] = '50px';
}

function $prepareForPaste(this$static){
  this$static.element.innerHTML = '';
  this$static.element.appendChild($doc.createTextNode(''));
  $clinit_1024();
  new Point$Tx_0(this$static.element.firstChild, 0);
  cache_1 = null;
  cache_1 = null;
}

function $setContent(this$static, node){
  this$static.element.innerHTML = '';
  this$static.element.appendChild(node);
}

function PasteBufferImpl_0(){
}

function PasteBufferImpl(){
}

_ = PasteBufferImpl_0.prototype = PasteBufferImpl.prototype = new Object_0;
_.getClass$ = function getClass_339(){
  return Lorg_waveprotocol_wave_client_clipboard_PasteBufferImpl_2_classLit;
}
;
_.castableTypeMap$ = {};
_.element = null;
function ClientDebugException_0(cause){
  this.fillInStackTrace();
  this.cause = cause;
  this.detailMessage = '';
}

function ClientDebugException(){
}

_ = ClientDebugException_0.prototype = ClientDebugException.prototype = new RuntimeException;
_.getClass$ = function getClass_342(){
  return Lorg_waveprotocol_wave_client_common_util_ClientDebugException_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 21:1, 38:1, 178:1};
function focus_16(element){
  var $e0;
  try {
    ($clinit_401() , $clinit_401() , implWidget).focus_1(element);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (!instanceOf($e0, 178))
      throw $e0;
  }
}

function getContentEditability(element){
  var $e0, $e1, e, editability, elementString, elementTag, sb;
  try {
    editability = element.getAttribute('contentEditable') || '';
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 43)) {
      e = $e0;
      elementString = "<couldn't get element string>";
      elementTag = "<couldn't get element tag>";
      try {
        elementString = element.toString?element.toString():'[JavaScriptObject]';
      }
       catch ($e1) {
        $e1 = caught_0($e1);
        if (!instanceOf($e1, 178))
          throw $e1;
      }
      try {
        elementTag = element.tagName;
      }
       catch ($e1) {
        $e1 = caught_0($e1);
        if (!instanceOf($e1, 178))
          throw $e1;
      }
      sb = new StringBuilder_0;
      sb.impl.string += "Couldn't get the 'contentEditable' attribute for element '";
      $append_11($append_11((sb.impl.string += elementString , sb), "' tag name = "), elementTag);
      throw new RuntimeException_2(sb.impl.string, e);
    }
     else 
      throw $e0;
  }
  return editability == null || !editability.length?($clinit_583() , NEUTRAL):$equalsIgnoreCase('true', editability)?($clinit_583() , EDITABLE):($clinit_583() , NOT_EDITABLE);
}

function getElementEditability(elem){
  var $e0, tagName;
  tagName = null;
  try {
    tagName = elem.tagName;
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (!instanceOf($e0, 178))
      throw $e0;
  }
  if (tagName != null) {
    tagName = tagName.toLowerCase();
    if ($equals_3(tagName, 'input') || $equals_3(tagName, 'textarea')) {
      return $clinit_583() , EDITABLE;
    }
  }
  return getContentEditability(elem);
}

function getElementsByClassName(e){
  var all, i, item, ret;
  if ($clinit_628() , SUPPORTS_GET_ELEMENTS_BY_CLASSNAME) {
    return e.getElementsByClassName('__wave_paste');
  }
   else {
    all = e.getElementsByTagName('*');
    if (!all) {
      return null;
    }
    ret = [];
    for (i = 0; i < all.length; ++i) {
      item = all[i];
      $equals_3('__wave_paste', item.className) && (ret[ret.length] = item , undefined);
    }
    return ret;
  }
}

function isEditable_0(e){
  var docElement, editability;
  if (isUnreadable(e)) {
    return true;
  }
  docElement = $doc.documentElement;
  do {
    editability = getElementEditability(e);
    if (editability == ($clinit_583() , NEUTRAL)) {
      if (e == docElement) {
        return false;
      }
      e = $getParentElement(e);
    }
     else {
      return editability == EDITABLE;
    }
  }
   while (e);
  return true;
}

function isUnreadable(n){
  var $e0;
  try {
    n.nodeType;
    return false;
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 21)) {
      return true;
    }
     else 
      throw $e0;
  }
}

function registerEventHandler(el, eventName, capture, listener){
  var func = $entry(function(e){
    var evt = e || $wnd.event;
    listener.onJavaScriptEvent(eventName, evt);
  }
  );
  el.addEventListener?el.addEventListener(eventName, func, capture):el.attachEvent?el.attachEvent('on' + eventName, func):(el['on' + eventName.toLowerCase()] = func);
  func.$ev = eventName;
  func.$cp = capture;
  func.$el = el;
  return func;
}

function $clinit_583(){
  $clinit_583 = nullMethod;
  EDITABLE = new DomHelper$ElementEditability_0('EDITABLE', 0);
  NOT_EDITABLE = new DomHelper$ElementEditability_0('NOT_EDITABLE', 1);
  NEUTRAL = new DomHelper$ElementEditability_0('NEUTRAL', 2);
  $VALUES_10 = initValues(_3Lorg_waveprotocol_wave_client_common_util_DomHelper$ElementEditability_2_classLit, {9:1, 66:1, 166:1}, 84, [EDITABLE, NOT_EDITABLE, NEUTRAL]);
}

function DomHelper$ElementEditability_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function valueOf_17(name_0){
  $clinit_583();
  return valueOf_0(($clinit_584() , $MAP_10), name_0);
}

function values_11(){
  $clinit_583();
  return $VALUES_10;
}

function DomHelper$ElementEditability(){
}

_ = DomHelper$ElementEditability_0.prototype = DomHelper$ElementEditability.prototype = new Enum;
_.getClass$ = function getClass_344(){
  return Lorg_waveprotocol_wave_client_common_util_DomHelper$ElementEditability_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 84:1};
var $VALUES_10, EDITABLE, NEUTRAL, NOT_EDITABLE;
function $clinit_584(){
  $clinit_584 = nullMethod;
  $MAP_10 = createValueOfMap(($clinit_583() , $VALUES_10));
}

var $MAP_10;
function $unregister(this$static){
  var el = this$static.$el;
  if (el == null) {
    return false;
  }
  el.removeEventListener?el.removeEventListener(this$static.$ev, this$static, this$static.$cp):el.detachEvent?el.detachEvent('on' + this$static.$ev, this$static):(el['on' + this$static.$ev] = null);
  this$static.$ev = null;
  return true;
}

function $getKeyCombo(this$static){
  return getKeyCombo_0(getKeyCode(this$static.event_0), !!this$static.event_0.ctrlKey, !!this$static.event_0.shiftKey, !!this$static.event_0.altKey, !!this$static.event_0.metaKey);
}

function EventWrapper_0(event_0){
  $clinit_587();
  this.event_0 = event_0;
}

function asString(event_0){
  var string;
  string = event_0.type;
  switch ($eventGetTypeInt(event_0.type)) {
    case 256:
    case 512:
    case 128:
      string += ' ' + (event_0.keyCode || 0) + " '" + String.fromCharCode((event_0.keyCode || 0) & 65535) + "'" + ((event_0.altKey?' alt':'') + (event_0.shiftKey?' shift':'') + (event_0.ctrlKey?' ctrl':'') + (event_0.metaKey?' meta':'') + ($eventGetTypeInt(event_0.type) == 128 && !!event_0.repeat?' repeat':''));
      break;
    case 1:
    case 2:
    case 64:
      string += ' (' + (event_0.clientX || 0) + ', ' + (event_0.clientY || 0) + ')' + ((event_0.altKey?' alt':'') + (event_0.shiftKey?' shift':'') + (event_0.ctrlKey?' ctrl':'') + (event_0.metaKey?' meta':'') + ($eventGetTypeInt(event_0.type) == 128 && !!event_0.repeat?' repeat':''));
      break;
    case 4:
    case 8:
      string += ' (' + (event_0.clientX || 0) + ', ' + (event_0.clientY || 0) + ')' + ($eventGetButton(event_0) == -1?'':(($eventGetButton(event_0) & 1) != 0?' left':'') + (($eventGetButton(event_0) & 4) != 0?' middle':'') + (($eventGetButton(event_0) & 2) != 0?' right':'')) + ((event_0.altKey?' alt':'') + (event_0.shiftKey?' shift':'') + (event_0.ctrlKey?' ctrl':'') + (event_0.metaKey?' meta':'') + ($eventGetTypeInt(event_0.type) == 128 && !!event_0.repeat?' repeat':''));
      break;
    case 32:
      string += ' (' + (event_0.clientX || 0) + ', ' + (event_0.clientY || 0) + ')' + ((event_0.altKey?' alt':'') + (event_0.shiftKey?' shift':'') + (event_0.ctrlKey?' ctrl':'') + (event_0.metaKey?' meta':'') + ($eventGetTypeInt(event_0.type) == 128 && !!event_0.repeat?' repeat':'')) + ' to: ' + $eventGetToElement(event_0);
      break;
    case 16:
      string += ' (' + (event_0.clientX || 0) + ', ' + (event_0.clientY || 0) + ')' + ((event_0.altKey?' alt':'') + (event_0.shiftKey?' shift':'') + (event_0.ctrlKey?' ctrl':'') + (event_0.metaKey?' meta':'') + ($eventGetTypeInt(event_0.type) == 128 && !!event_0.repeat?' repeat':'')) + ' from: ' + $eventGetFromElement(event_0);
      break;
    case 131072:
      string += ' ' + (Math.round(-event_0.wheelDelta / 40) || 0) + ' (' + (event_0.clientX || 0) + ', ' + (event_0.clientY || 0) + ')' + ((event_0.altKey?' alt':'') + (event_0.shiftKey?' shift':'') + (event_0.ctrlKey?' ctrl':'') + (event_0.metaKey?' meta':'') + ($eventGetTypeInt(event_0.type) == 128 && !!event_0.repeat?' repeat':''));
  }
  return string;
}

function getKeyCode(evt){
  var keyCode;
  keyCode = evt.keyCode || 0;
  keyCode == 0 && (keyCode = evt.charCode || 0);
  return keyCode;
}

function getKeyCombo(evt){
  $clinit_587();
  return getKeyCombo_0(getKeyCode(evt), !!evt.ctrlKey, !!evt.shiftKey, !!evt.altKey, !!evt.metaKey);
}

function EventWrapper(){
}

_ = EventWrapper_0.prototype = EventWrapper.prototype = new Object_0;
_.getClass$ = function getClass_345(){
  return Lorg_waveprotocol_wave_client_common_util_EventWrapper_2_classLit;
}
;
_.toString$ = function toString_39(){
  return asString(this.event_0);
}
;
_.castableTypeMap$ = {};
_.event_0 = null;
function $clear_13(this$static){
  while ($getUsable(this$static, this$static.first)) {
    $remove_27(this$static, this$static.first.key);
  }
}

function $getFirst_0(this$static){
  return $getUsable(this$static, this$static.first);
}

function $isLast(this$static, elt){
  return elt == this$static.last;
}

function $doOrphan(this$static, child){
  checkArgument_2(!!child && child.parent_0 == this$static, 'Not a child');
  $setParent(child, null);
  $remove_5(this$static.children_0, child);
}

function LogicalPanel$Impl(){
}

_ = LogicalPanel$Impl.prototype = new ComplexPanel;
_.doAdopt = function doAdopt(child){
  checkArgument_2(!!child && !child.parent_0, 'Not an orphan');
  $add_7(this.children_0, child);
  $setParent(child, this);
}
;
_.doOrphan = function doOrphan(child){
  $doOrphan(this, child);
}
;
_.getClass$ = function getClass_374(){
  return Lorg_waveprotocol_wave_client_common_util_LogicalPanel$Impl_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 59:1, 231:1};
function $clinit_634(){
  $clinit_634 = nullMethod;
  NONE_0 = new SignalEvent$KeyModifier$1_0;
  SHIFT = new SignalEvent$KeyModifier$2_0;
  CTRL = new SignalEvent$KeyModifier$3_0;
  ALT = new SignalEvent$KeyModifier$4_0;
  META = new SignalEvent$KeyModifier$5_0;
  COMMAND = new SignalEvent$KeyModifier$6_0;
  CTRL_ALT = new SignalEvent$KeyModifier$7_0;
  COMMAND_SHIFT = new SignalEvent$KeyModifier$8_0;
  $VALUES_12 = initValues(_3Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier_2_classLit, {9:1, 66:1, 166:1}, 86, [NONE_0, SHIFT, CTRL, ALT, META, COMMAND, CTRL_ALT, COMMAND_SHIFT]);
  COMMAND_IS_CTRL = !($clinit_661() , $clinit_661() , INSTANCE_4).isMac;
}

function valueOf_19(name_0){
  $clinit_634();
  return valueOf_0(($clinit_643() , $MAP_12), name_0);
}

function values_13(){
  $clinit_634();
  return $VALUES_12;
}

function SignalEvent$KeyModifier(){
}

_ = SignalEvent$KeyModifier.prototype = new Enum;
_.getClass$ = function getClass_377(){
  return Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 86:1};
var $VALUES_12, ALT, COMMAND, COMMAND_IS_CTRL, COMMAND_SHIFT, CTRL, CTRL_ALT, META, NONE_0, SHIFT;
function $check(event_0){
  return !event_0.nativeEvent.shiftKey && !event_0.nativeEvent.altKey && !event_0.nativeEvent.ctrlKey && !event_0.nativeEvent.metaKey;
}

function SignalEvent$KeyModifier$1_0(){
  this.name_1 = 'NONE';
  this.ordinal = 0;
}

function SignalEvent$KeyModifier$1(){
}

_ = SignalEvent$KeyModifier$1_0.prototype = SignalEvent$KeyModifier$1.prototype = new SignalEvent$KeyModifier;
_.check = function check_0(event_0){
  return !event_0.nativeEvent.shiftKey && !event_0.nativeEvent.altKey && !event_0.nativeEvent.ctrlKey && !event_0.nativeEvent.metaKey;
}
;
_.getClass$ = function getClass_378(){
  return Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$1_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 86:1};
function $check_0(event_0){
  return !!event_0.nativeEvent.shiftKey && !event_0.nativeEvent.altKey && !event_0.nativeEvent.ctrlKey && !event_0.nativeEvent.metaKey;
}

function SignalEvent$KeyModifier$2_0(){
  this.name_1 = 'SHIFT';
  this.ordinal = 1;
}

function SignalEvent$KeyModifier$2(){
}

_ = SignalEvent$KeyModifier$2_0.prototype = SignalEvent$KeyModifier$2.prototype = new SignalEvent$KeyModifier;
_.check = function check_1(event_0){
  return !!event_0.nativeEvent.shiftKey && !event_0.nativeEvent.altKey && !event_0.nativeEvent.ctrlKey && !event_0.nativeEvent.metaKey;
}
;
_.getClass$ = function getClass_379(){
  return Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$2_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 86:1};
function $check_1(event_0){
  return !event_0.nativeEvent.shiftKey && !event_0.nativeEvent.altKey && !!event_0.nativeEvent.ctrlKey && !event_0.nativeEvent.metaKey;
}

function SignalEvent$KeyModifier$3_0(){
  this.name_1 = 'CTRL';
  this.ordinal = 2;
}

function SignalEvent$KeyModifier$3(){
}

_ = SignalEvent$KeyModifier$3_0.prototype = SignalEvent$KeyModifier$3.prototype = new SignalEvent$KeyModifier;
_.check = function check_2(event_0){
  return !event_0.nativeEvent.shiftKey && !event_0.nativeEvent.altKey && !!event_0.nativeEvent.ctrlKey && !event_0.nativeEvent.metaKey;
}
;
_.getClass$ = function getClass_380(){
  return Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$3_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 86:1};
function SignalEvent$KeyModifier$4_0(){
  this.name_1 = 'ALT';
  this.ordinal = 3;
}

function SignalEvent$KeyModifier$4(){
}

_ = SignalEvent$KeyModifier$4_0.prototype = SignalEvent$KeyModifier$4.prototype = new SignalEvent$KeyModifier;
_.check = function check_3(event_0){
  return !event_0.nativeEvent.shiftKey && !!event_0.nativeEvent.altKey && !event_0.nativeEvent.ctrlKey && !event_0.nativeEvent.metaKey;
}
;
_.getClass$ = function getClass_381(){
  return Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$4_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 86:1};
function SignalEvent$KeyModifier$5_0(){
  this.name_1 = 'META';
  this.ordinal = 4;
}

function SignalEvent$KeyModifier$5(){
}

_ = SignalEvent$KeyModifier$5_0.prototype = SignalEvent$KeyModifier$5.prototype = new SignalEvent$KeyModifier;
_.check = function check_4(event_0){
  return !event_0.nativeEvent.shiftKey && !event_0.nativeEvent.altKey && !event_0.nativeEvent.ctrlKey && !!event_0.nativeEvent.metaKey;
}
;
_.getClass$ = function getClass_382(){
  return Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$5_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 86:1};
function SignalEvent$KeyModifier$6_0(){
  this.name_1 = 'COMMAND';
  this.ordinal = 5;
}

function SignalEvent$KeyModifier$6(){
}

_ = SignalEvent$KeyModifier$6_0.prototype = SignalEvent$KeyModifier$6.prototype = new SignalEvent$KeyModifier;
_.check = function check_5(event_0){
  return COMMAND_IS_CTRL?$check_1(event_0):!event_0.nativeEvent.shiftKey && !event_0.nativeEvent.altKey && !event_0.nativeEvent.ctrlKey && !!event_0.nativeEvent.metaKey;
}
;
_.getClass$ = function getClass_383(){
  return Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$6_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 86:1};
function SignalEvent$KeyModifier$7_0(){
  this.name_1 = 'CTRL_ALT';
  this.ordinal = 6;
}

function SignalEvent$KeyModifier$7(){
}

_ = SignalEvent$KeyModifier$7_0.prototype = SignalEvent$KeyModifier$7.prototype = new SignalEvent$KeyModifier;
_.check = function check_6(event_0){
  return !event_0.nativeEvent.shiftKey && !!event_0.nativeEvent.altKey && !!event_0.nativeEvent.ctrlKey && !event_0.nativeEvent.metaKey;
}
;
_.getClass$ = function getClass_384(){
  return Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$7_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 86:1};
function SignalEvent$KeyModifier$8_0(){
  this.name_1 = 'COMMAND_SHIFT';
  this.ordinal = 7;
}

function SignalEvent$KeyModifier$8(){
}

_ = SignalEvent$KeyModifier$8_0.prototype = SignalEvent$KeyModifier$8.prototype = new SignalEvent$KeyModifier;
_.check = function check_7(event_0){
  var notCommandKey;
  notCommandKey = COMMAND_IS_CTRL?!!event_0.nativeEvent.metaKey:!!event_0.nativeEvent.ctrlKey;
  return !!event_0.nativeEvent.shiftKey && !event_0.nativeEvent.altKey && (($clinit_648() , logic_0).commandIsCtrl?!!event_0.nativeEvent.ctrlKey:!!event_0.nativeEvent.metaKey) && !notCommandKey;
}
;
_.getClass$ = function getClass_385(){
  return Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$8_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 86:1};
function $clinit_643(){
  $clinit_643 = nullMethod;
  $MAP_12 = createValueOfMap(($clinit_634() , $VALUES_12));
}

var $MAP_12;
function $clinit_646(){
  $clinit_646 = nullMethod;
  CHARACTER = new SignalEvent$MoveUnit_0('CHARACTER', 0);
  WORD = new SignalEvent$MoveUnit_0('WORD', 1);
  LINE = new SignalEvent$MoveUnit_0('LINE', 2);
  PAGE = new SignalEvent$MoveUnit_0('PAGE', 3);
  DOCUMENT = new SignalEvent$MoveUnit_0('DOCUMENT', 4);
  $VALUES_14 = initValues(_3Lorg_waveprotocol_wave_client_common_util_SignalEvent$MoveUnit_2_classLit, {9:1, 66:1, 166:1}, 88, [CHARACTER, WORD, LINE, PAGE, DOCUMENT]);
}

function SignalEvent$MoveUnit_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function valueOf_21(name_0){
  $clinit_646();
  return valueOf_0(($clinit_647() , $MAP_14), name_0);
}

function values_15(){
  $clinit_646();
  return $VALUES_14;
}

function SignalEvent$MoveUnit(){
}

_ = SignalEvent$MoveUnit_0.prototype = SignalEvent$MoveUnit.prototype = new Enum;
_.getClass$ = function getClass_387(){
  return Lorg_waveprotocol_wave_client_common_util_SignalEvent$MoveUnit_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 88:1};
var $VALUES_14, CHARACTER, DOCUMENT, LINE, PAGE, WORD;
function $clinit_647(){
  $clinit_647 = nullMethod;
  $MAP_14 = createValueOfMap(($clinit_646() , $VALUES_14));
}

var $MAP_14;
function $isCombo(this$static, letter, modifier){
  var keyCode;
  keyCode = this$static.cachedKeyCode;
  if (keyCode >= shiftMappings.length) {
    return false;
  }
  return (letter == keyCode || letter == shiftMappings[keyCode]) && modifier.check(this$static);
}

function $isRedoCombo(this$static){
  if ((($clinit_661() , $clinit_661() , INSTANCE_4).isMac || INSTANCE_4.isLinux) && $isCombo(this$static, 90, ($clinit_634() , COMMAND_SHIFT))) {
    return true;
  }
  return !INSTANCE_4.isMac && $isCombo(this$static, 89, ($clinit_634() , COMMAND));
}

function removeDebugClass(uiObject){
  checkNotNull_0(uiObject, 'uiObject cannot be null');
  removeDebugClass_0(uiObject);
}

function removeDebugClass_0(){
}

_ = AnnotationBehaviour$DefaultAnnotationBehaviour.prototype;
_.getAnnotationFamily = function getAnnotationFamily(){
  return this.family;
}
;
_.getBias = function getBias(left, right, cursor){
  return $clinit_1749() , NEITHER;
}
;
_.getPriority = function getPriority(){
  return 1;
}
;
_ = LinkAnnotationHandler$2.prototype;
_.getBias = function getBias_0(left, right, cursor){
  var ret;
  ret = new Box_1(($clinit_1749() , NEITHER));
  ($clinit_686() , KEYS).each_3(new LinkAnnotationHandler$2$1_0(left, ret, right));
  return dynamicCast(ret.boxed, 133);
}
;
_.getPriority = function getPriority_0(){
  return 10;
}
;
function LinkAnnotationHandler$2$1_0(val$left, val$ret, val$right){
  this.val$left = val$left;
  this.val$ret = val$ret;
  this.val$right = val$right;
}

function LinkAnnotationHandler$2$1(){
}

_ = LinkAnnotationHandler$2$1_0.prototype = LinkAnnotationHandler$2$1.prototype = new Object_0;
_.apply_4 = function apply_18(key){
  this.val$left.get_4(key) != null?(this.val$ret.boxed = ($clinit_1749() , RIGHT_4)):this.val$right.get_4(key) != null && (this.val$ret.boxed = ($clinit_1749() , LEFT_4));
}
;
_.getClass$ = function getClass_418(){
  return Lorg_waveprotocol_wave_client_doodad_link_LinkAnnotationHandler$2$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.val$left = null;
_.val$ret = null;
_.val$right = null;
function $start(this$static, context){
  $writeSelection(this$static, context);
  $add_33(context.updateEvent.updateListeners, this$static);
}

function $stop(this$static, context){
  var dataKey, document_0, endKey, rangeKey, size;
  $remove_42(context.updateEvent.updateListeners, this$static);
  document_0 = ($checkContextConsistency(context) , context.content_0.mutableContent);
  size = $size_15(document_0.doc);
  rangeKey = ($clinit_696() , 'user/r/' + this$static.sessionId);
  endKey = 'user/e/' + this$static.sessionId;
  dataKey = 'user/d/' + this$static.sessionId;
  $setAnnotation(document_0, 0, size, dataKey, null);
  $setAnnotation(document_0, 0, size, rangeKey, null);
  $setAnnotation(document_0, 0, size, endKey, null);
}

function $writeSelection(this$static, context){
  var compositionState, currentTimeMillis, document_0, selection;
  document_0 = ($checkContextConsistency(context) , context.content_0.mutableContent);
  selection = $getSelectionRange((checkState_2(!!context.passiveSelectionHelper, 'Using the selection helper of an editor not set up.') , $checkContextConsistency(context) , context.passiveSelectionHelper));
  compositionState = $getContent_0(context.imeExtractor);
  currentTimeMillis = (new Date).getTime();
  $writeSelection_0(this$static, document_0, selection, compositionState, currentTimeMillis);
}

function $writeSelection_0(this$static, document_0, selection, compositionState, currentTimeMillis){
  var currentEnd, currentFocus, currentStart, dataKey, endKey, newEnd, newFocus, newStart, range, rangeKey, size, value;
  range = !selection?null:(!selection.range && (selection.range = selection.anchor < selection.focus_0?new Range_2(selection.anchor, selection.focus_0):new Range_2(selection.focus_0, selection.anchor)) , selection.range);
  rangeKey = ($clinit_696() , 'user/r/' + this$static.sessionId);
  endKey = 'user/e/' + this$static.sessionId;
  dataKey = 'user/d/' + this$static.sessionId;
  value = this$static.address;
  size = $size_15(document_0.doc);
  !!range && $setAnnotation(document_0, 0, size, dataKey, this$static.address + ',' + currentTimeMillis + ',' + (compositionState != null?compositionState:''));
  currentFocus = $firstAnnotationChange_2(document_0.doc, 0, size, endKey, null);
  currentEnd = $lastAnnotationChange_2(document_0.doc, 0, size, rangeKey, null);
  currentEnd == -1 && (currentEnd = currentFocus);
  if (currentEnd != -1) {
    currentStart = $firstAnnotationChange_2(document_0.doc, 0, size, rangeKey, null);
    (currentStart == -1 || currentStart > currentEnd) && (currentStart = currentEnd);
    if (range) {
      newStart = range.start;
      newEnd = range.end;
      newFocus = selection.focus_0;
      newFocus < currentFocus?$setAnnotation(document_0, newFocus, currentFocus, endKey, value):newFocus > currentFocus && $setAnnotation(document_0, currentFocus, newFocus, endKey, null);
      if (currentStart >= newEnd || newStart >= currentEnd) {
        $setAnnotation(document_0, currentStart, currentEnd, rangeKey, null);
        $setAnnotation(document_0, newStart, newEnd, rangeKey, value);
      }
       else {
        currentStart < newStart?$setAnnotation(document_0, currentStart, newStart, rangeKey, null):currentStart > newStart && $setAnnotation(document_0, newStart, currentStart, rangeKey, value);
        currentEnd < newEnd?$setAnnotation(document_0, currentEnd, newEnd, rangeKey, value):currentEnd > newEnd && $setAnnotation(document_0, newEnd, currentEnd, rangeKey, null);
      }
    }
     else {
      $setAnnotation(document_0, currentFocus, size, endKey, null);
      $setAnnotation(document_0, currentStart, currentEnd, rangeKey, null);
      $setAnnotation(document_0, 0, size, dataKey, null);
    }
  }
   else {
    if (range) {
      $setAnnotation(document_0, selection.focus_0, size, endKey, value);
      $setAnnotation(document_0, range.start, range.end, rangeKey, value);
    }
  }
}

function SelectionExtractor_0(address, sessionId){
  checkNotNull_0(address, 'Address must not be null');
  checkNotNull_0(sessionId, 'Session id must not be null');
  this.address = address;
  this.sessionId = sessionId;
}

function SelectionExtractor(){
}

_ = SelectionExtractor_0.prototype = SelectionExtractor.prototype = new Object_0;
_.getClass$ = function getClass_429(){
  return Lorg_waveprotocol_wave_client_doodad_selection_SelectionExtractor_2_classLit;
}
;
_.onUpdate = function onUpdate(event_0){
  var context;
  if (event_0.notedSelectionLocationChanged) {
    context = event_0.editor;
    $startIndirectSequence(context.responsibility);
    try {
      $writeSelection(this, context);
    }
     finally {
      $endIndirectSequence(context.responsibility);
    }
  }
}
;
_.castableTypeMap$ = {205:1};
_.address = null;
_.sessionId = null;
function $rangedAnnotations(this$static, start, end, keys){
  checkPositionIndexesInRange(start, end, this$static.tree.sentinel.left.subtreeLength - 1);
  !keys && (keys = this$static.tree.knownKeys);
  return new GenericRangedAnnotationIterable_0(this$static, start, end, keys);
}

_ = AnnotationTree.prototype;
_.rangedAnnotations = function rangedAnnotations_0(start, end, keys){
  return $rangedAnnotations(this, start, end, keys);
}
;
function $getCaretAnnotations(this$static){
  return !this$static.editor?null:$getCaretAnnotations_0(this$static.editor);
}

function $getDocument(this$static){
  return !this$static.editor?null:$getDocument_0(this$static.editor);
}

function $getSelectionHelper(this$static){
  if (!this$static.editor) {
    $log_0(($clinit_741() , logger_1).errorLogger, "Don't access editor selection with context not attached to an editor!");
    return $clinit_1019() , NOP_IMPL_0;
  }
  return $getSelectionHelper_0(this$static.editor);
}

function $undoableSequence(this$static, cmd){
  checkState_2(!!this$static.editor, 'editor must not be null');
  $undoableSequence_0(this$static.editor, cmd);
}

function EditorContextAdapter_0(){
  this.editor = null;
}

function EditorContextAdapter(){
}

_ = EditorContextAdapter_0.prototype = EditorContextAdapter.prototype = new Object_0;
_.getCaretAnnotations = function getCaretAnnotations(){
  return !this.editor?null:$getCaretAnnotations_0(this.editor);
}
;
_.getClass$ = function getClass_434(){
  return Lorg_waveprotocol_wave_client_editor_EditorContextAdapter_2_classLit;
}
;
_.getDocument = function getDocument(){
  return !this.editor?null:$getDocument_0(this.editor);
}
;
_.getSelectionHelper = function getSelectionHelper(){
  return $getSelectionHelper(this);
}
;
_.castableTypeMap$ = {};
_.editor = null;
function $addKeySignalListener(this$static, listener){
  !this$static.keySignalListeners && (this$static.keySignalListeners = new HashSet_0);
  $add_13(this$static.keySignalListeners, listener);
}

function $checkContextConsistency(this$static){
  if (!(!(!!this$static.pasteExtractor && this$static.pasteExtractor.busy) && !(!!this$static.typing && ($isBusy(this$static.typing) || this$static.domMutationReverter.entries.size_0 != 0)))) {
    !!this$static.content_0 && $flush_1(this$static.typing);
    $log_0(($clinit_741() , logger_1).errorLogger, 'Editor context methods called while editor is not consistent.');
  }
}

function $clearContent(this$static){
  var oldSink;
  if (this$static.content_0) {
    $updateDocumentEditState(this$static, false);
    $clinit_741();
    ++ignoreMutations;
    try {
      this$static.domHandlers.each_0(new EditorImpl$11_0);
      this$static.domHandlers.clear();
      if (this$static.ownsDocument) {
        this$static.div.removeChild(dynamicCast(this$static.content_0.fullContentView.inner_0.getDocumentElement(), 191).implNodelet);
      }
       else {
        oldSink = $replaceOutgoingSink(this$static.content_0, this$static.innerOutputSink);
        if (oldSink != this$static.outgoingOperationSink) {
          throw new RuntimeException_1('Document had a mysterious sink.  Restoration is unsafe');
        }
        $removeClassName(this$static.div, 'editor');
      }
    }
     finally {
      --ignoreMutations;
    }
  }
  this$static.content_0 = null;
}

function $debugConnectOpSinks(this$static, isConnected){
  var op, op$iterator;
  if (this$static.permitOperations == isConnected) {
    return;
  }
  this$static.permitOperations = isConnected;
  if (this$static.permitOperations) {
    for (op$iterator = new AbstractList$IteratorImpl_0(this$static.suppressedOutgoingOps); op$iterator.i < op$iterator.this$0_0.size_1();) {
      op = dynamicCast($next_4(op$iterator), 202);
      $consume_1(this$static.outgoingOperationSink, op);
    }
    this$static.suppressedOutgoingOps = null;
    $clinit_1172();
    $schedule_2(scheduler_0, ($clinit_1175() , LOW), this$static.consistencyQueue);
  }
   else {
    this$static.suppressedOutgoingOps = new ArrayList_0;
  }
}

function $debugToggleDebugDialog(this$static){
  var popup;
  if (this$static.settings.hasDebugDialog) {
    popup = (!this$static.debugPopup && (this$static.debugPopup = create_21(this$static)) , this$static.debugPopup);
    popup.showing?$hide(popup):$show_0(popup);
  }
}

function $doSaveSelection(this$static){
  var range;
  if (this$static.passiveSelectionHelper) {
    range = $getSelectionRange(this$static.passiveSelectionHelper);
    !!range && $trackRange(this$static.savedSelection, range);
  }
}

function $editorRelevantEvent(this$static, event_0){
  return this$static.editing || $isTargetEditableInDisplayMode(event_0) || $equals_3('copy', event_0.nativeEvent.type);
}

function $fireKeyboardEvent(this$static, evt){
  var handled, l_0, l$iterator, outerIter, entry;
  handled = false;
  if (this$static.keySignalListeners) {
    for (l$iterator = (outerIter = $keySet_0(this$static.keySignalListeners.map).val$entrySet.iterator_0() , new AbstractMap$1$1_0(outerIter)); l$iterator.val$outerIter.hasNext();) {
      l_0 = dynamicCast((entry = dynamicCast(l$iterator.val$outerIter.next_0(), 11) , entry.getKey()), 199);
      handled = $onKeySignal_2(l_0, evt) || handled;
    }
  }
  return handled;
}

function $getCaretAnnotations_0(this$static){
  checkState_2(!!this$static.caretStyles, 'Using the caret annotations of an editor not set up.');
  $checkContextConsistency(this$static);
  return this$static.caretStyles;
}

function $getDocument_0(this$static){
  $checkContextConsistency(this$static);
  return this$static.content_0.mutableContent;
}

function $getSelectionHelper_0(this$static){
  checkState_2(!!this$static.passiveSelectionHelper, 'Using the selection helper of an editor not set up.');
  $checkContextConsistency(this$static);
  return this$static.passiveSelectionHelper;
}

function $init_1(this$static, bindings, settings){
  checkState_2(!this$static.ownsDocument, 'Can only set registries on owned documents');
  this$static.registries = null;
  this$static.keyBindings = bindings;
  this$static.settings = settings;
  this$static.eventHandler = new EditorEventHandler_0(new EditorImpl$EditorInteractorImpl_0(this$static), this$static.eventsSubHandler, ($clinit_857() , INSTANCE_7), settings.useWhitelistInEditor, settings.useWebkitCompositionEvents);
  $setEditing(this$static, false);
}

function $insertText(this$static, at, text, isReplace){
  var builder, location_0;
  text = $coerceString(($clinit_1980() , text));
  location_0 = $getLocation_0(this$static.content_0.mutableContent, getFilteredPoint(this$static.content_0.persistentContentView, at));
  isReplace || $supplementAnnotations(this$static.annotationLogic, location_0, this$static.currentSelectionBias, ($clinit_1751() , PLAIN_TEXT));
  builder = new Nindo$Builder_0;
  $add_9(builder.mutationList, new Nindo$Skip_0(location_0));
  $buildAnnotationStarts(this$static.caretStyles, builder);
  !text.length || $add_9(builder.mutationList, new Nindo$Characters_0(text));
  $buildAnnotationEnds(this$static.caretStyles, builder);
  $hackConsume(this$static.content_0.mutableContent, new Nindo_0(builder.mutationList));
  return $locate_0(this$static.content_0.mutableContent.doc, location_0 + text.length);
}

function $isConsistent(this$static){
  if (!this$static.content_0) {
    return true;
  }
  return !(!!this$static.pasteExtractor && this$static.pasteExtractor.busy) && !(!!this$static.typing && ($isBusy(this$static.typing) || this$static.domMutationReverter.entries.size_0 != 0));
}

function $isTargetEditableInDisplayMode(event_0){
  var target;
  target = event_0.nativeEvent.target;
  target.nodeType == 3 && (target = $getParentElement(target));
  return isEditable_0(target);
}

function $isTyping(this$static){
  return !!this$static.typing && ($isBusy(this$static.typing) || this$static.domMutationReverter.entries.size_0 != 0);
}

function $maybeRestoreAncestorScrollPositions(this$static){
  if (this$static.ancestorScrollTops) {
    this$static.ancestorScrollTops.each(new EditorImpl$17_0);
    this$static.ancestorScrollTops = null;
  }
}

function $maybeSaveAncestorScrollPositions(this$static, e){
  $clinit_628();
  this$static.ancestorScrollTops = ($clinit_2278() , defaultCollectionFactory.createIdentityMap());
  while (e) {
    this$static.ancestorScrollTops.put_0(e, valueOf_12(e.scrollTop || 0));
    e = $getParentElement(e);
  }
}

function $notifyTypingExtractor(this$static, htmlCaret){
  var $e0, e;
  checkNotNull_1(htmlCaret, 'Notifying typing extractor with invalid selection');
  try {
    $somethingHappened(this$static.typing, htmlCaret);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 200)) {
      e = $e0;
      $handleMissing(this$static.repairer, e);
    }
     else if (instanceOf($e0, 201)) {
      e = $e0;
      $handleInserted(this$static.repairer, e);
    }
     else 
      throw $e0;
  }
}

function $rebiasSelection(this$static, lastDirection){
  if (!!this$static.typing && ($isBusy(this$static.typing) || this$static.domMutationReverter.entries.size_0 != 0)) {
    this$static.currentSelectionBias = ($clinit_1749() , LEFT_4);
    return;
  }
  !instance_7 && (instance_7 = new BrowserBackedScheduler_0 , setDefaultTimerService() , undefined);
  $schedule_5(high_0, new EditorImpl$10_0(this$static, lastDirection));
}

function $registerDomEventHandling(this$static){
  var event_0, event$array, event$index, event$max;
  for (event$array = ($clinit_768() , HANDLED_EVENTS) , event$index = 0 , event$max = event$array.length; event$index < event$max; ++event$index) {
    event_0 = event$array[event$index];
    this$static.domHandlers.add_2(registerEventHandler(dynamicCast(this$static.content_0.fullContentView.inner_0.getDocumentElement(), 191).implNodelet, event_0, false, this$static));
  }
}

function $removeContent(this$static){
  var oldDoc;
  oldDoc = this$static.content_0;
  $clearContent(this$static);
  if (this$static.ownsDocument) {
    $setRendering(oldDoc);
    $replaceOutgoingSink(oldDoc, ($clinit_2164() , VOID));
  }
   else {
    checkState_2(!!oldDoc.logicalPanel, "Don't have a logicalPanel");
    $adjustLevel(oldDoc, ($clinit_815() , INTERACTIVE));
  }
  return oldDoc;
}

function $reset(this$static){
  var i, w;
  $clear_15(this$static.updateEvent);
  $clear_20(this$static.elementsWithDisplayEditModes);
  i = new WidgetCollection$WidgetIterator_0(this$static.children_0);
  while (i.index_0 < i.this$0.size_0 - 1) {
    w = $next_1(i);
    $doOrphan(this$static, w);
    i = new WidgetCollection$WidgetIterator_0(this$static.children_0);
  }
  this$static.repairer = null;
  this$static.keyBindings.bindings.clear();
  this$static.caretStyles = null;
  $clearContent(this$static);
  this$static.annotationLogic = null;
}

function $safelyRestoreSelection(this$static, selectionHelper, collapsed){
  var sel, selectionRestored;
  selectionRestored = false;
  sel = $getFocusedRange(this$static.savedSelection);
  if (sel) {
    $log_0(($clinit_741() , logger_1).traceLogger, 'Focusing, set selection at: ' + sel.focus_0);
    collapsed?$setCaret(selectionHelper, sel.focus_0):$setSelectionRange_1(selectionHelper, sel);
    selectionRestored = !!$getSelectionPoints(selectionHelper);
  }
  if (!selectionRestored) {
    $log_0(($clinit_741() , logger_1).traceLogger, 'Focusing at last valid point as a catch-all');
    $setCaret_0(selectionHelper, $getLastValidSelectionPoint(selectionHelper));
  }
}

function $setContent_0(this$static, newDoc){
  var docDiv, revertTask, sequencer, undoableDocument, undoingSequencer, docElement, docPainter;
  !!this$static.content_0 && $flush_1(this$static.typing);
  $clinit_741();
  ++ignoreMutations;
  try {
    !!this$static.suggestionsManager && $clear_13(this$static.suggestionsManager.suggestables);
    $clear_20(this$static.elementsWithDisplayEditModes);
    $clearContent(this$static);
    this$static.content_0 = newDoc;
    this$static.ownsDocument?$replaceOutgoingSink(this$static.content_0, this$static.outgoingOperationSink):(this$static.innerOutputSink = $replaceOutgoingSink(this$static.content_0, this$static.outgoingOperationSink));
    this$static.content_0.level.ordinal - ($clinit_815() , RENDERED).ordinal >= 0 || $setRendering(this$static.content_0);
    this$static.repairer = this$static.content_0.repairer;
    this$static.nodeManager = this$static.content_0.nodeManager;
    dynamicCast(this$static.content_0.fullContentView.inner_0.getDocumentElement(), 191);
    this$static.passiveSelectionHelper = new PassiveSelectionHelper_0(this$static.content_0.nodeManager, this$static.content_0.renderedContentView, this$static.content_0.indexedDoc);
    this$static.suggestionsManager = new InteractiveSuggestionsManager_0(this$static.passiveSelectionHelper, this$static.settings.closeSuggestionsMenuDelayMs);
    this$static.aggressiveSelectionHelper = new EditorImpl$12_0(this$static, this$static.nodeManager, this$static.content_0.renderedContentView, this$static.content_0.indexedDoc, this$static.content_0.mutableContent);
    this$static.caretMoveHelper = new CaretMovementHelperWebkitImpl_0(this$static.nodeManager);
    sequencer = this$static.content_0.sequencer;
    this$static.typing = new TypingExtractor_0(this$static.typingSink, this$static.nodeManager, this$static.content_0.filteredHtmlView, this$static.content_0.renderedContentView, this$static.repairer, new EditorImpl$13_0(this$static));
    this$static.responsibility = new ResponsibilityManagerImpl_0;
    this$static.settings.undoEnabled?(this$static.editorUndoManager = new EditorUndoManagerImpl_0(new UndoManagerImpl_0, new EditorImpl$14_0(this$static), this$static.passiveSelectionHelper)):(this$static.editorUndoManager = ($clinit_742() , NOP_IMPL));
    undoingSequencer = new UndoableSequencer_0(sequencer, this$static.responsibility);
    undoableDocument = $createSequencedDocumentWrapper(this$static.content_0, undoingSequencer);
    this$static.pasteExtractor = new PasteExtractor_0(this$static.aggressiveSelectionHelper, undoableDocument, this$static.content_0.renderedContentView, this$static.content_0.persistentContentView, this$static.content_0.registries.annotationHandlerRegistry, undoingSequencer, this$static.content_0.indexedDoc, (this$static.settings , this$static.settings.useSemanticCopyPaste));
    revertTask = new EditorImpl$15_0(this$static);
    this$static.domMutationReverter = new DomMutationReverter_0(new EditorImpl$16_0(this$static, revertTask));
    dynamicCast(this$static.content_0.fullContentView.inner_0.getDocumentElement(), 191);
    this$static.caretStyles = new CaretAnnotations_0;
    this$static.caretStyles.resolver = this$static.annotationResolver;
    $clinit_777();
    docElement = this$static.content_0.context.this$0.mutableContent.doc.substrate.getDocumentElement();
    docPainter = dynamicCast($getProperty_2(($clinit_770() , DOC_PAINTER_PROP), dynamicCast(docElement, 191)), 214);
    !!docPainter && $doRun(docPainter, 80);
    this$static.savedSelection = new RangeTracker_0(this$static.content_0.localAnnotations);
    this$static.passiveSelectionHelper.savedSelection = this$static.savedSelection;
    this$static.annotationLogic = new AnnotationBehaviourLogic_0(($clinit_708() , ROOT_ANNOTATION_REGISTRY), this$static.content_0.mutableContent, this$static.caretStyles);
    $attachEditor(this$static.content_0, this$static.editorPackage, this$static.ownsDocument?this$static:null);
    docDiv = dynamicCast(this$static.content_0.fullContentView.inner_0.getDocumentElement(), 191).implNodelet;
    if (this$static.ownsDocument) {
      this$static.div.appendChild(docDiv);
      $addClassName(docDiv, 'document');
    }
     else {
      checkArgument_2(this$static.div == $getParentElement(docDiv), 'wrong content document');
    }
    docDiv.setAttribute('editableDocMarker', 'true');
    docDiv.setAttribute('spellcheck', 'false');
    $registerDomEventHandling(this$static);
    $setEditing(this$static, this$static.editing);
  }
   finally {
    --ignoreMutations;
  }
}

function $setEditing(this$static, editing){
  this$static.editing = editing;
  if (this$static.content_0) {
    $updateDocumentEditState(this$static, editing);
    this$static.editorUndoManager.maybeCheckpoint();
    if (editing) {
      !this$static.innerOutputSink && $log_0(($clinit_741() , logger_1).errorLogger, 'Scheduling update with no inner output sink...');
      $scheduleUpdateNotification_0(this$static.updateEvent, false, true, false, false);
    }
  }
}

function $shouldTrackCursor(event_0){
  var keyCode, keySignalType;
  if (($clinit_648() , MOUSE_BUTTON_EVENTS).contains_0(event_0.nativeEvent.type)) {
    return true;
  }
  if (KEY_EVENTS.contains_0(event_0.nativeEvent.type)) {
    keySignalType = event_0.keySignalType;
    keyCode = event_0.cachedKeyCode;
    return keySignalType == ($clinit_644() , INPUT) || keySignalType == DELETE_0 || keySignalType == NAVIGATION && keyCode != 34 && keyCode != 33;
  }
  return false;
}

function $undoableSequence_0(this$static, cmd){
  this$static.editorUndoManager.maybeCheckpoint();
  $push_2(this$static.responsibility.sequenceType, ($clinit_764() , DIRECT));
  try {
    cmd.run();
  }
   finally {
    $endDirectSequence(this$static.responsibility);
  }
}

function $updateDocumentEditState(this$static, editing){
  var element, element$iterator, topLevel;
  topLevel = dynamicCast(this$static.content_0.fullContentView.inner_0.getDocumentElement(), 191).implNodelet;
  dynamicCast(this$static.content_0.fullContentView.inner_0.getDocumentElement(), 191).transientData.put_1(($clinit_777() , DOCUMENT_MODE).id_0, ($clinit_415() , editing?TRUE_0:FALSE_0));
  $removeClassName(topLevel, 'wave-editor-on');
  $removeClassName(topLevel, 'wave-editor-off');
  $addClassName(topLevel, editing?'wave-editor-on':'wave-editor-off');
  maybeScheduleRepaint(this$static.content_0.context, 0, $size_15(this$static.content_0.mutableContent.doc));
  topLevel.setAttribute('contentEditable', editing?'true':'false');
  topLevel.style['white-space'] = 'pre-wrap';
  for (element$iterator = $iterator_20(this$static.elementsWithDisplayEditModes); element$iterator.hasNext();) {
    element = dynamicCast(element$iterator.next_0(), 191);
    element.parent_0?onEditModeChange(element, editing):$remove_42(this$static.elementsWithDisplayEditModes, element);
  }
}

function EditorImpl(){
}

_ = EditorImpl.prototype = new LogicalPanel$Impl;
_.focus_2 = function focus_17(collapsed){
  var docElement;
  if (!this.attached) {
    $log_0(($clinit_741() , logger_1).errorLogger, "Shouldn't focus a detached editor");
    return;
  }
  if (this.editing && !!this.content_0) {
    this.content_0?(get_21() , null):null;
    docElement = dynamicCast(this.content_0.fullContentView.inner_0.getDocumentElement(), 191).implNodelet;
    $maybeSaveAncestorScrollPositions(this, docElement);
    ($clinit_401() , $clinit_401() , implWidget).focus_1(docElement);
    $maybeRestoreAncestorScrollPositions(this);
    $safelyRestoreSelection(this, this.aggressiveSelectionHelper, collapsed);
    $scheduleUpdateNotification_0(this.updateEvent, true, true, false, false);
  }
}
;
_.getCaretAnnotations = function getCaretAnnotations_0(){
  return checkState_2(!!this.caretStyles, 'Using the caret annotations of an editor not set up.') , $checkContextConsistency(this) , this.caretStyles;
}
;
_.getClass$ = function getClass_435(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl_2_classLit;
}
;
_.getContent = function getContent(){
  return this.content_0;
}
;
_.getDocument = function getDocument_0(){
  return $checkContextConsistency(this) , this.content_0.mutableContent;
}
;
_.getDocumentHtmlElement = function getDocumentHtmlElement(){
  return dynamicCast(this.content_0.fullContentView.inner_0.getDocumentElement(), 191).implNodelet;
}
;
_.getPersistentDocument = function getPersistentDocument(){
  return this.content_0.persistentContentView;
}
;
_.getSelectionHelper = function getSelectionHelper_0(){
  return checkState_2(!!this.passiveSelectionHelper, 'Using the selection helper of an editor not set up.') , $checkContextConsistency(this) , this.passiveSelectionHelper;
}
;
_.onAttach = function onAttach_3(){
  $onAttach(this);
  this.div['__editor'] = this;
}
;
_.onDetach = function onDetach_3(){
  this.div['__editor'] = null;
  $onDetach(this);
}
;
_.onJavaScriptEvent = function onJavaScriptEvent(name_0, rawEvent){
  var $e0, $e1, cancel, e, el, event_0, hackEditorNeverConsumes, isMutationEvent, savedDoc, trackCursor, oldLevel;
  hackEditorNeverConsumes = $equals_3(name_0, 'contextmenu') || $equals_3(name_0, 'click') || $equals_3(name_0, 'mousedown');
  try {
    event_0 = dynamicCast(create_16(($clinit_961() , FACTORY), rawEvent, !hackEditorNeverConsumes), 195);
    try {
      if (($clinit_661() , $clinit_661() , INSTANCE_4).isMac && !!rawEvent.ctrlKey && !!rawEvent.altKey && $eventGetTypeInt(rawEvent.type) == 256) {
        $log_0(($clinit_741() , logger_1).traceLogger, 'Cancelling dangerous: ' + rawEvent.type);
        rawEvent.preventDefault();
      }
    }
     catch ($e1) {
      $e1 = caught_0($e1);
      if (!instanceOf($e1, 43))
        throw $e1;
    }
    if (!event_0) {
      if (!hackEditorNeverConsumes) {
        try {
          rawEvent.stopPropagation();
        }
         catch ($e1) {
          $e1 = caught_0($e1);
          if (!instanceOf($e1, 43))
            throw $e1;
        }
      }
      return;
    }
    cancel = false;
    if (!hackEditorNeverConsumes) {
      if (this.editing || $isTargetEditableInDisplayMode(event_0) || $equals_3('copy', event_0.nativeEvent.type)) {
        try {
          event_0.nativeEvent.stopPropagation();
        }
         catch ($e1) {
          $e1 = caught_0($e1);
          if (!instanceOf($e1, 43))
            throw $e1;
        }
      }
       else {
        return;
      }
    }
    isMutationEvent = event_0.nativeEvent.type.indexOf('DOM') == 0;
    if (!isMutationEvent || ($clinit_741() , ignoreMutations <= 0)) {
      $clinit_741();
      ++ignoreMutations;
      try {
        if (this.debugDisabled) {
          cancel = false;
        }
         else if (!!this.pasteExtractor && this.pasteExtractor.busy) {
          $log_2(logger_1.traceLogger, 'Too busy to handle: ', event_0);
          cancel = true;
        }
         else {
          $clinit_1024();
          caching = true;
          $push_2(this.responsibility.sequenceType, ($clinit_764() , DIRECT));
          try {
            cancel = $handleEvent(this.eventHandler, event_0);
          }
           finally {
            $endDirectSequence(this.responsibility);
          }
          if (!isMutationEvent) {
            trackCursor = $shouldTrackCursor(event_0);
            !instance_7 && (instance_7 = new BrowserBackedScheduler_0 , setDefaultTimerService() , undefined);
            $schedule_5(high_0, this.selectionSavingTask);
            $scheduleUpdateNotification_0(this.updateEvent, trackCursor, trackCursor, false, false);
          }
        }
        if (cancel && !isMutationEvent) {
          $log_2(logger_1.traceLogger, 'Prevent default: ', event_0);
          rawEvent.preventDefault();
        }
      }
       finally {
        --ignoreMutations;
      }
    }
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 196)) {
      e = $e0;
      $log_0(($clinit_741() , logger_1).errorLogger, 'Operation Exception - probably an invalid operation -> All bets are off!!! Not even going to try to repair!!');
      null.nullMethod();
      dynamicCast(this.content_0.fullContentView.inner_0.getDocumentElement(), 191);
      rawEvent.preventDefault();
      throw e;
    }
     else if (instanceOf($e0, 197)) {
      e = $e0;
      try {
        $logPlainText(($clinit_741() , logger_1).errorLogger, 'Invalid local operation swallowed ' + e);
      }
       catch ($e1) {
        $e1 = caught_0($e1);
        if (instanceOf($e1, 198)) {
          throw e;
        }
         else 
          throw $e1;
      }
    }
     else if (instanceOf($e0, 21)) {
      e = $e0;
      try {
        $log_0(($clinit_741() , logger_1).errorLogger, 'Repairing: ' + e);
        el = is_0(rawEvent.target)?$findElementWrapper_0(this.nodeManager, rawEvent.target):null;
        if (!el) {
          $clinit_736();
          savedDoc = $removeContent(this);
          oldLevel = $adjustLevel(savedDoc, ($clinit_815() , SHELVED));
          $setupBehaviour(savedDoc, savedDoc.fullRawSubstrate.rootElement, oldLevel);
          $setContent_0(this, savedDoc);
          $log_0(logger_1.errorLogger, 'repairing region: ' + dynamicCast(this.content_0.fullContentView.inner_0.getDocumentElement(), 191));
        }
         else {
          $revert(this.repairer, new Point$El_0(el, el.firstChild_0), new Point$El_0(el, null));
        }
        rawEvent.preventDefault();
      }
       finally {
        throw e;
      }
    }
     else 
      throw $e0;
  }
   finally {
    $clinit_1024();
    caching = false;
    cache_1 = null;
  }
}
;
_.setContent = function setContent(op, schema){
  checkState_2(this.ownsDocument, 'Can not replace content not owned');
  $setContent_0(this, new ContentDocument_0(this.registries, op, schema));
}
;
_.toString$ = function toString_50(){
  return 'Editor: [Content: ' + this.content_0 + ']';
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 59:1, 231:1, 235:1, 236:1};
_.aggressiveSelectionHelper = null;
_.ancestorScrollTops = null;
_.annotationLogic = null;
_.caretMoveHelper = null;
_.caretStyles = null;
_.content_0 = null;
_.debugDisabled = false;
_.debugPopup = null;
_.div = null;
_.domMutationReverter = null;
_.editing = false;
_.editorUndoManager = null;
_.eventHandler = null;
_.innerOutputSink = null;
_.keySignalListeners = null;
_.nodeManager = null;
_.ownsDocument = false;
_.passiveSelectionHelper = null;
_.pasteExtractor = null;
_.permitOperations = true;
_.registries = null;
_.repairer = null;
_.responsibility = null;
_.savedSelection = null;
_.suggestionsManager = null;
_.suppressedOutgoingOps = null;
_.typing = null;
_.webkitEndOfLinkHackTextNode = null;
function EditorImpl$1_0(this$0){
  this.this$0 = this$0;
}

function EditorImpl$1(){
}

_ = EditorImpl$1_0.prototype = EditorImpl$1.prototype = new Object_0;
_.getClass$ = function getClass_436(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function EditorImpl$10_0(this$0, val$lastDirection){
  this.this$0 = this$0;
  this.val$lastDirection = val$lastDirection;
}

function EditorImpl$10(){
}

_ = EditorImpl$10_0.prototype = EditorImpl$10.prototype = new Object_0;
_.execute_0 = function execute_15(){
  var current, focused, range;
  current = this.val$lastDirection;
  this.this$0.settings.useFancyCursorBias || (current = ($clinit_1753() , FROM_LEFT));
  focused = $getSelectionRange($getSelectionHelper_0(this.this$0));
  if (focused) {
    range = (!focused.range && (focused.range = focused.anchor < focused.focus_0?new Range_2(focused.anchor, focused.focus_0):new Range_2(focused.focus_0, focused.anchor)) , focused.range);
    this.this$0.currentSelectionBias = $rebias(this.this$0.annotationLogic, range.start, range.end, current);
  }
   else {
    this.this$0.currentSelectionBias = ($clinit_1749() , LEFT_4);
  }
}
;
_.getClass$ = function getClass_437(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$10_2_classLit;
}
;
_.castableTypeMap$ = {248:1, 249:1};
_.this$0 = null;
_.val$lastDirection = null;
function EditorImpl$11_0(){
}

function EditorImpl$11(){
}

_ = EditorImpl$11_0.prototype = EditorImpl$11.prototype = new Object_0;
_.apply_7 = function apply_23(handler){
  $unregister(dynamicCastJso(handler));
}
;
_.getClass$ = function getClass_438(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$11_2_classLit;
}
;
_.castableTypeMap$ = {};
function $getLastValidSelectionPoint(this$static){
  var point;
  point = $findOrCreateValidSelectionPoint(this$static, new Point$El_0(dynamicCast(this$static.renderedContentView.inner_0.getDocumentElement(), 192), null));
  if (!point) {
    throw new RuntimeException_1('Could not create a valid selection point!');
  }
  return point;
}

function $getSelectionPoints(this$static){
  var anchor, focus_0, range, ret;
  get_21();
  try {
    this$static.needsCorrection = false;
    range = filterNonContentSelection(null);
    if (!range) {
      return null;
    }
    anchor = $nodeletPointToFixedContentPoint(this$static, range.anchor);
    focus_0 = range.isCollapsed?anchor:$nodeletPointToFixedContentPoint(this$static, range.focus_0);
    if (!anchor || !focus_0) {
      return null;
    }
    ret = range.isCollapsed?new FocusedContentRange_1(anchor):new FocusedContentRange_0(anchor, focus_0);
    this$static.needsCorrection && !!ret && $setSelectionPoints(this$static, ret.anchor, ret.focus_0);
    return ret;
  }
   finally {
    this$static.needsCorrection = false;
  }
}

function $getSelectionRange(this$static){
  var contentRange;
  contentRange = $getSelectionPoints(this$static);
  if (!contentRange) {
    return null;
  }
  return new FocusedRange_0($getLocation_4(this$static.mapper, contentRange.anchor), $getLocation_4(this$static.mapper, contentRange.focus_0));
}

function $nodeletPointToFixedContentPoint(this$static, point){
  var $e0, $e1, e, ret, textNodeLength;
  try {
    try {
      ret = $nodeletPointToWrapperPoint(this$static.nodeManager, point);
    }
     catch ($e1) {
      $e1 = caught_0($e1);
      if (instanceOf($e1, 21)) {
        e = $e1;
        $log_0(logger_0.errorLogger, 'CAUGHT RUNTIME EXCEPTION in nodeletPointToFixedContentPoint ' + e);
        ret = this$static.nodeletPointToWrapperPointAttempt2(point);
      }
       else 
        throw $e1;
    }
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 201)) {
      e = $e0;
      ret = e.contentPoint;
      this$static.needsCorrection = true;
    }
     else if (instanceOf($e0, 200)) {
      e = $e0;
      ret = before_0(this$static.renderedContentView, e.brokenNode);
      this$static.needsCorrection = true;
    }
     else 
      throw $e0;
  }
  if (!ret || ret.container == null) {
    return null;
  }
  if (ret.offset >= 0) {
    textNodeLength = dynamicCast(ret.container, 192).asText().data_0.length;
    if ($getTextOffset(ret) > textNodeLength) {
      $log_0(logger_0.errorLogger, "Text offset too big for text node, editor consistency: '(no editor available)'");
      ret = new Point$Tx_0(dynamicCast(ret.container, 192), textNodeLength);
    }
  }
   else if (isKnownInvalidTopContainerForCursor(dynamicCast(ret.container, 192))) {
    ret = $findOrCreateValidSelectionPoint(this$static, ret.asElementPoint());
    this$static.needsCorrection = true;
  }
  return ret;
}

function $saveSelection(this$static){
  var range;
  if (this$static.savedSelection) {
    range = $getSelectionRange(this$static);
    !!range && $trackRange(this$static.savedSelection, range);
  }
}

function $setCaret(this$static, caret){
  var collapsed;
  collapsed = $locate_0(this$static.mapper, caret);
  $setCaret_0(this$static, collapsed);
}

function $setCaret_0(this$static, caret){
  var nodeletCaret, asElementPoint;
  if (!caret) {
    throw new IllegalArgumentException_1('setCaret: caret may not be null');
  }
  caret = (asElementPoint = caret.asElementPoint() , !asElementPoint?caret:$findOrCreateValidSelectionPoint(this$static, asElementPoint));
  nodeletCaret = !caret?null:$wrapperPointToNodeletPoint(this$static.nodeManager, caret);
  !!nodeletCaret && ($clinit_1024() , $clinit_1024() , cache_1 = null , $clinit_1024() , $clinit_1024() , cache_1 = null , undefined);
  $saveSelection(this$static);
}

function PassiveSelectionHelper_0(nodeManager, renderedContentView, locationMapper){
  $clinit_718();
  this.mapper = locationMapper;
  this.nodeManager = nodeManager;
  this.renderedContentView = renderedContentView;
}

function PassiveSelectionHelper(){
}

_ = PassiveSelectionHelper_0.prototype = PassiveSelectionHelper.prototype = new Object_0;
_.getClass$ = function getClass_439(){
  return Lorg_waveprotocol_wave_client_editor_selection_content_PassiveSelectionHelper_2_classLit;
}
;
_.getOrderedSelectionRange = function getOrderedSelectionRange(){
  var selection;
  selection = $getSelectionRange(this);
  return selection?(!selection.range && (selection.range = selection.anchor < selection.focus_0?new Range_2(selection.anchor, selection.focus_0):new Range_2(selection.focus_0, selection.anchor)) , selection.range):null;
}
;
_.getSelectionPoints = function getSelectionPoints(){
  return $getSelectionPoints(this);
}
;
_.getSelectionRange = function getSelectionRange(){
  return $getSelectionRange(this);
}
;
_.maybePlaceMissingCursorContainer = function maybePlaceMissingCursorContainer(at){
  return null;
}
;
_.nodeletPointToWrapperPointAttempt2 = function nodeletPointToWrapperPointAttempt2(point){
  return null;
}
;
_.setSelectionRange_0 = function setSelectionRange(selection){
  $setSelectionRange_1(this, selection);
}
;
_.castableTypeMap$ = {};
_.mapper = null;
_.needsCorrection = false;
_.nodeManager = null;
_.renderedContentView = null;
_.savedSelection = null;
function AggressiveSelectionHelper(){
}

_ = AggressiveSelectionHelper.prototype = new PassiveSelectionHelper;
_.getClass$ = function getClass_440(){
  return Lorg_waveprotocol_wave_client_editor_selection_content_AggressiveSelectionHelper_2_classLit;
}
;
_.maybePlaceMissingCursorContainer = function maybePlaceMissingCursorContainer_0(at){
  var inserted, line;
  $log_0(logger_0.errorLogger, 'PROBLEM: Had to create a line container to accommodate the cursor!');
  isLineContainer(($clinit_833() , INSTANCE_6), dynamicCast(at.container, 192))?(line = dynamicCast(($clinit_2104() , appendLine_0(this.mutableDocument, dynamicCast(at.container, 191), null, ($clinit_1849() , EMPTY_MAP_0))), 191)):(line = dynamicCast(appendLine(this.mutableDocument, null, ($clinit_1849() , EMPTY_MAP_0)), 191));
  inserted = ($clinit_893() , dynamicCast(line.transientData.get_0(LINE_0.id_0), 225)).paragraph;
  this.needsCorrection = true;
  return inserted;
}
;
_.nodeletPointToWrapperPointAttempt2 = function nodeletPointToWrapperPointAttempt2_0(nodelet){
  $flushSynchronous(this.this$0);
  this.needsCorrection = true;
  return $nodeletPointToWrapperPoint(this.nodeManager, nodelet);
}
;
_.castableTypeMap$ = {};
_.mutableDocument = null;
function EditorImpl$12_0(this$0, $anonymous1, $anonymous2, $anonymous3, $anonymous4){
  $clinit_718();
  this.this$0 = this$0;
  this.mapper = $anonymous3;
  this.nodeManager = $anonymous1;
  this.renderedContentView = $anonymous2;
  this.mutableDocument = $anonymous4;
}

function EditorImpl$12(){
}

_ = EditorImpl$12_0.prototype = EditorImpl$12.prototype = new AggressiveSelectionHelper;
_.getClass$ = function getClass_441(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$12_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function EditorImpl$13_0(this$0){
  this.this$0 = this$0;
}

function EditorImpl$13(){
}

_ = EditorImpl$13_0.prototype = EditorImpl$13.prototype = new Object_0;
_.getClass$ = function getClass_442(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$13_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function $consume(this$static, op){
  var b, size_1;
  $consumeAndReturnInvertible_0(this$static.this$0.content_0.nindoSink, (b = new Nindo$Builder_0 , op.apply_8(new Nindo$2_0(b)) , size_1 = b.mutationList.size_0 , size_1 > 0 && instanceOf($get_7(b.mutationList, size_1 - 1), 397) && $remove_12(b.mutationList, size_1 - 1) , new Nindo_0(b.mutationList)));
}

function EditorImpl$14_0(this$0){
  this.this$0 = this$0;
}

function EditorImpl$14(){
}

_ = EditorImpl$14_0.prototype = EditorImpl$14.prototype = new Object_0;
_.consume = function consume_1(op){
  $consume(this, dynamicCast(op, 202));
}
;
_.getClass$ = function getClass_443(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$14_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function EditorImpl$15_0(this$0){
  this.this$0 = this$0;
}

function EditorImpl$15(){
}

_ = EditorImpl$15_0.prototype = EditorImpl$15.prototype = new Object_0;
_.execute_0 = function execute_16(){
  $flush_0(this.this$0.domMutationReverter);
}
;
_.getClass$ = function getClass_444(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$15_2_classLit;
}
;
_.castableTypeMap$ = {248:1, 249:1};
_.this$0 = null;
function $scheduleRevert(this$static){
  if (!$isTyping(this$static.this$0)) {
    $log_0(($clinit_741() , logger_1).traceLogger, 'WARNING: Dom removal outside of known typing context');
    $clinit_1172();
    $schedule_2(scheduler_0, ($clinit_1175() , LOW), this$static.val$revertTask);
  }
}

function EditorImpl$16_0(this$0, val$revertTask){
  this.this$0 = this$0;
  this.val$revertTask = val$revertTask;
}

function EditorImpl$16(){
}

_ = EditorImpl$16_0.prototype = EditorImpl$16.prototype = new Object_0;
_.getClass$ = function getClass_445(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$16_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
_.val$revertTask = null;
function EditorImpl$17_0(){
}

function EditorImpl$17(){
}

_ = EditorImpl$17_0.prototype = EditorImpl$17.prototype = new Object_0;
_.apply_3 = function apply_24(e, i){
  dynamicCastJso(e).scrollTop = dynamicCast(i, 64).value_0;
}
;
_.getClass$ = function getClass_446(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$17_2_classLit;
}
;
_.castableTypeMap$ = {};
function $consume_1(this$static, op){
  var $e0, e;
  try {
    this$static.this$0.permitOperations?this$static.this$0.innerOutputSink.consume(op):$add_9(this$static.this$0.suppressedOutgoingOps, op);
    $withinDirectSequence(this$static.this$0.responsibility)?this$static.this$0.editorUndoManager.undoableOp(op):this$static.this$0.editorUndoManager.nonUndoableOp(op);
    $scheduleUpdateNotification_0(this$static.this$0.updateEvent, false, false, true, $withinDirectSequence(this$static.this$0.responsibility));
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 178)) {
      e = $e0;
      !this$static.this$0.innerOutputSink?$logPlainText_0(($clinit_741() , logger_1).fatalLogger, 'Output sink is null', new ClientDebugException_0(e)):$logPlainText_0(($clinit_741() , logger_1).fatalLogger, 'Output sink threw exception', e);
    }
     else 
      throw $e0;
  }
}

function EditorImpl$2_0(this$0){
  this.this$0 = this$0;
}

function EditorImpl$2(){
}

_ = EditorImpl$2_0.prototype = EditorImpl$2.prototype = new Object_0;
_.consume = function consume_2(op){
  $consume_1(this, dynamicCast(op, 202));
}
;
_.getClass$ = function getClass_447(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$2_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function EditorImpl$3_0(this$0){
  this.this$0 = this$0;
}

function EditorImpl$3(){
}

_ = EditorImpl$3_0.prototype = EditorImpl$3.prototype = new Object_0;
_.getClass$ = function getClass_448(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$3_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function $getAnnotation_0(this$static, key){
  var at, biasLeft, browserSelection;
  browserSelection = $getSelectionRange(this$static.this$0.passiveSelectionHelper);
  if (!browserSelection) {
    $log_0(($clinit_741() , logger_1).errorLogger, 'No selection when resolving editor annotations.');
    return null;
  }
   else if (browserSelection.anchor != browserSelection.focus_0) {
    $log_0(($clinit_741() , logger_1).errorLogger, 'Resolving selection annotations is only supported while the browser selection is collapsed');
    return null;
  }
  at = browserSelection.focus_0;
  biasLeft = this$static.this$0.currentSelectionBias != ($clinit_1749() , RIGHT_4);
  return getAlignedAnnotation(this$static.this$0.content_0.mutableContent, at, key, biasLeft);
}

function EditorImpl$4_0(this$0){
  this.this$0 = this$0;
}

function EditorImpl$4(){
}

_ = EditorImpl$4_0.prototype = EditorImpl$4.prototype = new Object_0;
_.getClass$ = function getClass_449(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$4_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function EditorImpl$8_0(this$0){
  this.this$0 = this$0;
}

function EditorImpl$8(){
}

_ = EditorImpl$8_0.prototype = EditorImpl$8.prototype = new Object_0;
_.execute_0 = function execute_17(){
  $doSaveSelection(this.this$0);
}
;
_.getClass$ = function getClass_451(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$8_2_classLit;
}
;
_.castableTypeMap$ = {248:1, 249:1};
_.this$0 = null;
function $execute_0(this$static){
  var backup;
  backup = this$static.commands;
  this$static.commands = ($clinit_2278() , defaultCollectionFactory.createQueue());
  while ($isConsistent(this$static.this$0) && !backup.isEmpty()) {
    dynamicCast(backup.poll(), 203).run();
  }
  backup.addAll(this$static.commands);
  this$static.commands = backup;
  this$static.commands.isEmpty() || this$static.this$0.permitOperations && ($clinit_1172() , $schedule_2(scheduler_0, ($clinit_1175() , LOW), this$static));
}

function EditorImpl$ConsistentStateCommandRunner_0(this$0){
  this.this$0 = this$0;
  this.commands = ($clinit_2278() , defaultCollectionFactory.createQueue());
}

function EditorImpl$ConsistentStateCommandRunner(){
}

_ = EditorImpl$ConsistentStateCommandRunner_0.prototype = EditorImpl$ConsistentStateCommandRunner.prototype = new Object_0;
_.execute_0 = function execute_18(){
  $execute_0(this);
}
;
_.getClass$ = function getClass_452(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$ConsistentStateCommandRunner_2_classLit;
}
;
_.castableTypeMap$ = {248:1, 249:1};
_.this$0 = null;
function $applyPaint(this$static, startLocation, endLocation, key, value){
  var isFullyStyled;
  isFullyStyled = $firstAnnotationChange_2(this$static.this$0.content_0.mutableContent.doc, startLocation, endLocation, key, value) == -1;
  this$static.this$0.editorUndoManager.maybeCheckpoint_0(startLocation, endLocation);
  $setAnnotation(this$static.this$0.content_0.mutableContent, startLocation, endLocation, key, isFullyStyled?null:value);
}

function $doCollapsedStyle(this$static, key, value){
  key = ($clinit_890() , 'style/' + key);
  $isAnnotated(this$static.this$0.caretStyles, key, value)?(this$static.this$0.caretStyles.annotations.put(key, null) , undefined):(this$static.this$0.caretStyles.annotations.put(key, value) , undefined);
  $scheduleUpdateNotification_0(this$static.this$0.updateEvent, false, false, true, false);
}

function $doStyle(this$static, start, end, key, value){
  key = ($clinit_890() , 'style/' + key);
  $applyPaint(this$static, $getLocation_4(this$static.this$0.content_0.indexedDoc, start), $getLocation_4(this$static.this$0.content_0.indexedDoc, end), key, value);
}

function $handleBlockLevelCommands(this$static, event_0, selection){
  var end, endLoc, l_0, listStyle, num, start, startLoc, type;
  start = selection.first;
  end = selection.second;
  if ($check_1(($clinit_634() , event_0))) {
    startLoc = $getLocation_4(this$static.this$0.content_0.indexedDoc, start);
    endLoc = $getLocation_4(this$static.this$0.content_0.indexedDoc, end);
    num = event_0.cachedKeyCode - 49 + 1;
    if (num >= 1 && num <= 6) {
      if (num == 5) {
        l_0 = getFirstLine(this$static.this$0.content_0.indexedDoc, $getLocation_4(this$static.this$0.content_0.indexedDoc, start));
        $equals_3('li', dynamicCast(l_0.lineElement.attributes.get_4('t'), 1)) && !$equals_3('decimal', dynamicCast(l_0.lineElement.attributes.get_4('listyle'), 1))?(listStyle = 'decimal'):(listStyle = null);
        $clinit_905();
        traverse(this$static.this$0.content_0.indexedDoc, startLoc, endLoc, new Paragraph$3_0(new Paragraph$ListStyler_0(listStyle), true));
      }
       else {
        num == 6?(type = null):(type = 'h' + num);
        toggle(this$static.this$0.content_0.indexedDoc, startLoc, endLoc, ($clinit_905() , checkArgument_2(!$equals_3('li', type), "Don't use regularStyle() for list styles, use listStyle()") , new Paragraph$RegularStyler_0(type)));
      }
      $clinit_736();
      return true;
    }
     else if (num == 7) {
      $clinit_905();
      traverse(this$static.this$0.content_0.indexedDoc, startLoc, endLoc, new Paragraph$3_0(($clinit_910() , LEFT_1), true));
      traverse(this$static.this$0.content_0.indexedDoc, startLoc, endLoc, new Paragraph$3_0(($clinit_912() , LTR_0), true));
      $clinit_736();
      return true;
    }
     else if (num == 8) {
      $clinit_905();
      traverse(this$static.this$0.content_0.indexedDoc, startLoc, endLoc, new Paragraph$3_0(($clinit_910() , RIGHT_1), true));
      traverse(this$static.this$0.content_0.indexedDoc, startLoc, endLoc, new Paragraph$3_0(($clinit_912() , RTL_0), true));
      $clinit_736();
      return true;
    }
  }
   else if (event_0.cachedKeyCode == 9) {
    $handleTab(this$static, start, end, !!event_0.nativeEvent.shiftKey);
    return true;
  }
  return false;
}

function $handleCollapsedKeyCombo(this$static, event_0, caret){
  var combo;
  combo = getKeyCombo(event_0.nativeEvent);
  if (this$static.this$0.keyBindings.bindings.containsKey(combo)) {
    dynamicCast(this$static.this$0.keyBindings.bindings.get(combo), 233).execute_2(this$static.this$0);
    return true;
  }
  switch (combo.ordinal) {
    case 2:
      $showSuggestionsNearestTo(this$static.this$0.suggestionsManager, caret);
      $clinit_736();
      return true;
    case 28:
    case 70:
      $doCollapsedStyle(this$static, 'fontWeight', 'bold');
      $clinit_736();
      return true;
    case 31:
    case 72:
      $doCollapsedStyle(this$static, 'fontStyle', 'italic');
      $clinit_736();
      return true;
    case 34:
    case 71:
      $doCollapsedStyle(this$static, 'textDecoration', 'underline');
      $clinit_736();
      return true;
  }
  return false;
}

function $handleCommand(this$static, event_0){
  var combo;
  if ($isCombo(event_0, 90, ($clinit_634() , COMMAND))) {
    $clinit_736();
    this$static.this$0.editorUndoManager.undo();
    return true;
  }
  if ($isRedoCombo(event_0)) {
    $clinit_736();
    this$static.this$0.editorUndoManager.redo();
    return true;
  }
  combo = $getKeyCombo(new EventWrapper_0(event_0.nativeEvent));
  switch (combo.ordinal) {
    case 40:
    case 63:
      $debugToggleDebugDialog(this$static.this$0);
      return true;
  }
  return false;
}

function $handleCopy(this$static){
  $log_0(($clinit_741() , logger_1).traceLogger, 'handling copy');
  return $clinit_736() , $handleCopyOrCutEvent(this$static.this$0.pasteExtractor, false);
}

function $handleCut(this$static){
  this$static.this$0.editorUndoManager.maybeCheckpoint();
  $log_0(($clinit_741() , logger_1).traceLogger, 'handling cut');
  return $clinit_736() , $handleCopyOrCutEvent(this$static.this$0.pasteExtractor, true);
}

function $handlePaste(this$static){
  this$static.this$0.editorUndoManager.maybeCheckpoint();
  $log_0(($clinit_741() , logger_1).traceLogger, 'handling paste');
  return $handlePasteEvent(this$static.this$0.pasteExtractor, this$static.this$0.currentSelectionBias);
}

function $handleRangeKeyCombo(this$static, event_0, selection){
  var combo, end, start;
  combo = getKeyCombo(event_0.nativeEvent);
  if (this$static.this$0.keyBindings.bindings.containsKey(combo)) {
    dynamicCast(this$static.this$0.keyBindings.bindings.get(combo), 233).execute_2(this$static.this$0);
    return true;
  }
  start = selection.first;
  end = selection.second;
  switch (combo.ordinal) {
    case 28:
    case 70:
      $doStyle(this$static, start, end, 'fontWeight', 'bold');
      $clinit_736();
      return true;
    case 31:
    case 72:
      $doStyle(this$static, start, end, 'fontStyle', 'italic');
      $clinit_736();
      return true;
    case 34:
    case 71:
      $doStyle(this$static, start, end, 'textDecoration', 'underline');
      $clinit_736();
      return true;
  }
  return false;
}

function $handleTab(this$static, start, end, shiftDown){
  var fixedEnd, fixedStart, node, m_0;
  node = dynamicCast(start.container, 192);
  while (node) {
    if ($isTabTarget(node)) {
      break;
    }
    node = node.parent_0;
  }
  if (!node) {
    m_0 = this$static.this$0.content_0.indexedDoc;
    traverse(m_0, $getLocation_2(m_0.indexedDocLocationMapper.this$1, getFilteredPoint(m_0.this$0.persistentContentView, start)), $getLocation_2(m_0.indexedDocLocationMapper.this$1, getFilteredPoint(m_0.this$0.persistentContentView, end)), shiftDown?($clinit_905() , OUTDENTER):($clinit_905() , INDENTER));
    shiftDown?($clinit_736() , SHORTCUT_TABOUTDENT):($clinit_736() , SHORTCUT_TABINDENT);
  }
   else {
    $clinit_736();
    do {
      node = dynamicCast(getNextOrPrevNodeDepthFirst_1(this$static.this$0.content_0.mutableContent, node, null, true, !shiftDown), 192);
      if ($isTabTarget(node)) {
        break;
      }
    }
     while (node);
    if (node) {
      fixedStart = start_5(this$static.this$0.content_0.mutableContent, dynamicCast(node, 191));
      fixedEnd = new Point$El_0(node, null);
      $setSelectionPoints(this$static.this$0.passiveSelectionHelper, fixedStart, fixedEnd);
    }
  }
}

function $isTabTarget(node){
  var elem, nodeTagName;
  if (!node || !node.asElement()) {
    return false;
  }
  elem = node.asElement();
  nodeTagName = elem.tagName_0;
  return ($clinit_708() , TAB_TARGETS).contains_0(nodeTagName);
}

function EditorImpl$EditorEventsSubHandlerImpl_0(this$0){
  this.this$0 = this$0;
}

function EditorImpl$EditorEventsSubHandlerImpl(){
}

_ = EditorImpl$EditorEventsSubHandlerImpl_0.prototype = EditorImpl$EditorEventsSubHandlerImpl.prototype = new Object_0;
_.getClass$ = function getClass_453(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$EditorEventsSubHandlerImpl_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function $checkpoint(this$static, currentRange){
  currentRange?this$static.this$0.editorUndoManager.maybeCheckpoint_0($getLocation_0(this$static.this$0.content_0.mutableContent, currentRange.focus_0), $getLocation_0(this$static.this$0.content_0.mutableContent, currentRange.anchor)):this$static.this$0.editorUndoManager.maybeCheckpoint();
}

function $compositionEnd(this$static){
  var caret, composition, contentPoint;
  try {
    if (!this$static.this$0.imeExtractor.wrapper) {
      $log_0(($clinit_741() , logger_1).errorLogger, 'Composition end called with inactive ImeExtractor! Maybe caret was null initially?');
      return null;
    }
    $hackConsume(this$static.this$0.content_0.mutableContent, new Nindo_0((new Nindo$Builder_0).mutationList));
    composition = $getContent_0(this$static.this$0.imeExtractor);
    contentPoint = $deactivate(this$static.this$0.imeExtractor, this$static.this$0.content_0.fullContentView);
    caret = $insertText(this$static.this$0, contentPoint, composition, true);
    $setCaret_0(this$static.this$0.aggressiveSelectionHelper, caret);
    $rebiasSelection(this$static.this$0, ($clinit_1753() , FROM_LEFT));
    $startIndirectSequence(this$static.this$0.responsibility);
    $flushUpdates(this$static.this$0.updateEvent);
    $endIndirectSequence(this$static.this$0.responsibility);
    return $getSelectionPoints(this$static.this$0.passiveSelectionHelper);
  }
   finally {
    $clinit_741();
    --ignoreMutations;
  }
}

function $compositionStart(this$static, caret){
  $clinit_741();
  ++ignoreMutations;
  !!caret && $activate_0(this$static.this$0.imeExtractor, this$static.this$0.content_0.context, caret);
  $supplementAnnotations(this$static.this$0.annotationLogic, $getLocation_0(this$static.this$0.content_0.mutableContent, caret), this$static.this$0.currentSelectionBias, ($clinit_1751() , PLAIN_TEXT));
}

function $deleteRange(this$static, first, second, isReplace){
  isReplace && $supplementAnnotations(this$static.this$0.annotationLogic, $getLocation_0(this$static.this$0.content_0.mutableContent, first), ($clinit_1749() , RIGHT_4), ($clinit_1751() , PLAIN_TEXT));
  return $deleteRange_0(this$static.this$0.content_0.mutableContent, getFilteredPoint(this$static.this$0.content_0.persistentContentView, first), getFilteredPoint(this$static.this$0.content_0.persistentContentView, second)).first;
}

function $deleteWordEndingAt(this$static, caret){
  var end, start;
  end = $normalizePoint(this$static, caret);
  start = $getWordBoundary(this$static.this$0.caretMoveHelper, false);
  if (start) {
    $deleteRange_0(this$static.this$0.content_0.mutableContent, getFilteredPoint(this$static.this$0.content_0.persistentContentView, start), getFilteredPoint(this$static.this$0.content_0.persistentContentView, end));
    $rebiasSelection(this$static.this$0, ($clinit_1753() , FROM_RIGHT));
  }
}

function $deleteWordStartingAt(this$static, caret){
  var end, start;
  start = $normalizePoint(this$static, caret);
  end = $getWordBoundary(this$static.this$0.caretMoveHelper, true);
  if (end) {
    $deleteRange_0(this$static.this$0.content_0.mutableContent, getFilteredPoint(this$static.this$0.content_0.persistentContentView, start), getFilteredPoint(this$static.this$0.content_0.persistentContentView, end));
    $rebiasSelection(this$static.this$0, ($clinit_1753() , FROM_LEFT));
  }
}

function $hasContentSelection(this$static){
  return $isTyping(this$static.this$0) || !!filterNonContentSelection(this$static.this$0.content_0?(get_21() , null):null);
}

function $normalizePoint(this$static, caret){
  caret = normalizePoint(caret, this$static.this$0.content_0.selectionContent);
  caret = leftAlign_0(caret, this$static.this$0.content_0.fullContentView, this$static.this$0.content_0.selectionContent);
  caret = getFilteredPoint(this$static.this$0.content_0.selectionContent, caret);
  return caret;
}

function $notifyListeners(this$static, event_0){
  var handled;
  handled = false;
  ($clinit_648() , KEY_EVENTS).contains_0(event_0.nativeEvent.type) && $editorRelevantEvent(this$static.this$0, event_0) && (handled = $fireKeyboardEvent(this$static.this$0, event_0));
  return handled;
}

function $notifyTypingExtractor_0(this$static, caret, useHtmlCaret, isReplace){
  var htmlCaret;
  if (caret) {
    htmlCaret = $wrapperPointToNodeletPoint(this$static.this$0.nodeManager, caret);
  }
   else {
    if (useHtmlCaret) {
      $clinit_1024();
      cache_1 = null;
      get_21();
      htmlCaret = null;
    }
     else {
      htmlCaret = null;
    }
  }
  if (htmlCaret) {
    !isReplace && !!caret && $supplementAnnotations(this$static.this$0.annotationLogic, $getLocation_0(this$static.this$0.content_0.mutableContent, caret), this$static.this$0.currentSelectionBias, ($clinit_1751() , PLAIN_TEXT));
    $notifyTypingExtractor(this$static.this$0, htmlCaret);
    return false;
  }
   else {
    $logPlainText(($clinit_741() , logger_1).errorLogger, "Null html caret in EditorImpl's notifyTypingExtractor, content caret: " + caret);
    return false;
  }
}

function EditorImpl$EditorInteractorImpl_0(this$0){
  this.this$0 = this$0;
}

function EditorImpl$EditorInteractorImpl(){
}

_ = EditorImpl$EditorInteractorImpl_0.prototype = EditorImpl$EditorInteractorImpl.prototype = new Object_0;
_.getClass$ = function getClass_454(){
  return Lorg_waveprotocol_wave_client_editor_EditorImpl$EditorInteractorImpl_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function EditorImplWebkitMobile_0(ownsDocument, e){
  $clinit_714();
  this.children_0 = new WidgetCollection_0(this);
  this.editorPackage = new EditorImpl$1_0(this);
  this.elementsWithDisplayEditModes = ($clinit_2295() , $clinit_2295() , new CopyOnWriteSet_0(HASH_SET));
  this.settings = ($clinit_739() , DEFAULT_0);
  this.outgoingOperationSink = new EditorImpl$2_0(this);
  this.consistencyQueue = new EditorImpl$ConsistentStateCommandRunner_0(this);
  this.typingSink = new EditorImpl$3_0(this);
  this.imeExtractor = new ImeExtractor_0;
  this.currentSelectionBias = ($clinit_1749() , LEFT_4);
  this.keyBindings = ($clinit_1014() , NONE_1);
  this.eventsSubHandler = new EditorImpl$EditorEventsSubHandlerImpl_0(this);
  this.updateEvent = new EditorUpdateEventImpl_0(this);
  this.annotationResolver = new EditorImpl$4_0(this);
  this.domHandlers = ($clinit_2278() , defaultCollectionFactory.createIdentitySet());
  this.selectionSavingTask = new EditorImpl$8_0(this);
  this.ownsDocument = ownsDocument;
  this.div = e;
  this.element = e;
}

function EditorImplWebkitMobile(){
}

_ = EditorImplWebkitMobile_0.prototype = EditorImplWebkitMobile.prototype = new EditorImpl;
_.focus_2 = function focus_18(collapsed){
}
;
_.getClass$ = function getClass_455(){
  return Lorg_waveprotocol_wave_client_editor_EditorImplWebkitMobile_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 59:1, 231:1, 235:1, 236:1};
function $clinit_739(){
  $clinit_739 = nullMethod;
  DEFAULT_0 = new EditorSettings$1_0;
}

function EditorSettings_0(){
  $clinit_739();
}

function EditorSettings(){
}

_ = EditorSettings_0.prototype = EditorSettings.prototype = new Object_0;
_.getClass$ = function getClass_458(){
  return Lorg_waveprotocol_wave_client_editor_EditorSettings_2_classLit;
}
;
_.setCloseSuggestionsMenuDelayMs = function setCloseSuggestionsMenuDelayMs(closeSuggestionsMenuDelayMs){
  this.closeSuggestionsMenuDelayMs = closeSuggestionsMenuDelayMs;
  return this;
}
;
_.setHasDebugDialog = function setHasDebugDialog(hasDebugDialog){
  this.hasDebugDialog = hasDebugDialog;
  return this;
}
;
_.setUndoEnabled = function setUndoEnabled(undoEnabled){
  this.undoEnabled = undoEnabled;
  return this;
}
;
_.setUseFancyCursorBias = function setUseFancyCursorBias(useFancyCursorBias){
  this.useFancyCursorBias = useFancyCursorBias;
  return this;
}
;
_.setUseSemanticCopyPaste = function setUseSemanticCopyPaste(useSemanticCopyPaste){
  this.useSemanticCopyPaste = useSemanticCopyPaste;
  return this;
}
;
_.setUseWebkitCompositionEvents = function setUseWebkitCompositionEvents(useWebkitCompositionEvents){
  this.useWebkitCompositionEvents = useWebkitCompositionEvents;
  return this;
}
;
_.setUseWhitelistInEditor = function setUseWhitelistInEditor(useWhitelistInEditor){
  this.useWhitelistInEditor = useWhitelistInEditor;
  return this;
}
;
_.castableTypeMap$ = {};
_.closeSuggestionsMenuDelayMs = 500;
_.hasDebugDialog = true;
_.undoEnabled = true;
_.useFancyCursorBias = true;
_.useSemanticCopyPaste = true;
_.useWebkitCompositionEvents = true;
_.useWhitelistInEditor = false;
var DEFAULT_0;
function EditorSettings$1_0(){
  $clinit_739();
}

function EditorSettings$1(){
}

_ = EditorSettings$1_0.prototype = EditorSettings$1.prototype = new EditorSettings;
_.getClass$ = function getClass_459(){
  return Lorg_waveprotocol_wave_client_editor_EditorSettings$1_2_classLit;
}
;
_.setCloseSuggestionsMenuDelayMs = function setCloseSuggestionsMenuDelayMs_0(closeSuggestionsMenuDelayMs){
  throw new IllegalStateException_1('DEFAULT settings is immutable');
}
;
_.setHasDebugDialog = function setHasDebugDialog_0(hasDebugDialog){
  throw new IllegalStateException_1('DEFAULT settings is immutable');
}
;
_.setUndoEnabled = function setUndoEnabled_0(undoEnabled){
  throw new IllegalStateException_1('DEFAULT settings is immutable');
}
;
_.setUseFancyCursorBias = function setUseFancyCursorBias_0(useFancyCursorBias){
  throw new IllegalStateException_1('DEFAULT settings is immutable');
}
;
_.setUseSemanticCopyPaste = function setUseSemanticCopyPaste_0(useSemanticCopyPaste){
  throw new IllegalStateException_1('DEFAULT settings is immutable');
}
;
_.setUseWebkitCompositionEvents = function setUseWebkitCompositionEvents_0(useWebkitCompositionEvents){
  throw new IllegalStateException_1('DEFAULT settings is immutable');
}
;
_.setUseWhitelistInEditor = function setUseWhitelistInEditor_0(useWhitelistInEditor){
  throw new IllegalStateException_1('DEFAULT settings is immutable');
}
;
_.castableTypeMap$ = {};
function createPopup_0(content_0, listener){
  $clinit_741();
  var popup;
  popup = new MobileUniversalPopup_0(popupProvider.root);
  $add_28(popup.popup, content_0);
  $add_9(popup.listeners, listener);
  return popup;
}

var popupProvider = null;
function $clinit_742(){
  $clinit_742 = nullMethod;
  NOP_IMPL = new EditorUndoManager$1_0;
}

var NOP_IMPL;
function EditorUndoManager$1_0(){
  $clinit_741();
}

function EditorUndoManager$1(){
}

_ = EditorUndoManager$1_0.prototype = EditorUndoManager$1.prototype = new Object_0;
_.getClass$ = function getClass_460(){
  return Lorg_waveprotocol_wave_client_editor_EditorUndoManager$1_2_classLit;
}
;
_.maybeCheckpoint = function maybeCheckpoint(){
}
;
_.maybeCheckpoint_0 = function maybeCheckpoint_0(startLocation, endLocation){
}
;
_.nonUndoableOp = function nonUndoableOp(op){
}
;
_.redo = function redo_0(){
  $clinit_1628();
}
;
_.undo = function undo_0(){
  $clinit_1628();
}
;
_.undoableOp = function undoableOp(op){
}
;
_.castableTypeMap$ = {};
function $clinit_744(){
  $clinit_744 = nullMethod;
  logger_2 = new DomLogger_0('undo');
  UNKNOWN_SELECTION = new FocusedRange_0(0, 0);
}

function $bypassUndoStack(this$static, op){
  this$static.bypass = true;
  try {
    $consume(this$static.sink, op);
  }
   finally {
    this$static.bypass = false;
  }
}

function $restoreSelectionAfterUndoRedo(this$static, transformedNonUndoable, selectionStack){
  var selection, anchor, focus_0;
  if (selectionStack.arrayList.size_0 == 0) {
    $clinit_1628();
    return null;
  }
  selection = dynamicCast($pop(selectionStack), 204);
  if (selection == UNKNOWN_SELECTION) {
    $clinit_1628();
    return null;
  }
   else {
    !!transformedNonUndoable && (selection = (anchor = transformLocation(transformedNonUndoable, selection.anchor) , focus_0 = transformLocation(transformedNonUndoable, selection.focus_0) , new FocusedRange_0(anchor, focus_0)));
    $setSelectionRange_1(this$static.selectionHelper, selection);
    return selection;
  }
}

function EditorUndoManagerImpl_0(undoManager, sink, selectionHelper){
  $clinit_744();
  this.undoSelectionStack = new Stack_0;
  this.redoSelectionStack = new Stack_0;
  checkNotNull_1(undoManager, 'UndoManager must not be null');
  checkNotNull_1(sink, 'Op sink must not be null');
  checkNotNull_1(selectionHelper, 'Selection helper must not be null');
  this.sink = sink;
  this.undoManager = undoManager;
  this.selectionHelper = selectionHelper;
}

function EditorUndoManagerImpl(){
}

_ = EditorUndoManagerImpl_0.prototype = EditorUndoManagerImpl.prototype = new Object_0;
_.getClass$ = function getClass_461(){
  return Lorg_waveprotocol_wave_client_editor_EditorUndoManagerImpl_2_classLit;
}
;
_.maybeCheckpoint = function maybeCheckpoint_1(){
  !this.pendingCheckpoint && (this.pendingCheckpoint = UNKNOWN_SELECTION);
}
;
_.maybeCheckpoint_0 = function maybeCheckpoint_2(startLocation, endLocation){
  this.pendingCheckpoint = new FocusedRange_0(startLocation, endLocation);
}
;
_.nonUndoableOp = function nonUndoableOp_0(op){
  if (this.bypass) {
    return;
  }
  $nonUndoableOp(this.undoManager, op);
}
;
_.redo = function redo_1(){
  var pair, redo, selection, transformedNonUndoable;
  pair = $redoPlus(this.undoManager);
  if (!pair || pair.first == null) {
    $shouldLog_0(logger_2.traceLogger) && ($clinit_1628() , undefined);
    return;
  }
  redo = dynamicCast(pair.first, 202);
  transformedNonUndoable = dynamicCast(pair.second, 202);
  selection = $getSelectionRange(this.selectionHelper);
  selection?$push_2(this.undoSelectionStack, selection):$push_2(this.undoSelectionStack, UNKNOWN_SELECTION);
  $bypassUndoStack(this, redo);
  $restoreSelectionAfterUndoRedo(this, transformedNonUndoable, this.redoSelectionStack);
  $log_0(logger_2.traceLogger, 'Redoing!');
}
;
_.undo = function undo_1(){
  var pair, selection, transformedNonUndoable, undo;
  pair = $undoPlus(this.undoManager);
  if (!pair || pair.first == null) {
    $shouldLog_0(logger_2.traceLogger) && ($clinit_1628() , undefined);
    return;
  }
  undo = dynamicCast(pair.first, 202);
  transformedNonUndoable = dynamicCast(pair.second, 202);
  selection = $getSelectionRange(this.selectionHelper);
  selection?$push_2(this.redoSelectionStack, selection):$push_2(this.redoSelectionStack, UNKNOWN_SELECTION);
  $bypassUndoStack(this, undo);
  $restoreSelectionAfterUndoRedo(this, transformedNonUndoable, this.undoSelectionStack);
  $log_0(logger_2.traceLogger, 'Undoing!');
}
;
_.undoableOp = function undoableOp_0(op){
  if (this.bypass) {
    return;
  }
  if (this.pendingCheckpoint) {
    $shouldLog_0(logger_2.traceLogger) && ($clinit_1628() , undefined);
    if (this.pendingCheckpoint == UNKNOWN_SELECTION) {
      this.pendingCheckpoint = $getSelectionRange(this.selectionHelper);
      !this.pendingCheckpoint && (this.pendingCheckpoint = UNKNOWN_SELECTION);
    }
    $checkpoint_0(this.undoManager.checkpointer);
    $push_2(this.undoSelectionStack, this.pendingCheckpoint);
    this.pendingCheckpoint = null;
  }
  $undoableOp(this.undoManager, op);
  if (this.redoSelectionStack.arrayList.size_0 != 0) {
    $shouldLog_0(logger_2.traceLogger) && ($clinit_1628() , undefined);
    $clear_4(this.redoSelectionStack.arrayList);
  }
}
;
_.castableTypeMap$ = {};
_.bypass = false;
_.pendingCheckpoint = null;
_.selectionHelper = null;
_.sink = null;
_.undoManager = null;
var UNKNOWN_SELECTION, logger_2;
function $clear_15(this$static){
  !instance_7 && (instance_7 = new BrowserBackedScheduler_0 , setDefaultTimerService() , undefined);
  $cancel_3(instance_7, this$static.notificationTask);
  $clear_20(this$static.updateListeners);
}

function $debugGetAllUpdateEventNames(this$static){
  var events, l_0, l$iterator;
  events = ($clinit_2278() , defaultCollectionFactory.createStringSet());
  for (l$iterator = $iterator_20(this$static.updateListeners); l$iterator.hasNext();) {
    l_0 = dynamicCast(l$iterator.next_0(), 205);
    events.add_3(getClass__devirtual$(l_0).typeName);
  }
  return events;
}

function $debugSuppressUpdateEvent(this$static, name_0, suppress){
  suppress?this$static.suppressedEventNames.add_3(name_0):this$static.suppressedEventNames.remove_8(name_0);
}

function $flushUpdates(this$static){
  !instance_7 && (instance_7 = new BrowserBackedScheduler_0 , setDefaultTimerService() , undefined);
  $cancel_3(instance_7, this$static.notificationTask);
  $execute_1(this$static.notificationTask);
}

function EditorUpdateEventImpl_0(editor){
  this.updateListeners = ($clinit_2295() , $clinit_2295() , new CopyOnWriteSet_0(HASH_SET));
  this.suppressedEventNames = ($clinit_2278() , defaultCollectionFactory.createStringSet());
  this.notificationTask = new EditorUpdateEventImpl$1_0(this);
  this.editor = editor;
}

function EditorUpdateEventImpl(){
}

_ = EditorUpdateEventImpl_0.prototype = EditorUpdateEventImpl.prototype = new Object_0;
_.getClass$ = function getClass_462(){
  return Lorg_waveprotocol_wave_client_editor_EditorUpdateEventImpl_2_classLit;
}
;
_.castableTypeMap$ = {};
_.editor = null;
_.notedContentChanged = false;
_.notedSelectionCoordsChanged = false;
_.notedSelectionLocationChanged = false;
_.notedUserDirectlyChangedContent = false;
_.notifyAgain = false;
function $execute_1(this$static){
  var l_0, l$iterator, ret;
  if ($isConsistent(this$static.this$0.editor)) {
    if (this$static.this$0.editor.content_0) {
      $shouldLog_0(($clinit_741() , logger_1).traceLogger) && $log_0(logger_1.traceLogger, 'EditorUpdateEvent: selCoords:' + this$static.this$0.notedSelectionCoordsChanged + ', selLoc:' + this$static.this$0.notedSelectionLocationChanged + ', content:' + this$static.this$0.notedContentChanged + ', userDirectlyChangedContent:' + this$static.this$0.notedUserDirectlyChangedContent);
      for (l$iterator = $iterator_20(this$static.this$0.updateListeners); l$iterator.hasNext();) {
        l_0 = dynamicCast(l$iterator.next_0(), 205);
        if (this$static.this$0.suppressedEventNames.contains_0(getClass__devirtual$(l_0).typeName)) {
          continue;
        }
        l_0.onUpdate(this$static.this$0);
      }
      this$static.this$0.notedSelectionCoordsChanged = false;
      this$static.this$0.notedSelectionLocationChanged = false;
      this$static.this$0.notedContentChanged = false;
      this$static.this$0.notedUserDirectlyChangedContent = false;
    }
    this$static.delays = 0;
    $shouldLog_0(($clinit_741() , logger_1).traceLogger) && $log_0(logger_1.traceLogger, 'Notification sent');
  }
   else {
    $shouldLog_0(($clinit_741() , logger_1).traceLogger) && $log_0(logger_1.traceLogger, 'Notification deferred for consistency reasons');
    ++this$static.delays;
    this$static.delays == 20 && $log_0(logger_1.errorLogger, 'More than 20 notification delays encountered - possibly uncleared extraction state');
    this$static.this$0.notifyAgain = true;
  }
  ret = this$static.this$0.notifyAgain;
  this$static.this$0.notifyAgain = false;
  return ret;
}

function EditorUpdateEventImpl$1_0(this$0){
  this.this$0 = this$0;
}

function EditorUpdateEventImpl$1(){
}

_ = EditorUpdateEventImpl$1_0.prototype = EditorUpdateEventImpl$1.prototype = new Object_0;
_.execute = function execute_19(){
  return $execute_1(this);
}
;
_.getClass$ = function getClass_463(){
  return Lorg_waveprotocol_wave_client_editor_EditorUpdateEventImpl$1_2_classLit;
}
;
_.toString$ = function toString_51(){
  return 'EditorUpdateEventImpl.notificationTask [update listeners: ' + this.this$0.updateListeners + ']';
}
;
_.castableTypeMap$ = {247:1, 249:1};
_.delays = 0;
_.this$0 = null;
function $getNiceHtmlRenderer(this$static, target){
  return dynamicCast(dynamicCast($inspect(this$static.data_0), 206).niceHtmlRenderers.get_4(target.tagName_0), 208);
}

_ = NodeEventHandlerImpl.prototype;
_.handleBackspaceAfterNode = function handleBackspaceAfterNode(element, event_0){
  return false;
}
;
_.handleBackspaceAtBeginning = function handleBackspaceAtBeginning(element, event_0){
  return false;
}
;
_.handleBackspaceNotAtBeginning = function handleBackspaceNotAtBeginning(element, event_0){
  return false;
}
;
_.handleClick = function handleClick(element, event_0){
  return false;
}
;
_.handleDelete = function handleDelete(element, event_0){
  return false;
}
;
_.handleDeleteAtEnd = function handleDeleteAtEnd(element, event_0){
  return false;
}
;
_.handleDeleteBeforeNode = function handleDeleteBeforeNode(element, event_0){
  return false;
}
;
_.handleDeleteNotAtEnd = function handleDeleteNotAtEnd(element, event_0){
  return false;
}
;
_.handleEnter = function handleEnter(element, event_0){
  return false;
}
;
_.handleLeft = function handleLeft(element, event_0){
  return false;
}
;
_.handleLeftAfterNode = function handleLeftAfterNode(element, event_0){
  return false;
}
;
_.handleLeftAtBeginning = function handleLeftAtBeginning(element, event_0){
  return false;
}
;
_.handleRight = function handleRight(element, event_0){
  return false;
}
;
_.handleRightAtEnd = function handleRightAtEnd(element, event_0){
  return false;
}
;
_.handleRightBeforeNode = function handleRightBeforeNode(element, event_0){
  return false;
}
;
function $endIndirectSequence(this$static){
  checkState_2(this$static.sequenceType.arrayList.size_0 != 0 && $peek_1(this$static.sequenceType) === ($clinit_764() , INDIRECT), 'end non-undoable sequence without begin');
  $pop(this$static.sequenceType);
}

function $startIndirectSequence(this$static){
  $log_2(($clinit_741() , logger_1).traceLogger, 'Depth: ', valueOf_12(this$static.sequenceType.arrayList.size_0));
  $push_2(this$static.sequenceType, ($clinit_764() , INDIRECT));
}

function $withinDirectSequence(this$static){
  return (this$static.sequenceType.arrayList.size_0 == 0?($clinit_764() , INDIRECT):dynamicCast($peek_1(this$static.sequenceType), 93)) == ($clinit_764() , DIRECT);
}

function ResponsibilityManagerImpl_0(){
  this.sequenceType = new Stack_0;
}

function ResponsibilityManagerImpl(){
}

_ = ResponsibilityManagerImpl_0.prototype = ResponsibilityManagerImpl.prototype = new Object_0;
_.getClass$ = function getClass_471(){
  return Lorg_waveprotocol_wave_client_editor_ResponsibilityManagerImpl_2_classLit;
}
;
_.castableTypeMap$ = {};
function $contains_7(this$static, doc, node){
  var fromIncl, toExcl;
  fromIncl = this$static.nodeBefore == null?$getFirstChild_4(doc, this$static.after.container):$getNextSibling_3(doc, this$static.nodeBefore);
  toExcl = $getNodeAfter(this$static.after);
  return isBetween(doc, node, fromIncl, toExcl);
}

function RestrictedRange_0(after, nodeBefore){
  this.after = after;
  this.nodeBefore = nodeBefore;
}

function around(doc, firstBoundedNode, lastBoundedNode){
  return new RestrictedRange_0(new Point$El_0($getParentElement_3(doc, lastBoundedNode), $getNextSibling_3(doc, lastBoundedNode)), $getPreviousSibling_3(doc, firstBoundedNode));
}

function between(nodeBefore, after){
  return new RestrictedRange_0(after, nodeBefore);
}

function boundedBy(parent_0, before, after){
  return new RestrictedRange_0(new Point$El_0(parent_0, after), before);
}

function collapsedAt_0(doc, collapsedAt){
  var node;
  return new RestrictedRange_0(collapsedAt, (node = $getNodeAfter(collapsedAt) , node == null?doc.getLastChild_0(collapsedAt.container):doc.getPreviousSibling(node)));
}

function isBetween(doc, node, fromIncl, toExcl){
  var n;
  for (n = fromIncl; n != null && (n == null?null:n) !== (toExcl == null?null:toExcl); n = $getNextSibling_3(doc, n)) {
    if ((n == null?null:n) === (node == null?null:node)) {
      return true;
    }
  }
  return false;
}

function RestrictedRange(){
}

_ = RestrictedRange_0.prototype = RestrictedRange.prototype = new Object_0;
_.getClass$ = function getClass_473(){
  return Lorg_waveprotocol_wave_client_editor_RestrictedRange_2_classLit;
}
;
_.toString$ = function toString_52(){
  return this.after.container + ' ->( ' + this.nodeBefore + ' - ' + $getNodeAfter(this.after) + ' )';
}
;
_.castableTypeMap$ = {};
_.after = null;
_.nodeBefore = null;
function UndoableSequencer_0(chainedSequencer, responsibility){
  this.responsibility = responsibility;
  this.sequencer = chainedSequencer;
}

function UndoableSequencer(){
}

_ = UndoableSequencer_0.prototype = UndoableSequencer.prototype = new Object_0;
_.begin = function begin_1(){
  $push_2(this.responsibility.sequenceType, ($clinit_764() , DIRECT));
}
;
_.consume_0 = function consume_3(op){
  $consumeAndReturnInvertible_0(this.sequencer.sink, op);
}
;
_.end_0 = function end_4(){
  $endDirectSequence(this.responsibility);
}
;
_.getClass$ = function getClass_474(){
  return Lorg_waveprotocol_wave_client_editor_UndoableSequencer_2_classLit;
}
;
_.castableTypeMap$ = {};
_.responsibility = null;
_.sequencer = null;
function $clinit_768(){
  $clinit_768 = nullMethod;
  HANDLED_EVENTS = initValues(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, ['click', 'dblclick', 'mousedown', 'contextmenu', 'keypress', 'keydown', 'keyup', 'compositionstart', 'compositionend', 'compositionupdate', 'text', 'textInput', 'DOMSubtreeModified', 'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMMouseScroll', 'change', 'submit', 'reset', 'domfocusin', 'domfocusout', 'domactivate', 'cut', 'copy', 'paste', 'beforecut', 'beforecopy', 'beforepaste', 'afterupdate', 'beforeupdate', 'cellchange', 'dataavailable', 'datasetchanged', 'datasetcomplete', 'errorupdate', 'rowenter', 'rowexit', 'rowsdelete', 'rowinserted']);
}

var HANDLED_EVENTS;
function $deleteRange_0(this$static, start, end){
  var atCommonAncestor, commonAncestorIndexMinusOne, e, el, endEl, endLocation, i, needToDoLeftmostDeleteSeparately, newEndPoint, prevRightEl, rightEl, s, startAncestors, startEl, startLocation, startPoint;
  start.offset >= 0?checkOffset(this$static, this$static.doc.substrate.asText_0(start.container), $getTextOffset(start), 'MutableDocumentImpl.deleteRange start point'):checkRelationship(this$static, this$static.doc.substrate.asElement_0(start.container), $getNodeAfter(start), 'MutableDocumentImpl.deleteRange start point');
  end.offset >= 0?checkOffset(this$static, this$static.doc.substrate.asText_0(end.container), $getTextOffset(end), 'MutableDocumentImpl.deleteRange end point'):checkRelationship(this$static, this$static.doc.substrate.asElement_0(end.container), $getNodeAfter(end), 'MutableDocumentImpl.deleteRange end point');
  startLocation = this$static.doc.getLocation_0(start);
  endLocation = this$static.doc.getLocation_0(end);
  if (startLocation > endLocation) {
    throw new IllegalArgumentException_1('MutableDocumentImpl.deleteRange: start is after end');
  }
  if (startLocation == endLocation) {
    return new PointRange_1(start, end);
  }
  try {
    this$static.sequencer.begin();
    newEndPoint = null;
    if (this$static.doc.substrate.isSameNode(enclosingElement(this$static, start.container), enclosingElement(this$static, end.container))) {
      this$static.sequencer.consume_0(new Nindo_0($deleteRangeInternal(this$static, startLocation, endLocation).mutationList));
      newEndPoint = $locate_0(this$static.doc, startLocation);
    }
     else {
      startEl = enclosingElement(this$static.doc, start.container);
      endEl = enclosingElement(this$static.doc, end.container);
      startAncestors = new ArrayList_0;
      for (el = startEl; el != null; el = this$static.doc.substrate.getParentElement(el)) {
        setCheck(startAncestors.array, startAncestors.size_0++, el);
      }
      commonAncestorIndexMinusOne = -2;
      needToDoLeftmostDeleteSeparately = true;
      for (rightEl = endEl , prevRightEl = endEl;; rightEl = this$static.doc.substrate.getParentElement(rightEl)) {
        atCommonAncestor = $indexOf_4(startAncestors, rightEl, 0) != -1;
        if (atCommonAncestor) {
          commonAncestorIndexMinusOne = $indexOf_4(startAncestors, rightEl, 0) - 1;
          needToDoLeftmostDeleteSeparately = commonAncestorIndexMinusOne >= 0;
          s = needToDoLeftmostDeleteSeparately?after_0(this$static.doc, (checkIndex(commonAncestorIndexMinusOne, startAncestors.size_0) , startAncestors.array[commonAncestorIndexMinusOne])):startLocation;
        }
         else {
          s = start_4(this$static.doc, rightEl);
        }
        e = (rightEl == null?null:rightEl) === (endEl == null?null:endEl)?endLocation:this$static.doc.getLocation(prevRightEl);
        this$static.sequencer.consume_0(new Nindo_0($deleteRangeInternal(this$static, s, e).mutationList));
        !newEndPoint && (newEndPoint = $locate_0(this$static.doc, s));
        prevRightEl = rightEl;
        if (atCommonAncestor) {
          break;
        }
      }
      for (i = commonAncestorIndexMinusOne; i > 0; --i) {
        this$static.sequencer.consume_0(new Nindo_0($deleteRangeInternal(this$static, after_0(this$static.doc, (checkIndex(i - 1, startAncestors.size_0) , startAncestors.array[i - 1])), this$static.doc.getLocation_0(new Point$El_0((checkIndex(i, startAncestors.size_0) , startAncestors.array[i]), null))).mutationList));
      }
      needToDoLeftmostDeleteSeparately && (this$static.sequencer.consume_0(new Nindo_0($deleteRangeInternal(this$static, startLocation, this$static.doc.getLocation_0(new Point$El_0(startEl, null))).mutationList)) , undefined);
    }
    startPoint = $locate_0(this$static.doc, startLocation);
    return new PointRange_1(startPoint, newEndPoint);
  }
   finally {
    this$static.sequencer.end_0();
  }
}

function $deleteRangeInternal(this$static, startLocation, endLocation){
  var builder, end, next, node, size, start, stop_0, text;
  builder = $at(startLocation);
  start = $locate_0(this$static.doc, startLocation);
  end = $locate_0(this$static.doc, endLocation);
  if (start.offset >= 0) {
    if (this$static.doc.substrate.isSameNode(start.container, end.container)) {
      size = $getTextOffset(end) - $getTextOffset(start);
      size > 0 && $add_9(builder.mutationList, new Nindo$DeleteCharacters_0(size));
      return builder;
    }
     else {
      size = $getLength_2(this$static.doc, this$static.doc.substrate.asText_0(start.container)) - $getTextOffset(start);
      node = this$static.doc.substrate.getNextSibling(start.container);
      size > 0 && $add_9(builder.mutationList, new Nindo$DeleteCharacters_0(size));
    }
  }
   else {
    node = $getNodeAfter(start);
  }
  end.offset >= 0?(stop_0 = end.container):(stop_0 = $getNodeAfter(end));
  while ((node == null?null:node) !== (stop_0 == null?null:stop_0)) {
    next = this$static.doc.substrate.getNextSibling(node);
    text = this$static.doc.substrate.asText_0(node);
    text != null?($add_9(builder.mutationList, new Nindo$DeleteCharacters_0(this$static.doc.substrate.getData(text).length)) , undefined):$deleteElement(this$static, this$static.doc.substrate.asElement_0(node), builder);
    node = next;
  }
  if (end.offset >= 0) {
    size = $getTextOffset(end);
    size > 0 && $add_9(builder.mutationList, new Nindo$DeleteCharacters_0(size));
  }
  return builder;
}

function $getLocation_0(this$static, point){
  checkNotNull_1(point, 'getLocation: Null point');
  return this$static.doc.getLocation_0(point);
}

function $hackConsume(this$static, op){
  this$static.sequencer.begin();
  try {
    this$static.sequencer.consume_0(op);
  }
   finally {
    this$static.sequencer.end_0();
  }
}

function $setAnnotation(this$static, start, end, key, value){
  checkPersistentKey(key);
  checkPositionIndexesInRange(start, end, $size_15(this$static.doc));
  if (start == end) {
    return;
  }
  try {
    this$static.sequencer.begin();
    this$static.sequencer.consume_0(setAnnotation(start, end, key, value));
  }
   finally {
    this$static.sequencer.end_0();
  }
}

function $setAttributes(attrs, builder){
  $add_9(builder.mutationList, new Nindo$ReplaceAttributes_0(attrs));
  return builder;
}

function $setElementAttributes(this$static, element, attrs){
  checkArgument_2((element == null?null:element) !== maskUndefined(this$static.doc.substrate.getDocumentElement()), 'Cannot touch root element');
  try {
    this$static.sequencer.begin();
    this$static.sequencer.consume_0(new Nindo_0($setAttributes(attrs, $at(this$static.doc.getLocation(element))).mutationList));
  }
   finally {
    this$static.sequencer.end_0();
  }
}

_ = MutableDocumentImpl.prototype;
_.rangedAnnotations = function rangedAnnotations_1(start, end, keys){
  return $rangedAnnotations_1(this.doc, start, end, keys);
}
;
_ = ContentDocElement$2.prototype;
_.handleBackspaceAtBeginning = function handleBackspaceAtBeginning_0(element, event_0){
  return true;
}
;
_.handleDeleteAtEnd = function handleDeleteAtEnd_0(element, event_0){
  return true;
}
;
_.handleLeftAtBeginning = function handleLeftAtBeginning_0(element, event_0){
  return true;
}
;
_.handleRightAtEnd = function handleRightAtEnd_0(element, event_0){
  return true;
}
;
function $attachEditor(this$static, editorBundle, panel){
  var oldLevel;
  checkNotNull_1(editorBundle, 'editorBundle must not be null');
  checkState_2(this$static.level != ($clinit_815() , EDITING), 'Cannot attach editor to a document already with an editor');
  !panel?checkState_2(!!this$static.logicalPanel, 'Must either already have a logical panel, or one must be provided'):(this$static.logicalPanel = panel);
  oldLevel = $adjustLevel(this$static, EDITING);
  this$static.editorPackage = editorBundle;
  this$static.editingConcerns = new ContentDocument$7_0(this$static);
  this$static.selectionMaintainer.editingConcerns = this$static.editingConcerns;
  $setupBehaviour(this$static, this$static.fullRawSubstrate.rootElement, oldLevel);
}

function $createSequencedDocumentWrapper(this$static, sequencer){
  return new CMutableDocument_0(sequencer, this$static.indexedDoc);
}

function $replaceOutgoingSink(this$static, newSink){
  var oldSink;
  checkState_2(!!this$static.outgoingOperationSink, '');
  oldSink = this$static.outgoingOperationSink;
  this$static.outgoingOperationSink = newSink;
  return oldSink;
}

function $setRendering(this$static){
  var oldLevel;
  if (this$static.level == ($clinit_815() , RENDERED)) {
    return;
  }
  oldLevel = $adjustLevel(this$static, RENDERED);
  $setupBehaviour(this$static, this$static.fullRawSubstrate.rootElement, oldLevel);
}

function ContentDocument_0(initialRegistries, initialState, schema){
  $clinit_791();
  ContentDocument_1.call(this, schema);
  this.registries = initialRegistries;
  this.registries?createAndSetDocPainter(this.context, this.registries.paintRegistry):clearDocPainter(this.context);
  $consume_7(this, initialState);
  !!this.editorPackage && ($onIncomingOp(this.editorPackage.this$0, initialState) , undefined);
}

_ = ContentDocument_0.prototype = ContentDocument.prototype;
function ContentDocument$7_0(this$0){
  this.this$0 = this$0;
}

function ContentDocument$7(){
}

_ = ContentDocument$7_0.prototype = ContentDocument$7.prototype = new Object_0;
_.getClass$ = function getClass_498(){
  return Lorg_waveprotocol_wave_client_editor_content_ContentDocument$7_2_classLit;
}
;
_.getSelectionHelper = function getSelectionHelper_1(){
  return this.this$0.editorPackage.this$0.passiveSelectionHelper;
}
;
_.getSuggestionsManager = function getSuggestionsManager(){
  return this.this$0.editorPackage.this$0.suggestionsManager;
}
;
_.getTypingExtractor = function getTypingExtractor(){
  return this.this$0.editorPackage.this$0.typing;
}
;
_.hasEditor = function hasEditor(){
  return true;
}
;
_.textNodeletAffected = function textNodeletAffected(nodelet, affectedAfterOffset, insertionAmount, changeType){
  $textNodeletAffected(this.this$0.selectionMaintainer, nodelet, affectedAfterOffset, insertionAmount, changeType);
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function $rangedAnnotations_1(this$static, start, end, keys){
  var iterable;
  !keys?(keys = $knownKeys(this$static)):keys.each_3(new IndexedDocumentImpl$3_0);
  iterable = this$static.annotations.rangedAnnotations(start, end, keys);
  return new IndexedDocumentImpl$9_0(iterable);
}

_ = IndexedDocumentImpl.prototype;
_.onModifyAttributes = function onModifyAttributes(element, oldAttributes, newAttributes){
}
;
_.rangedAnnotations = function rangedAnnotations_2(start, end, keys){
  return $rangedAnnotations_1(this, start, end, keys);
}
;
_ = LocalAnnotationSetImpl.prototype;
_.rangedAnnotations = function rangedAnnotations_3(start, end, keys){
  return $rangedAnnotations(this.fullAnnotationSet, start, end, keys);
}
;
function $asPoint(this$static){
  return this$static.offset >= 0?new Point$Tx_0(this$static.container, this$static.offset):new Point$El_0(this$static.container, this$static.nodeAfter);
}

function $getNodeBefore(this$static){
  return this$static.offset >= 0?null:!this$static.nodeAfter?dynamicCast(this$static.container, 192).getLastChild():dynamicCast(this$static.nodeAfter, 192).prev;
}

function $isAtBeginning(this$static){
  return this$static.offset >= 0?this$static.offset == 0:this$static.nodeAfter == this$static.container.getFirstChild();
}

function $isAtEnd(this$static){
  return this$static.offset >= 0?this$static.offset == dynamicCast(this$static.container, 220).data_0.length:!this$static.nodeAfter;
}

function $maybeMoveOut(this$static){
  var dir;
  dir = 0;
  this$static.offset >= 0?this$static.offset == 0?(dir = -1):this$static.offset >= dynamicCast(this$static.container, 220).data_0.length && (dir = 1):this$static.nodeAfter == this$static.container.getFirstChild()?(dir = -1):!this$static.nodeAfter && (dir = 1);
  if (dir != 0) {
    this$static.nodeAfter = this$static.container;
    this$static.container = this$static.nodeAfter.parent_0;
    dir == 1 && (this$static.nodeAfter = this$static.nodeAfter.next);
    this$static.offset = -1;
    return true;
  }
   else {
    return false;
  }
}

function $set_6(this$static, container, nodeAfter){
  this$static.container = container;
  this$static.nodeAfter = nodeAfter;
  this$static.offset = -1;
  return this$static;
}

function $set_7(this$static, container, offset){
  this$static.container = container;
  this$static.offset = offset;
  this$static.nodeAfter = null;
  return this$static;
}

function $setToAfter(this$static, node){
  $set_6(this$static, node.parent_0, node.next);
  return this$static;
}

function $setToBefore(this$static, node){
  $set_6(this$static, node.parent_0, node);
  return this$static;
}

function $setToBeginning(this$static, node){
  node != null && node.castableTypeMap$ && !!node.castableTypeMap$[191]?$set_6(this$static, dynamicCast(node, 191), node.getFirstChild()):$set_7(this$static, dynamicCast(node, 220), 0);
  return this$static;
}

function $setToEnd(this$static, node){
  var textNode;
  if (node != null && node.castableTypeMap$ && !!node.castableTypeMap$[191]) {
    $set_6(this$static, dynamicCast(node, 191), null);
  }
   else {
    textNode = dynamicCast(node, 220);
    $set_7(this$static, textNode, textNode.data_0.length);
  }
  return this$static;
}

function ContentPoint_0(container, nodeAfter){
  this.container = container;
  this.nodeAfter = nodeAfter;
  this.offset = -1;
}

function ContentPoint_1(textNode, offset){
  this.container = textNode;
  this.nodeAfter = null;
  this.offset = offset;
}

function fromPoint(point){
  return point.offset >= 0?new ContentPoint_1(dynamicCast(point.container, 220), $getTextOffset(point)):new ContentPoint_0(dynamicCast(point.container, 191), dynamicCast($getNodeAfter(point), 192));
}

function ContentPoint(){
}

_ = ContentPoint_1.prototype = ContentPoint_0.prototype = ContentPoint.prototype = new Object_0;
_.equals$ = function equals_27(o){
  var point;
  if (o === this)
    return true;
  if (o != null && o.castableTypeMap$ && !!o.castableTypeMap$[222]) {
    point = dynamicCast(o, 222);
    return this.container == point.container && this.offset == point.offset && (this.nodeAfter == point.nodeAfter || this.nodeAfter == point.nodeAfter);
  }
  return false;
}
;
_.getClass$ = function getClass_524(){
  return Lorg_waveprotocol_wave_client_editor_content_ContentPoint_2_classLit;
}
;
_.hashCode$ = function hashCode_27(){
  return getHashCode(this.container) + 37 * this.offset + 1009 * getHashCode(this.nodeAfter);
}
;
_.toString$ = function toString_60(){
  return '(' + $toString_17(this.container) + ':' + (this.offset >= 0?valueOf_12(this.offset):this.nodeAfter) + ')';
}
;
_.castableTypeMap$ = {222:1};
_.container = null;
_.nodeAfter = null;
_.offset = 0;
function PointRange_1(first, second){
  this.first = first;
  this.second = second;
  this.isCollapsed = $equals_11(first, second);
}

_ = PointRange_1.prototype = PointRange.prototype;
function ContentRange_0(first, second){
  this.first = first;
  this.second = second;
  this.isCollapsed = $equals_11(first, second);
}

function ContentRange(){
}

_ = ContentRange_0.prototype = ContentRange.prototype = new PointRange;
_.getClass$ = function getClass_526(){
  return Lorg_waveprotocol_wave_client_editor_content_ContentRange_2_classLit;
}
;
_.castableTypeMap$ = {437:1};
function $getOffset(this$static, textNodelet){
  var $e0, next;
  try {
    return $getOffset_0(this$static, textNodelet, (next = checkNodeAndNeighbour(this$static) , !next?null:next.getImplNodelet()));
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 178)) {
      throw new InconsistencyException$HtmlMissing_0(this$static, dynamicCast($getParentElement_3(this$static.context.this$0.renderingConcerns.this$0.renderedContentView, this$static), 191).implNodelet);
    }
     else 
      throw $e0;
  }
}

function $getOffset_0(this$static, textNodelet, nextImpl){
  return getOffset(textNodelet, this$static.implNodelet, nextImpl, this$static.context.this$0.renderingConcerns.this$0.filteredHtmlView);
}

function getOffset(textNodelet, startNode, nextImpl, view){
  $clinit_836();
  var nodelet, offset;
  offset = 0;
  for (nodelet = startNode; nodelet != nextImpl; nodelet = dynamicCastJso($getNextSibling_3(view, nodelet))) {
    if (nodelet == textNodelet) {
      return offset;
    }
    offset += nodelet.length;
  }
  throw new EditorRuntimeException_0("Didn't find text nodelet to get offset for");
}

function sumTextNodesLength(fromIncl, toExcl, filteredHtml){
  var length_0, n;
  length_0 = 0;
  for (n = fromIncl; n != toExcl && !!n; n = dynamicCastJso($getNextSibling_3(filteredHtml, n))) {
    length_0 += n.length;
  }
  return length_0;
}

_ = DiffHighlightingFilter$2.prototype;
_.replaceAttributes = function replaceAttributes(oldAttrs, newAttrs){
  ++this.this$0.currentLocation;
  this.this$0.target_0.replaceAttributes(oldAttrs, newAttrs);
}
;
_ = ExtendedClientDocumentContext$LowLevelEditingConcerns$1.prototype;
_.getTypingExtractor = function getTypingExtractor_0(){
  throw new IllegalStateException_1('Not in an editing context');
}
;
function $asOrderedRange(this$static, isOrdered){
  if (!this$static.orderedRange) {
    this$static.orderedRange = isOrdered?new ContentRange_0(this$static.anchor, this$static.focus_0):new ContentRange_0(this$static.focus_0, this$static.anchor);
    this$static.isOrdered = isOrdered;
  }
   else {
    checkState_2(isOrdered == this$static.isOrdered, 'Different isOrdered input from last time');
  }
  return this$static.orderedRange;
}

function FocusedContentRange_0(anchor, focus_0){
  FocusedPointRange_1.call(this, anchor, focus_0);
}

function FocusedContentRange_1(collapsedAt){
  this.anchor = collapsedAt;
  this.focus_0 = collapsedAt;
  this.isCollapsed = true;
}

function FocusedContentRange(){
}

_ = FocusedContentRange_1.prototype = FocusedContentRange_0.prototype = FocusedContentRange.prototype = new FocusedPointRange;
_.getClass$ = function getClass_538(){
  return Lorg_waveprotocol_wave_client_editor_content_FocusedContentRange_2_classLit;
}
;
_.castableTypeMap$ = {433:1};
_.isOrdered = false;
_.orderedRange = null;
function $clinit_857(){
  $clinit_857 = nullMethod;
  INSTANCE_7 = new NodeEventRouter_0;
}

function $handleBackspace(this$static, node, event_0){
  return $isAtBeginning(event_0.caret)?$handleBackspaceAtBeginning_0(this$static, node, event_0):$handleBackspaceNotAtBeginning(this$static, node, event_0);
}

function $handleBackspaceAfterNode(this$static, node, event_0){
  var element;
  element = node.asElement();
  if (!!element && dynamicCast(element, 218).nodeEventHandler.handleBackspaceAfterNode(element, event_0)) {
    return true;
  }
   else {
    if (!!element && !element.firstChild_0) {
      !!element.indexingContainer && $deleteNode(element.context.this$0.mutableContent, element);
      return true;
    }
     else {
      $setToEnd(event_0.caret, node);
      return $isAtBeginning(event_0.caret)?$handleBackspaceAtBeginning_0(this$static, node, event_0):$handleBackspaceNotAtBeginning(this$static, node, event_0);
    }
  }
}

function $handleBackspaceAtBeginning_0(this$static, node, event_0){
  var element;
  element = node.asElement();
  return !!element && dynamicCast(element, 218).nodeEventHandler.handleBackspaceAtBeginning(element, event_0) || $handleBackspace(this$static, $setToBefore(event_0.caret, node).container, event_0);
}

function $handleBackspaceNotAtBeginning(this$static, node, event_0){
  var childBefore, element;
  element = node.asElement();
  if (!element) {
    return handleTextNodeDeleteAction(node.asText(), event_0, true);
  }
   else if (dynamicCast(element, 218).nodeEventHandler.handleBackspaceNotAtBeginning(element, event_0)) {
    return true;
  }
   else {
    childBefore = $getNodeBefore(event_0.caret, ($clinit_833() , INSTANCE_6));
    return !!childBefore && $handleBackspaceAfterNode(this$static, childBefore, event_0);
  }
}

function $handleClick(this$static, node, event_0){
  var element, parent_0;
  element = node;
  if (!!element && dynamicCast(element, 218).nodeEventHandler.handleClick(element, event_0)) {
    return true;
  }
   else {
    parent_0 = node.parent_0;
    if (!!parent_0 && $handleClick(this$static, parent_0, event_0)) {
      return true;
    }
     else {
      event_0.shouldAllowDefault = true;
      return false;
    }
  }
}

function $handleDelete(this$static, node, event_0){
  var element, element_0;
  element = node.asElement();
  return !!element && dynamicCast(element, 218).nodeEventHandler.handleDelete(element, event_0) || ($isAtEnd(event_0.caret)?(element_0 = node.asElement() , !!element_0 && dynamicCast(element_0, 218).nodeEventHandler.handleDeleteAtEnd(element_0, event_0) || $handleDelete(this$static, $setToAfter(event_0.caret, node).container, event_0)):$handleDeleteNotAtEnd(this$static, node, event_0));
}

function $handleDeleteBeforeNode(this$static, node, event_0){
  var element;
  element = node.asElement();
  if (!!element && dynamicCast(element, 218).nodeEventHandler.handleDeleteBeforeNode(element, event_0)) {
    return true;
  }
   else {
    if (!!element && !node.getFirstChild()) {
      !!element.indexingContainer && $deleteNode(element.context.this$0.mutableContent, element);
      return true;
    }
     else {
      $setToBeginning(event_0.caret, node);
      return $handleDelete(this$static, node, event_0);
    }
  }
}

function $handleDeleteNotAtEnd(this$static, node, event_0){
  var child, element;
  element = node.asElement();
  if (!element) {
    return handleTextNodeDeleteAction(node.asText(), event_0, false);
  }
   else if (dynamicCast(element, 218).nodeEventHandler.handleDeleteNotAtEnd(element, event_0)) {
    return true;
  }
   else {
    child = event_0.caret.nodeAfter;
    return !!child && $handleDeleteBeforeNode(this$static, child, event_0);
  }
}

function $handleEnter(this$static, node, event_0){
  var element, parent_0;
  element = node.asElement();
  if (!!element && dynamicCast(element, 218).nodeEventHandler.handleEnter(element, event_0)) {
    return true;
  }
   else {
    parent_0 = node.parent_0;
    !!parent_0 && event_0.caret.container == node && $maybeMoveOut(event_0.caret);
    return !!parent_0 && $handleEnter(this$static, parent_0, event_0);
  }
}

function $handleLeft(this$static, node, event_0){
  var caret, child, element;
  element = node.asElement();
  if (!!element && dynamicCast(element, 218).nodeEventHandler.handleLeft(element, event_0)) {
    return true;
  }
   else {
    caret = event_0.caret;
    if (caret.offset >= 0?caret.offset == 0:caret.nodeAfter == caret.container.getFirstChild()) {
      if ($handleLeftAtBeginning(this$static, caret.container, event_0)) {
        return true;
      }
       else {
        event_0.shouldAllowDefault = true;
        return false;
      }
    }
     else {
      child = $getNodeBefore(caret, ($clinit_833() , INSTANCE_6));
      if (!!child && $handleLeftAfterNode(child, event_0)) {
        return true;
      }
       else {
        event_0.shouldAllowDefault = true;
        return false;
      }
    }
  }
}

function $handleLeftAfterNode(node, event_0){
  var element;
  element = node.asElement();
  if (!!element && dynamicCast(element, 218).nodeEventHandler.handleLeftAfterNode(element, event_0)) {
    return true;
  }
   else {
    event_0.shouldAllowDefault = true;
    return false;
  }
}

function $handleLeftAtBeginning(this$static, node, event_0){
  var element;
  element = node.asElement();
  if (!!element && dynamicCast(element, 218).nodeEventHandler.handleLeftAtBeginning(element, event_0)) {
    return true;
  }
   else {
    if ($handleLeft(this$static, $setToBefore(event_0.caret, node).container, event_0)) {
      return true;
    }
     else {
      event_0.shouldAllowDefault = true;
      return false;
    }
  }
}

function $handleRight(this$static, node, event_0){
  var caret, child, element;
  element = node.asElement();
  if (!!element && dynamicCast(element, 218).nodeEventHandler.handleRight(element, event_0)) {
    return true;
  }
   else {
    caret = event_0.caret;
    if (caret.offset >= 0?caret.offset == dynamicCast(caret.container, 220).data_0.length:!caret.nodeAfter) {
      if ($handleRightAtEnd(this$static, caret.container, event_0)) {
        return true;
      }
       else {
        event_0.shouldAllowDefault = true;
        return false;
      }
    }
     else if (node.isTextNode()) {
      event_0.shouldAllowDefault = true;
      return false;
    }
     else {
      child = caret.nodeAfter;
      if (!!child && $handleRightBeforeNode(child, event_0)) {
        return true;
      }
       else {
        event_0.shouldAllowDefault = true;
        return false;
      }
    }
  }
}

function $handleRightAtEnd(this$static, node, event_0){
  var element;
  element = node.asElement();
  if (!!element && dynamicCast(element, 218).nodeEventHandler.handleRightAtEnd(element, event_0)) {
    return true;
  }
   else {
    if ($handleRight(this$static, $setToAfter(event_0.caret, node).container, event_0)) {
      return true;
    }
     else {
      event_0.shouldAllowDefault = true;
      return false;
    }
  }
}

function $handleRightBeforeNode(node, event_0){
  var element;
  element = node.asElement();
  if (!!element && dynamicCast(element, 218).nodeEventHandler.handleRightBeforeNode(element, event_0)) {
    return true;
  }
   else {
    event_0.shouldAllowDefault = true;
    return false;
  }
}

function NodeEventRouter_0(){
}

function handleTextNodeDeleteAction(node, event_0, isBackSpace){
  var $e0, a_0, b, caret, e1, implDataLength, filteredHtml, next, next_0;
  try {
    implDataLength = (next = (next_0 = checkNodeAndNeighbour(node) , !next_0?null:next_0.getImplNodelet()) , filteredHtml = node.context.this$0.renderingConcerns.this$0.filteredHtmlView , sumTextNodesLength(node.implNodelet, next, filteredHtml));
    implDataLength <= 1 && $flush_1(node.context.this$0.editingConcerns.getTypingExtractor());
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 200)) {
      e1 = $e0;
      $handleMissing(node.context.this$0.renderingConcerns.this$0.repairer, e1);
      return true;
    }
     else 
      throw $e0;
  }
  if (!$isContentAttached(node)) {
    return true;
  }
  if (node.data_0.length <= 1) {
    $deleteRange_0(node.context.this$0.mutableContent, new Point$Tx_0(node, 0), new Point$Tx_0(node, 1));
  }
   else {
    caret = $asPoint(event_0.caret);
    if (isBackSpace) {
      a_0 = new Point$Tx_0(dynamicCast(caret.container, 192), $getTextOffset(caret) - 1);
      b = caret;
    }
     else {
      a_0 = caret;
      b = new Point$Tx_0(dynamicCast(caret.container, 192), $getTextOffset(caret) + 1);
    }
    $deleteRange_0(node.context.this$0.mutableContent, a_0, b);
  }
  return true;
}

function NodeEventRouter(){
}

_ = NodeEventRouter_0.prototype = NodeEventRouter.prototype = new Object_0;
_.getClass$ = function getClass_542(){
  return Lorg_waveprotocol_wave_client_editor_content_NodeEventRouter_2_classLit;
}
;
_.castableTypeMap$ = {};
var INSTANCE_7;
function $matchesSelectionTextNodes(this$static, nodelet, affectedAfterOffset){
  if (!this$static.savedSelection) {
    return false;
  }
  if ($isOrdered(this$static.savedSelection)) {
    if (nodelet == this$static.savedSelectionAnchorTextNodelet) {
      return this$static.savedSelectionAnchorOffset > affectedAfterOffset;
    }
     else if (nodelet == this$static.savedSelectionFocusTextNodelet) {
      return true;
    }
  }
   else {
    if (nodelet == this$static.savedSelectionFocusTextNodelet) {
      return this$static.savedSelectionFocusOffset > affectedAfterOffset;
    }
     else if (nodelet == this$static.savedSelectionAnchorTextNodelet) {
      return true;
    }
  }
  return false;
}

function $maybeUpdateNodeOffsets(this$static, nodelet, affectedAfterOffset, newNodelet, offsetDifference){
  if (nodelet == this$static.savedSelectionAnchorTextNodelet && this$static.savedSelectionAnchorOffset > affectedAfterOffset) {
    this$static.savedSelectionAnchorOffset += offsetDifference;
    this$static.savedSelectionAnchorTextNodelet = newNodelet;
  }
  if (nodelet == this$static.savedSelectionFocusTextNodelet && this$static.savedSelectionFocusOffset > affectedAfterOffset) {
    this$static.savedSelectionFocusOffset += offsetDifference;
    this$static.savedSelectionFocusTextNodelet = newNodelet;
  }
}

function $textNodeletAffected(this$static, nodelet, affectedAfterOffset, insertionAmount, changeType){
  if (this$static.needToRestoreSelection) {
    return;
  }
  switch (changeType.ordinal) {
    case 0:
      $matchesSelectionTextNodes(this$static, nodelet, affectedAfterOffset)?(this$static.needToRestoreSelection = true):$maybeUpdateNodeOffsets(this$static, nodelet, affectedAfterOffset, nodelet, insertionAmount);
      return;
    case 1:
      $matchesSelectionTextNodes(this$static, nodelet, affectedAfterOffset) && ($clinit_628() , this$static.needToRestoreSelection = true);
      return;
    case 3:
      return;
    case 2:
    case 4:
      (nodelet == this$static.savedSelectionAnchorTextNodelet || nodelet == this$static.savedSelectionFocusTextNodelet) && (this$static.needToRestoreSelection = true);
      return;
  }
}

_ = AnnotationBoundaryRenderer$1.prototype;
_.handleBackspaceAfterNode = function handleBackspaceAfterNode_0(element, event_0){
  return false;
}
;
_.handleDeleteBeforeNode = function handleDeleteBeforeNode_0(element, event_0){
  return false;
}
;
function $maybeSplitForNewline(){
  throw new UnsupportedOperationException_1('No more paragraphs');
}

function attributeKeptOnNewline(key, value){
  if ($equals_3('t', key)) {
    if ($equals_3('li', value)) {
      return true;
    }
    return false;
  }
  return true;
}

function indent_3(p, delta){
  $clinit_756();
  var indent;
  indent = max_1(0, ($clinit_905() , getIndent(dynamicCast(p.attributes.get_4('i'), 1))) + delta);
  $setElementAttribute(p.context.this$0.mutableContent, p, 'i', indent == 0?null:indent + '');
}

_ = ParagraphEventHandler.prototype;
_.handleBackspaceAtBeginning = function handleBackspaceAtBeginning_1(p, event_0){
  throw new UnsupportedOperationException_1('No more paragraphs');
}
;
_.handleDeleteAtEnd = function handleDeleteAtEnd_1(p, event_0){
  throw new UnsupportedOperationException_1('No more paragraphs');
}
;
_.handleEnter = function handleEnter_0(p, event_0){
  this.maybeSplitForNewline(p, event_0.caret);
  return true;
}
;
_.maybeSplitForNewline = function maybeSplitForNewline(p, splitAt){
  return $maybeSplitForNewline(splitAt.offset >= 0?new Point$Tx_0(splitAt.container, splitAt.offset):new Point$El_0(splitAt.container, splitAt.nodeAfter));
}
;
_ = LinoTextEventHandler.prototype;
_.handleBackspaceAtBeginning = function handleBackspaceAtBeginning_2(p, event_0){
  return true;
}
;
_.handleDeleteAtEnd = function handleDeleteAtEnd_2(p, event_0){
  return true;
}
;
_.maybeSplitForNewline = function maybeSplitForNewline_0(p, splitAt){
  return splitAt.offset >= 0?new Point$Tx_0(splitAt.container, splitAt.offset):new Point$El_0(splitAt.container, splitAt.nodeAfter);
}
;
function $isAnnotated(this$static, key, value){
  var current;
  current = this$static.annotations.containsKey(key)?dynamicCast(this$static.annotations.get(key), 1):this$static.resolver?$getAnnotation_0(this$static.resolver, key):null;
  return current == null?value == null:$equals_3(current, value);
}

function CaretAnnotations_0(){
  this.annotations = new HashMap_0;
}

function CaretAnnotations(){
}

_ = CaretAnnotations_0.prototype = CaretAnnotations.prototype = new Object_0;
_.getClass$ = function getClass_560(){
  return Lorg_waveprotocol_wave_client_editor_content_misc_CaretAnnotations_2_classLit;
}
;
_.castableTypeMap$ = {};
_.resolver = null;
_ = ChunkyElementHandler.prototype;
_.handleBackspaceAfterNode = function handleBackspaceAfterNode_1(element, event_0){
  $deleteNode(element.context.this$0.mutableContent, element);
  return true;
}
;
_.handleDeleteBeforeNode = function handleDeleteBeforeNode_1(element, event_0){
  $deleteNode(element.context.this$0.mutableContent, element);
  return true;
}
;
_.handleLeftAfterNode = function handleLeftAfterNode_0(element, event_0){
  placeCaretBeforeElement(element.context.this$0.editingConcerns.getSelectionHelper(), element);
  return true;
}
;
_.handleRightBeforeNode = function handleRightBeforeNode_0(element, event_0){
  placeCaretAfterElement(element.context.this$0.editingConcerns.getSelectionHelper(), element);
  return true;
}
;
function $handleBackspaceAtBeginning_1(paragraph){
  var line, lineElement;
  line = ($clinit_893() , dynamicCast(paragraph.transientData.get_0(LINE_0.id_0), 225));
  lineElement = line.lineElement;
  if ((!line.lineElement?0:getIndent(dynamicCast(line.lineElement.attributes.get_4('i'), 1))) > 0) {
    indent_3(lineElement, -1);
  }
   else {
    switch (of_0(dynamicCast(line.lineElement.attributes.get_4('t'), 1)).ordinal) {
      case 2:
        $setElementAttribute(lineElement.context.this$0.mutableContent, lineElement, 't', null);
        $setElementAttribute(lineElement.context.this$0.mutableContent, lineElement, 'listyle', null);
        break;
      default:$maybeRemove(line);
    }
  }
  return true;
}

function $maybeRemove(line){
  var at, attrs, doc, lineElement, needsAdjusting, prevLineElement, prevParagraph, previousLine;
  doc = line.cxt.this$0.mutableContent;
  lineElement = line.lineElement;
  previousLine = line.previous;
  if (previousLine) {
    prevLineElement = previousLine.lineElement;
    prevParagraph = previousLine.paragraph;
    if (maskUndefined(doc.doc.substrate.getNextSibling(prevLineElement)) === (lineElement == null?null:lineElement)) {
      attrs = doc.doc.substrate.getAttributes(lineElement);
      $setElementAttributes(doc, prevLineElement, new AttributesImpl_1(attrs));
    }
    at = $getLocation_0(doc, new Point$El_0(prevParagraph, null));
    needsAdjusting = !prevParagraph.firstChild_0;
    $deleteNode(doc, lineElement);
    needsAdjusting?$setCaret_0(lineElement.context.this$0.editingConcerns.getSelectionHelper(), new Point$El_0(prevParagraph, doc.doc.substrate.getFirstChild_0(prevParagraph))):$setCaret_0(lineElement.context.this$0.editingConcerns.getSelectionHelper(), $locate_0(doc.doc, at));
  }
}

_ = LocalParagraphEventHandler.prototype;
_.handleBackspaceAtBeginning = function handleBackspaceAtBeginning_3(paragraph, event_0){
  return $handleBackspaceAtBeginning_1(paragraph);
}
;
_.handleDeleteAtEnd = function handleDeleteAtEnd_3(p, event_0){
  var line;
  line = ($clinit_893() , dynamicCast(p.transientData.get_0(LINE_0.id_0), 225));
  !!line.next && $maybeRemove(line.next);
  return true;
}
;
_.handleEnter = function handleEnter_1(element, event_0){
  var contentPoint, currentAttrs, doc, entry, entry$iterator, line, newLineElement, newLocalParagraph, point, secondAttrs, doc_0, lineElement, next;
  contentPoint = event_0.caret;
  if (contentPoint.offset < 0 && contentPoint.container != element) {
    return true;
  }
  point = contentPoint.offset >= 0?new Point$Tx_0(contentPoint.container, contentPoint.offset):new Point$El_0(contentPoint.container, contentPoint.nodeAfter);
  point.offset >= 0?dynamicCast(point.container, 192):dynamicCast(nodeBefore_0(($clinit_833() , INSTANCE_6), point.asElementPoint()), 192);
  line = ($clinit_893() , dynamicCast(element.transientData.get_0(LINE_0.id_0), 225));
  if (of_0(dynamicCast(element.attributes.get_4('t'), 1)) == ($clinit_917() , LIST) && (lineElement = dynamicCast(element.transientData.get_0(LINE_0.id_0), 225).lineElement , doc_0 = lineElement.context.this$0.mutableContent , next = dynamicCast(doc_0.doc.substrate.getNextSibling(lineElement), 192) , !next || !!next.asElement() && ($clinit_896() , $equals_3('line', next.asElement().tagName_0)))) {
    return $handleBackspaceAtBeginning_1(element);
  }
  secondAttrs = new HashMap_0;
  doc = element.context.this$0.mutableContent;
  currentAttrs = line.cxt.this$0.mutableContent.doc.substrate.getAttributes(line.lineElement);
  if (currentAttrs) {
    for (entry$iterator = currentAttrs.entrySet_0().iterator_0(); entry$iterator.hasNext();) {
      entry = dynamicCast(entry$iterator.next_0(), 11);
      attributeKeptOnNewline(dynamicCast(entry.getKey(), 1), dynamicCast(entry.getValue(), 1)) && secondAttrs.put(dynamicCast(entry.getKey(), 1), dynamicCast(entry.getValue(), 1));
    }
  }
  secondAttrs.size_1() == 0 && (secondAttrs = ($clinit_1849() , EMPTY_MAP_0));
  newLineElement = dynamicCast($createElement_1(doc, $locate(doc, (checkNotNull_1(point, 'getLocation: Null point') , doc.doc.getLocation_0(point))), 'line', secondAttrs), 191);
  newLocalParagraph = dynamicCast(newLineElement.transientData.get_0(LINE_0.id_0), 225).paragraph;
  $setCaret_0(element.context.this$0.editingConcerns.getSelectionHelper(), start_5(element.context.this$0.renderingConcerns.this$0.renderedContentView, newLocalParagraph));
  return true;
}
;
function appliesEntirely(mapper, start, end, style){
  $clinit_905();
  var applied;
  applied = initValues(_3Z_classLit, {9:1}, -1, [true, false]);
  traverse(mapper, start, end, new Paragraph$4_0(applied, style));
  return applied[0] && applied[1];
}

function getFirstLine(mapper, start){
  $clinit_905();
  var doc, first, point;
  point = mapper.locate(start);
  doc = dynamicCast(point.container, 192).context.this$0.mutableContent;
  $clinit_2104();
  checkArgument_2(!isUnsupportedParagraphDocument(doc), 'Paragraph docs no longer supported');
  first = dynamicCast(getRelatedLineElement(doc, point), 192);
  if (!first) {
    return null;
  }
  return $clinit_893() , dynamicCast(first.asElement().transientData.get_0(LINE_0.id_0), 225);
}

function isHeading(node){
  $clinit_905();
  var size, tagName;
  tagName = dynamicCast(node.attributes.get_4('t'), 1);
  if (tagName != null && tagName.length == 2) {
    if (tagName.charCodeAt(0) == 104 || tagName.charCodeAt(0) == 72) {
      size = tagName.charCodeAt(1) - 48;
      if (size >= 1 && size <= 4) {
        return true;
      }
    }
  }
  return false;
}

function toggle(mapper, start, end, style){
  $clinit_905();
  traverse(mapper, start, end, new Paragraph$3_0(style, !appliesEntirely(mapper, start, end, style)));
}

function traverse(mapper, start, end, action){
  $clinit_905();
  var lineAt, lineTag, position;
  lineAt = getFirstLine(mapper, start);
  if (!lineAt) {
    return;
  }
  while (lineAt) {
    lineTag = lineAt.lineElement;
    position = mapper.getLocation(lineTag);
    if (position >= end) {
      break;
    }
    action.execute_3(lineTag);
    lineAt = lineAt.next;
  }
}

_ = Paragraph$1.prototype;
_.execute_3 = function execute_23(e){
  indent_3(e, 1);
}
;
_ = Paragraph$2.prototype;
_.execute_3 = function execute_24(e){
  indent_3(e, -1);
}
;
function Paragraph$3_0(val$style, val$isOn){
  this.val$style = val$style;
  this.val$isOn = val$isOn;
}

function Paragraph$3(){
}

_ = Paragraph$3_0.prototype = Paragraph$3.prototype = new Object_0;
_.execute_3 = function execute_25(e){
  this.val$style.apply_9(e, this.val$isOn);
}
;
_.getClass$ = function getClass_577(){
  return Lorg_waveprotocol_wave_client_editor_content_paragraph_Paragraph$3_2_classLit;
}
;
_.castableTypeMap$ = {12:1};
_.val$isOn = false;
_.val$style = null;
function Paragraph$4_0(val$applied, val$style){
  this.val$applied = val$applied;
  this.val$style = val$style;
}

function Paragraph$4(){
}

_ = Paragraph$4_0.prototype = Paragraph$4.prototype = new Object_0;
_.execute_3 = function execute_26(e){
  this.val$applied[0] &= this.val$style.isApplied(e);
  this.val$applied[1] = true;
}
;
_.getClass$ = function getClass_578(){
  return Lorg_waveprotocol_wave_client_editor_content_paragraph_Paragraph$4_2_classLit;
}
;
_.castableTypeMap$ = {12:1};
_.val$applied = null;
_.val$style = null;
function $apply_5(this$static, e, on){
  $setElementAttribute(e.context.this$0.mutableContent, e, 'a', this$static == LEFT_1?null:on?this$static.value_0:null);
}

function $isApplied(this$static, e){
  var val;
  val = fromValue_0(dynamicCast(e.attributes.get_4('a'), 1));
  return this$static == (!val?LEFT_1:val);
}

_ = Paragraph$Alignment.prototype;
_.apply_9 = function apply_33(e, on){
  $setElementAttribute(e.context.this$0.mutableContent, e, 'a', this == LEFT_1?null:on?this.value_0:null);
}
;
_.execute_3 = function execute_27(e){
  $setElementAttribute(e.context.this$0.mutableContent, e, 'a', this == LEFT_1?null:this.value_0);
}
;
_.isApplied = function isApplied(e){
  var val;
  return val = fromValue_0(dynamicCast(e.attributes.get_4('a'), 1)) , this == (!val?LEFT_1:val);
}
;
_ = Paragraph$Direction.prototype;
_.apply_9 = function apply_34(e, on){
  $setElementAttribute(e.context.this$0.mutableContent, e, 'd', this == LTR_0?null:on?this.value_0:null);
  on && $isApplied(this.oppositeAlignment, e) && $apply_5(this.alignment, e, true);
}
;
_.execute_3 = function execute_28(e){
  $setElementAttribute(e.context.this$0.mutableContent, e, 'd', this == LTR_0?null:this.value_0);
  $isApplied(this.oppositeAlignment, e) && $apply_5(this.alignment, e, true);
}
;
_.isApplied = function isApplied_0(e){
  var val;
  val = fromValue_1(dynamicCast(e.attributes.get_4('d'), 1));
  return this == (!val?LTR_0:val);
}
;
function Paragraph$ListStyler_0(type){
  this.type_0 = type;
}

function Paragraph$ListStyler(){
}

_ = Paragraph$ListStyler_0.prototype = Paragraph$ListStyler.prototype = new Object_0;
_.apply_9 = function apply_35(e, isOn){
  $setElementAttribute(e.context.this$0.mutableContent, e, 't', isOn?'li':null);
  $setElementAttribute(e.context.this$0.mutableContent, e, 'listyle', isOn?this.type_0:null);
}
;
_.getClass$ = function getClass_581(){
  return Lorg_waveprotocol_wave_client_editor_content_paragraph_Paragraph$ListStyler_2_classLit;
}
;
_.isApplied = function isApplied_1(e){
  return $equals_3('li', dynamicCast(e.attributes.get_4('t'), 1)) && equal_0(this.type_0, dynamicCast(e.attributes.get_4('listyle'), 1));
}
;
_.castableTypeMap$ = {13:1};
_.type_0 = null;
function Paragraph$RegularStyler_0(type){
  this.type_0 = type;
}

function Paragraph$RegularStyler(){
}

_ = Paragraph$RegularStyler_0.prototype = Paragraph$RegularStyler.prototype = new Object_0;
_.apply_9 = function apply_36(e, isOn){
  $setElementAttribute(e.context.this$0.mutableContent, e, 't', isOn?this.type_0:null);
  $setElementAttribute(e.context.this$0.mutableContent, e, 'listyle', null);
}
;
_.getClass$ = function getClass_582(){
  return Lorg_waveprotocol_wave_client_editor_content_paragraph_Paragraph$RegularStyler_2_classLit;
}
;
_.isApplied = function isApplied_2(e){
  return equal_0(this.type_0, dynamicCast(e.attributes.get_4('t'), 1));
}
;
_.castableTypeMap$ = {13:1};
_.type_0 = null;
function $renderAndAppendParagraph(contentView, dest, child, selectionMatcher){
  var br;
  renderChildren(contentView, dest, child, selectionMatcher);
  br = $doc.createElement('br');
  dest.appendChild(br);
  $maybeNoteHtml(selectionMatcher, child, br);
  return child;
}

function $renderHeadingItem(view, dest, src, selectionMatcher){
  var e, tagName;
  e = $doc.createElement('h' + ($clinit_905() , tagName = dynamicCast(src.attributes.get_4('t'), 1) , tagName.charCodeAt(1) - 48));
  dest.appendChild(e);
  renderChildren(view, e, src, selectionMatcher);
  $maybeNoteHtml(selectionMatcher, src, e);
  return src;
}

function doInnards(view, dest, src, selectionMatcher){
  renderChildren(view, dest, src, selectionMatcher);
  $maybeNoteHtml(selectionMatcher, src, dest);
}

_ = ParagraphNiceHtmlRenderer.prototype;
_.renderSequence = function renderSequence(view, firstItem, stopAt, destParent, selectionMatcher){
  var el, helper, indent, isDecimal, node, prev;
  checkArgument_3(firstItem != null && firstItem.castableTypeMap$ && !!firstItem.castableTypeMap$[191], 'firstItem must be an instance of ContentElement ', initValues(_3Ljava_lang_Object_2_classLit, {9:1, 66:1}, 0, [firstItem.getClass$()]));
  prev = null;
  helper = new ParagraphNiceHtmlRenderer$HtmlStack_0(destParent);
  for (node = firstItem; !!node && node != stopAt; prev = node , node = dynamicCast(view.getNextSibling(node), 192)) {
    el = dynamicCast(node, 191);
    indent = ($clinit_905() , getIndent(dynamicCast(el.attributes.get_4('i'), 1)));
    if (isHeading(el)) {
      $equalsIgnoreCase((helper.elementStack.size_0 == 0?helper.topParent:dynamicCastJso($get_7(helper.elementStack, helper.elementStack.size_0 - 1))).tagName, 'li') && $remove_12(helper.elementStack, helper.elementStack.size_0 - 1);
      $restack(helper, ($clinit_925() , BLOCKQUOTE), indent);
      $renderHeadingItem(view, helper.elementStack.size_0 == 0?helper.topParent:dynamicCastJso($get_7(helper.elementStack, helper.elementStack.size_0 - 1)), el, selectionMatcher);
    }
     else {
      if (($clinit_896() , $equals_3(el.tagName_0, 'l:p')) && $equals_3('li', dynamicCast(el.attributes.get_4('t'), 1))) {
        isDecimal = $equals_3('li', dynamicCast(el.attributes.get_4('t'), 1)) && $equals_3('decimal', dynamicCast(el.attributes.get_4('listyle'), 1));
        $equalsIgnoreCase((helper.elementStack.size_0 == 0?helper.topParent:dynamicCastJso($get_7(helper.elementStack, helper.elementStack.size_0 - 1))).tagName, 'li') && $remove_12(helper.elementStack, helper.elementStack.size_0 - 1);
        $restack(helper, isDecimal?($clinit_925() , OL):($clinit_925() , UL), indent + 1);
        $push_3(helper, $doc.createElement('li'));
        doInnards(view, helper.elementStack.size_0 == 0?helper.topParent:dynamicCastJso($get_7(helper.elementStack, helper.elementStack.size_0 - 1)), el, selectionMatcher);
      }
       else {
        indent + 1 != helper.elementStack.size_0 && $equalsIgnoreCase((helper.elementStack.size_0 == 0?helper.topParent:dynamicCastJso($get_7(helper.elementStack, helper.elementStack.size_0 - 1))).tagName, 'li') && $remove_12(helper.elementStack, helper.elementStack.size_0 - 1);
        $restack(helper, ($clinit_925() , BLOCKQUOTE), indent);
        $renderAndAppendParagraph(view, helper.elementStack.size_0 == 0?helper.topParent:dynamicCastJso($get_7(helper.elementStack, helper.elementStack.size_0 - 1)), el, selectionMatcher);
      }
    }
  }
  return prev;
}
;
function $push_3(this$static, e){
  (this$static.elementStack.size_0 == 0?this$static.topParent:dynamicCastJso($get_7(this$static.elementStack, this$static.elementStack.size_0 - 1))).appendChild(e);
  $add_9(this$static.elementStack, e);
}

function $restack(this$static, t, indentLevel){
  var depth, i;
  while (indentLevel < this$static.elementStack.size_0) {
    $remove_12(this$static.elementStack, this$static.elementStack.size_0 - 1);
  }
  depth = indentLevel - this$static.elementStack.size_0;
  for (i = 0; i < depth; ++i) {
    $push_3(this$static, t.createElement_2());
  }
}

function ParagraphNiceHtmlRenderer$HtmlStack_0(topParent){
  this.elementStack = new ArrayList_0;
  this.topParent = topParent;
}

function ParagraphNiceHtmlRenderer$HtmlStack(){
}

_ = ParagraphNiceHtmlRenderer$HtmlStack_0.prototype = ParagraphNiceHtmlRenderer$HtmlStack.prototype = new Object_0;
_.getClass$ = function getClass_585(){
  return Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$HtmlStack_2_classLit;
}
;
_.castableTypeMap$ = {};
_.topParent = null;
function $clinit_925(){
  $clinit_925 = nullMethod;
  BLOCKQUOTE = new ParagraphNiceHtmlRenderer$IndentType$1_0;
  UL = new ParagraphNiceHtmlRenderer$IndentType$2_0;
  OL = new ParagraphNiceHtmlRenderer$IndentType$3_0;
  $VALUES_26 = initValues(_3Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$IndentType_2_classLit, {9:1, 66:1, 166:1}, 101, [BLOCKQUOTE, UL, OL]);
}

function valueOf_33(name_0){
  $clinit_925();
  return valueOf_0(($clinit_929() , $MAP_26), name_0);
}

function values_27(){
  $clinit_925();
  return $VALUES_26;
}

function ParagraphNiceHtmlRenderer$IndentType(){
}

_ = ParagraphNiceHtmlRenderer$IndentType.prototype = new Enum;
_.getClass$ = function getClass_586(){
  return Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$IndentType_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 101:1};
var $VALUES_26, BLOCKQUOTE, OL, UL;
function ParagraphNiceHtmlRenderer$IndentType$1_0(){
  this.name_1 = 'BLOCKQUOTE';
  this.ordinal = 0;
}

function ParagraphNiceHtmlRenderer$IndentType$1(){
}

_ = ParagraphNiceHtmlRenderer$IndentType$1_0.prototype = ParagraphNiceHtmlRenderer$IndentType$1.prototype = new ParagraphNiceHtmlRenderer$IndentType;
_.createElement_2 = function createElement_3(){
  return $doc.createElement('blockquote');
}
;
_.getClass$ = function getClass_587(){
  return Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$IndentType$1_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 101:1};
function ParagraphNiceHtmlRenderer$IndentType$2_0(){
  this.name_1 = 'UL';
  this.ordinal = 1;
}

function ParagraphNiceHtmlRenderer$IndentType$2(){
}

_ = ParagraphNiceHtmlRenderer$IndentType$2_0.prototype = ParagraphNiceHtmlRenderer$IndentType$2.prototype = new ParagraphNiceHtmlRenderer$IndentType;
_.createElement_2 = function createElement_4(){
  return $doc.createElement('ul');
}
;
_.getClass$ = function getClass_588(){
  return Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$IndentType$2_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 101:1};
function ParagraphNiceHtmlRenderer$IndentType$3_0(){
  this.name_1 = 'OL';
  this.ordinal = 2;
}

function ParagraphNiceHtmlRenderer$IndentType$3(){
}

_ = ParagraphNiceHtmlRenderer$IndentType$3_0.prototype = ParagraphNiceHtmlRenderer$IndentType$3.prototype = new ParagraphNiceHtmlRenderer$IndentType;
_.createElement_2 = function createElement_5(){
  return $doc.createElement('ol');
}
;
_.getClass$ = function getClass_589(){
  return Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$IndentType$3_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 101:1};
function $clinit_929(){
  $clinit_929 = nullMethod;
  $MAP_26 = createValueOfMap(($clinit_925() , $VALUES_26));
}

var $MAP_26;
function $setEnabled(this$static, enabled){
  if (enabled) {
    $add_33(this$static.editorImpl.updateEvent.updateListeners, this$static);
  }
   else {
    $remove_42(this$static.editorImpl.updateEvent.updateListeners, this$static);
    $removeFromParent(this$static.DEBUG_CURSOR);
  }
  this$static.enabled = enabled;
}

function CursorDisplay_0(editorImpl){
  this.DEBUG_CURSOR = $doc.createElement('div');
  this.editorImpl = editorImpl;
  this.DEBUG_CURSOR.textContent = 'o';
  this.DEBUG_CURSOR.style['zIndex'] = '1000';
  this.DEBUG_CURSOR.style['position'] = ($clinit_82() , 'absolute');
}

function CursorDisplay(){
}

_ = CursorDisplay_0.prototype = CursorDisplay.prototype = new Object_0;
_.getClass$ = function getClass_592(){
  return Lorg_waveprotocol_wave_client_editor_debug_CursorDisplay_2_classLit;
}
;
_.onUpdate = function onUpdate_0(event_0){
  $clinit_1024();
}
;
_.castableTypeMap$ = {205:1};
_.editorImpl = null;
_.enabled = false;
function $getAnnotations(this$static){
  var ann, ann$iterator, doc, end, rangedAnnotations, retval;
  doc = this$static.editorImpl.content_0.mutableContent;
  end = $size_15(doc.doc);
  rangedAnnotations = $rangedAnnotations(this$static.editorImpl.content_0.localAnnotations.fullAnnotationSet, 0, end, null);
  retval = new StringBuilder_0;
  for (ann$iterator = new GenericRangedAnnotationIterable$GenericRangedAnnotationIterator_0(rangedAnnotations.a_0, rangedAnnotations.start, rangedAnnotations.end, rangedAnnotations.keys); ann$iterator.entries.heap.size_0 != 0;) {
    ann = $next_28(ann$iterator);
    ann.value_0 != null && $append_11(retval, '(' + ann.start + ',' + ann.end + ') : ' + ann.key + '=' + ann.value_0 + '\n');
  }
  return retval.impl.string;
}

function $initTextArea(area){
  area.element['readOnly'] = true;
  $setStyleName(area, getStylePrimaryName(area.element) + '-readonly');
  area.element.rows = 40;
  area.element.cols = 80;
}

function $onHide(this$static){
  $remove_42(this$static.editorImpl.updateEvent.updateListeners, this$static.updateListener);
  $showUpdates(this$static.logPanel, false);
}

function $onShow(this$static){
  switch (this$static.previousSelection.ordinal) {
    case 1:
    case 0:
    case 2:
    case 3:
      $add_33(this$static.editorImpl.updateEvent.updateListeners, this$static.updateListener);
      $onUpdate_0(this$static.updateListener);
      $showUpdates(this$static.logPanel, false);
      break;
    case 4:
      $showUpdates(this$static.logPanel, true);
      $remove_42(this$static.editorImpl.updateEvent.updateListeners, this$static.updateListener);
  }
}

function $setChecked_0(this$static, button){
  $setValue_1(button, ($clinit_415() , $clinit_415() , TRUE_0));
  button == this$static.domButton?$setNewSelection(this$static, ($clinit_938() , DOM_0)):button == this$static.localXmlButton?$setNewSelection(this$static, ($clinit_938() , LOCAL_XML)):button == this$static.persistenDocumentButton?$setNewSelection(this$static, ($clinit_938() , PERSISTENT_DOCUMENT)):button == this$static.annotationButton?$setNewSelection(this$static, ($clinit_938() , ANNOTATIONS)):button == this$static.logButton?$setNewSelection(this$static, ($clinit_938() , LOG_0)):button == this$static.optionsButton && $setNewSelection(this$static, ($clinit_938() , OPTIONS));
}

function $setNewSelection(this$static, selection){
  switch (this$static.previousSelection.ordinal) {
    case 1:
      $remove_1(this$static.mainPanel, this$static.dom);
      break;
    case 0:
      $remove_1(this$static.mainPanel, this$static.localXml);
      break;
    case 2:
      $remove_1(this$static.mainPanel, this$static.persistenDocumentContent);
      break;
    case 3:
      $remove_1(this$static.mainPanel, this$static.annotationContent);
      break;
    case 4:
      $removeFromParent(this$static.logPanel.logContainer);
      break;
    case 5:
      $remove_1(this$static.mainPanel, this$static.debugOptions.panel);
  }
  switch (selection.ordinal) {
    case 1:
      $add_2(this$static.mainPanel, this$static.dom);
      break;
    case 0:
      $add_2(this$static.mainPanel, this$static.localXml);
      break;
    case 2:
      $add_2(this$static.mainPanel, this$static.persistenDocumentContent);
      break;
    case 3:
      $add_2(this$static.mainPanel, this$static.annotationContent);
      break;
    case 4:
      $attachTo(this$static.logPanel, this$static.mainPanel.element);
      break;
    case 5:
      $refresh(this$static.debugOptions);
      $add_2(this$static.mainPanel, this$static.debugOptions.panel);
  }
  this$static.previousSelection = selection;
  $onShow(this$static);
}

function DebugDialog_0(editorImpl){
  this.dom = new TextArea_1;
  this.localXml = new TextArea_1;
  this.persistenDocumentContent = new TextArea_1;
  this.annotationContent = new TextArea_1;
  this.mainPanel = new FlowPanel_0;
  this.groupName = '__debug_dialog_selector_' + radioId++;
  this.domButton = new RadioButton_1(this.groupName, ($clinit_938() , DOM_0).displayName);
  this.localXmlButton = new RadioButton_1(this.groupName, LOCAL_XML.displayName);
  this.persistenDocumentButton = new RadioButton_1(this.groupName, PERSISTENT_DOCUMENT.displayName);
  this.annotationButton = new RadioButton_1(this.groupName, ANNOTATIONS.displayName);
  this.logButton = new RadioButton_1(this.groupName, LOG_0.displayName);
  this.optionsButton = new RadioButton_1(this.groupName, OPTIONS.displayName);
  this.radioButtonHandler = new DebugDialog$1_0(this);
  this.logPanel = new DebugDialog$LogPanel_0(($clinit_670() , logbuffer));
  this.updateListener = new DebugDialog$2_0(this);
  this.editorImpl = editorImpl;
  this.debugOptions = new DebugOptions_0(editorImpl);
  $initWidget(this, this.mainPanel);
  $add_2(this.mainPanel, this.domButton);
  $add_2(this.mainPanel, this.localXmlButton);
  $add_2(this.mainPanel, this.persistenDocumentButton);
  $add_2(this.mainPanel, this.annotationButton);
  $add_2(this.mainPanel, this.logButton);
  $add_2(this.mainPanel, this.optionsButton);
  this.mainPanel.element.insertBefore($doc.createElement('br'), null);
  this.previousSelection = PERSISTENT_DOCUMENT;
  $addDomHandler(this.domButton, this.radioButtonHandler, ($clinit_112() , $clinit_112() , TYPE_1));
  $addDomHandler(this.localXmlButton, this.radioButtonHandler, TYPE_1);
  $addDomHandler(this.persistenDocumentButton, this.radioButtonHandler, TYPE_1);
  $addDomHandler(this.annotationButton, this.radioButtonHandler, TYPE_1);
  $addDomHandler(this.logButton, this.radioButtonHandler, TYPE_1);
  $addDomHandler(this.optionsButton, this.radioButtonHandler, TYPE_1);
  $initTextArea(this.dom);
  $initTextArea(this.localXml);
  $initTextArea(this.persistenDocumentContent);
  $initTextArea(this.annotationContent);
  $setChecked_0(this, this.persistenDocumentButton);
}

function DebugDialog(){
}

_ = DebugDialog_0.prototype = DebugDialog.prototype = new Composite;
_.getClass$ = function getClass_593(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugDialog_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
_.debugOptions = null;
_.editorImpl = null;
_.previousSelection = null;
var radioId = 0;
function DebugDialog$1_0(this$0){
  this.this$0 = this$0;
}

function DebugDialog$1(){
}

_ = DebugDialog$1_0.prototype = DebugDialog$1.prototype = new Object_0;
_.getClass$ = function getClass_594(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugDialog$1_2_classLit;
}
;
_.onClick = function onClick_0(e){
  $setChecked_0(this.this$0, dynamicCast(e.source, 227));
}
;
_.castableTypeMap$ = {24:1, 37:1};
_.this$0 = null;
function $onUpdate_0(this$static){
  switch (this$static.this$0.previousSelection.ordinal) {
    case 1:
      $setText_1(this$static.this$0.dom, formatImplDomString(this$static.this$0.editorImpl));
      break;
    case 0:
      $setText_1(this$static.this$0.localXml, formatContentDomString(this$static.this$0.editorImpl));
      break;
    case 2:
      $setText_1(this$static.this$0.persistenDocumentContent, formatPersistentDomString(this$static.this$0.editorImpl));
      break;
    case 3:
      $setText_1(this$static.this$0.annotationContent, $getAnnotations(this$static.this$0));
  }
}

function DebugDialog$2_0(this$0){
  this.this$0 = this$0;
}

function DebugDialog$2(){
}

_ = DebugDialog$2_0.prototype = DebugDialog$2.prototype = new Object_0;
_.getClass$ = function getClass_595(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugDialog$2_2_classLit;
}
;
_.onUpdate = function onUpdate_1(dummy){
  $onUpdate_0(this);
}
;
_.castableTypeMap$ = {205:1};
_.this$0 = null;
function $appendLogLine(this$static, line){
  var element;
  element = $doc.createElement('div');
  element.innerHTML = line || '';
  element.style['borderBottomStyle'] = 'dotted';
  element.style['borderWidth'] = 1 + ($clinit_88() , 'px');
  element.style['borderColor'] = '#c0c0c0';
  this$static.logContainer.appendChild(element);
  this$static.lastElement = element;
}

function $attachTo(this$static, el){
  el.appendChild(this$static.logContainer);
}

function $fillContent(this$static){
  var s, s$iterator, strs;
  this$static.logContainer.innerHTML = '';
  strs = $showAll(this$static.log);
  for (s$iterator = new AbstractList$IteratorImpl_0(strs); s$iterator.i < s$iterator.this$0_0.size_1();) {
    s = dynamicCast($next_4(s$iterator), 1);
    $appendLogLine(this$static, s);
  }
  !!this$static.lastElement && $scrollIntoView(this$static.lastElement);
}

function $showUpdates(this$static, enable){
  if (enable) {
    $fillContent(this$static);
    $add_13(this$static.log.sinks, this$static.domSink);
  }
   else {
    this$static.log.sinks.map.remove_3(this$static.domSink) != null;
  }
}

function DebugDialog$LogPanel_0(log){
  this.logContainer = $doc.createElement('div');
  this.domSink = new DebugDialog$LogPanel$1_0(this);
  this.log = log;
  this.logContainer.style['width'] = 800 + ($clinit_88() , 'px');
  this.logContainer.style['height'] = '500px';
  this.logContainer.style['overflow'] = ($clinit_76() , 'scroll');
}

function DebugDialog$LogPanel(){
}

_ = DebugDialog$LogPanel_0.prototype = DebugDialog$LogPanel.prototype = new Object_0;
_.getClass$ = function getClass_596(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugDialog$LogPanel_2_classLit;
}
;
_.castableTypeMap$ = {};
_.lastElement = null;
_.log = null;
function DebugDialog$LogPanel$1_0(this$1){
  this.this$1 = this$1;
}

function DebugDialog$LogPanel$1(){
}

_ = DebugDialog$LogPanel$1_0.prototype = DebugDialog$LogPanel$1.prototype = new LogSink;
_.getClass$ = function getClass_597(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugDialog$LogPanel$1_2_classLit;
}
;
_.lazyLog = function lazyLog_1(level, messages){
  $appendLogLine(this.this$1, stringifyLogObject(messages));
  $scrollIntoView(this.this$1.lastElement);
}
;
_.castableTypeMap$ = {347:1};
_.this$1 = null;
function $clinit_938(){
  $clinit_938 = nullMethod;
  LOCAL_XML = new DebugDialog$Selection_0('LOCAL_XML', 0, 'localXml');
  DOM_0 = new DebugDialog$Selection_0('DOM', 1, 'dom');
  PERSISTENT_DOCUMENT = new DebugDialog$Selection_0('PERSISTENT_DOCUMENT', 2, 'persistentDocument');
  ANNOTATIONS = new DebugDialog$Selection_0('ANNOTATIONS', 3, 'annotations');
  LOG_0 = new DebugDialog$Selection_0('LOG', 4, 'log');
  OPTIONS = new DebugDialog$Selection_0('OPTIONS', 5, 'options');
  $VALUES_27 = initValues(_3Lorg_waveprotocol_wave_client_editor_debug_DebugDialog$Selection_2_classLit, {9:1, 66:1, 166:1}, 102, [LOCAL_XML, DOM_0, PERSISTENT_DOCUMENT, ANNOTATIONS, LOG_0, OPTIONS]);
}

function DebugDialog$Selection_0(enum$name, enum$ordinal, displayName){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
  this.displayName = displayName;
}

function valueOf_34(name_0){
  $clinit_938();
  return valueOf_0(($clinit_939() , $MAP_27), name_0);
}

function values_28(){
  $clinit_938();
  return $VALUES_27;
}

function DebugDialog$Selection(){
}

_ = DebugDialog$Selection_0.prototype = DebugDialog$Selection.prototype = new Enum;
_.getClass$ = function getClass_598(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugDialog$Selection_2_classLit;
}
;
_.toString$ = function toString_67(){
  return this.displayName;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 102:1};
_.displayName = null;
var $VALUES_27, ANNOTATIONS, DOM_0, LOCAL_XML, LOG_0, OPTIONS, PERSISTENT_DOCUMENT;
function $clinit_939(){
  $clinit_939 = nullMethod;
  $MAP_27 = createValueOfMap(($clinit_938() , $VALUES_27));
}

var $MAP_27;
function $addCheckBox_0(panel, caption, initValue, handler){
  var box;
  box = new CheckBox_1(caption);
  $setValue_1(box, ($clinit_415() , initValue?TRUE_0:FALSE_0));
  $addValueChangeHandler(box, handler);
  $add_6(panel, box);
}

function $refresh(this$static){
  var updates;
  updates = this$static.editor.updateEvent;
  $clear_1(this$static.updateEventsPanel);
  $debugGetAllUpdateEventNames(updates).each_3(new DebugOptions$7_0(this$static, updates));
}

function DebugOptions_0(editorImpl){
  var contentInput, cursorDisplay, errorLabel, insertXmlButton, rhs;
  this.panel = new HorizontalPanel_0;
  this.optionsPanel = new VerticalPanel_0;
  this.updateEventsPanel = new VerticalPanel_0;
  this.editor = editorImpl;
  cursorDisplay = new CursorDisplay_0(editorImpl);
  $addCheckBox_0(this.optionsPanel, 'Editor on', !editorImpl.debugDisabled, new DebugOptions$1_0(editorImpl));
  $addCheckBox_0(this.optionsPanel, 'Receive/send ops', editorImpl.permitOperations, new DebugOptions$2_0(editorImpl));
  $addCheckBox_0(this.optionsPanel, 'Cancel unsafe combos', ($clinit_956() , $clinit_956() , cancelUnsafeKeyEvents), new DebugOptions$3_0);
  $addCheckBox_0(this.optionsPanel, 'Show xy-selection cursor', cursorDisplay.enabled, new DebugOptions$4_0(cursorDisplay));
  $addCheckBox_0(this.optionsPanel, 'Check local ops', ($clinit_791() , validateLocalOps), new DebugOptions$5_0);
  $add_6(this.optionsPanel, new HTML_1('<br/>Permitted update event listeners:'));
  $add_6(this.optionsPanel, this.updateEventsPanel);
  this.updateEventsPanel.element.style['paddingLeft'] = 10 + ($clinit_88() , 'px');
  $add_5(this.panel, this.optionsPanel);
  rhs = new VerticalPanel_0;
  $add_6(rhs, new HTML_1('XML to insert at current cursor location.<br/>Ensure there is no extra whitespace anywhere between your tags!'));
  contentInput = new TextArea_1;
  contentInput.element.rows = 10;
  contentInput.element.cols = 40;
  $add_6(rhs, contentInput);
  errorLabel = new Label_1('');
  insertXmlButton = new Button_1('Insert');
  $addDomHandler(insertXmlButton, new DebugOptions$6_0(this, errorLabel, contentInput), ($clinit_112() , $clinit_112() , TYPE_1));
  $add_6(rhs, errorLabel);
  $add_6(rhs, insertXmlButton);
  $add_5(this.panel, rhs);
}

function DebugOptions(){
}

_ = DebugOptions_0.prototype = DebugOptions.prototype = new Object_0;
_.getClass$ = function getClass_599(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugOptions_2_classLit;
}
;
_.castableTypeMap$ = {};
_.editor = null;
function DebugOptions$1_0(val$editorImpl){
  this.val$editorImpl = val$editorImpl;
}

function DebugOptions$1(){
}

_ = DebugOptions$1_0.prototype = DebugOptions$1.prototype = new Object_0;
_.getClass$ = function getClass_600(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$1_2_classLit;
}
;
_.onValueChange = function onValueChange(event_0){
  this.val$editorImpl.debugDisabled = !event_0.value_0.value_0;
}
;
_.castableTypeMap$ = {36:1, 37:1};
_.val$editorImpl = null;
function DebugOptions$2_0(val$editorImpl){
  this.val$editorImpl = val$editorImpl;
}

function DebugOptions$2(){
}

_ = DebugOptions$2_0.prototype = DebugOptions$2.prototype = new Object_0;
_.getClass$ = function getClass_601(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$2_2_classLit;
}
;
_.onValueChange = function onValueChange_0(event_0){
  $debugConnectOpSinks(this.val$editorImpl, event_0.value_0.value_0);
}
;
_.castableTypeMap$ = {36:1, 37:1};
_.val$editorImpl = null;
function DebugOptions$3_0(){
}

function DebugOptions$3(){
}

_ = DebugOptions$3_0.prototype = DebugOptions$3.prototype = new Object_0;
_.getClass$ = function getClass_602(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$3_2_classLit;
}
;
_.onValueChange = function onValueChange_1(event_0){
  $clinit_956();
  cancelUnsafeKeyEvents = event_0.value_0.value_0;
}
;
_.castableTypeMap$ = {36:1, 37:1};
function DebugOptions$4_0(val$cursorDisplay){
  this.val$cursorDisplay = val$cursorDisplay;
}

function DebugOptions$4(){
}

_ = DebugOptions$4_0.prototype = DebugOptions$4.prototype = new Object_0;
_.getClass$ = function getClass_603(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$4_2_classLit;
}
;
_.onValueChange = function onValueChange_2(event_0){
  $setEnabled(this.val$cursorDisplay, event_0.value_0.value_0);
}
;
_.castableTypeMap$ = {36:1, 37:1};
_.val$cursorDisplay = null;
function DebugOptions$5_0(){
}

function DebugOptions$5(){
}

_ = DebugOptions$5_0.prototype = DebugOptions$5.prototype = new Object_0;
_.getClass$ = function getClass_604(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$5_2_classLit;
}
;
_.onValueChange = function onValueChange_3(event_0){
  $clinit_791();
  validateLocalOps = event_0.value_0.value_0;
}
;
_.castableTypeMap$ = {36:1, 37:1};
function DebugOptions$6_0(this$0, val$errorLabel, val$contentInput){
  this.this$0 = this$0;
  this.val$errorLabel = val$errorLabel;
  this.val$contentInput = val$contentInput;
}

function DebugOptions$6(){
}

_ = DebugOptions$6_0.prototype = DebugOptions$6.prototype = new Object_0;
_.getClass$ = function getClass_605(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$6_2_classLit;
}
;
_.onClick = function onClick_1(event_0){
  var $e0, e, selection, xml, selection_0;
  this.this$0.editor.focus_2(true);
  selection = (selection_0 = $getSelectionPoints($getSelectionHelper_0(this.this$0.editor)) , !selection_0?null:$asOrderedRange(selection_0, ($clinit_1024() , true)));
  if (!selection) {
    $setTextOrHtml(this.val$errorLabel.directionalTextHelper, "Don't know where to insert this", false);
    return;
  }
  try {
    xml = innerXml1($parse_1(($clinit_2081() , $getPropertyString(this.val$contentInput.element, 'value'))));
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 21)) {
      $setTextOrHtml(this.val$errorLabel.directionalTextHelper, 'Ill formed XML', false);
      return;
    }
     else 
      throw $e0;
  }
  try {
    $insertXml($getDocument_0(this.this$0.editor), selection.second, xml);
    $setTextOrHtml(this.val$errorLabel.directionalTextHelper, '', false);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 21)) {
      e = $e0;
      $setTextOrHtml(this.val$errorLabel.directionalTextHelper, 'Invalid XML: ' + e.getMessage(), false);
    }
     else 
      throw $e0;
  }
}
;
_.castableTypeMap$ = {24:1, 37:1};
_.this$0 = null;
_.val$contentInput = null;
_.val$errorLabel = null;
function DebugOptions$7_0(this$0, val$updates){
  this.this$0 = this$0;
  this.val$updates = val$updates;
}

function DebugOptions$7(){
}

_ = DebugOptions$7_0.prototype = DebugOptions$7.prototype = new Object_0;
_.apply_4 = function apply_37(element){
  $addCheckBox_0(this.this$0.updateEventsPanel, element, !this.val$updates.suppressedEventNames.contains_0(element), new DebugOptions$7$1_0(this.val$updates, element));
}
;
_.getClass$ = function getClass_606(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$7_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
_.val$updates = null;
function DebugOptions$7$1_0(val$updates, val$element){
  this.val$updates = val$updates;
  this.val$element = val$element;
}

function DebugOptions$7$1(){
}

_ = DebugOptions$7$1_0.prototype = DebugOptions$7$1.prototype = new Object_0;
_.getClass$ = function getClass_607(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$7$1_2_classLit;
}
;
_.onValueChange = function onValueChange_4(event_0){
  $debugSuppressUpdateEvent(this.val$updates, this.val$element, !event_0.value_0.value_0);
}
;
_.castableTypeMap$ = {36:1, 37:1};
_.val$element = null;
_.val$updates = null;
function create_21(editorImpl){
  var debugDialog, listener, popup;
  debugDialog = new DebugDialog_0(editorImpl);
  listener = new DebugPopupFactory$2_0(debugDialog);
  popup = createPopup_0(debugDialog, listener);
  if ($getTitleBar(popup)) {
    $setTextOrHtml($getTitleBar(popup).title_0.directionalTextHelper, 'Editor Debug', false);
    $add_2($getTitleBar(popup).buttons, new Button_2(' X ', new DebugPopupFactory$3_0(popup)));
  }
  return popup;
}

function DebugPopupFactory$2_0(val$debugDialog){
  this.val$debugDialog = val$debugDialog;
}

function DebugPopupFactory$2(){
}

_ = DebugPopupFactory$2_0.prototype = DebugPopupFactory$2.prototype = new Object_0;
_.getClass$ = function getClass_608(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugPopupFactory$2_2_classLit;
}
;
_.onHide = function onHide(source){
  $onHide(this.val$debugDialog);
}
;
_.onShow = function onShow(source){
  $onShow(this.val$debugDialog);
}
;
_.castableTypeMap$ = {345:1};
_.val$debugDialog = null;
function DebugPopupFactory$3_0(val$popup){
  this.val$popup = val$popup;
}

function DebugPopupFactory$3(){
}

_ = DebugPopupFactory$3_0.prototype = DebugPopupFactory$3.prototype = new Object_0;
_.getClass$ = function getClass_609(){
  return Lorg_waveprotocol_wave_client_editor_debug_DebugPopupFactory$3_2_classLit;
}
;
_.onClick = function onClick_2(event_0){
  $hide(this.val$popup);
}
;
_.castableTypeMap$ = {24:1, 37:1};
_.val$popup = null;
function $compositionEnd_0(this$static){
  this$static.delayAfterTextInput = false;
  if (!this$static.browserComposing) {
    $log_0(this$static.logger.errorLogger, "CEH: State was not 'composing' during a compositionend event!");
    return;
  }
  this$static.browserComposing = false;
  if (this$static.modifiesDomAndFiresTextInputAfterComposition) {
    $log_0(this$static.logger.traceLogger, 'ce schedule');
    $scheduleDelayed_0(this$static.timer, this$static.endTask, 0);
  }
   else {
    $log_0(this$static.logger.traceLogger, 'ce now');
    this$static.appComposing = false;
    $compositionEnd_2(this$static.listener);
  }
}

function $compositionStart_0(this$static){
  if (this$static.browserComposing) {
    $log_0(this$static.logger.errorLogger, "CEH: State was already 'composing' during a compositionstart event!");
    return;
  }
  this$static.delayAfterTextInput && $flush(this$static);
  this$static.delayAfterTextInput = false;
  this$static.browserComposing = true;
  if (this$static.modifiesDomAndFiresTextInputAfterComposition && this$static.timer.scheduler.taskInfos.get(this$static.endTask) != null) {
    $cancel_3(this$static.timer.scheduler, this$static.endTask);
    return;
  }
  this$static.appComposing = true;
  $compositionStart_1(this$static.listener.this$0);
}

function $flush(this$static){
  if (this$static.appComposing) {
    $cancel_3(this$static.timer.scheduler, this$static.endTask);
    $execute_2(this$static.endTask);
  }
   else {
    return;
  }
}

function $handleCompositionEvent(this$static, typeName){
  if ($equals_3('compositionstart', typeName)) {
    $compositionStart_0(this$static);
  }
   else if ($equals_3('text', typeName) || $equals_3('compositionupdate', typeName))
  ;
  else if ($equals_3('compositionend', typeName)) {
    $compositionEnd_0(this$static);
  }
   else if ($equals_3('textInput', typeName)) {
    $textInput(this$static);
  }
   else {
    throw new AssertionError_1('unreachable');
  }
  return false;
}

function $handleOtherEvent(this$static){
  if (this$static.modifiesDomAndFiresTextInputAfterComposition && !this$static.browserComposing) {
    $flush(this$static);
  }
   else {
    return;
  }
}

function $textInput(this$static){
  if (this$static.modifiesDomAndFiresTextInputAfterComposition && this$static.appComposing && !this$static.browserComposing) {
    this$static.delayAfterTextInput = true;
    $scheduleDelayed_0(this$static.timer, this$static.endTask, 0);
  }
}

function CompositionEventHandler_0(timer, listener, logger, modifiesDomAndFiresTextinputAfterComposition){
  this.endTask = new CompositionEventHandler$1_0(this);
  this.timer = timer;
  this.listener = listener;
  this.logger = logger;
  this.modifiesDomAndFiresTextInputAfterComposition = modifiesDomAndFiresTextinputAfterComposition;
}

function CompositionEventHandler(){
}

_ = CompositionEventHandler_0.prototype = CompositionEventHandler.prototype = new Object_0;
_.getClass$ = function getClass_610(){
  return Lorg_waveprotocol_wave_client_editor_event_CompositionEventHandler_2_classLit;
}
;
_.castableTypeMap$ = {};
_.appComposing = false;
_.browserComposing = false;
_.delayAfterTextInput = false;
_.listener = null;
_.logger = null;
_.modifiesDomAndFiresTextInputAfterComposition = false;
_.timer = null;
function $execute_2(this$static){
  this$static.this$0.delayAfterTextInput = false;
  if (this$static.this$0.browserComposing) {
    return;
  }
  this$static.this$0.appComposing = false;
  $compositionEnd_2(this$static.this$0.listener);
}

function CompositionEventHandler$1_0(this$0){
  this.this$0 = this$0;
}

function CompositionEventHandler$1(){
}

_ = CompositionEventHandler$1_0.prototype = CompositionEventHandler$1.prototype = new Object_0;
_.execute_0 = function execute_30(){
  $execute_2(this);
}
;
_.getClass$ = function getClass_611(){
  return Lorg_waveprotocol_wave_client_editor_event_CompositionEventHandler$1_2_classLit;
}
;
_.castableTypeMap$ = {248:1, 249:1};
_.this$0 = null;
function $clinit_956(){
  $clinit_956 = nullMethod;
  logger_4 = ($clinit_741() , logger_1);
}

function $checkBlackWhiteListConsistency(sEvent){
  var isConsistent, message;
  isConsistent = !($isWhiteListedCombo(sEvent) && $isBlackListedCombo(sEvent));
  if (!isConsistent) {
    message = 'Combo both whitelisted and blacklisted! ' + sEvent.cachedKeyCode;
    $logPlainText(logger_4.errorLogger, message);
  }
  return isConsistent;
}

function $checkForWebkitEndOfLinkHack(this$static, signal){
  var e, selection, textNode;
  if (signal.nativeEvent.target.nodeType == 3 && ($equals_3(signal.nativeEvent.type, 'DOMCharacterDataModified') || $equals_3(signal.nativeEvent.type, 'DOMNodeInserted'))) {
    textNode = signal.nativeEvent.target;
    if (textNode.length > 0) {
      e = textNode.previousSibling;
      if (!!e && e.nodeType != 3 && $equals_3(e.tagName.toLowerCase(), 'a')) {
        selection = this$static.editorInteractor.this$0.content_0?(get_21() , null):null;
        selection.isCollapsed && $getTextOffset(selection.focus_0) == 0 && (this$static.editorInteractor.this$0.webkitEndOfLinkHackTextNode = textNode , undefined);
      }
    }
  }
}

function $checkIfValidSelectionNeeded(this$static, event_0){
  if (event_0.nativeEvent.type.indexOf('DOM') == 0 || ($clinit_648() , FOCUS_EVENTS).contains_0(event_0.nativeEvent.type)) {
    return false;
  }
   else if (($clinit_648() , KEY_EVENTS).contains_0(event_0.nativeEvent.type) && this$static.state == ($clinit_959() , NORMAL_0)) {
    if (event_0.cachedKeyCode == 229) {
      return false;
    }
     else if (event_0.keySignalType == ($clinit_644() , INPUT)) {
      return false;
    }
  }
  return true;
}

function $compositionEnd_1(this$static){
  this$static.cachedSelection = $compositionEnd(this$static.editorInteractor);
  this$static.state = ($clinit_959() , NORMAL_0);
}

function $compositionStart_1(this$static){
  var caret;
  this$static.state == ($clinit_959() , COMPOSITION) && $log_0(logger_4.errorLogger, 'State was already IME during a compositionstart event!');
  if (!this$static.cachedSelection) {
    $log_0(logger_4.errorLogger, "No selection during a composition start event? Maybe it's deep inside some doodad's html?");
    caret = null;
  }
   else 
    this$static.cachedSelection.isCollapsed?(caret = this$static.cachedSelection.focus_0):(caret = $deleteCachedSelectionRangeAndInvalidate(this$static, true));
  this$static.state = COMPOSITION;
  $compositionStart(this$static.editorInteractor, caret);
}

function $deleteCachedSelectionRangeAndInvalidate(this$static, isReplace){
  var caret, end, start;
  $checkpoint(this$static.editorInteractor, this$static.cachedSelection);
  $clinit_1024();
  start = this$static.cachedSelection.anchor;
  end = this$static.cachedSelection.focus_0;
  caret = $deleteRange(this$static.editorInteractor, start, end, isReplace);
  this$static.cachedSelection = null;
  $setCaret_0(this$static.editorInteractor.this$0.aggressiveSelectionHelper, caret);
  return caret;
}

function $handleEvent(this$static, signal){
  var $e0, e, retVal;
  if ($notifyListeners(this$static.editorInteractor, signal)) {
    return false;
  }
  this$static.hadInitialSelection = $hasContentSelection(this$static.editorInteractor);
  try {
    retVal = $handleEventInner(this$static, signal);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 228)) {
      e = $e0;
      e.lostSelection && selectionLogCullRotation++ % 100 == 0 && $log_3(($clinit_741() , logger_1).errorLogger, e);
      retVal = e.lostSelection;
    }
     else 
      throw $e0;
  }
  return retVal;
}

function $handleEventInner(this$static, event_0){
  var node;
  this$static.cachedSelection = null;
  if (($clinit_648() , MOUSE_EVENTS).contains_0(event_0.nativeEvent.type)) {
    $flushSynchronous(this$static.editorInteractor.this$0);
    node = $findElementWrapper_0(this$static.editorInteractor.this$0.nodeManager, event_0.nativeEvent.target);
    event_0.caret = new ContentPoint_0(node, null);
    if (!!node && $equals_3('click', event_0.nativeEvent.type)) {
      $handleClick(this$static.router, node, event_0);
      this$static.editorInteractor.this$0.caretStyles.annotations.clear();
      $rebiasSelection(this$static.editorInteractor.this$0, ($clinit_1753() , NEUTRAL_0));
      return !event_0.shouldAllowDefault;
    }
     else {
      return false;
    }
  }
  if ($checkIfValidSelectionNeeded(this$static, event_0)) {
    $refreshEditorWithCaret(this$static, event_0);
    if (!this$static.cachedSelection) {
      return this$static.editorInteractor.this$0.editing;
    }
  }
  this$static.weirdComposition && this$static.state == ($clinit_959() , COMPOSITION) && (COMPOSITION_EVENTS.contains_0(event_0.nativeEvent.type) || $handleOtherEvent(this$static.compositionHandler));
  if (KEY_EVENTS.contains_0(event_0.nativeEvent.type)) {
    return $handleKeyEvent(this$static, event_0);
  }
   else if (COMPOSITION_EVENTS.contains_0(event_0.nativeEvent.type)) {
    return this$static.useCompositionEvents && $handleCompositionEvent(this$static.compositionHandler, event_0.nativeEvent.type);
  }
   else if (CLIPBOARD_EVENTS.contains_0(event_0.nativeEvent.type)) {
    return $equals_3('paste', event_0.nativeEvent.type)?$handlePaste(this$static.subHandler):$equals_3('cut', event_0.nativeEvent.type)?$handleCut(this$static.subHandler):$equals_3('copy', event_0.nativeEvent.type) && $handleCopy(this$static.subHandler);
  }
   else if (event_0.nativeEvent.type.indexOf('DOM') == 0) {
    if (!$isTyping(this$static.editorInteractor.this$0)) {
      if (event_0.nativeEvent.target.nodeType == 3) {
        this$static.cachedSelection = $getSelectionPoints(this$static.editorInteractor.this$0.aggressiveSelectionHelper);
        if (this$static.cachedSelection) {
          this$static.cachedSelection.isCollapsed || $logPlainText(logger_4.traceLogger, 'WARNING: Probable IME input on non-collapsed range not handled!!!');
          $logPlainText(logger_4.traceLogger, 'Notifying typing extractor for probable IME-caused mutation event');
          $notifyTypingExtractor_0(this$static.editorInteractor, this$static.cachedSelection.focus_0, false, false);
        }
      }
    }
    ($clinit_628() , LIES_ABOUT_CARET_AT_LINK_END_BOUNDARY) && $checkForWebkitEndOfLinkHack(this$static, event_0);
    $handleMutationEvent(this$static.subHandler.this$0.domMutationReverter, event_0);
    return false;
  }
   else if (FOCUS_EVENTS.contains_0(event_0.nativeEvent.type)) {
    return false;
  }
   else {
    $log_0(logger_4.traceLogger, 'Cancelling: ' + event_0.nativeEvent.type);
    return true;
  }
}

function $handleEventsManuallyOnNode(this$static, event_0, caret){
  if ($isCombo(event_0, 13, ($clinit_634() , NONE_0))) {
    $refreshEditorWithCaret(this$static, event_0);
    caret = $asPoint(event_0.caret);
    $checkpoint(this$static.editorInteractor, new FocusedContentRange_1(caret));
    $handleEnter(this$static.router, dynamicCast(caret.container, 192), event_0);
    $rebiasSelection(this$static.editorInteractor.this$0, ($clinit_1753() , FROM_LEFT));
    return true;
  }
   else if ($isCombo(event_0, 13, SHIFT)) {
    return true;
  }
  return false;
}

function $handleInputOrDeleteKeyEvent(this$static, event_0, keySignalType){
  var caret, isCollapsed, isDelete, isReplace, moveUnit, node;
  isCollapsed = (this$static.editorInteractor.this$0.content_0?(get_21() , null):null) != null && (this$static.editorInteractor.this$0.content_0?(get_21() , null):null).isCollapsed;
  isReplace = false;
  if (isCollapsed) {
    moveUnit = event_0.keySignalType == ($clinit_644() , DELETE_0)?($clinit_661() , $clinit_661() , INSTANCE_4).isMac?event_0.nativeEvent.altKey?($clinit_646() , WORD):(($clinit_648() , logic_0).commandIsCtrl?!!event_0.nativeEvent.ctrlKey:!!event_0.nativeEvent.metaKey)?($clinit_646() , LINE):($clinit_646() , CHARACTER):(($clinit_648() , logic_0).commandIsCtrl?!!event_0.nativeEvent.ctrlKey:!!event_0.nativeEvent.metaKey)?($clinit_646() , WORD):($clinit_646() , CHARACTER):($clinit_646() , CHARACTER);
    if (moveUnit != ($clinit_646() , CHARACTER)) {
      if ((event_0.keySignalType == DELETE_0?($clinit_661() , $clinit_661() , INSTANCE_4).isMac?event_0.nativeEvent.altKey?WORD:(($clinit_648() , logic_0).commandIsCtrl?!!event_0.nativeEvent.ctrlKey:!!event_0.nativeEvent.metaKey)?LINE:CHARACTER:(($clinit_648() , logic_0).commandIsCtrl?!!event_0.nativeEvent.ctrlKey:!!event_0.nativeEvent.metaKey)?WORD:CHARACTER:CHARACTER) == WORD) {
        if (event_0.cachedKeyCode == 8) {
          $refreshEditorWithCaret(this$static, event_0);
          caret = this$static.cachedSelection.focus_0;
          $deleteWordEndingAt(this$static.editorInteractor, caret);
        }
         else if (event_0.cachedKeyCode == 46) {
          $refreshEditorWithCaret(this$static, event_0);
          caret = this$static.cachedSelection.focus_0;
          $deleteWordStartingAt(this$static.editorInteractor, caret);
        }
      }
      return true;
    }
     else {
      caret = null;
    }
  }
   else {
    $refreshEditorWithCaret(this$static, event_0);
    isDelete = keySignalType == ($clinit_644() , DELETE_0);
    event_0.cachedKeyCode == 229?(caret = this$static.cachedSelection.focus_0):(caret = $deleteCachedSelectionRangeAndInvalidate(this$static, !isDelete));
    if (isDelete) {
      return true;
    }
     else {
      isReplace = true;
    }
  }
  if (keySignalType == ($clinit_644() , DELETE_0)) {
    $refreshEditorWithCaret(this$static, event_0);
    caret = this$static.cachedSelection.focus_0;
    node = dynamicCast(caret.container, 192);
    $checkpoint(this$static.editorInteractor, new FocusedContentRange_1(caret));
    switch (($clinit_587() , getKeyCombo_0(event_0.cachedKeyCode, !!event_0.nativeEvent.ctrlKey, !!event_0.nativeEvent.shiftKey, !!event_0.nativeEvent.altKey, !!event_0.nativeEvent.metaKey)).ordinal) {
      case 21:
      case 22:
        $rebiasSelection(this$static.editorInteractor.this$0, ($clinit_1753() , FROM_RIGHT));
        return $handleBackspace(this$static.router, node, event_0);
      case 24:
        if ($clinit_628() , HAS_OLD_SCHOOL_CLIPBOARD_SHORTCUTS) {
          throw new RuntimeException_1('Shift delete should have been caughtas an accelerator event!');
        }
         else {
          $rebiasSelection(this$static.editorInteractor.this$0, ($clinit_1753() , FROM_LEFT));
          return $handleDelete(this$static.router, node, event_0);
        }

      case 23:
        $rebiasSelection(this$static.editorInteractor.this$0, ($clinit_1753() , FROM_LEFT));
        return $handleDelete(this$static.router, node, event_0);
    }
  }
   else if ($handleEventsManuallyOnNode(this$static, event_0, caret)) {
    return true;
  }
  return $handleNormalTyping(this$static, event_0, caret, isReplace);
}

function $handleKeyEvent(this$static, event_0){
  var keySignalType;
  keySignalType = event_0.keySignalType;
  switch (this$static.state.ordinal) {
    case 0:
      if (isAcceleratorInner(event_0, ($clinit_661() , $clinit_661() , INSTANCE_4).isMac, ($clinit_628() , HAS_OLD_SCHOOL_CLIPBOARD_SHORTCUTS))) {
        $refreshEditorWithCaret(this$static, event_0);
        if ($handleCommand(this$static.subHandler, event_0) || $handleBlockLevelCommands(this$static.subHandler, event_0, $asOrderedRange(this$static.cachedSelection, ($clinit_1024() , true)))) {
          return true;
        }
        if (this$static.cachedSelection.isCollapsed) {
          if ($handleCollapsedKeyCombo(this$static.subHandler, event_0, this$static.cachedSelection.focus_0)) {
            return true;
          }
        }
         else {
          if ($handleRangeKeyCombo(this$static.subHandler, event_0, $asOrderedRange(this$static.cachedSelection, ($clinit_1024() , true)))) {
            return true;
          }
        }
        return $shouldCancelAcceleratorBrowserDefault(this$static, event_0);
      }

      switch (keySignalType.ordinal) {
        case 0:
        case 2:
          return $handleInputOrDeleteKeyEvent(this$static, event_0, keySignalType);
        case 1:
          return $handleNavigationKeyEvents(this$static, event_0);
        case 3:
          return false;
      }

      throw new RuntimeException_1('Unhandled signal type');
    case 1:
      return false;
    default:throw new RuntimeException_1('Unhandled state');
  }
}

function $handleNavigationKeyEvents(this$static, event_0){
  var node;
  $checkpoint(this$static.editorInteractor, null);
  this$static.editorInteractor.this$0.caretStyles.annotations.clear();
  node = dynamicCast(this$static.cachedSelection.focus_0.container, 192);
  $log_0(logger_4.traceLogger, 'Navigation event');
  if (event_0.cachedKeyCode == 37) {
    $handleLeft(this$static.router, node, event_0);
    $rebiasSelection(this$static.editorInteractor.this$0, ($clinit_1753() , FROM_RIGHT));
    return !event_0.shouldAllowDefault;
  }
   else if (event_0.cachedKeyCode == 39) {
    $handleRight(this$static.router, node, event_0);
    $rebiasSelection(this$static.editorInteractor.this$0, ($clinit_1753() , FROM_LEFT));
    return !event_0.shouldAllowDefault;
  }
   else {
    $rebiasSelection(this$static.editorInteractor.this$0, ($clinit_1753() , NEUTRAL_0));
  }
  return false;
}

function $handleNormalTyping(this$static, event_0, caret, isReplace){
  var c, useTypingExtractor;
  useTypingExtractor = event_0.cachedKeyCode == 229;
  if (useTypingExtractor) {
    if ($isTyping(this$static.editorInteractor.this$0)) {
      $log_0(logger_4.traceLogger, 'Not notifying typing extractor, already notified');
    }
     else {
      $log_0(logger_4.traceLogger, 'Notifying typing extractor');
      return $notifyTypingExtractor_0(this$static.editorInteractor, caret, !caret, isReplace);
    }
    return false;
  }
   else {
    c = event_0.cachedKeyCode & 65535;
    $refreshEditorWithCaret(this$static, event_0);
    caret = this$static.cachedSelection.focus_0;
    caret = $insertText(this$static.editorInteractor.this$0, caret, String.fromCharCode(c), isReplace);
    caret = $normalizePoint(this$static.editorInteractor, caret);
    this$static.cachedSelection = null;
    $setCaret_0(this$static.editorInteractor.this$0.aggressiveSelectionHelper, caret);
    $rebiasSelection(this$static.editorInteractor.this$0, ($clinit_1753() , FROM_LEFT));
    return true;
  }
}

function $isAllowableCombo(this$static, sEvent){
  $checkBlackWhiteListConsistency(sEvent);
  if ($isWhiteListedCombo(sEvent)) {
    return true;
  }
  if (this$static.useWhiteListing) {
    return false;
  }
   else {
    $shouldLog_0(logger_4.traceLogger) && $log_2(logger_4.traceLogger, 'not in whitelist: ', sEvent);
    return !$isBlackListedCombo(sEvent);
  }
}

function $isAlternateClipboardCombo(signal){
  switch (($clinit_587() , getKeyCombo_0(signal.cachedKeyCode, !!signal.nativeEvent.ctrlKey, !!signal.nativeEvent.shiftKey, !!signal.nativeEvent.altKey, !!signal.nativeEvent.metaKey)).ordinal) {
    case 24:
    case 27:
    case 26:
      return true;
    default:return false;
  }
}

function $isBlackListedCombo(event_0){
  var keyCombo;
  keyCombo = ($clinit_587() , getKeyCombo_0(event_0.cachedKeyCode, !!event_0.nativeEvent.ctrlKey, !!event_0.nativeEvent.shiftKey, !!event_0.nativeEvent.altKey, !!event_0.nativeEvent.metaKey));
  if (keyCombo.ordinal == 44) {
    return true;
  }
  if (($clinit_661() , $clinit_661() , INSTANCE_4).isMac) {
    switch (keyCombo.ordinal) {
      case 29:
      case 30:
      case 33:
        return true;
    }
    if (keyCombo.ordinal == 59) {
      return true;
    }
  }
  return false;
}

function $isWhiteListedCombo(signal){
  var keyCombo;
  keyCombo = ($clinit_587() , getKeyCombo_0(signal.cachedKeyCode, !!signal.nativeEvent.ctrlKey, !!signal.nativeEvent.shiftKey, !!signal.nativeEvent.altKey, !!signal.nativeEvent.metaKey));
  switch (keyCombo.ordinal) {
    case 41:
    case 42:
    case 43:
    case 61:
    case 62:
    case 67:
    case 46:
    case 47:
    case 48:
    case 49:
    case 50:
    case 51:
    case 55:
    case 56:
    case 57:
    case 58:
    case 60:
    case 65:
    case 66:
      return true;
  }
  if ($clinit_628() , HAS_OLD_SCHOOL_CLIPBOARD_SHORTCUTS) {
    if ($isAlternateClipboardCombo(signal)) {
      return true;
    }
  }
  return false;
}

function $refreshEditorWithCaret(this$static, event_0){
  $flushSynchronous(this$static.editorInteractor.this$0);
  this$static.cachedSelection = $getSelectionPoints(this$static.editorInteractor.this$0.aggressiveSelectionHelper);
  if (this$static.cachedSelection) {
    event_0.caret = fromPoint(this$static.cachedSelection.focus_0);
  }
   else {
    throw new EditorEventHandler$SelectionLostException_0('Null selection after force flushing editor, event = ' + event_0.nativeEvent.type, this$static.hadInitialSelection);
  }
}

function $shouldCancelAcceleratorBrowserDefault(this$static, acceleratorEvent){
  if ($check(($clinit_634() , acceleratorEvent))) {
    return acceleratorEvent.cachedKeyCode == 45 || cancelUnsafeKeyEvents;
  }
  if ($isAllowableCombo(this$static, acceleratorEvent)) {
    $log_0(logger_4.traceLogger, 'Allowing event');
    return false;
  }
  $shouldLog_0(logger_4.traceLogger) && $log_1(logger_4.traceLogger, initValues(_3Ljava_lang_Object_2_classLit, {9:1, 66:1}, 0, ['unsafe combo: ', acceleratorEvent.nativeEvent.type, valueOf_12(acceleratorEvent.cachedKeyCode)]));
  return cancelUnsafeKeyEvents;
}

function EditorEventHandler_0(editorInteractor, subHandler, router, useWhiteListFlag, useWebkitCompositionFlag){
  $clinit_956();
  EditorEventHandler_1.call(this, new SchedulerTimerService_1((!instance_7 && (instance_7 = new BrowserBackedScheduler_0 , setDefaultTimerService() , undefined) , instance_7), ($clinit_1175() , CRITICAL)), editorInteractor, subHandler, router, useWhiteListFlag, ($clinit_628() , SUPPORTS_COMPOSITION_EVENTS) && useWebkitCompositionFlag);
}

function EditorEventHandler_1(criticalTimerService, interactor, subHandler, router, useWhiteListing, useCompositionEvents){
  this.compositionListener = new EditorEventHandler$1_0(this);
  this.weirdComposition = ($clinit_628() , true);
  this.state = ($clinit_959() , NORMAL_0);
  this.editorInteractor = interactor;
  this.subHandler = subHandler;
  this.router = router;
  this.useWhiteListing = useWhiteListing;
  this.compositionHandler = new CompositionEventHandler_0(criticalTimerService, this.compositionListener, logger_4, this.weirdComposition);
  this.useCompositionEvents = useCompositionEvents;
}

function isAcceleratorInner(event_0, isMac, quirksHasOldSchoolClipboardShortcuts){
  var maybeAltKey;
  switch (event_0.keySignalType.ordinal) {
    case 0:
      maybeAltKey = !isMac && !!event_0.nativeEvent.altKey;
      return !!event_0.nativeEvent.ctrlKey || !!event_0.nativeEvent.metaKey || event_0.cachedKeyCode == 9 || maybeAltKey;
    case 2:
      return quirksHasOldSchoolClipboardShortcuts && event_0.cachedKeyCode == 46 && $check_0(($clinit_634() , event_0));
    case 1:
      return false;
    case 3:
      return true;
  }
  throw new RuntimeException_1('Unknown KeySignal type');
}

function EditorEventHandler(){
}

_ = EditorEventHandler_0.prototype = EditorEventHandler.prototype = new Object_0;
_.getClass$ = function getClass_612(){
  return Lorg_waveprotocol_wave_client_editor_event_EditorEventHandler_2_classLit;
}
;
_.castableTypeMap$ = {};
_.cachedSelection = null;
_.compositionHandler = null;
_.editorInteractor = null;
_.hadInitialSelection = false;
_.router = null;
_.subHandler = null;
_.useCompositionEvents = false;
_.useWhiteListing = false;
var cancelUnsafeKeyEvents = true, logger_4, selectionLogCullRotation = 0;
function $compositionEnd_2(this$static){
  $clinit_741();
  ++ignoreMutations;
  try {
    $compositionEnd_1(this$static.this$0);
  }
   finally {
    --ignoreMutations;
  }
}

function EditorEventHandler$1_0(this$0){
  this.this$0 = this$0;
}

function EditorEventHandler$1(){
}

_ = EditorEventHandler$1_0.prototype = EditorEventHandler$1.prototype = new Object_0;
_.getClass$ = function getClass_613(){
  return Lorg_waveprotocol_wave_client_editor_event_EditorEventHandler$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function EditorEventHandler$SelectionLostException_0(message, lost){
  this.fillInStackTrace();
  this.detailMessage = message + '. Selection was ' + (lost?'':'not ') + 'lost.';
  this.lostSelection = lost;
}

function EditorEventHandler$SelectionLostException(){
}

_ = EditorEventHandler$SelectionLostException_0.prototype = EditorEventHandler$SelectionLostException.prototype = new Exception;
_.getClass$ = function getClass_614(){
  return Lorg_waveprotocol_wave_client_editor_event_EditorEventHandler$SelectionLostException_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 38:1, 178:1, 228:1};
_.lostSelection = false;
function $clinit_959(){
  $clinit_959 = nullMethod;
  NORMAL_0 = new EditorEventHandler$State_0('NORMAL', 0);
  COMPOSITION = new EditorEventHandler$State_0('COMPOSITION', 1);
  $VALUES_28 = initValues(_3Lorg_waveprotocol_wave_client_editor_event_EditorEventHandler$State_2_classLit, {9:1, 66:1, 166:1}, 103, [NORMAL_0, COMPOSITION]);
}

function EditorEventHandler$State_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function valueOf_35(name_0){
  $clinit_959();
  return valueOf_0(($clinit_960() , $MAP_28), name_0);
}

function values_29(){
  $clinit_959();
  return $VALUES_28;
}

function EditorEventHandler$State(){
}

_ = EditorEventHandler$State_0.prototype = EditorEventHandler$State.prototype = new Enum;
_.getClass$ = function getClass_615(){
  return Lorg_waveprotocol_wave_client_editor_event_EditorEventHandler$State_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 103:1};
var $VALUES_28, COMPOSITION, NORMAL_0;
function $clinit_960(){
  $clinit_960 = nullMethod;
  $MAP_28 = createValueOfMap(($clinit_959() , $VALUES_28));
}

var $MAP_28;
function $clinit_961(){
  $clinit_961 = nullMethod;
  $clinit_648();
  FACTORY = new EditorEventImpl$1_0;
}

function EditorEventImpl_0(){
  $clinit_961();
}

function EditorEventImpl(){
}

_ = EditorEventImpl_0.prototype = EditorEventImpl.prototype = new SignalEventImpl;
_.getClass$ = function getClass_616(){
  return Lorg_waveprotocol_wave_client_editor_event_EditorEventImpl_2_classLit;
}
;
_.castableTypeMap$ = {182:1, 195:1};
_.caret = null;
_.shouldAllowDefault = false;
var FACTORY;
function EditorEventImpl$1_0(){
}

function EditorEventImpl$1(){
}

_ = EditorEventImpl$1_0.prototype = EditorEventImpl$1.prototype = new Object_0;
_.create_2 = function create_22(){
  return new EditorEventImpl_0;
}
;
_.getClass$ = function getClass_617(){
  return Lorg_waveprotocol_wave_client_editor_event_EditorEventImpl$1_2_classLit;
}
;
_.castableTypeMap$ = {};
function $addEntry_0(this$static, entry){
  $add_9(this$static.entries, entry);
  $scheduleRevert(this$static.listener);
}

function $handleMutationEvent(this$static, event_0){
  var ignorableWhenEmpty, target;
  if ($equals_3(event_0.nativeEvent.type, 'DOMNodeRemoved')) {
    target = event_0.nativeEvent.target;
    ignorableWhenEmpty = target.nodeType == 3 || ($clinit_1012() , !(!!target && (target[BACKREF_NAME] || null) != null));
    if (ignorableWhenEmpty && this$static.entries.size_0 == 0)
    ;
    else {
      $log_0(($clinit_741() , logger_1).traceLogger, 'REVERT REMOVAL: ' + (target.nodeType == 3?target.data:target.tagName));
      $addEntry_0(this$static, new DomMutationReverter$RemovalEntry_0(target, $getParentElement(target), target.nextSibling, ignorableWhenEmpty));
    }
  }
}

function DomMutationReverter_0(listener){
  this.entries = new ArrayList_0;
  this.listener = listener;
}

function DomMutationReverter(){
}

_ = DomMutationReverter_0.prototype = DomMutationReverter.prototype = new Object_0;
_.getClass$ = function getClass_618(){
  return Lorg_waveprotocol_wave_client_editor_extract_DomMutationReverter_2_classLit;
}
;
_.castableTypeMap$ = {};
_.listener = null;
function DomMutationReverter$RemovalEntry_0(removedNode, oldParent, oldNodeAfter, removeAfter){
  if (!oldParent) {
    throw new IllegalArgumentException_1('Old parent cannot be null');
  }
  this.removeAfter = removeAfter;
  this.removedNode = removedNode;
  this.oldParent = oldParent;
  this.oldNodeAfter = oldNodeAfter;
}

function DomMutationReverter$RemovalEntry(){
}

_ = DomMutationReverter$RemovalEntry_0.prototype = DomMutationReverter$RemovalEntry.prototype = new Object_0;
_.getClass$ = function getClass_619(){
  return Lorg_waveprotocol_wave_client_editor_extract_DomMutationReverter$RemovalEntry_2_classLit;
}
;
_.castableTypeMap$ = {229:1};
_.oldNodeAfter = null;
_.oldParent = null;
_.removeAfter = false;
_.removedNode = null;
function $activate_0(this$static, cxt, location_0){
  var container, nodeAfter, point;
  $clearWrapper(this$static, cxt.this$0.fullContentView);
  point = ensureNodeBoundary(transparentSlice(location_0, cxt), cxt.this$0.fullContentView, cxt.this$0.indexedDoc);
  container = dynamicCast(point.container, 192).asElement();
  nodeAfter = dynamicCast($getNodeAfter(point), 192);
  !!nodeAfter && (container = nodeAfter.parent_0);
  this$static.wrapper = $transparentCreate_0(cxt.this$0.fullContentView, 'l:ime', ($clinit_467() , $clinit_467() , EMPTY_MAP), container, nodeAfter);
  this$static.wrapper.containerNodelet.appendChild(this$static.imeContainer);
  $clinit_1024();
  cache_1 = null;
  cache_1 = null;
}

function $clearContainer(this$static){
  this$static.imeInput.innerHTML = '';
  $appendSpacer(($clinit_919() , this$static.imeInput));
  new Point$El_0(this$static.imeInput, this$static.imeInput.firstChild);
}

function $clearWrapper(this$static, doc){
  !!this$static.wrapper && !!this$static.wrapper.parent_0 && $transparentDeepRemove(doc, this$static.wrapper);
  this$static.wrapper = null;
  $clearContainer(this$static);
}

function $deactivate(this$static, doc){
  var ret;
  ret = new Point$El_0(dynamicCast(doc.inner_0.getParentElement(this$static.wrapper), 192), dynamicCast(doc.inner_0.getNextSibling(this$static.wrapper), 192));
  $clearWrapper(this$static, doc);
  return ret;
}

function $getContent_0(this$static){
  return this$static.wrapper?this$static.imeContainer.textContent:null;
}

function ImeExtractor_0(){
  this.imeContainer = $doc.createElement('span');
  $clinit_1012();
  this.imeContainer[TRANSPARENCY] = ($clinit_2090() , DEEP);
  this.imeContainer[MAY_CONTAIN_SELECTION] = true;
  $clinit_628();
  this.imeContainer.style['display'] = ($clinit_63() , 'inline-block');
  setContentEditable(this.imeContainer, false, false);
  this.imeInput = $doc.createElement('span');
  this.imeInput.style['display'] = 'inline-block';
  this.imeInput.style['outline'] = '0';
  setContentEditable(this.imeInput, true, false);
  this.imeInput[TRANSPARENCY] = DEEP;
  this.imeInput[MAY_CONTAIN_SELECTION] = true;
  this.imeContainer.appendChild(this.imeInput);
  $clearContainer(this);
}

function ImeExtractor(){
}

_ = ImeExtractor_0.prototype = ImeExtractor.prototype = new Object_0;
_.getClass$ = function getClass_620(){
  return Lorg_waveprotocol_wave_client_editor_extract_ImeExtractor_2_classLit;
}
;
_.castableTypeMap$ = {};
_.imeInput = null;
_.wrapper = null;
function $extractNormalizedAnnotation(this$static, normalizedStart, normalizedEnd){
  var end, interested, start;
  start = $getLocation_0(this$static.doc, normalizedStart);
  end = $getLocation_0(this$static.doc, normalizedEnd);
  interested = $filterContentAnnotations(this$static, $knownKeys(this$static.doc.doc));
  return trimAnnotations($rangedAnnotations_1(this$static.doc.doc, start, end, interested), start, end - start);
}

function $filterContentAnnotations(this$static, known){
  var interested;
  interested = ($clinit_2278() , defaultCollectionFactory.createStringSet());
  known.each_3(new PasteAnnotationLogic$4_0(this$static, interested));
  return interested;
}

function $interpretReplace(this$static, key, type, builder, inside, outside, current, changeCollector){
  var logic;
  logic = $getClosestBehaviour(this$static.annotationLogic, key);
  if (logic) {
    switch (logic.replace_0(inside, outside, type).ordinal) {
      case 0:
        return $safeSet(builder, key, inside.get_4(key), current.get_4(key), changeCollector);
      case 1:
        return $safeSet(builder, key, outside.get_4(key), current.get_4(key), changeCollector);
      case 2:
        return $safeSet(builder, key, null, current.get_4(key), changeCollector);
    }
  }
  return false;
}

function $safeSet(builder, key, newValue, oldValue, changeCollector){
  var newString, oldString;
  newString = newValue == null?null:toString__devirtual$(newValue);
  oldString = oldValue == null?null:toString__devirtual$(oldValue);
  if (newString == null?oldString != null:!$equals_3(newString, oldString)) {
    $add_9(builder.mutationList, new Nindo$StartAnnotation_0(key, newString));
    changeCollector.put_3(key, newString);
    return true;
  }
   else {
    return false;
  }
}

function $stripKeys(this$static, annotationSet, position, cursorBias, type, builder){
  var after, before, changedAnnotations, inside, outside;
  before = ($clinit_2278() , defaultCollectionFactory.createStringMap());
  after = defaultCollectionFactory.createStringMap();
  $knownKeys(annotationSet.doc).each_3(new PasteAnnotationLogic$1_0(position, annotationSet, before, after));
  inside = cursorBias == ($clinit_1749() , RIGHT_4)?after:before;
  outside = cursorBias == RIGHT_4?before:after;
  changedAnnotations = defaultCollectionFactory.createStringMap();
  $knownKeys(annotationSet.doc).each_3(new PasteAnnotationLogic$2_0(this$static, type, builder, inside, outside, before, changedAnnotations));
  return changedAnnotations;
}

function $unstripKeys(builder, stripKeys, ignoreSet){
  stripKeys.each_3(new PasteAnnotationLogic$3_0(ignoreSet, builder));
}

function PasteAnnotationLogic_0(doc, annotationLogic){
  this.doc = doc;
  this.annotationLogic = annotationLogic;
}

function trimAnnotations(rangedAnnotations, offset, length_0){
  var ann, ann$iterator, nEnd, nStart, ret, iterator;
  ret = new ArrayList_0;
  for (ann$iterator = (iterator = rangedAnnotations.val$iterable.iterator_0() , new IndexedDocumentImpl$9$1_0(iterator)); ann$iterator.val$iterator.hasNext();) {
    ann = $next_16(ann$iterator);
    nStart = max_1(0, ann.start - offset);
    nEnd = min_1(ann.end - offset, length_0);
    $add_9(ret, new RangedAnnotationImpl_0(ann.key, dynamicCast(ann.value_0, 1), nStart, nEnd));
  }
  return ret;
}

function PasteAnnotationLogic(){
}

_ = PasteAnnotationLogic_0.prototype = PasteAnnotationLogic.prototype = new Object_0;
_.getClass$ = function getClass_625(){
  return Lorg_waveprotocol_wave_client_editor_extract_PasteAnnotationLogic_2_classLit;
}
;
_.castableTypeMap$ = {};
_.annotationLogic = null;
_.doc = null;
function PasteAnnotationLogic$1_0(val$position, val$annotationSet, val$before, val$after){
  this.val$position = val$position;
  this.val$annotationSet = val$annotationSet;
  this.val$before = val$before;
  this.val$after = val$after;
}

function PasteAnnotationLogic$1(){
}

_ = PasteAnnotationLogic$1_0.prototype = PasteAnnotationLogic$1.prototype = new Object_0;
_.apply_4 = function apply_38(key){
  var afterV, beforeV;
  if (this.val$position > 0) {
    beforeV = $getAnnotation_2(this.val$annotationSet.doc, this.val$position - 1, key);
    beforeV != null && this.val$before.put_3(key, beforeV);
  }
  if (this.val$position < $size_15(this.val$annotationSet.doc)) {
    afterV = $getAnnotation_2(this.val$annotationSet.doc, this.val$position, key);
    afterV != null && this.val$after.put_3(key, afterV);
  }
}
;
_.getClass$ = function getClass_626(){
  return Lorg_waveprotocol_wave_client_editor_extract_PasteAnnotationLogic$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.val$after = null;
_.val$annotationSet = null;
_.val$before = null;
_.val$position = 0;
function PasteAnnotationLogic$2_0(this$0, val$type, val$builder, val$inside, val$outside, val$before, val$changedAnnotations){
  this.this$0 = this$0;
  this.val$type = val$type;
  this.val$builder = val$builder;
  this.val$inside = val$inside;
  this.val$outside = val$outside;
  this.val$before = val$before;
  this.val$changedAnnotations = val$changedAnnotations;
}

function PasteAnnotationLogic$2(){
}

_ = PasteAnnotationLogic$2_0.prototype = PasteAnnotationLogic$2.prototype = new Object_0;
_.apply_4 = function apply_39(key){
  $interpretReplace(this.this$0, key, this.val$type, this.val$builder, this.val$inside, this.val$outside, this.val$before, this.val$changedAnnotations);
}
;
_.getClass$ = function getClass_627(){
  return Lorg_waveprotocol_wave_client_editor_extract_PasteAnnotationLogic$2_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
_.val$before = null;
_.val$builder = null;
_.val$changedAnnotations = null;
_.val$inside = null;
_.val$outside = null;
_.val$type = null;
function PasteAnnotationLogic$3_0(val$ignoreSet, val$builder){
  this.val$ignoreSet = val$ignoreSet;
  this.val$builder = val$builder;
}

function PasteAnnotationLogic$3(){
}

_ = PasteAnnotationLogic$3_0.prototype = PasteAnnotationLogic$3.prototype = new Object_0;
_.apply_4 = function apply_40(element){
  this.val$ignoreSet.contains_0(element) || ($add_9(this.val$builder.mutationList, new Nindo$EndAnnotation_0(element)) , undefined);
}
;
_.getClass$ = function getClass_628(){
  return Lorg_waveprotocol_wave_client_editor_extract_PasteAnnotationLogic$3_2_classLit;
}
;
_.castableTypeMap$ = {};
_.val$builder = null;
_.val$ignoreSet = null;
function PasteAnnotationLogic$4_0(this$0, val$interested){
  this.this$0 = this$0;
  this.val$interested = val$interested;
}

function PasteAnnotationLogic$4(){
}

_ = PasteAnnotationLogic$4_0.prototype = PasteAnnotationLogic$4.prototype = new Object_0;
_.apply_4 = function apply_41(key){
  var behaviour;
  behaviour = $getClosestBehaviour(this.this$0.annotationLogic, key);
  !!behaviour && behaviour.getAnnotationFamily() == ($clinit_1747() , CONTENT_0) && this.val$interested.add_3(key);
}
;
_.getClass$ = function getClass_629(){
  return Lorg_waveprotocol_wave_client_editor_extract_PasteAnnotationLogic$4_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
_.val$interested = null;
function $clinit_979(){
  $clinit_979 = nullMethod;
  LOG_1 = new DomLogger_0('paste');
  clipboard = ($clinit_570() , $clinit_570() , INSTANCE_2);
  pasteBuffer_0 = clipboard.pasteBuffer;
  !INSTANCE_10 && (INSTANCE_10 = new PasteFormatRenderer_0);
}

function $at_0(pos){
  var builder;
  builder = new Nindo$Builder_0;
  checkState_2(!builder.hasBeenUsed, 'Cannot reuse a builder');
  builder.hasBeenUsed = true;
  $add_9(builder.mutationList, new Nindo$Skip_0(pos));
  return builder;
}

function $extract(this$static, srcContainer, previousSelection, cursorBias){
  var $e0, affectedKeys, ann, ann$iterator, annotations, builder, caret, createdFromXmlString, cursorLocation, deserialize, destDoc, destOperationSequencer, end, locationAfter, mapper, modified, mutationBuilder, nindo, pos, range, start, startTime, timeTaken, tokenizer, waveXml, annotations_0;
  destDoc = this$static.mutableDocument;
  destOperationSequencer = this$static.operationSequencer;
  mapper = this$static.mutableDocument;
  start = getFilteredPoint(this$static.persistentContent, previousSelection.first);
  end = getFilteredPoint(this$static.persistentContent, previousSelection.second);
  if (!previousSelection.isCollapsed) {
    range = $deleteRange_0(destDoc, start, end);
    end = range.second;
  }
  pos = (checkNotNull_1(end, 'getLocation: Null point') , mapper.doc.getLocation_0(end));
  waveXml = null;
  annotations = null;
  if (this$static.useSemanticCopyPaste) {
    waveXml = $maybeGetWaveXml(srcContainer);
    annotations = (annotations_0 = $maybeGetAttributeFromContainer(srcContainer, 'data-wave-annotations') , annotations_0 != null && $log_0(LOG.traceLogger, 'found serialized annotations: ' + annotations_0) , annotations_0);
  }
  cursorBias = ($clinit_1749() , LEFT_4);
  if (this$static.useSemanticCopyPaste && waveXml != null) {
    if (waveXml.length) {
      $clinit_736();
      builder = $at_0(pos);
      createdFromXmlString = createFromXmlStringWithContraints(waveXml, ($clinit_1980() , BLIP_TEXT));
      modified = $stripKeys(this$static.annotationLogic, destDoc, pos, cursorBias, ($clinit_1751() , RICH_TEXT), builder);
      startTime = (new Date).getTime();
      appendXmlToBuilder(createdFromXmlString, builder);
      timeTaken = (new Date).getTime() - startTime;
      $log_0(LOG_1.traceLogger, 'time taken: ' + timeTaken);
      $unstripKeys(builder, modified.keySet_1(), ($clinit_2278() , defaultCollectionFactory.createStringSet()));
      nindo = new Nindo_0(builder.mutationList);
      try {
        $maybeThrowOperationExceptionFor_0(this$static.validator, nindo);
        locationAfter = (checkNotNull_1(end, 'getLocation: Null point') , destDoc.doc.getLocation_0(end)) + createdFromXmlString.length_0;
        $push_2(destOperationSequencer.responsibility.sequenceType, ($clinit_764() , DIRECT));
        $consumeAndReturnInvertible_0(destOperationSequencer.sequencer.sink, nindo);
        $endDirectSequence(destOperationSequencer.responsibility);
        $setCaret(this$static.aggressiveSelectionHelper, locationAfter);
        $log_0(LOG_1.traceLogger, 'annotations: ' + annotations);
        if (annotations != null && !!annotations.length) {
          deserialize = deserialize_0(annotations);
          for (ann$iterator = new AbstractList$IteratorImpl_0(deserialize); ann$iterator.i < ann$iterator.this$0_0.size_1();) {
            ann = dynamicCast($next_4(ann$iterator), 176);
            $setAnnotation(destDoc, pos + ann.start, pos + ann.end, ann.key, dynamicCast(ann.value_0, 1));
            $log_0(LOG_1.traceLogger, 'pos: ' + pos + 'start: ' + (pos + ann.start) + ' end: ' + (pos + ann.end) + ' key: ' + ann.key + ' value: ' + dynamicCast(ann.value_0, 1));
          }
        }
      }
       catch ($e0) {
        $e0 = caught_0($e0);
        if (instanceOf($e0, 184)) {
          $log_0(LOG_1.errorLogger, 'Semantic paste failed');
          $setCaret_0(this$static.aggressiveSelectionHelper, end);
        }
         else 
          throw $e0;
      }
    }
  }
   else {
    $clinit_736();
    tokenizer = new RichTextTokenizerImpl_0(new HtmlViewImpl_0(srcContainer));
    builder = $at_0(pos);
    modified = $stripKeys(this$static.annotationLogic, destDoc, pos, cursorBias, ($clinit_1751() , RICH_TEXT), builder);
    mutationBuilder = new RichTextMutationBuilder_0(modified);
    affectedKeys = $applyMutations(mutationBuilder, tokenizer, builder, destDoc, dynamicCast(end.container, 192));
    $unstripKeys(builder, modified.keySet_1(), affectedKeys);
    nindo = new Nindo_0(builder.mutationList);
    try {
      $maybeThrowOperationExceptionFor_0(this$static.validator, nindo);
      $push_2(destOperationSequencer.responsibility.sequenceType, ($clinit_764() , DIRECT));
      $consumeAndReturnInvertible_0(destOperationSequencer.sequencer.sink, nindo);
      $endDirectSequence(destOperationSequencer.responsibility);
      cursorLocation = pos + mutationBuilder.lastGoodCursorOffset;
      caret = $locate_0(mapper.doc, cursorLocation);
      $setCaret_0(this$static.aggressiveSelectionHelper, caret);
    }
     catch ($e0) {
      $e0 = caught_0($e0);
      if (instanceOf($e0, 184)) {
        $log_0(LOG_1.errorLogger, 'Paste failed');
        $setCaret_0(this$static.aggressiveSelectionHelper, end);
      }
       else 
        throw $e0;
    }
  }
  srcContainer.innerHTML = '';
  focus_16(dynamicCast(destDoc.doc.substrate.getDocumentElement(), 191).containerNodelet);
}

function $handleCopyOrCutEvent(this$static, isCut){
  var contentSelection, selection, selection_0;
  contentSelection = (selection_0 = $getSelectionPoints(this$static.aggressiveSelectionHelper) , !selection_0?null:$asOrderedRange(selection_0, ($clinit_1024() , true)));
  if (!contentSelection) {
    return true;
  }
  selection = $getSelectionRange(this$static.aggressiveSelectionHelper);
  $performCopyOrCut(this$static, contentSelection, isCut);
  this$static.busy = true;
  $addCommand(new PasteExtractor$2_0(this$static, isCut, selection));
  return false;
}

function $handlePasteEvent(this$static, cursorBias){
  var previousSelection, selection;
  previousSelection = (selection = $getSelectionPoints(this$static.aggressiveSelectionHelper) , !selection?null:$asOrderedRange(selection, ($clinit_1024() , true)));
  if (!previousSelection) {
    return true;
  }
  this$static.busy = true;
  $prepareForPaste(pasteBuffer_0);
  $addCommand(new PasteExtractor$1_0(this$static, previousSelection, cursorBias));
  return false;
}

function $performCopyOrCut(this$static, contentSelection, isCut){
  var $e0, commonAncestor, debugString, e, first, fragment, newRange, normalizedAnnotations, normalizedEnd, normalizedStart, second, selectionMatcher, xmlInRange;
  if (contentSelection.isCollapsed) {
    return;
  }
  first = contentSelection.first;
  second = contentSelection.second;
  selectionMatcher = new SelectionMatcher_0(first, second);
  commonAncestor = dynamicCast(nearestCommonAncestor_0(this$static.renderedContent, dynamicCast(first.container, 192), dynamicCast(second.container, 192)), 192);
  fragment = $renderTree(this$static.renderedContent, commonAncestor, selectionMatcher);
  checkNotNull_1(selectionMatcher.htmlStart?selectionMatcher.htmlStart.getPoint():null, 'html start is null, first: ' + first);
  checkNotNull_1(selectionMatcher.htmlEnd?selectionMatcher.htmlEnd.getPoint():null, 'html end is null second: ' + second);
  newRange = new PointRange_1(selectionMatcher.htmlStart?selectionMatcher.htmlStart.getPoint():null, selectionMatcher.htmlEnd?selectionMatcher.htmlEnd.getPoint():null);
  normalizedStart = getFilteredPoint(this$static.persistentContent, contentSelection.first);
  normalizedEnd = getFilteredPoint(this$static.persistentContent, contentSelection.second);
  if (this$static.useSemanticCopyPaste) {
    debugString = 'Start: ' + contentSelection.first + ' End: ' + contentSelection.second + ' docDebug: ' + $toDebugString(this$static.mutableDocument.doc);
    try {
      xmlInRange = $renderRange(this$static.subtreeRenderer, normalizedStart, normalizedEnd);
      normalizedAnnotations = $extractNormalizedAnnotation(this$static.annotationLogic, normalizedStart, normalizedEnd);
    }
     catch ($e0) {
      $e0 = caught_0($e0);
      if (instanceOf($e0, 178)) {
        e = $e0;
        $logPlainText(LOG_1.errorLogger, debugString);
        throw new RuntimeException_3(e);
      }
       else 
        throw $e0;
    }
  }
   else {
    xmlInRange = null;
    normalizedAnnotations = null;
  }
  isCut && $deleteRange_0(this$static.mutableDocument, normalizedStart, normalizedEnd).first;
  $fillBufferAndSetSelection(clipboard, fragment, newRange, xmlInRange, normalizedAnnotations);
}

function PasteExtractor_0(aggressiveSelectionHelper, mutableDocument, renderedContent, persistentContent, annotationRegistry, operationSequencer, validator, useSemanticCopyPaste){
  $clinit_979();
  this.aggressiveSelectionHelper = aggressiveSelectionHelper;
  this.mutableDocument = mutableDocument;
  this.operationSequencer = operationSequencer;
  this.renderedContent = renderedContent;
  this.persistentContent = persistentContent;
  this.validator = validator;
  this.subtreeRenderer = new SubTreeXmlRenderer_0(mutableDocument);
  this.annotationLogic = new PasteAnnotationLogic_0(mutableDocument, annotationRegistry);
  this.useSemanticCopyPaste = useSemanticCopyPaste;
}

function PasteExtractor(){
}

_ = PasteExtractor_0.prototype = PasteExtractor.prototype = new Object_0;
_.getClass$ = function getClass_630(){
  return Lorg_waveprotocol_wave_client_editor_extract_PasteExtractor_2_classLit;
}
;
_.castableTypeMap$ = {};
_.aggressiveSelectionHelper = null;
_.annotationLogic = null;
_.busy = false;
_.mutableDocument = null;
_.operationSequencer = null;
_.persistentContent = null;
_.renderedContent = null;
_.subtreeRenderer = null;
_.useSemanticCopyPaste = false;
_.validator = null;
var LOG_1, clipboard, pasteBuffer_0;
function PasteExtractor$1_0(this$0, val$previousSelection, val$cursorBias){
  this.this$0 = this$0;
  this.val$previousSelection = val$previousSelection;
  this.val$cursorBias = val$cursorBias;
}

function PasteExtractor$1(){
}

_ = PasteExtractor$1_0.prototype = PasteExtractor$1.prototype = new Object_0;
_.execute_0 = function execute_31(){
  $extract(this.this$0, ($clinit_979() , pasteBuffer_0).element, this.val$previousSelection, this.val$cursorBias);
  this.this$0.busy = false;
}
;
_.getClass$ = function getClass_631(){
  return Lorg_waveprotocol_wave_client_editor_extract_PasteExtractor$1_2_classLit;
}
;
_.castableTypeMap$ = {41:1, 51:1};
_.this$0 = null;
_.val$cursorBias = null;
_.val$previousSelection = null;
function PasteExtractor$2_0(this$0, val$isCut, val$selection){
  this.this$0 = this$0;
  this.val$isCut = val$isCut;
  this.val$selection = val$selection;
}

function PasteExtractor$2(){
}

_ = PasteExtractor$2_0.prototype = PasteExtractor$2.prototype = new Object_0;
_.execute_0 = function execute_32(){
  this.val$isCut?$setCaret(this.this$0.aggressiveSelectionHelper, $asRange(this.val$selection).start):$setSelectionRange_1(this.this$0.aggressiveSelectionHelper, this.val$selection);
  this.this$0.busy = false;
}
;
_.getClass$ = function getClass_632(){
  return Lorg_waveprotocol_wave_client_editor_extract_PasteExtractor$2_2_classLit;
}
;
_.castableTypeMap$ = {41:1, 51:1};
_.this$0 = null;
_.val$isCut = false;
_.val$selection = null;
function $renderTree(view, node, selectionMatcher){
  var holder;
  holder = $doc.createElement('div');
  renderSequence_0(view, node, node.next, holder, selectionMatcher);
  return holder;
}

function PasteFormatRenderer_0(){
}

function getSemanticHandler(node){
  var element, handler;
  if (node != null && node.castableTypeMap$ && !!node.castableTypeMap$[218]) {
    element = dynamicCast(node, 218);
    handler = $getNiceHtmlRenderer(element.registry, element);
    return handler?handler:($clinit_983() , DEEP_CLONE_RENDERER);
  }
   else {
    return $clinit_983() , DEEP_CLONE_RENDERER;
  }
}

function renderChildren(view, parent_0, contentParent, selectionMatcher){
  var current, done, semanticHandler;
  current = contentParent.getFirstChild();
  while (current) {
    done = (semanticHandler = getSemanticHandler(current) , semanticHandler.renderSequence(view, current, null, parent_0, selectionMatcher));
    current = dynamicCast(view.getNextSibling(done), 192);
  }
}

function renderSequence_0(view, firstItem, stopAt, dstParent, selectionMatcher){
  var semanticHandler;
  semanticHandler = getSemanticHandler(firstItem);
  return semanticHandler.renderSequence(view, firstItem, stopAt, dstParent, selectionMatcher);
}

function PasteFormatRenderer(){
}

_ = PasteFormatRenderer_0.prototype = PasteFormatRenderer.prototype = new Object_0;
_.getClass$ = function getClass_633(){
  return Lorg_waveprotocol_wave_client_editor_extract_PasteFormatRenderer_2_classLit;
}
;
_.castableTypeMap$ = {};
var INSTANCE_10 = null;
_ = PasteFormatRenderers$1.prototype;
_.renderSequence = function renderSequence_1(view, firstItem, stopAt, dstParent, selectionMatcher){
  var clone, implNodelet;
  firstItem != null && firstItem.castableTypeMap$ && !!firstItem.castableTypeMap$[191] && $log_0(($clinit_741() , logger_1).traceLogger, 'deep cloning: ' + dynamicCast(firstItem, 191).tagName_0);
  implNodelet = firstItem.getImplNodelet();
  clone = implNodelet?implNodelet.cloneNode(true):null;
  if (clone) {
    dstParent.appendChild(clone);
    $maybeNoteHtml(selectionMatcher, firstItem, clone);
  }
   else {
    (maskUndefined(selectionMatcher.contentStart.container) === (firstItem == null?null:firstItem) || $equals_11(selectionMatcher.contentStart, new Point$El_0(firstItem.parent_0, firstItem))) && (selectionMatcher.htmlStart = dstParent.hasChildNodes()?new SelectionMatcher$LazyPointImpl_0(dstParent.lastChild, ($clinit_991() , AFTER_NODE)):new SelectionMatcher$LazyPointImpl_0(dstParent, ($clinit_991() , AT_START)));
    (maskUndefined(selectionMatcher.contentEnd.container) === (firstItem == null?null:firstItem) || $equals_11(selectionMatcher.contentEnd, new Point$El_0(firstItem.parent_0, firstItem))) && (selectionMatcher.htmlEnd = dstParent.hasChildNodes()?new SelectionMatcher$LazyPointImpl_0(dstParent.lastChild, ($clinit_991() , AFTER_NODE)):new SelectionMatcher$LazyPointImpl_0(dstParent, ($clinit_991() , AT_START)));
  }
  return firstItem;
}
;
_ = PasteFormatRenderers$2.prototype;
_.renderSequence = function renderSequence_2(view, firstItem, stopAt, dstParent, selectionMatcher){
  var clone, container, implNodelet;
  implNodelet = firstItem.getImplNodelet();
  clone = implNodelet?implNodelet.cloneNode(false):null;
  if (clone) {
    dstParent.appendChild(clone);
    $maybeNoteHtml(selectionMatcher, firstItem, clone);
  }
   else {
    (maskUndefined(selectionMatcher.contentStart.container) === (firstItem == null?null:firstItem) || $equals_11(selectionMatcher.contentStart, new Point$El_0(firstItem.parent_0, firstItem))) && (selectionMatcher.htmlStart = dstParent.hasChildNodes()?new SelectionMatcher$LazyPointImpl_0(dstParent.lastChild, ($clinit_991() , AFTER_NODE)):new SelectionMatcher$LazyPointImpl_0(dstParent, ($clinit_991() , AT_START)));
    (maskUndefined(selectionMatcher.contentEnd.container) === (firstItem == null?null:firstItem) || $equals_11(selectionMatcher.contentEnd, new Point$El_0(firstItem.parent_0, firstItem))) && (selectionMatcher.htmlEnd = dstParent.hasChildNodes()?new SelectionMatcher$LazyPointImpl_0(dstParent.lastChild, ($clinit_991() , AFTER_NODE)):new SelectionMatcher$LazyPointImpl_0(dstParent, ($clinit_991() , AT_START)));
  }
  if (firstItem != null && firstItem.castableTypeMap$ && !!firstItem.castableTypeMap$[191]) {
    !!clone && !!clone?(container = clone):(container = dstParent);
    renderChildren(view, container, firstItem, selectionMatcher);
  }
  return firstItem;
}
;
function $handleInserted(this$static, error){
  $log_4(($clinit_741() , logger_1).errorLogger, 'handleInserted: ', error);
  $revert(this$static, error.contentPoint, null);
}

function $getCorespondingPointInEmptyElement(selection, source, clone){
  return source != null && source.castableTypeMap$ && !!source.castableTypeMap$[191] && !source.getFirstChild() && $equals_11(selection, new Point$El_0(source, null))?clone?new SelectionMatcher$EagerPoint_0(new Point$El_0(clone, null)):new SelectionMatcher$EagerPoint_0(new Point$El_0($getParentElement(null), null)):null;
}

function $matchTextSelection(selection, source, clone){
  return selection.offset >= 0 && maskUndefined(selection.container) === (source == null?null:source)?new SelectionMatcher$EagerPoint_0(new Point$Tx_0(clone, $getTextOffset(selection))):null;
}

function $maybeNoteHtml(this$static, source, clone){
  var matchedTextSelection, p, matchedTextSelection_0, p_0;
  checkArgument_2(!!source, 'Source must be non-null');
  checkArgument_2(!!source.parent_0, 'Source must have parent.');
  if (!this$static.htmlStart) {
    $equals_11(this$static.contentStart, new Point$El_0(source.parent_0, source))?(this$static.htmlStart = new SelectionMatcher$LazyPointImpl_0(clone, ($clinit_991() , BEFORE_NODE))):$equals_11(this$static.contentStart, new Point$El_0(source.parent_0, source.next)) && (this$static.htmlStart = new SelectionMatcher$LazyPointImpl_0(clone, ($clinit_991() , AFTER_NODE)));
    matchedTextSelection = $matchTextSelection(this$static.contentStart, source, clone);
    !!matchedTextSelection && (this$static.htmlStart = matchedTextSelection);
    p = $getCorespondingPointInEmptyElement(this$static.contentStart, source, clone);
    !!p && (this$static.htmlStart = p);
  }
  if (!this$static.htmlEnd) {
    $equals_11(this$static.contentEnd, new Point$El_0(source.parent_0, source))?(this$static.htmlEnd = new SelectionMatcher$LazyPointImpl_0(clone, ($clinit_991() , BEFORE_NODE))):$equals_11(this$static.contentEnd, new Point$El_0(source.parent_0, source.next)) && (this$static.htmlEnd = new SelectionMatcher$LazyPointImpl_0(clone, ($clinit_991() , AFTER_NODE)));
    matchedTextSelection_0 = $matchTextSelection(this$static.contentEnd, source, clone);
    !!matchedTextSelection_0 && (this$static.htmlEnd = matchedTextSelection_0);
    p_0 = $getCorespondingPointInEmptyElement(this$static.contentEnd, source, clone);
    !!p_0 && (this$static.htmlEnd = p_0);
  }
}

function SelectionMatcher_0(contentStart, contentEnd){
  this.contentStart = contentStart;
  this.contentEnd = contentEnd;
}

function SelectionMatcher(){
}

_ = SelectionMatcher_0.prototype = SelectionMatcher.prototype = new Object_0;
_.getClass$ = function getClass_637(){
  return Lorg_waveprotocol_wave_client_editor_extract_SelectionMatcher_2_classLit;
}
;
_.castableTypeMap$ = {};
_.contentEnd = null;
_.contentStart = null;
_.htmlEnd = null;
_.htmlStart = null;
function SelectionMatcher$EagerPoint_0(p){
  this.explicit = p;
}

function SelectionMatcher$EagerPoint(){
}

_ = SelectionMatcher$EagerPoint_0.prototype = SelectionMatcher$EagerPoint.prototype = new Object_0;
_.getClass$ = function getClass_638(){
  return Lorg_waveprotocol_wave_client_editor_extract_SelectionMatcher$EagerPoint_2_classLit;
}
;
_.getPoint = function getPoint(){
  return this.explicit;
}
;
_.castableTypeMap$ = {};
_.explicit = null;
function $clinit_991(){
  $clinit_991 = nullMethod;
  BEFORE_NODE = new SelectionMatcher$LazyPoint$Type_0('BEFORE_NODE', 0);
  AFTER_NODE = new SelectionMatcher$LazyPoint$Type_0('AFTER_NODE', 1);
  AT_START = new SelectionMatcher$LazyPoint$Type_0('AT_START', 2);
  $VALUES_29 = initValues(_3Lorg_waveprotocol_wave_client_editor_extract_SelectionMatcher$LazyPoint$Type_2_classLit, {9:1, 66:1, 166:1}, 104, [BEFORE_NODE, AFTER_NODE, AT_START]);
}

function SelectionMatcher$LazyPoint$Type_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function valueOf_36(name_0){
  $clinit_991();
  return valueOf_0(($clinit_992() , $MAP_29), name_0);
}

function values_30(){
  $clinit_991();
  return $VALUES_29;
}

function SelectionMatcher$LazyPoint$Type(){
}

_ = SelectionMatcher$LazyPoint$Type_0.prototype = SelectionMatcher$LazyPoint$Type.prototype = new Enum;
_.getClass$ = function getClass_639(){
  return Lorg_waveprotocol_wave_client_editor_extract_SelectionMatcher$LazyPoint$Type_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 104:1};
var $VALUES_29, AFTER_NODE, AT_START, BEFORE_NODE;
function $clinit_992(){
  $clinit_992 = nullMethod;
  $MAP_29 = createValueOfMap(($clinit_991() , $VALUES_29));
}

var $MAP_29;
function SelectionMatcher$LazyPointImpl_0(ref, pointType){
  this.ref = ref;
  this.pointType = pointType;
}

function SelectionMatcher$LazyPointImpl(){
}

_ = SelectionMatcher$LazyPointImpl_0.prototype = SelectionMatcher$LazyPointImpl.prototype = new Object_0;
_.getClass$ = function getClass_640(){
  return Lorg_waveprotocol_wave_client_editor_extract_SelectionMatcher$LazyPointImpl_2_classLit;
}
;
_.getPoint = function getPoint_0(){
  var parent_0, parent_1;
  switch (this.pointType.ordinal) {
    case 1:
      return new Point$El_0((parent_0 = this.ref.parentNode , (!parent_0 || parent_0.nodeType != 1) && (parent_0 = null) , parent_0), this.ref.nextSibling);
    case 0:
      return new Point$El_0((parent_1 = this.ref.parentNode , (!parent_1 || parent_1.nodeType != 1) && (parent_1 = null) , parent_1), this.ref);
    case 2:
      return new Point$El_0(this.ref, this.ref.firstChild);
    default:throw new RuntimeException_1('invalid case');
  }
}
;
_.castableTypeMap$ = {};
_.pointType = null;
_.ref = null;
function $augmentBuilder(this$static, node, inclusion){
  var asElement, asText, builder, child, data, end, nodeRange, start, tStart;
  nodeRange = new Range_2(this$static.doc.doc.getLocation(node), $getNodeEnd(this$static, node));
  builder = new XmlStringBuilderDoc_0(null, ($clinit_1980() , ANY));
  if (!$shouldInclude(inclusion, nodeRange)) {
    return builder;
  }
  asElement = this$static.doc.doc.substrate.asElement_0(node);
  if (this$static.doc.doc.substrate.asElement_0(node) != null) {
    for (child = this$static.doc.doc.substrate.getFirstChild_0(node); child != null; child = this$static.doc.doc.substrate.getNextSibling(child)) {
      $append_19(builder, $augmentBuilder(this$static, child, inclusion));
    }
    $wrap_1(builder, this$static.doc.doc.substrate.getTagName(asElement), ($clinit_2278() , new CollectionUtils$StringMapAdapter_0(this$static.doc.doc.substrate.getAttributes(asElement))));
  }
   else {
    asText = this$static.doc.doc.substrate.asText_0(node);
    tStart = this$static.doc.doc.getLocation(asText);
    data = this$static.doc.doc.substrate.getData(asText);
    start = max_1(0, inclusion.start - tStart);
    end = min_1(data.length, inclusion.end - tStart);
    $appendText_0(builder, data.substr(start, end - start), BLIP_TEXT);
  }
  return builder;
}

function $getNodeEnd(this$static, node){
  var nextSibling, parent_0;
  nextSibling = this$static.doc.doc.substrate.getNextSibling(node);
  if (nextSibling != null) {
    return this$static.doc.doc.getLocation(nextSibling);
  }
   else {
    parent_0 = this$static.doc.doc.substrate.getParentElement(node);
    return (parent_0 == null?null:parent_0) === maskUndefined(this$static.doc.doc.substrate.getDocumentElement())?$size_15(this$static.doc.doc):$getNodeEnd(this$static, parent_0) - 1;
  }
}

function $renderRange(this$static, start, end){
  var asElement, asText, builder, child, inclusion, nearestCommonAncestor, substring, tStart;
  nearestCommonAncestor = nearestCommonAncestor_0(this$static.doc, start.offset >= 0 || start.nodeAfter == null?start.container:start.nodeAfter, end.offset >= 0 || end.nodeAfter == null?end.container:end.nodeAfter);
  inclusion = new Range_2($getLocation_0(this$static.doc, start), $getLocation_0(this$static.doc, end));
  builder = new XmlStringBuilderDoc_0(null, ($clinit_1980() , BLIP_TEXT));
  asElement = this$static.doc.doc.substrate.asElement_0(nearestCommonAncestor);
  if (asElement != null) {
    for (child = this$static.doc.doc.substrate.getFirstChild_0(asElement); child != null; child = this$static.doc.doc.substrate.getNextSibling(child)) {
      $append_19(builder, $augmentBuilder(this$static, child, inclusion));
    }
    (asElement == null?null:asElement) !== maskUndefined(this$static.doc.doc.substrate.getDocumentElement()) && $shouldInclude(inclusion, new Range_2(this$static.doc.doc.getLocation(asElement), $getNodeEnd(this$static, asElement))) && $wrap_1(builder, this$static.doc.doc.substrate.getTagName(asElement), ($clinit_2278() , new CollectionUtils$StringMapAdapter_0(this$static.doc.doc.substrate.getAttributes(asElement))));
  }
   else {
    asText = this$static.doc.doc.substrate.asText_0(nearestCommonAncestor);
    tStart = this$static.doc.doc.getLocation(asText);
    substring = $substring_0(this$static.doc.doc.substrate.getData(asText), inclusion.start - tStart, inclusion.end - tStart);
    $appendText_0(builder, substring, BLIP_TEXT);
  }
  return builder;
}

function $shouldInclude(inclusion, nodeRange){
  if (nodeRange.start < inclusion.start && nodeRange.end > inclusion.end) {
    return false;
  }
  if (nodeRange.end <= inclusion.start || nodeRange.start >= inclusion.end) {
    return false;
  }
  return true;
}

function SubTreeXmlRenderer_0(doc){
  this.doc = doc;
}

function SubTreeXmlRenderer(){
}

_ = SubTreeXmlRenderer_0.prototype = SubTreeXmlRenderer.prototype = new Object_0;
_.getClass$ = function getClass_641(){
  return Lorg_waveprotocol_wave_client_editor_extract_SubTreeXmlRenderer_2_classLit;
}
;
_.castableTypeMap$ = {};
_.doc = null;
function $findTypingState(this$static, selection){
  var i, t;
  for (i = 0; i < this$static.numStates; ++i) {
    t = dynamicCast($get_7(this$static.statePool, i), 230);
    if (!t.contentRange) {
      continue;
    }
    if ($isPartOfThisState(t, selection)) {
      return t;
    }
  }
  return null;
}

function $getFreshTypingState(this$static){
  var t;
  ++this$static.numStates;
  if (this$static.numStates > this$static.statePool.size_0) {
    t = new TypingExtractor$TypingState_0(this$static);
    $add_9(this$static.statePool, t);
    return t;
  }
   else {
    return dynamicCast($get_7(this$static.statePool, this$static.numStates - 1), 230);
  }
}

function $isBusy(this$static){
  var i, t;
  for (i = 0; i < this$static.numStates; ++i) {
    t = dynamicCast($get_7(this$static.statePool, i), 230);
    if (!t.contentRange) {
      continue;
    }
    return true;
  }
  return false;
}

function $somethingHappened(this$static, previousSelectionStart){
  var filteredHtml, node, nodeAfter, nodeBefore, t;
  checkNotNull_1(previousSelectionStart, 'Typing extractor notified with null selection');
  node = previousSelectionStart.offset >= 0?dynamicCastJso(previousSelectionStart.container):null;
  if (!node) {
    filteredHtml = this$static.filteredHtmlView;
    nodeBefore = dynamicCastJso(nodeBefore_0(filteredHtml, previousSelectionStart.asElementPoint()));
    nodeAfter = dynamicCastJso($getNodeAfter(previousSelectionStart));
    if (!!nodeBefore && nodeBefore.nodeType == 3) {
      node = nodeBefore;
      previousSelectionStart = new Point$Tx_0(node, 0);
    }
     else if (!!nodeAfter && nodeAfter.nodeType == 3) {
      node = nodeAfter;
      previousSelectionStart = new Point$Tx_0(node, node.length);
    }
  }
  t = $findTypingState(this$static, previousSelectionStart);
  if (!t) {
    t = $getFreshTypingState(this$static);
    if (node) {
      checkNotNull_1(previousSelectionStart.asTextPoint(), 'previousSelectionStart must be a text point');
      $startTypingSequence_0(t, previousSelectionStart.asTextPoint());
    }
     else {
      checkState_2(previousSelectionStart.offset < 0, 'previousSelectionStart must not be a text point');
      $startTypingSequence(t, previousSelectionStart.asElementPoint());
    }
  }
   else {
    $continueTypingSequence(t, previousSelectionStart);
  }
  t.lastTextNode = node;
  $schedule_5(this$static.timerService, this$static.flushCmd);
}

function TypingExtractor_0(sink, manager, filteredHtmlView, renderedContentView, repairer, selectionSource){
  TypingExtractor_1.call(this, sink, manager, new SchedulerTimerService_1((!instance_7 && (instance_7 = new BrowserBackedScheduler_0 , setDefaultTimerService() , undefined) , instance_7), ($clinit_1175() , CRITICAL)), filteredHtmlView, renderedContentView, repairer, selectionSource);
}

function TypingExtractor_1(sink, manager, service, filteredHtmlView, renderedContentView, repairer, selectionSource){
  this.statePool = new ArrayList_0;
  this.sink = sink;
  this.manager = manager;
  this.selectionSource = selectionSource;
  this.timerService = service;
  this.filteredHtmlView = filteredHtmlView;
  this.renderedContentView = renderedContentView;
  this.repairer = repairer;
  this.flushCmd = new TypingExtractor$1_0(this);
}

function TypingExtractor(){
}

_ = TypingExtractor_0.prototype = TypingExtractor.prototype = new Object_0;
_.getClass$ = function getClass_642(){
  return Lorg_waveprotocol_wave_client_editor_extract_TypingExtractor_2_classLit;
}
;
_.castableTypeMap$ = {};
_.filteredHtmlView = null;
_.flushCmd = null;
_.manager = null;
_.numStates = 0;
_.renderedContentView = null;
_.repairer = null;
_.searchingForAdjacentArea = false;
_.selectionSource = null;
_.sink = null;
_.timerService = null;
function TypingExtractor$1_0(this$0){
  this.this$0 = this$0;
}

function TypingExtractor$1(){
}

_ = TypingExtractor$1_0.prototype = TypingExtractor$1.prototype = new Object_0;
_.execute_0 = function execute_33(){
  $flush_1(this.this$0);
}
;
_.getClass$ = function getClass_643(){
  return Lorg_waveprotocol_wave_client_editor_extract_TypingExtractor$1_2_classLit;
}
;
_.castableTypeMap$ = {248:1, 249:1};
_.this$0 = null;
function $checkNeighbouringTextNodes(this$static, previousSelectionStart){
  var filteredHtml, nextNode, nextNodelet, prev, renderedContent, selNode, selOffset;
  if (this$static.this$0.searchingForAdjacentArea) {
    return;
  }
  try {
    this$static.this$0.searchingForAdjacentArea = true;
    filteredHtml = this$static.this$0.filteredHtmlView;
    renderedContent = this$static.this$0.renderedContentView;
    selNode = dynamicCastJso(previousSelectionStart.container);
    selOffset = $getTextOffset(previousSelectionStart);
    if (selOffset == 0 && this$static.firstWrapper.implNodelet == selNode) {
      prev = dynamicCast($getPreviousSibling_3(renderedContent, this$static.firstWrapper), 192);
      !!prev && prev.isTextNode() && (this$static.firstWrapper = dynamicCast(prev, 220));
    }
     else {
      nextNode = dynamicCast($getNextSibling_3(renderedContent, this$static.lastWrapper), 192);
      nextNodelet = nextNode?nextNode.getImplNodelet():null;
      selOffset == selNode.length && maskUndefined($getNextSibling_3(filteredHtml, selNode)) === (nextNodelet == null?null:nextNodelet) && !!nextNode && nextNode.isTextNode() && (this$static.lastWrapper = dynamicCast(nextNode, 220));
    }
  }
   finally {
    this$static.this$0.searchingForAdjacentArea = false;
  }
}

function $continueTypingSequence(this$static, previousSelectionStart){
  if (this$static.firstWrapper) {
    $updateMinPre(this$static, previousSelectionStart);
    $checkNeighbouringTextNodes(this$static, previousSelectionStart);
  }
}

function $getAbsoluteOffset(this$static, point){
  var filteredHtml, toFind;
  if ($partOfMutatingRange(this$static, dynamicCastJso(point.container))) {
    toFind = dynamicCastJso(point.container);
    filteredHtml = this$static.this$0.filteredHtmlView;
    return getOffset(toFind, dynamicCastJso($getStartNode(this$static.htmlRange, filteredHtml)), dynamicCastJso($getNodeAfter(this$static.htmlRange.after)), filteredHtml) + $getTextOffset(point);
  }
  return -1;
}

function $isPartOfThisState(this$static, point){
  var node;
  node = point.offset >= 0?dynamicCastJso(point.container):null;
  if (!node) {
    return maskUndefined($getNodeAfter(this$static.htmlRange.after)) === maskUndefined($getNodeAfter(point)) && maskUndefined(this$static.htmlRange.after.container) === maskUndefined(point.container) || $getNodeAfter(point) != null && $partOfMutatingRange(this$static, dynamicCastJso($getNodeAfter(point)));
  }
  return node == this$static.lastTextNode || $contains_7(this$static.htmlRange, this$static.this$0.filteredHtmlView, node);
}

function $partOfMutatingRange(this$static, node){
  return $contains_7(this$static.htmlRange, this$static.this$0.filteredHtmlView, node);
}

function $startTypingSequence(this$static, point){
  this$static.htmlRange = collapsedAt_0(this$static.this$0.filteredHtmlView, point);
  this$static.contentRange = boundedBy(getBackReference(dynamicCastJso(this$static.htmlRange.after.container)), getBackReference(dynamicCastJso(this$static.htmlRange.nodeBefore)), getBackReference(dynamicCastJso($getNodeAfter(this$static.htmlRange.after))));
}

function $startTypingSequence_0(this$static, previousSelectionStart){
  var $e0, after, before, cnodeAfter, e, filteredHtml, htmlNodeAfter, htmlNodeBefore, htmlParent, node, nodeAfter, renderedContent, wrapper;
  node = dynamicCastJso(previousSelectionStart.container);
  renderedContent = this$static.this$0.renderedContentView;
  filteredHtml = this$static.this$0.filteredHtmlView;
  try {
    wrapper = $findTextWrapper(this$static.this$0.manager, node, true);
    this$static.firstWrapper = wrapper;
    this$static.lastWrapper = wrapper;
    $checkNeighbouringTextNodes(this$static, previousSelectionStart);
    this$static.contentRange = around(renderedContent, this$static.firstWrapper, this$static.lastWrapper);
    htmlNodeBefore = dynamicCastJso($getPreviousSibling_3(filteredHtml, this$static.firstWrapper.implNodelet));
    htmlParent = dynamicCastJso($getParentElement_3(filteredHtml, node));
    cnodeAfter = dynamicCast($getNodeAfter(this$static.contentRange.after), 192);
    htmlNodeAfter = !cnodeAfter?null:cnodeAfter.getImplNodelet();
    this$static.htmlRange = between(htmlNodeBefore, new Point$El_0(htmlParent, htmlNodeAfter));
    $partOfMutatingRange(this$static, dynamicCastJso(filteredHtml.inner_0.asText_0(dynamicCastJso(previousSelectionStart.container)))) && (this$static.minpre = $getTextOffset(previousSelectionStart) + $getOffset_0(this$static.firstWrapper, node, htmlNodeAfter));
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 201)) {
      e = $e0;
      nodeAfter = dynamicCastJso($getNodeAfter(e.htmlPoint));
      if (nodeAfter.nodeType != 3) {
        throw e;
      }
      this$static.contentRange = collapsedAt_0(renderedContent, e.contentPoint);
      before = this$static.contentRange.nodeBefore == null?null:dynamicCast(this$static.contentRange.nodeBefore, 192).getImplNodelet();
      after = $getNodeAfter(this$static.contentRange.after) == null?null:dynamicCast($getNodeAfter(this$static.contentRange.after), 192).getImplNodelet();
      this$static.htmlRange = between(before, new Point$El_0(dynamicCast(this$static.contentRange.after.container, 192).getImplNodelet(), after));
    }
     else 
      throw $e0;
  }
}

function $updateMinPre(this$static, selectionStart){
  var newVal;
  if (!selectionStart) {
    this$static.minpre = 0;
    return;
  }
  newVal = $getAbsoluteOffset(this$static, selectionStart);
  newVal == -1 && (newVal = 0);
  this$static.minpre = min_1(this$static.minpre, newVal);
}

function TypingExtractor$TypingState_0(this$0){
  this.this$0 = this$0;
}

function TypingExtractor$TypingState(){
}

_ = TypingExtractor$TypingState_0.prototype = TypingExtractor$TypingState.prototype = new Object_0;
_.getClass$ = function getClass_644(){
  return Lorg_waveprotocol_wave_client_editor_extract_TypingExtractor$TypingState_2_classLit;
}
;
_.castableTypeMap$ = {230:1};
_.contentRange = null;
_.firstWrapper = null;
_.htmlRange = null;
_.lastTextNode = null;
_.lastWrapper = null;
_.minpre = 0;
_.this$0 = null;
function $elementNodeToWrapperPoint(this$static, container, nodeAfter){
  var filteredHtml;
  filteredHtml = this$static.filteredHtmlView;
  if (maskUndefined($getVisibleNode(filteredHtml, nodeAfter)) !== (nodeAfter == null?null:nodeAfter)) {
    nodeAfter = dynamicCastJso($getNextSibling_3(filteredHtml, nodeAfter));
    !!nodeAfter && (container = $getParentElement(nodeAfter));
  }
  return new Point$El_0($findElementWrapper_0(this$static, container), $findNodeWrapper(this$static, nodeAfter));
}

function $nodeOffsetToWrapperPoint(this$static, node, offset){
  var container;
  if (node.nodeType == 3) {
    return $textNodeToWrapperPoint(this$static, node, offset);
  }
   else {
    container = node;
    return $elementNodeToWrapperPoint(this$static, container, offset >= container.childNodes.length?null:container.childNodes[offset]);
  }
}

function $nodeletPointToWrapperPoint(this$static, nodelet){
  return nodelet.offset >= 0?$textNodeToWrapperPoint(this$static, dynamicCastJso(nodelet.container), $getTextOffset(nodelet)):$elementNodeToWrapperPoint(this$static, dynamicCastJso(nodelet.container), dynamicCastJso($getNodeAfter(nodelet)));
}

function $textNodeToWrapperPoint(this$static, text, offset){
  var e, textNode;
  if (dynamicCast($getParentElement(text)[TRANSPARENCY] || null, 150) == ($clinit_2090() , DEEP)) {
    e = $getParentElement(text);
    return $elementNodeToWrapperPoint(this$static, $getParentElement(e), e);
  }
   else {
    textNode = $findTextWrapper(this$static, text, true);
    return new Point$Tx_0(textNode, offset + $getOffset(textNode, text));
  }
}

function $clinit_1014(){
  $clinit_1014 = nullMethod;
  NONE_1 = new KeyBindingRegistry_0;
}

function KeyBindingRegistry_0(){
  $clinit_1014();
  this.bindings = new HashMap_0;
}

function KeyBindingRegistry(){
}

_ = KeyBindingRegistry_0.prototype = KeyBindingRegistry.prototype = new Object_0;
_.getClass$ = function getClass_654(){
  return Lorg_waveprotocol_wave_client_editor_keys_KeyBindingRegistry_2_classLit;
}
;
_.castableTypeMap$ = {};
var NONE_1;
function $getWordBoundary(this$static, forward_0){
  var $e0, boundary, e, s, selection;
  boundary = null;
  s = getSelectionGuarded();
  forward_0?(s.modify('move', ($clinit_1029() , FORWARD).name_1, ($clinit_1031() , WORD_0).name_1) , undefined):(s.modify('move', ($clinit_1029() , BACKWARD).name_1, ($clinit_1031() , WORD_0).name_1) , undefined);
  try {
    selection = getSelectionGuarded();
    s.getRangeAt(0);
    boundary = $nodeOffsetToWrapperPoint(this$static.nodeManager, selection.focusNode, selection.focusOffset);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 200)) {
      e = $e0;
      $log_4(($clinit_741() , logger_1).fatalLogger, 'html missing not handled', e);
    }
     else if (instanceOf($e0, 201)) {
      e = $e0;
      $log_4(($clinit_741() , logger_1).fatalLogger, 'html inserted not handled', e);
    }
     else 
      throw $e0;
  }
  return boundary;
}

function CaretMovementHelperWebkitImpl_0(nodeManager){
  this.nodeManager = nodeManager;
}

function CaretMovementHelperWebkitImpl(){
}

_ = CaretMovementHelperWebkitImpl_0.prototype = CaretMovementHelperWebkitImpl.prototype = new Object_0;
_.getClass$ = function getClass_656(){
  return Lorg_waveprotocol_wave_client_editor_selection_content_CaretMovementHelperWebkitImpl_2_classLit;
}
;
_.castableTypeMap$ = {};
_.nodeManager = null;
function $clinit_1019(){
  $clinit_1019 = nullMethod;
  NOP_IMPL_0 = new SelectionHelper$1_0;
}

var NOP_IMPL_0;
function SelectionHelper$1_0(){
}

function SelectionHelper$1(){
}

_ = SelectionHelper$1_0.prototype = SelectionHelper$1.prototype = new Object_0;
_.getClass$ = function getClass_658(){
  return Lorg_waveprotocol_wave_client_editor_selection_content_SelectionHelper$1_2_classLit;
}
;
_.getOrderedSelectionRange = function getOrderedSelectionRange_0(){
  return null;
}
;
_.getSelectionPoints = function getSelectionPoints_0(){
  return null;
}
;
_.getSelectionRange = function getSelectionRange_0(){
  return null;
}
;
_.setSelectionRange_0 = function setSelectionRange_0(selection){
}
;
_.castableTypeMap$ = {};
function filterNonContentSelection(htmlSelection){
  var el, htmlFocus, parent_0;
  if (!htmlSelection) {
    return null;
  }
  htmlFocus = htmlSelection.focus_0;
  htmlFocus.offset >= 0?(el = (parent_0 = dynamicCastJso(htmlFocus.container).parentNode , (!parent_0 || parent_0.nodeType != 1) && (parent_0 = null) , parent_0)):(el = dynamicCastJso(htmlFocus.container));
  while ($clinit_1012() , !(!!el && (el[BACKREF_NAME] || null) != null)) {
    if (dynamicCast(el[TRANSPARENCY] || null, 150) == ($clinit_2090() , DEEP) || !!el[$clinit_770() , COMPLEX_IMPLEMENTATION_MARKER]) {
      if (!el[MAY_CONTAIN_SELECTION]) {
        htmlSelection = null;
        break;
      }
    }
    el = $getParentElement(el);
  }
  return htmlSelection;
}

function placeCaretAfterElement(selection, element){
  $setCaret_0(selection, getFilteredPoint(element.context.this$0.renderingConcerns.this$0.renderedContentView, new Point$El_0(element.parent_0, element.next)));
}

function placeCaretBeforeElement(selection, element){
  $setCaret_0(selection, getFilteredPoint(element.context.this$0.renderingConcerns.this$0.renderedContentView, new Point$El_0(element.parent_0, element)));
}

function $setCaret_3(this$static, node){
  $clinit_628();
  this$static.setBaseAndExtent(node, 0, node, 0);
}

function getSelectionGuarded(){
  var selection;
  selection = $wnd.getSelection();
  if (!!selection && isUnreadable(selection.anchorNode)) {
    $setCaret_3(selection, ($clinit_1024() , $doc.activeElement));
    return selection;
  }
  return selection;
}

function $clinit_1029(){
  $clinit_1029 = nullMethod;
  FORWARD = new SelectionWebkit$Direction_0('FORWARD', 0);
  BACKWARD = new SelectionWebkit$Direction_0('BACKWARD', 1);
  LEFT_2 = new SelectionWebkit$Direction_0('LEFT', 2);
  RIGHT_2 = new SelectionWebkit$Direction_0('RIGHT', 3);
  $VALUES_32 = initValues(_3Lorg_waveprotocol_wave_client_editor_selection_html_SelectionWebkit$Direction_2_classLit, {9:1, 66:1, 166:1}, 107, [FORWARD, BACKWARD, LEFT_2, RIGHT_2]);
}

function SelectionWebkit$Direction_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function valueOf_39(name_0){
  $clinit_1029();
  return valueOf_0(($clinit_1030() , $MAP_32), name_0);
}

function values_33(){
  $clinit_1029();
  return $VALUES_32;
}

function SelectionWebkit$Direction(){
}

_ = SelectionWebkit$Direction_0.prototype = SelectionWebkit$Direction.prototype = new Enum;
_.getClass$ = function getClass_659(){
  return Lorg_waveprotocol_wave_client_editor_selection_html_SelectionWebkit$Direction_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 107:1};
var $VALUES_32, BACKWARD, FORWARD, LEFT_2, RIGHT_2;
function $clinit_1030(){
  $clinit_1030 = nullMethod;
  $MAP_32 = createValueOfMap(($clinit_1029() , $VALUES_32));
}

var $MAP_32;
function $clinit_1031(){
  $clinit_1031 = nullMethod;
  CHARACTER_0 = new SelectionWebkit$MoveUnit_0('CHARACTER', 0);
  WORD_0 = new SelectionWebkit$MoveUnit_0('WORD', 1);
  SENTENCE = new SelectionWebkit$MoveUnit_0('SENTENCE', 2);
  LINE_1 = new SelectionWebkit$MoveUnit_0('LINE', 3);
  PARAGRAPH = new SelectionWebkit$MoveUnit_0('PARAGRAPH', 4);
  $VALUES_33 = initValues(_3Lorg_waveprotocol_wave_client_editor_selection_html_SelectionWebkit$MoveUnit_2_classLit, {9:1, 66:1, 166:1}, 108, [CHARACTER_0, WORD_0, SENTENCE, LINE_1, PARAGRAPH]);
}

function SelectionWebkit$MoveUnit_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function valueOf_40(name_0){
  $clinit_1031();
  return valueOf_0(($clinit_1032() , $MAP_33), name_0);
}

function values_34(){
  $clinit_1031();
  return $VALUES_33;
}

function SelectionWebkit$MoveUnit(){
}

_ = SelectionWebkit$MoveUnit_0.prototype = SelectionWebkit$MoveUnit.prototype = new Enum;
_.getClass$ = function getClass_660(){
  return Lorg_waveprotocol_wave_client_editor_selection_html_SelectionWebkit$MoveUnit_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 108:1};
var $VALUES_33, CHARACTER_0, LINE_1, PARAGRAPH, SENTENCE, WORD_0;
function $clinit_1032(){
  $clinit_1032 = nullMethod;
  $MAP_33 = createValueOfMap(($clinit_1031() , $VALUES_33));
}

var $MAP_33;
function $getFromKeyboardSpecifiedDirectionOnly(el, rightWards){
  var seen;
  seen = null;
  while (true) {
    if (el == seen) {
      el = null;
      break;
    }
    if (throwClassCastExceptionUnlessNull(el.value_0).nullMethod()) {
      break;
    }
    !seen && (seen = el);
    rightWards?(el = $getNext(el)):(el = $getPrev(el));
  }
  return el;
}

function $setCurrent(this$static, newCurrent){
  var alreadyShown;
  alreadyShown = false;
  if (this$static.current) {
    !newCurrent?$hide(this$static.popupCloser.this$0.popup):throwClassCastExceptionUnlessNull(this$static.current.value_0).nullMethod();
    alreadyShown = true;
  }
  if (newCurrent) {
    this$static.current = newCurrent;
    throwClassCastExceptionUnlessNull(this$static.current.value_0);
    $clearItems(this$static.menu);
    null.nullMethod();
    null.nullMethod();
    $moveSelectionDown(this$static.menu);
    null.nullMethod();
    null.nullMethod();
    !this$static.savedSelection && (this$static.savedSelection = $getSelectionRange(this$static.selectionHelper));
    alreadyShown?undefined:$show_0(this$static.popup);
  }
}

function $showSuggestionsNearestTo(this$static, location_0){
  var newCurrent, found;
  $cancelScheduledClose(this$static.popupCloser);
  newCurrent = $findBefore(this$static.suggestables, dynamicCast(location_0.container, 192));
  !newCurrent?(newCurrent = $getFirst_0(this$static.suggestables)):$isLast(this$static.suggestables, newCurrent) || $getNext(newCurrent);
  if (!newCurrent) {
    return false;
  }
  $setCurrent(this$static, (found = $getFromKeyboardSpecifiedDirectionOnly(newCurrent, false) , !found && $getFromKeyboardSpecifiedDirectionOnly(newCurrent, !false) , found));
  return !!newCurrent;
}

function InteractiveSuggestionsManager_0(selectionHelper, closeSuggestionMenuDelayMs){
  this.handler = new InteractiveSuggestionsManager$1_0(this);
  this.menu = new SuggestionMenu_0(this.handler);
  this.suggestables = new LinkedPruningSequenceMap_0(new LinkedPruningSequenceMap$1_0);
  this.popupCloser = new InteractiveSuggestionsManager$PopupCloser_0(this, new SchedulerTimerService_0((!instance_7 && (instance_7 = new BrowserBackedScheduler_0 , setDefaultTimerService() , undefined) , instance_7)));
  this.popup = createPopup_0(this.menu, this);
  this.closeSuggestionMenuDelayMs = closeSuggestionMenuDelayMs;
  this.selectionHelper = selectionHelper;
}

function InteractiveSuggestionsManager(){
}

_ = InteractiveSuggestionsManager_0.prototype = InteractiveSuggestionsManager.prototype = new Object_0;
_.getClass$ = function getClass_661(){
  return Lorg_waveprotocol_wave_client_editor_sugg_InteractiveSuggestionsManager_2_classLit;
}
;
_.onHide = function onHide_0(source){
  try {
    !!this.savedSelection && $setSelectionRange_1(this.selectionHelper, this.savedSelection);
  }
   finally {
    this.savedSelection = null;
    if (this.current) {
      throwClassCastExceptionUnlessNull(this.current.value_0).nullMethod();
      this.current = null;
    }
  }
}
;
_.onShow = function onShow_0(source){
  $clinit_1024();
  cache_1 = null;
  $clinit_401();
  $focus_0(this.menu.element);
}
;
_.castableTypeMap$ = {345:1};
_.closeSuggestionMenuDelayMs = 0;
_.current = null;
_.popup = null;
_.savedSelection = null;
_.selectionHelper = null;
function $handleLeftRight(this$static, isRight){
  var newCurrent;
  newCurrent = isRight?$getNext(this$static.this$0.current):$getPrev(this$static.this$0.current);
  newCurrent == this$static.this$0.current && (newCurrent = null);
  $setCurrent(this$static.this$0, newCurrent);
}

function InteractiveSuggestionsManager$1_0(this$0){
  this.this$0 = this$0;
}

function InteractiveSuggestionsManager$1(){
}

_ = InteractiveSuggestionsManager$1_0.prototype = InteractiveSuggestionsManager$1.prototype = new Object_0;
_.getClass$ = function getClass_662(){
  return Lorg_waveprotocol_wave_client_editor_sugg_InteractiveSuggestionsManager$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function $cancelScheduledClose(this$static){
  $cancel_3(this$static.timerService.scheduler, this$static.task);
}

function $scheduleClose(this$static){
  $scheduleDelayed_0(this$static.timerService, this$static.task, this$static.this$0.closeSuggestionMenuDelayMs);
}

function InteractiveSuggestionsManager$PopupCloser_0(this$0, timerService){
  this.this$0 = this$0;
  this.task = new InteractiveSuggestionsManager$PopupCloser$1_0(this);
  this.timerService = timerService;
}

function InteractiveSuggestionsManager$PopupCloser(){
}

_ = InteractiveSuggestionsManager$PopupCloser_0.prototype = InteractiveSuggestionsManager$PopupCloser.prototype = new Object_0;
_.getClass$ = function getClass_663(){
  return Lorg_waveprotocol_wave_client_editor_sugg_InteractiveSuggestionsManager$PopupCloser_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
_.timerService = null;
function InteractiveSuggestionsManager$PopupCloser$1_0(this$1){
  this.this$1 = this$1;
}

function InteractiveSuggestionsManager$PopupCloser$1(){
}

_ = InteractiveSuggestionsManager$PopupCloser$1_0.prototype = InteractiveSuggestionsManager$PopupCloser$1.prototype = new Object_0;
_.execute_0 = function execute_34(){
  $hide(this.this$1.this$0.popup);
}
;
_.getClass$ = function getClass_664(){
  return Lorg_waveprotocol_wave_client_editor_sugg_InteractiveSuggestionsManager$PopupCloser$1_2_classLit;
}
;
_.castableTypeMap$ = {248:1, 249:1};
_.this$1 = null;
function $clinit_1039(){
  $clinit_1039 = nullMethod;
  $clinit_99();
  $push_1(toInject, ($clinit_204() , "/* CssUrl */\n/* CssUrl */\na.C-LH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-sugg, a.C-IH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-orig, a.C-GH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-cmd {\n  display : block;\n  color : #003ea8;\n  background-color : white;\n  cursor : pointer;\n  padding : 3px 20px 4px 20px;\n  margin : 0 -2px !important;\n  text-decoration : none;\n}\n.C-HH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-hover a.C-LH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-sugg, .C-HH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-hover a.C-IH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-orig, .C-HH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-hover a.C-GH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-cmd {\n  color : white;\n  background-color : #4086ff;\n  text-decoration : none;\n}\n.C-HH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-hover a.C-LH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-sugg label, .C-HH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-hover a.C-IH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-orig label {\n  color : #c0d4ff;\n}\n.C-LH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-sugg label, .C-IH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-orig label {\n  margin-right : 5px;\n  text-decoration : underline;\n  color : #7295cf;\n}\n.C-LH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-sugg span {\n  font-weight : bold;\n  text-decoration : none;\n}\n.C-IH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-orig span {\n  font-style : italic;\n  text-decoration : none;\n}\n.C-IH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-orig {\n  background-image : url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHRJREFUeNpiYIABuxX/GQgAJmIVggAjEQo3AnEDw6GIC4woJh+KYERRZreCH0gmgBUzMDgyorgZXTFCrh5IKjDBBXAphIANQGzAxEAcEECEBmHgAMQXGPEqsVuhAPVgPsgZLDgUwYLzARAfACkE+ukhQIABAKZuHUYsPLRcAAAAAElFTkSuQmCC');\n  background-repeat : no-repeat;\n  background-position : 5px 50%;\n}\n.C-HH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-hover a.C-IH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-orig {\n  background-image : url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGZJREFUeNpiYICC/0DAQAAwEasQrBhZ4X/sYAMQGzCgK0I3CSjED8T5QPwepIERWQMjEGCzHihVD6QUiHEqSLE+EJ9nYiAOCMBDgwjgAMQXCFmvAMQNUA/K41IEA/eBeD5MIUCAAQCexWwv78dj0QAAAABJRU5ErkJggg==');\n  background-repeat : no-repeat;\n  background-position : 5px 50%;\n}\n.C-GH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-cmd span {\n  margin-left : 12px;\n  text-decoration : none;\n}\n.C-KH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-sep {\n  width : 100%;\n  margin-top : 1px;\n  height : 1px;\n  border-top : 1px solid #e3e8f2;\n}\n.C-JH-org-waveprotocol-wave-client-editor-sugg-SuggestionResources-Css-selected {\n  background : #d0e8ff;\n}\n"));
  flush();
}

function $handleEventInner_0(this$static, event_0){
  var index, keyCode, target;
  switch ($eventGetTypeInt(event_0.type)) {
    case 262144:
      event_0.preventDefault();
      break;
    case 256:
    case 128:
      {
        keyCode = event_0.keyCode || 0;
        switch (keyCode) {
          case 37:
          case 39:
            $handleLeftRight(this$static.handler, keyCode == 39);
            event_0.stopPropagation();
            return;
          case 13:
            event_0.stopPropagation();
        }
        if (keyCode >= 49 && keyCode <= 57) {
          index = keyCode - 49;
          if (index >= 0 && index < this$static.items.size_0) {
            throwClassCastExceptionUnlessNull($get_7(this$static.items, index));
            return;
          }
        }
        break;
      }

    case 32:
      {
        target = event_0.relatedTarget;
        $isOrHasChild(this$static.element, target) || $scheduleClose(this$static.handler.this$0.popupCloser);
        break;
      }

    case 16:
      {
        $cancelScheduledClose(this$static.handler.this$0.popupCloser);
        break;
      }

  }
}

function SuggestionMenu_0(handler){
  $clinit_1039();
  MenuBar_1.call(this, $clinit_367());
  this.handler = handler;
  this.eventsToSink == -1?sinkEvents(this.element, 262400 | (this.element.__eventBits || 0)):(this.eventsToSink |= 262400);
}

function SuggestionMenu(){
}

_ = SuggestionMenu_0.prototype = SuggestionMenu.prototype = new MenuBar;
_.getClass$ = function getClass_665(){
  return Lorg_waveprotocol_wave_client_editor_sugg_SuggestionMenu_2_classLit;
}
;
_.onBrowserEvent = function onBrowserEvent_6(event_0){
  var sEvent;
  sEvent = ($clinit_648() , create_16(DEFAULT_FACTORY, event_0, true));
  !!sEvent && $handleEventInner_0(this, event_0);
  $onBrowserEvent_0(this, event_0);
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
_.handler = null;
function $add_19(this$static, controller){
  $add_33(this$static.updateables, controller);
  return controller;
}

function $updateButtonStates(this$static){
  var selectionRange, update, update$iterator;
  if (this$static.updateables.contents.isEmpty()) {
    return;
  }
  selectionRange = $getSelectionHelper(this$static.editor).getOrderedSelectionRange();
  if (!selectionRange) {
    return;
  }
  for (update$iterator = $iterator_20(this$static.updateables); update$iterator.hasNext();) {
    update = dynamicCast(update$iterator.next_0(), 234);
    update.update_0(selectionRange);
  }
}

function ButtonUpdater_0(editor){
  this.updateables = ($clinit_2295() , $clinit_2295() , new CopyOnWriteSet_0(HASH_SET));
  this.editor = editor;
}

function ButtonUpdater(){
}

_ = ButtonUpdater_0.prototype = ButtonUpdater.prototype = new Object_0;
_.getClass$ = function getClass_666(){
  return Lorg_waveprotocol_wave_client_editor_toolbar_ButtonUpdater_2_classLit;
}
;
_.onUpdate = function onUpdate_2(event_0){
  $updateButtonStates(this);
}
;
_.castableTypeMap$ = {205:1};
_.editor = null;
function $setParagraphStyle(this$static, isOn){
  var range;
  range = $getSelectionHelper(this$static.editor).getOrderedSelectionRange();
  !!range && $undoableSequence(this$static.editor, new ParagraphApplicationController$1_0(this$static, range, isOn));
}

function ParagraphApplicationController_0(button, editor, style){
  this.button_0 = button;
  this.editor = editor;
  this.style_0 = style;
}

function ParagraphApplicationController(){
}

_ = ParagraphApplicationController_0.prototype = ParagraphApplicationController.prototype = new Object_0;
_.getClass$ = function getClass_667(){
  return Lorg_waveprotocol_wave_client_editor_toolbar_ParagraphApplicationController_2_classLit;
}
;
_.onToggledOff = function onToggledOff(){
  $setParagraphStyle(this, false);
}
;
_.onToggledOn = function onToggledOn(){
  $setParagraphStyle(this, true);
}
;
_.update_0 = function update_0(range){
  $setToggledOn(this.button_0, appliesEntirely($getDocument(this.editor), range.start, range.end, this.style_0));
}
;
_.castableTypeMap$ = {234:1, 310:1};
_.button_0 = null;
_.editor = null;
_.style_0 = null;
function ParagraphApplicationController$1_0(this$0, val$range, val$isOn){
  this.this$0 = this$0;
  this.val$range = val$range;
  this.val$isOn = val$isOn;
}

function ParagraphApplicationController$1(){
}

_ = ParagraphApplicationController$1_0.prototype = ParagraphApplicationController$1.prototype = new Object_0;
_.getClass$ = function getClass_668(){
  return Lorg_waveprotocol_wave_client_editor_toolbar_ParagraphApplicationController$1_2_classLit;
}
;
_.run = function run_3(){
  $clinit_905();
  traverse($getDocument(this.this$0.editor), this.val$range.start, this.val$range.end, new Paragraph$3_0(this.this$0.style_0, this.val$isOn));
}
;
_.castableTypeMap$ = {203:1};
_.this$0 = null;
_.val$isOn = false;
_.val$range = null;
function $onClicked(this$static){
  var range;
  range = $getSelectionHelper(this$static.editor).getOrderedSelectionRange();
  !!range && $undoableSequence(this$static.editor, new ParagraphTraversalController$1_0(this$static, range));
}

function ParagraphTraversalController_0(editor, action){
  this.editor = editor;
  this.action_0 = action;
}

function ParagraphTraversalController(){
}

_ = ParagraphTraversalController_0.prototype = ParagraphTraversalController.prototype = new Object_0;
_.getClass$ = function getClass_669(){
  return Lorg_waveprotocol_wave_client_editor_toolbar_ParagraphTraversalController_2_classLit;
}
;
_.onClicked = function onClicked(){
  $onClicked(this);
}
;
_.castableTypeMap$ = {};
_.action_0 = null;
_.editor = null;
function ParagraphTraversalController$1_0(this$0, val$range){
  this.this$0 = this$0;
  this.val$range = val$range;
}

function ParagraphTraversalController$1(){
}

_ = ParagraphTraversalController$1_0.prototype = ParagraphTraversalController$1.prototype = new Object_0;
_.getClass$ = function getClass_670(){
  return Lorg_waveprotocol_wave_client_editor_toolbar_ParagraphTraversalController$1_2_classLit;
}
;
_.run = function run_4(){
  var locator;
  locator = $getDocument(this.this$0.editor);
  traverse(locator, this.val$range.start, this.val$range.end, this.this$0.action_0);
}
;
_.castableTypeMap$ = {203:1};
_.this$0 = null;
_.val$range = null;
function $setSelectionAnnotation(this$static, style){
  !!$getSelectionHelper(this$static.editor).getSelectionPoints() && $undoableSequence(this$static.editor, new TextSelectionController$1_0(this$static, style));
}

function TextSelectionController_0(button, editor, annotationName, annotationValue){
  this.button_0 = button;
  this.editor = editor;
  this.annotationName = annotationName;
  this.annotationValue = annotationValue;
}

function TextSelectionController(){
}

_ = TextSelectionController_0.prototype = TextSelectionController.prototype = new Object_0;
_.getClass$ = function getClass_671(){
  return Lorg_waveprotocol_wave_client_editor_toolbar_TextSelectionController_2_classLit;
}
;
_.onToggledOff = function onToggledOff_0(){
  !!$getSelectionHelper(this.editor).getSelectionPoints() && $undoableSequence(this.editor, new TextSelectionController$1_0(this, null));
}
;
_.onToggledOn = function onToggledOn_0(){
  $setSelectionAnnotation(this, this.annotationValue);
}
;
_.update_0 = function update_1(selectionRange){
  var value;
  if (this.annotationValue != null) {
    value = getAnnotationOverRangeIfFull($getDocument(this.editor), $getCaretAnnotations(this.editor), this.annotationName, selectionRange.start, selectionRange.end);
    $setToggledOn(this.button_0, $equals_3(this.annotationValue, value));
  }
}
;
_.castableTypeMap$ = {234:1, 310:1};
_.annotationName = null;
_.annotationValue = null;
_.button_0 = null;
_.editor = null;
function TextSelectionController$1_0(this$0, val$style){
  this.this$0 = this$0;
  this.val$style = val$style;
}

function TextSelectionController$1(){
}

_ = TextSelectionController$1_0.prototype = TextSelectionController$1.prototype = new Object_0;
_.getClass$ = function getClass_672(){
  return Lorg_waveprotocol_wave_client_editor_toolbar_TextSelectionController$1_2_classLit;
}
;
_.run = function run_5(){
  setAnnotationOverSelection(this.this$0.editor, this.this$0.annotationName, this.val$style);
}
;
_.castableTypeMap$ = {203:1};
_.this$0 = null;
_.val$style = null;
function $biasFromContainers(this$static, at){
  var atContainerEnd, atContainerStart;
  atContainerStart = isAtLineStart(this$static.doc, at);
  atContainerEnd = isAtLineEnd(this$static.doc, at);
  return atContainerStart && atContainerEnd?($clinit_1749() , NEITHER):atContainerStart?($clinit_1749() , RIGHT_4):atContainerEnd?($clinit_1749() , LEFT_4):($clinit_1749() , NEITHER);
}

function $rebias(this$static, start, end, lastMovement){
  var bestPriority, bias;
  checkState_2(!!this$static.doc, 'Cannot call out of init/reset cycle.');
  checkPositionIndexesInRange(start, end, $size_15(this$static.doc.doc));
  if (start != end) {
    return $clinit_1749() , RIGHT_4;
  }
  bestPriority = new Box_1(new Double_0(0));
  bias = new Box_1($biasFromContainers(this$static, $locate_0(this$static.doc.doc, start)));
  bias.boxed === ($clinit_1749() , NEITHER)?(bias.boxed = toBiasDirection(lastMovement)):(bestPriority.boxed = new Double_0(5));
  $buildBoundaryMaps(this$static, start);
  this$static.leftSide.each_2(new AnnotationBehaviourLogic$1_0(this$static, bestPriority, bias, lastMovement));
  return dynamicCast(bias.boxed, 133);
}

function AnnotationBehaviourLogic_0(registry, doc, caret){
  this.leftSide = ($clinit_2278() , defaultCollectionFactory.createStringMap());
  this.rightSide = defaultCollectionFactory.createStringMap();
  this.registry = registry;
  this.doc = doc;
  this.caret = caret;
}

function AnnotationBehaviourLogic(){
}

_ = AnnotationBehaviourLogic_0.prototype = AnnotationBehaviourLogic.prototype = new Object_0;
_.getClass$ = function getClass_673(){
  return Lorg_waveprotocol_wave_client_editor_util_AnnotationBehaviourLogic_2_classLit;
}
;
_.castableTypeMap$ = {};
_.caret = null;
_.doc = null;
_.registry = null;
function AnnotationBehaviourLogic$1_0(this$0, val$bestPriority, val$bias, val$lastMovement){
  this.this$0 = this$0;
  this.val$bestPriority = val$bestPriority;
  this.val$bias = val$bias;
  this.val$lastMovement = val$lastMovement;
}

function AnnotationBehaviourLogic$1(){
}

_ = AnnotationBehaviourLogic$1_0.prototype = AnnotationBehaviourLogic$1.prototype = new Object_0;
_.apply_1 = function apply_42(key, value){
  var behaviour, behaviours, priority, ret;
  behaviours = $getBehaviours(this.this$0.registry, key);
  while (behaviours.next) {
    behaviour = (ret = behaviours.next , $getNext_5(behaviours) , ret);
    priority = behaviour.getPriority();
    if (priority > dynamicCast(this.val$bestPriority.boxed, 62).value_0) {
      this.val$bestPriority.boxed = new Double_0(priority);
      this.val$bias.boxed = behaviour.getBias(this.this$0.leftSide, this.this$0.rightSide, this.val$lastMovement);
    }
  }
}
;
_.getClass$ = function getClass_674(){
  return Lorg_waveprotocol_wave_client_editor_util_AnnotationBehaviourLogic$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
_.val$bestPriority = null;
_.val$bias = null;
_.val$lastMovement = null;
function clearAnnotationsOverRange(doc, caret, keys, start, end){
  var key, key$index, key$max, wasRemoved;
  wasRemoved = false;
  if (start == end) {
    for (key$index = 0 , key$max = keys.length; key$index < key$max; ++key$index) {
      key = keys[key$index];
      if ((caret.annotations.containsKey(key)?dynamicCast(caret.annotations.get(key), 1):caret.resolver?$getAnnotation_0(caret.resolver, key):null) != null) {
        caret.annotations.put(key, null);
        wasRemoved = true;
      }
    }
  }
   else {
    for (key$index = 0 , key$max = keys.length; key$index < key$max; ++key$index) {
      key = keys[key$index];
      if ($firstAnnotationChange_2(doc.doc, start, end, key, null) != -1) {
        $setAnnotation(doc, start, end, key, null);
        wasRemoved = true;
      }
    }
  }
  return wasRemoved;
}

function clearAnnotationsOverSelection(editor, keys){
  var range;
  range = $asRange(dynamicCast(checkNotNull_1(editor.getSelectionHelper().getSelectionRange(), 'Editor must have selection'), 204));
  return clearAnnotationsOverRange(editor.getDocument(), editor.getCaretAnnotations(), keys, range.start, range.end);
}

function getAnnotationOverRangeIfFull(doc, caret, key, start, end){
  var currentValue;
  if (start == end) {
    return caret.annotations.containsKey(key)?dynamicCast(caret.annotations.get(key), 1):caret.resolver?$getAnnotation_0(caret.resolver, key):null;
  }
  currentValue = $getAnnotation_2(doc.doc, start, key);
  if ($firstAnnotationChange_2(doc.doc, start, end, key, currentValue) == -1) {
    return currentValue;
  }
  return null;
}

function setAnnotationOverRange(doc, caret, key, value, start, end){
  start == end?caret.annotations.put(key, value):$setAnnotation(doc, start, end, key, value);
}

function setAnnotationOverSelection(editor, key, value){
  var range;
  range = $asRange(dynamicCast(checkNotNull_1(editor.getSelectionHelper().getSelectionRange(), 'Editor must have selection'), 204));
  setAnnotationOverRange(editor.getDocument(), editor.getCaretAnnotations(), key, value, range.start, range.end);
}

function formatContentDomString(editor){
  var $e0;
  if (!editor || $isConsistent(editor)) {
    if (editor) {
      $getOrderedHtmlSelection(editor);
      try {
        return $print(new Pretty_0, editor.content_0.fullContentView);
      }
       catch ($e0) {
        $e0 = caught_0($e0);
        if (!instanceOf($e0, 201))
          if (!instanceOf($e0, 200))
            throw $e0;
      }
    }
     else {
      return null;
    }
  }
  $logPlainText(($clinit_741() , logger_1).errorLogger, 'EditorDocFormatter called with inconsistent Doc');
  return null;
}

function formatImplDomString(editor){
  var view;
  if (!editor || $isConsistent(editor)) {
    $clinit_1024();
    view = editor.content_0.rawHtmlView;
    return $print(new Pretty_0, view);
  }
   else {
    $logPlainText(($clinit_741() , logger_1).errorLogger, 'EditorDocFormatter called with inconsistent Doc');
    return null;
  }
}

function formatPersistentDomString(editor){
  if (!editor || $isConsistent(editor)) {
    return toPrettyXmlString($asOperation(editor.content_0.indexedDoc));
  }
   else {
    $logPlainText(($clinit_741() , logger_1).errorLogger, 'EditorDocFormatter called with inconsistent Doc');
    return null;
  }
}

function $onParticipantRemoved(this$static, participant){
  if (this$static.active) {
    ($clinit_1061() , $shouldLog_0(LOG_2.traceLogger)) && ($logLazyObjects(LOG_2.traceLogger, $expandArgs(this$static.clientInstanceLogLabel, initValues(_3Ljava_lang_Object_2_classLit, {9:1, 66:1}, 0, ['Participant removed ', participant]))) , undefined);
    $sendCurrentParticipantInformation(this$static);
  }
   else {
    ($clinit_1061() , $shouldLog_0(LOG_2.traceLogger)) && ($logLazyObjects(LOG_2.traceLogger, $expandArgs(this$static.clientInstanceLogLabel, initValues(_3Ljava_lang_Object_2_classLit, {9:1, 66:1}, 0, ['Participant removed event in deleted node.']))) , undefined);
  }
}

_ = ConversationListenerImpl.prototype;
_.onParticipantRemoved = function onParticipantRemoved(participant){
}
;
_ = WaveletListenerAdapter.prototype;
_.onParticipantRemoved = function onParticipantRemoved_0(participant){
  $onParticipantRemoved(this.listener, participant);
}
;
_ = BrowserBackedScheduler$1.prototype;
_.run = function run_13(){
  $run_1(this);
}
;
function $addCommand(command){
  !instance_7 && (instance_7 = new BrowserBackedScheduler_0 , setDefaultTimerService() , undefined);
  $schedule_5(high_0, new CommandQueue$1$1_0(command));
}

function CommandQueue$1$1_0(val$command){
  this.val$command = val$command;
}

function CommandQueue$1$1(){
}

_ = CommandQueue$1$1_0.prototype = CommandQueue$1$1.prototype = new Object_0;
_.execute_0 = function execute_45(){
  this.val$command.execute_0();
}
;
_.getClass$ = function getClass_758(){
  return Lorg_waveprotocol_wave_client_scheduler_CommandQueue$1$1_2_classLit;
}
;
_.castableTypeMap$ = {248:1, 249:1};
_.val$command = null;
function $schedule_5(this$static, task){
  $schedule_2(this$static.scheduler, this$static.priority, task);
}

function SchedulerTimerService_0(scheduler){
  SchedulerTimerService_1.call(this, scheduler, ($clinit_1175() , LOW));
}

_ = SchedulerTimerService_0.prototype = SchedulerTimerService.prototype;
_ = ThreadReadStateMonitorImpl.prototype;
_.onParticipantRemoved = function onParticipantRemoved_1(participant){
}
;
function $createStageThreeLoader(this$static, two){
  instance_8 = new ClientFlags_0(new ClientFlagsBaseHelper_0(new OverridingTypedSource_0($withBoolean(new OverridingTypedSource$MapsHolder_0))));
  return new UndercurrentHarness$1$4_0(two, this$static.val$timeline);
}

function UndercurrentHarness$1$4_0($anonymous0, val$timeline){
  this.val$timeline = val$timeline;
  this.stageTwo = $anonymous0;
}

function UndercurrentHarness$1$4(){
}

_ = UndercurrentHarness$1$4_0.prototype = UndercurrentHarness$1$4.prototype = new StageThree$DefaultProvider;
_.getClass$ = function getClass_790(){
  return Lorg_waveprotocol_wave_client_testing_UndercurrentHarness$1$4_2_classLit;
}
;
_.onStageInit = function onStageInit_4(){
  $add_21(this.val$timeline, 'stage3_start');
}
;
_.onStageLoaded = function onStageLoaded_4(){
  $add_21(this.val$timeline, 'stage3_end');
}
;
_.castableTypeMap$ = {173:1, 177:1};
_.val$timeline = null;
function ClientFlagsBase_0(helper){
  dynamicCast($returnDefaultHelper(helper.source.getString('0'), 'http://www.google.com/support/wave/bin/topic.py?topic=24977'), 1);
  dynamicCast($returnDefaultHelper(helper.source.getString('1'), 'http://www.google.com/support/wave/bin/answer.py?hl=en&answer=175738'), 1);
  dynamicCast($returnDefaultHelper(helper.source.getString('2'), ''), 1);
  dynamicCast($returnDefaultHelper(helper.source.getString('3'), ''), 1);
  dynamicCast($returnDefaultHelper(helper.source.getString('4'), ''), 1);
  $getBoolean(helper, '5', ($clinit_415() , $clinit_415() , TRUE_0));
  $getInteger(helper, '6', valueOf_12(150));
  $getInteger(helper, '7', valueOf_12(200));
  $getBoolean(helper, '8', FALSE_0);
  $getInteger(helper, '9', valueOf_12(5000));
  this.closeSuggestionsMenuDelayMs = $getInteger(helper, '10', valueOf_12(500));
  $getBoolean(helper, '11', FALSE_0);
  dynamicCast($returnDefaultHelper(helper.source.getString('12'), ''), 1);
  dynamicCast($returnDefaultHelper(helper.source.getString('13'), 'wave_dev'), 1);
  dynamicCast($returnDefaultHelper(helper.source.getString('14'), 'EXPANDED'), 1);
  $getInteger(helper, '15', valueOf_12(5000));
  $getBoolean(helper, '16', FALSE_0);
  $getInteger(helper, '17', valueOf_12(20000));
  $getInteger(helper, '18', valueOf_12(20));
  $getInteger(helper, '19', valueOf_12(5));
  $getBoolean(helper, '20', FALSE_0);
  $getBoolean(helper, '21', FALSE_0);
  $getBoolean(helper, '22', FALSE_0);
  $getBoolean(helper, '23', FALSE_0);
  $getBoolean(helper, '24', FALSE_0);
  $getBoolean(helper, '25', FALSE_0);
  $getBoolean(helper, '26', FALSE_0);
  $getBoolean(helper, '27', FALSE_0);
  $getBoolean(helper, '28', FALSE_0);
  $getBoolean(helper, '29', FALSE_0);
  $getBoolean(helper, '30', FALSE_0);
  $getBoolean(helper, '31', FALSE_0);
  $getBoolean(helper, '32', FALSE_0);
  $getBoolean(helper, '33', FALSE_0);
  $getBoolean(helper, '34', TRUE_0);
  this.enableEditorDebugging = $getBoolean(helper, '35', FALSE_0);
  $getBoolean(helper, '36', FALSE_0);
  $getBoolean(helper, '37', FALSE_0);
  $getBoolean(helper, '38', FALSE_0);
  $getBoolean(helper, '39', FALSE_0);
  $getBoolean(helper, '40', FALSE_0);
  $getBoolean(helper, '41', FALSE_0);
  $getBoolean(helper, '42', TRUE_0);
  $getBoolean(helper, '43', TRUE_0);
  $getBoolean(helper, '44', FALSE_0);
  $getBoolean(helper, '45', FALSE_0);
  $getBoolean(helper, '46', FALSE_0);
  $getBoolean(helper, '47', FALSE_0);
  $getBoolean(helper, '48', FALSE_0);
  $getBoolean(helper, '49', FALSE_0);
  $getBoolean(helper, '50', FALSE_0);
  $getBoolean(helper, '51', FALSE_0);
  $getBoolean(helper, '52', FALSE_0);
  $getBoolean(helper, '53', FALSE_0);
  $getBoolean(helper, '54', TRUE_0);
  $getBoolean(helper, '55', FALSE_0);
  $getBoolean(helper, '56', TRUE_0);
  $getBoolean(helper, '57', FALSE_0);
  $getBoolean(helper, '58', FALSE_0);
  $getBoolean(helper, '59', FALSE_0);
  $getBoolean(helper, '60', FALSE_0);
  $getBoolean(helper, '61', FALSE_0);
  $getBoolean(helper, '62', FALSE_0);
  $getBoolean(helper, '63', FALSE_0);
  $getBoolean(helper, '64', FALSE_0);
  $getBoolean(helper, '65', FALSE_0);
  $getBoolean(helper, '66', FALSE_0);
  $getBoolean(helper, '67', FALSE_0);
  $getBoolean(helper, '68', FALSE_0);
  $getBoolean(helper, '69', FALSE_0);
  $getBoolean(helper, '70', FALSE_0);
  $getBoolean(helper, '71', FALSE_0);
  $getBoolean(helper, '72', FALSE_0);
  $getBoolean(helper, '73', TRUE_0);
  $getBoolean(helper, '74', FALSE_0);
  $getBoolean(helper, '75', FALSE_0);
  $getBoolean(helper, '76', FALSE_0);
  $getBoolean(helper, '77', FALSE_0);
  $getBoolean(helper, '78', FALSE_0);
  $getBoolean(helper, '79', FALSE_0);
  $getBoolean(helper, '80', FALSE_0);
  $getBoolean(helper, '81', TRUE_0);
  $getBoolean(helper, '82', TRUE_0);
  $getBoolean(helper, '83', FALSE_0);
  $getBoolean(helper, '84', FALSE_0);
  $getBoolean(helper, '85', TRUE_0);
  $getBoolean(helper, '86', TRUE_0);
  $getBoolean(helper, '87', FALSE_0);
  $getBoolean(helper, '88', TRUE_0);
  $getBoolean(helper, '89', FALSE_0);
  $getBoolean(helper, '90', FALSE_0);
  $getBoolean(helper, '91', FALSE_0);
  $getBoolean(helper, '92', TRUE_0);
  $getBoolean(helper, '93', TRUE_0);
  $getBoolean(helper, '94', FALSE_0);
  $getBoolean(helper, '95', FALSE_0);
  $getBoolean(helper, '96', FALSE_0);
  $getBoolean(helper, '97', FALSE_0);
  $getBoolean(helper, '98', FALSE_0);
  $getBoolean(helper, '99', TRUE_0);
  $getBoolean(helper, '100', FALSE_0);
  $getBoolean(helper, '101', FALSE_0);
  $getBoolean(helper, '102', FALSE_0);
  $getBoolean(helper, '103', FALSE_0);
  this.enableUndercurrentEditing = $getBoolean(helper, '104', TRUE_0);
  this.enableUndo = $getBoolean(helper, '105', TRUE_0);
  $getBoolean(helper, '106', FALSE_0);
  $getBoolean(helper, '107', TRUE_0);
  $getBoolean(helper, '108', FALSE_0);
  $getBoolean(helper, '109', FALSE_0);
  $getBoolean(helper, '110', FALSE_0);
  $getBoolean(helper, '111', FALSE_0);
  $getBoolean(helper, '112', FALSE_0);
  $getBoolean(helper, '113', FALSE_0);
  $getBoolean(helper, '114', FALSE_0);
  $getBoolean(helper, '115', FALSE_0);
  $getBoolean(helper, '116', FALSE_0);
  dynamicCast($returnDefaultHelper(helper.source.getString('117'), ''), 1);
  dynamicCast($returnDefaultHelper(helper.source.getString('118'), ''), 1);
  $getBoolean(helper, '119', FALSE_0);
  dynamicCast($returnDefaultHelper(helper.source.getString('120'), ''), 1);
  $getBoolean(helper, '121', TRUE_0);
  $getBoolean(helper, '122', FALSE_0);
  $getBoolean(helper, '123', FALSE_0);
  dynamicCast($returnDefaultHelper(helper.source.getString('124'), ''), 1);
  dynamicCast($returnDefaultHelper(helper.source.getString('125'), ''), 1);
  $getBoolean(helper, '126', FALSE_0);
  $getBoolean(helper, '127', FALSE_0);
  dynamicCast($returnDefaultHelper(helper.source.getString('128'), 'Wave team is _hiring_!'), 1);
  $getInteger(helper, '129', valueOf_12(300000));
  $getBoolean(helper, '130', TRUE_0);
  $getBoolean(helper, '131', TRUE_0);
  $getInteger(helper, '132', valueOf_12(1000));
  dynamicCast($returnDefaultHelper(helper.source.getString('133'), 'http://www.google.com/support/wave/bin/answer.py?answer=182709'), 1);
  $getBoolean(helper, '134', FALSE_0);
  $getInteger(helper, '135', valueOf_12(-1));
  $getInteger(helper, '136', valueOf_12(300));
  dynamicCast($returnDefaultHelper(helper.source.getString('137'), 'http://www.google.com/support/wave/bin/answer.py?hl=en&answer=175737'), 1);
  $getBoolean(helper, '138', TRUE_0);
  $getBoolean(helper, '139', FALSE_0);
  $getInteger(helper, '140', valueOf_12(39));
  dynamicCast($returnDefaultHelper(helper.source.getString('141'), 'static/images/logo.png'), 1);
  $getInteger(helper, '142', valueOf_12(136));
  $getInteger(helper, '143', valueOf_12(3));
  $getInteger(helper, '144', valueOf_12(50));
  $getInteger(helper, '145', valueOf_12(30));
  $getInteger(helper, '146', valueOf_12(10));
  $getInteger(helper, '147', valueOf_12(40));
  $getDouble(helper, '148', new Double_0(0.5));
  $getInteger(helper, '149', valueOf_12(60000));
  $getInteger(helper, '150', valueOf_12(10));
  $getDouble(helper, '151', new Double_0(1));
  $getInteger(helper, '152', valueOf_12(5000));
  dynamicCast($returnDefaultHelper(helper.source.getString('153'), 'gmail.com,googlemail.com'), 1);
  $getBoolean(helper, '154', FALSE_0);
  dynamicCast($returnDefaultHelper(helper.source.getString('155'), ''), 1);
  $getInteger(helper, '156', valueOf_12(5));
  $getInteger(helper, '157', valueOf_12(50));
  dynamicCast($returnDefaultHelper(helper.source.getString('158'), 'DISABLED'), 1);
  $getInteger(helper, '159', valueOf_12(1000));
  $getBoolean(helper, '160', FALSE_0);
  dynamicCast($returnDefaultHelper(helper.source.getString('161'), 'https://wave.google.com/wave/static/gadgets/onepick.xml'), 1);
  $getInteger(helper, '162', valueOf_12(10000));
  $getInteger(helper, '163', valueOf_12(30));
  $getInteger(helper, '164', valueOf_12(10000));
  $getBoolean(helper, '165', FALSE_0);
  $getBoolean(helper, '166', FALSE_0);
  dynamicCast($returnDefaultHelper(helper.source.getString('167'), ''), 1);
  $getInteger(helper, '168', valueOf_12(60000));
  $getBoolean(helper, '169', FALSE_0);
  $getInteger(helper, '170', valueOf_12(300));
  $getInteger(helper, '171', valueOf_12(25));
  $getInteger(helper, '172', valueOf_12(5));
  $getBoolean(helper, '173', TRUE_0);
  $getBoolean(helper, '174', TRUE_0);
  dynamicCast($returnDefaultHelper(helper.source.getString('175'), 'ar,bg,ca,cs,da,de,el,en,en_GB,es,fi,fil,fr,hi,hr,hu,id,it,iw,ja,ko,lt,lv,nl,no,pl,pt,pt_PT,ro,ru,sk,sl,sr,sv,th,tr,uk,vi,zh,zh_TW'), 1);
  $getBoolean(helper, '176', FALSE_0);
  $getBoolean(helper, '177', FALSE_0);
  $getBoolean(helper, '178', FALSE_0);
  $getBoolean(helper, '179', TRUE_0);
  $getBoolean(helper, '180', FALSE_0);
  $getBoolean(helper, '181', FALSE_0);
  $getInteger(helper, '182', valueOf_12(3));
  $getInteger(helper, '183', valueOf_12(100));
  $getInteger(helper, '184', valueOf_12(10));
  $getDouble(helper, '185', new Double_0(0));
  $getDouble(helper, '186', new Double_0(1));
  $getInteger(helper, '187', valueOf_12(100));
  $getInteger(helper, '188', valueOf_12(10000));
  $getInteger(helper, '189', valueOf_12(10000));
  dynamicCast($returnDefaultHelper(helper.source.getString('190'), 'http://opensocial-prod.corp.googleusercontent.com/gadgets/proxy'), 1);
  $getBoolean(helper, '191', TRUE_0);
  $getBoolean(helper, '192', FALSE_0);
  $getBoolean(helper, '193', FALSE_0);
  $getBoolean(helper, '194', TRUE_0);
  $getBoolean(helper, '195', FALSE_0);
  $getBoolean(helper, '196', TRUE_0);
  $getBoolean(helper, '197', TRUE_0);
  this.useFancyCursorBias = $getBoolean(helper, '198', FALSE_0);
  $getBoolean(helper, '199', FALSE_0);
  $getBoolean(helper, '200', TRUE_0);
  $getBoolean(helper, '201', FALSE_0);
  $getBoolean(helper, '202', TRUE_0);
  $getBoolean(helper, '203', TRUE_0);
  $getBoolean(helper, '204', FALSE_0);
  $getBoolean(helper, '205', FALSE_0);
  $getBoolean(helper, '206', FALSE_0);
  $getBoolean(helper, '207', FALSE_0);
  $getBoolean(helper, '208', TRUE_0);
  $getBoolean(helper, '209', TRUE_0);
  this.useSemanticCopyPaste = $getBoolean(helper, '210', TRUE_0);
  $getBoolean(helper, '211', FALSE_0);
  this.useWebkitCompositionEvents = $getBoolean(helper, '212', TRUE_0);
  this.useWhitelistInEditor = $getBoolean(helper, '213', FALSE_0);
  $getBoolean(helper, '214', TRUE_0);
  $getInteger(helper, '215', valueOf_12(60000));
  $getInteger(helper, '216', valueOf_12(15000));
  $getBoolean(helper, '217', FALSE_0);
  $getDouble(helper, '218', new Double_0(1.2));
  dynamicCast($returnDefaultHelper(helper.source.getString('219'), 'googlewave.com'), 1);
  $getInteger(helper, '220', valueOf_12(12000));
  dynamicCast($returnDefaultHelper(helper.source.getString('221'), ''), 1);
  dynamicCast($returnDefaultHelper(helper.source.getString('222'), ''), 1);
  dynamicCast($returnDefaultHelper(helper.source.getString('223'), ''), 1);
  dynamicCast($returnDefaultHelper(helper.source.getString('224'), ''), 1);
  dynamicCast($returnDefaultHelper(helper.source.getString('225'), ''), 1);
  dynamicCast($returnDefaultHelper(helper.source.getString('226'), ''), 1);
  dynamicCast($returnDefaultHelper(helper.source.getString('227'), ''), 1);
}

function ClientFlagsBase(){
}

_ = ClientFlagsBase.prototype = new Object_0;
_.getClass$ = function getClass_801(){
  return Lorg_waveprotocol_wave_client_util_ClientFlagsBase_2_classLit;
}
;
_.castableTypeMap$ = {};
_.closeSuggestionsMenuDelayMs = null;
_.enableEditorDebugging = null;
_.enableUndercurrentEditing = null;
_.enableUndo = null;
_.useFancyCursorBias = null;
_.useSemanticCopyPaste = null;
_.useWebkitCompositionEvents = null;
_.useWhitelistInEditor = null;
function ClientFlags_0(helper){
  ClientFlagsBase_0.call(this, helper);
}

function get_22(){
  var jsObj, source;
  if (!instance_8) {
    jsObj = getJSObj();
    source = jsObj?new WrappedJSObject_0(jsObj):(!singleton_2 && (singleton_2 = new UrlParameters_0($wnd.location.search)) , singleton_2);
    instance_8 = new ClientFlags_0(new ClientFlagsBaseHelper_0(source));
  }
  return instance_8;
}

function getJSObj(){
  if ($wnd.__client_flags) {
    return $wnd.__client_flags;
  }
  return null;
}

function ClientFlags(){
}

_ = ClientFlags_0.prototype = ClientFlags.prototype = new ClientFlagsBase;
_.getClass$ = function getClass_802(){
  return Lorg_waveprotocol_wave_client_util_ClientFlags_2_classLit;
}
;
_.castableTypeMap$ = {};
var instance_8 = null;
function $getBoolean(this$static, tag, defaultValue){
  return dynamicCast($returnDefaultHelper(this$static.source.getBoolean(tag), defaultValue), 60);
}

function $getDouble(this$static, tag, defaultValue){
  return dynamicCast($returnDefaultHelper(this$static.source.getDouble(tag), defaultValue), 62);
}

function $getInteger(this$static, tag, defaultValue){
  return dynamicCast($returnDefaultHelper(this$static.source.getInteger(tag), defaultValue), 64);
}

function $returnDefaultHelper(a_0, b){
  return a_0 != null?a_0:b;
}

function ClientFlagsBaseHelper_0(source){
  this.source = source;
}

function ClientFlagsBaseHelper(){
}

_ = ClientFlagsBaseHelper_0.prototype = ClientFlagsBaseHelper.prototype = new Object_0;
_.getClass$ = function getClass_803(){
  return Lorg_waveprotocol_wave_client_util_ClientFlagsBaseHelper_2_classLit;
}
;
_.castableTypeMap$ = {};
_.source = null;
function OverridingTypedSource_0(overrides){
  this.overrides = overrides;
}

function OverridingTypedSource(){
}

_ = OverridingTypedSource_0.prototype = OverridingTypedSource.prototype = new Object_0;
_.getBoolean = function getBoolean(key){
  var value;
  return (value = dynamicCast(this.overrides.booleans.get_4(key), 60))?value:null;
}
;
_.getClass$ = function getClass_804(){
  return Lorg_waveprotocol_wave_client_util_OverridingTypedSource_2_classLit;
}
;
_.getDouble = function getDouble(key){
  var value;
  return (value = dynamicCast(this.overrides.doubles.get_4(key), 62))?value:null;
}
;
_.getInteger = function getInteger(key){
  var value;
  return (value = dynamicCast(this.overrides.ints.get_4(key), 64))?value:null;
}
;
_.getString = function getString(key){
  var value;
  return (value = dynamicCast(this.overrides.strings.get_4(key), 1)) != null?value:null;
}
;
_.castableTypeMap$ = {};
_.overrides = null;
function $withBoolean(this$static){
  return this$static.booleans.put_3('104', ($clinit_415() , $clinit_415() , TRUE_0)) , this$static;
}

function OverridingTypedSource$MapsHolder_0(){
  this.booleans = ($clinit_2278() , defaultCollectionFactory.createStringMap());
  this.doubles = defaultCollectionFactory.createStringMap();
  this.ints = defaultCollectionFactory.createStringMap();
  this.strings = defaultCollectionFactory.createStringMap();
}

function OverridingTypedSource$MapsHolder(){
}

_ = OverridingTypedSource$MapsHolder_0.prototype = OverridingTypedSource$MapsHolder.prototype = new Object_0;
_.getBoolean = function getBoolean_0(key){
  var value;
  return (value = dynamicCast(this.booleans.get_4(key), 60))?value:null;
}
;
_.getClass$ = function getClass_805(){
  return Lorg_waveprotocol_wave_client_util_OverridingTypedSource$MapsHolder_2_classLit;
}
;
_.getDouble = function getDouble_0(key){
  var value;
  return (value = dynamicCast(this.doubles.get_4(key), 62))?value:null;
}
;
_.getInteger = function getInteger_0(key){
  var value;
  return (value = dynamicCast(this.ints.get_4(key), 64))?value:null;
}
;
_.getString = function getString_0(key){
  var value;
  return (value = dynamicCast(this.strings.get_4(key), 1)) != null?value:null;
}
;
_.castableTypeMap$ = {};
function UrlParameters_0(query){
  var keyval, keyvalpairs, pair, pair$index, pair$max, regexp, regexp_0, regexp_1;
  this.map = new HashMap_0;
  if (query.length > 1) {
    keyvalpairs = $split(query.substr(1, query.length - 1), '&', 0);
    for (pair$index = 0 , pair$max = keyvalpairs.length; pair$index < pair$max; ++pair$index) {
      pair = keyvalpairs[pair$index];
      keyval = $split(pair, '=', 0);
      keyval.length == 2?this.map.put((throwIfNull('encodedURLComponent', keyval[0]) , regexp = /\+/g , decodeURIComponent(keyval[0].replace(regexp, '%20'))), (throwIfNull('encodedURLComponent', keyval[1]) , regexp_0 = /\+/g , decodeURIComponent(keyval[1].replace(regexp_0, '%20')))):keyval.length == 1 && this.map.put((throwIfNull('encodedURLComponent', keyval[0]) , regexp_1 = /\+/g , decodeURIComponent(keyval[0].replace(regexp_1, '%20'))), '');
    }
  }
}

function UrlParameters(){
}

_ = UrlParameters_0.prototype = UrlParameters.prototype = new Object_0;
_.getBoolean = function getBoolean_1(key){
  var value;
  value = dynamicCast(this.map.get(key), 1);
  if (value == null) {
    return null;
  }
  return $clinit_415() , $equalsIgnoreCase('true', value)?TRUE_0:FALSE_0;
}
;
_.getClass$ = function getClass_806(){
  return Lorg_waveprotocol_wave_client_util_UrlParameters_2_classLit;
}
;
_.getDouble = function getDouble_1(key){
  var $e0, value;
  value = dynamicCast(this.map.get(key), 1);
  if (value == null) {
    return null;
  }
  try {
    return new Double_0(__parseAndValidateDouble(value));
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 183)) {
      return null;
    }
     else 
      throw $e0;
  }
}
;
_.getInteger = function getInteger_1(key){
  var $e0, value;
  value = dynamicCast(this.map.get(key), 1);
  if (value == null) {
    return null;
  }
  try {
    return valueOf_12(__parseAndValidateInt(value, 10));
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 183)) {
      return null;
    }
     else 
      throw $e0;
  }
}
;
_.getString = function getString_1(key){
  var value;
  value = dynamicCast(this.map.get(key), 1);
  return value;
}
;
_.castableTypeMap$ = {};
var singleton_2 = null;
function WrappedJSObject_0(jso){
  this.jso = jso;
}

function WrappedJSObject(){
}

_ = WrappedJSObject_0.prototype = WrappedJSObject.prototype = new Object_0;
_.getBoolean = function getBoolean_2(key){
  return typeof this.jso[key] == 'boolean'?($clinit_415() , this.jso[key]?TRUE_0:FALSE_0):null;
}
;
_.getClass$ = function getClass_807(){
  return Lorg_waveprotocol_wave_client_util_WrappedJSObject_2_classLit;
}
;
_.getDouble = function getDouble_2(key){
  return typeof this.jso[key] == 'number'?new Double_0(this.jso[key]):null;
}
;
_.getInteger = function getInteger_2(key){
  return typeof this.jso[key] == 'number'?valueOf_12(this.jso[key]):null;
}
;
_.getString = function getString_2(key){
  return typeof this.jso[key] == 'string'?this.jso[key]:null;
}
;
_.castableTypeMap$ = {};
_.jso = null;
_ = MutableDocumentProxy.prototype;
_.rangedAnnotations = function rangedAnnotations_4(start, end, keys){
  return $rangedAnnotations_1(this.getDelegate().doc, start, end, keys);
}
;
function $getDocument_1(this$static){
  !!this$static.document_0 || $loadWith(this$static, this$static.base);
  return this$static.document_0.document_0;
}

function $stopDiffSuppression(this$static){
  checkState_1(this$static.diffsSuppressed, initValues(_3Ljava_lang_Object_2_classLit, {9:1, 66:1}, 0, [($clinit_415() , this$static.diffsSuppressed?TRUE_0:FALSE_0), this$static.diffsRetained?TRUE_0:FALSE_0]));
  this$static.diffsSuppressed = false;
}

_ = WaveletListenerImpl.prototype;
_.onParticipantRemoved_0 = function onParticipantRemoved_2(wavelet, participant){
}
;
function $get_17(this$static, blip){
  return $getBlipDocument(this$static, $toString_28(dynamicCast(($clinit_2152() , blip.helper.this$0.wavelet.wavelet.id_0), 442)), dynamicCast($get_21(blip.manifestBlip.id_0), 1));
}

function $upgrade(this$static, edit){
  $add_33(edit.listeners, this$static);
}

_ = DiffController.prototype;
_.onSessionEnd = function onSessionEnd(e, blipUi){
  $stopDiffSuppression(dynamicCast($get_18(this.documents, $blipOf_0(this.models.viewIdMapper, dynamicCast(blipUi.impl, 330).getId())), 271));
}
;
_.onSessionStart = function onSessionStart(e, blipUi){
  $startDiffSuppression(dynamicCast($get_18(this.documents, $blipOf_0(this.models.viewIdMapper, dynamicCast(blipUi.impl, 330).getId())), 271));
}
;
function $clinit_1280(){
  $clinit_1280 = nullMethod;
  EDIT_BLIP = new Actions$Action_0('EDIT_BLIP', 0);
  REPLY_TO_BLIP = new Actions$Action_0('REPLY_TO_BLIP', 1);
  CONTINUE_THREAD = new Actions$Action_0('CONTINUE_THREAD', 2);
  DELETE_BLIP = new Actions$Action_0('DELETE_BLIP', 3);
  DELETE_THREAD = new Actions$Action_0('DELETE_THREAD', 4);
  $VALUES_39 = initValues(_3Lorg_waveprotocol_wave_client_wavepanel_impl_edit_Actions$Action_2_classLit, {9:1, 66:1, 166:1}, 114, [EDIT_BLIP, REPLY_TO_BLIP, CONTINUE_THREAD, DELETE_BLIP, DELETE_THREAD]);
}

function Actions$Action_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function valueOf_46(name_0){
  $clinit_1280();
  return valueOf_0(($clinit_1281() , $MAP_39), name_0);
}

function values_40(){
  $clinit_1280();
  return $VALUES_39;
}

function Actions$Action(){
}

_ = Actions$Action_0.prototype = Actions$Action.prototype = new Enum;
_.getClass$ = function getClass_834(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_edit_Actions$Action_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 114:1};
var $VALUES_39, CONTINUE_THREAD, DELETE_BLIP, DELETE_THREAD, EDIT_BLIP, REPLY_TO_BLIP;
function $clinit_1281(){
  $clinit_1281 = nullMethod;
  $MAP_39 = createValueOfMap(($clinit_1280() , $VALUES_39));
}

var $MAP_39;
function $addContinuation(this$static, threadUi){
  var continuation, thread;
  thread = $threadOf_0(this$static.views.viewIdMapper, threadUi.getId());
  continuation = (thread.isUsable || illegalState('Deleted thread is not usable: ' + thread) , $appendBlipWithContent(thread));
  $flush_3(this$static.blipQueue);
  $focusAndEdit(this$static, $getBlipView(this$static.views, continuation));
}

function $delete(this$static, blipUi){
  var nextUi, parentUi;
  if ($equals_8(blipUi, this$static.focus_0.blip)) {
    parentUi = $asThread($parentOf(dynamicCast(dynamicCast(blipUi.helper, 272), 273).this$0, dynamicCast(blipUi.impl, 274)));
    nextUi = parentUi.getBlipAfter(blipUi);
    !nextUi && (nextUi = parentUi.getBlipBefore(blipUi));
    nextUi?$focus_2(this$static.focus_0, nextUi):$moveUp(this$static.focus_0);
  }
  $delete_1($blipOf_0(this$static.views.viewIdMapper, dynamicCast(blipUi.impl, 330).getId()));
}

function $focusAndEdit(this$static, blipUi){
  $endSession(this$static.edit);
  $focus_2(this$static.focus_0, blipUi);
  $startEditing(this$static.edit, blipUi);
}

function $popupLink(this$static, blipUi){
  var $e0, blip, blipLinkPopupView, waveId, waveRef, waveRefStringValue, waveletId, path;
  blip = $blipOf_0(this$static.views.viewIdMapper, dynamicCast(blipUi.impl, 330).getId());
  waveId = blip.blip.wavelet.waveId;
  try {
    waveletId = $deserialiseWaveletId($toString_28(dynamicCast(($clinit_2152() , blip.helper.this$0.wavelet.wavelet.id_0), 442)));
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 189)) {
      $wnd.alert('Unable to link to this blip, invalid conversation id ' + $toString_28(dynamicCast(($clinit_2152() , blip.helper.this$0.wavelet.wavelet.id_0), 442)));
      return;
    }
     else 
      throw $e0;
  }
  waveRef = of_13(waveId, waveletId, dynamicCast($get_21(blip.manifestBlip.id_0), 1));
  waveRefStringValue = 'wave://' + ($clinit_2410() , $encode_0(waveRef, ($clinit_2408() , PATH)));
  blipLinkPopupView = new BlipLinkPopupWidget_0(dynamicCast((dynamicCast(blipUi.helper, 272) , blipUi.impl), 274));
  $setText_1(blipLinkPopupView.linkInfoBox, waveRefStringValue);
  path = getHostPageBaseURL() + 'waveref/' + waveRefStringValue.substr(7, waveRefStringValue.length - 7);
  $setText_1(blipLinkPopupView.waverefLink, path);
  $show_0(blipLinkPopupView.popup);
}

function $reply(this$static, blipUi){
  var blip, doc, location_0, reply, document_0, selectionPoints, view, selection;
  blip = $blipOf_0(this$static.views.viewIdMapper, dynamicCast(blipUi.impl, 330).getId());
  doc = $getDocument_1(dynamicCast($get_17(this$static.documents, blip), 271));
  location_0 = (selectionPoints = (selection = $getSelectionPoints((dynamicCast(doc.fullContentView.inner_0.getDocumentElement(), 191) , new PassiveSelectionHelper_0(doc.nodeManager, doc.renderedContentView, doc.indexedDoc))) , !selection?null:$asOrderedRange(selection, ($clinit_1024() , true))) , document_0 = doc.mutableContent , view = doc.persistentContentView , getLocationNearSelection_0(document_0, view, selectionPoints));
  location_0 == -1 && (location_0 = blip.blip.blip.content_0.getMutableDocument().size_1() - 1);
  reply = $appendBlip_0($addReplyThread(blip, location_0));
  $flush_3(this$static.blipQueue);
  $focusAndEdit(this$static, $getBlipView(this$static.views, reply));
}

function ActionsImpl_0(views, documents, blipQueue, focus_0, edit){
  this.views = views;
  this.documents = documents;
  this.blipQueue = blipQueue;
  this.focus_0 = focus_0;
  this.edit = edit;
}

function ActionsImpl(){
}

_ = ActionsImpl_0.prototype = ActionsImpl.prototype = new Object_0;
_.getClass$ = function getClass_835(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_edit_ActionsImpl_2_classLit;
}
;
_.castableTypeMap$ = {};
_.blipQueue = null;
_.documents = null;
_.edit = null;
_.focus_0 = null;
_.views = null;
function getLocationNearSelection_0(document_0, view, selectionPoints){
  var line, point, second, textPoint, el;
  if (!selectionPoints) {
    return -1;
  }
  second = selectionPoints.second;
  if (!selectionPoints.isCollapsed && isAtLineStart(document_0, getFilteredPoint(view, second))) {
    line = getRelatedLineElement(document_0, second);
    ($clinit_2104() , checkArgument_2((el = document_0.doc.substrate.asElement_0(line) , el != null && $equals_3(document_0.doc.substrate.getTagName(el), 'line')), 'not a line element') , (checkNotNull_1(line, 'Previous element for null element is undefined') , checkNotNull_1(document_0, 'Previous element for null document is undefined') , getNextElementInclusive(document_0, document_0.getPreviousSibling(line), false)) == null) || (second = new Point$El_0(document_0.doc.substrate.getParentElement(line), line));
  }
  point = getFilteredPoint(view, second);
  if (point.offset >= 0) {
    textPoint = point.asTextPoint();
    textPoint = findCharacterBoundary(document_0, textPoint, ($clinit_2125() , NON_WHITESPACE_MATCHER), false);
    textPoint = findCharacterBoundary(document_0, textPoint, WHITESPACE_MATCHER, true);
    point = textPoint;
  }
  point = ($clinit_2104() , jumpOut(document_0, point));
  return !point?-1:(checkNotNull_1(point, 'getLocation: Null point') , document_0.doc.getLocation_0(point));
}

function $clinit_1284(){
  $clinit_1284 = nullMethod;
  DEFAULT_BINDINGS = new EnumMap_0(Lorg_waveprotocol_wave_client_common_util_KeyCombo_2_classLit);
  $put_1(DEFAULT_BINDINGS, ($clinit_613() , CTRL_E), ($clinit_1280() , EDIT_BLIP));
  $put_1(DEFAULT_BINDINGS, CTRL_R, REPLY_TO_BLIP);
  $put_1(DEFAULT_BINDINGS, CTRL_ENTER, REPLY_TO_BLIP);
  $put_1(DEFAULT_BINDINGS, ENTER, REPLY_TO_BLIP);
  $put_1(DEFAULT_BINDINGS, SHIFT_ENTER, CONTINUE_THREAD);
  $put_1(DEFAULT_BINDINGS, SHIFT_DELETE, DELETE_BLIP);
}

function $doAction(this$static, action){
  switch (action.ordinal) {
    case 0:
      $startEditing_0(this$static.actions);
      break;
    case 1:
      $reply_0(this$static.actions);
      break;
    case 3:
      $deleteBlip(this$static.actions);
      break;
    case 2:
      $addContinuation_0(this$static.actions);
      break;
    case 4:
      $deleteThread(this$static.actions);
      break;
    default:throw new AssertionError_1('unknown action: ' + action);
  }
  return true;
}

function $install_5(this$static, keys){
  $register_1(keys, $keySet_0(this$static.keyBindings), this$static);
}

function EditController_0(actions, keyBindings){
  $clinit_1284();
  this.actions = actions;
  this.keyBindings = keyBindings;
}

function EditController(){
}

_ = EditController_0.prototype = EditController.prototype = new Object_0;
_.getClass$ = function getClass_836(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_edit_EditController_2_classLit;
}
;
_.onKeySignal = function onKeySignal_3(key){
  var action;
  action = dynamicCast($get_10(this.keyBindings, key), 114);
  return !!action && $doAction(this, action);
}
;
_.castableTypeMap$ = {268:1};
_.actions = null;
_.keyBindings = null;
var DEFAULT_BINDINGS;
function $clinit_1285(){
  $clinit_1285 = nullMethod;
  EDITOR_SETTINGS = (new EditorSettings_0).setHasDebugDialog(get_22().enableEditorDebugging.value_0).setUndoEnabled(get_22().enableUndo.value_0).setUseFancyCursorBias(get_22().useFancyCursorBias.value_0).setUseSemanticCopyPaste(get_22().useSemanticCopyPaste.value_0).setUseWhitelistInEditor(get_22().useWhitelistInEditor.value_0).setUseWebkitCompositionEvents(get_22().useWebkitCompositionEvents.value_0).setCloseSuggestionsMenuDelayMs(get_22().closeSuggestionsMenuDelayMs.value_0);
  KEY_BINDINGS = new KeyBindingRegistry_0;
}

function $endSession(this$static){
  var oldEditing, oldEditor;
  if (this$static.editing) {
    $stop(this$static.selectionExtractor, this$static.editor);
    $doOrphan_0(this$static.container, this$static.editor);
    $setEditing(this$static.editor, false);
    $removeContent(this$static.editor);
    $reset(this$static.editor);
    $deselect($getMeta_0(this$static.editing), ($clinit_1407() , EDIT));
    $enable_0($getMeta_0(this$static.editing), ($clinit_1468() , DISABLED_WHILE_EDITING_MENU_OPTIONS_SET));
    oldEditor = this$static.editor;
    oldEditing = this$static.editing;
    this$static.editor = null;
    this$static.editing = null;
    $fireOnSessionEnd(this$static, oldEditor, oldEditing);
  }
}

function $fireOnSessionEnd(this$static, editor, blipUi){
  var listener, listener$iterator;
  for (listener$iterator = $iterator_20(this$static.listeners); listener$iterator.hasNext();) {
    listener = dynamicCast(listener$iterator.next_0(), 275);
    listener.onSessionEnd(editor, blipUi);
  }
}

function $fireOnSessionStart(this$static, editor, blipUi){
  var listener, listener$iterator;
  for (listener$iterator = $iterator_20(this$static.listeners); listener$iterator.hasNext();) {
    listener = dynamicCast(listener$iterator.next_0(), 275);
    listener.onSessionStart(editor, blipUi);
  }
}

function $onKeySignal_2(this$static, signal){
  var key;
  key = ($clinit_587() , getKeyCombo_0(signal.cachedKeyCode, !!signal.nativeEvent.ctrlKey, !!signal.nativeEvent.shiftKey, !!signal.nativeEvent.altKey, !!signal.nativeEvent.metaKey));
  switch (key.ordinal) {
    case 16:
      $endSession(this$static);
      return true;
    case 14:
      $endSession(this$static);
      return true;
    default:return false;
  }
}

function $startEditing(this$static, blipUi){
  var document_0, e_0, editor_0;
  checkArgument(!!blipUi);
  $endSession(this$static);
  document_0 = $getDocument_1(dynamicCast($get_18(this$static.documents, $blipOf_0(this$static.views.viewIdMapper, dynamicCast(blipUi.impl, 330).getId())), 271));
  $disable_0($getMeta(dynamicCast(dynamicCast(blipUi.helper, 272), 273), dynamicCast(blipUi.impl, 274)), ($clinit_1468() , DISABLED_WHILE_EDITING_MENU_OPTIONS_SET));
  $select_1($getMeta(dynamicCast(dynamicCast(blipUi.helper, 272), 273), dynamicCast(blipUi.impl, 274)), ($clinit_1407() , EDIT));
  this$static.editor = ($clinit_749() , e_0 = dynamicCast(document_0.fullContentView.inner_0.getDocumentElement(), 191).implNodelet , checkArgument(!!e_0) , e_0 = $getParentElement(e_0) , checkArgument(!!e_0) , editor_0 = new EditorImplWebkitMobile_0(false, e_0) , $setContent_0(editor_0, document_0) , editor_0);
  $doAdopt(this$static.container, this$static.editor);
  $init_1(this$static.editor, KEY_BINDINGS, EDITOR_SETTINGS);
  $addKeySignalListener(this$static.editor, this$static);
  KEY_BINDINGS.bindings.put(($clinit_613() , ORDER_K), new EditSession$1_0);
  KEY_BINDINGS.bindings.put(ORDER_SHIFT_K, new EditSession$2_0);
  $setEditing(this$static.editor, true);
  this$static.editing = blipUi;
  $start(this$static.selectionExtractor, this$static.editor);
  $fireOnSessionStart(this$static, this$static.editor, blipUi);
}

function EditSession_0(views, documents, container, selectionExtractor){
  this.listeners = ($clinit_2295() , $clinit_2295() , new CopyOnWriteSet_0(HASH_SET));
  this.views = views;
  this.documents = documents;
  this.container = container;
  this.selectionExtractor = selectionExtractor;
}

function EditSession(){
}

_ = EditSession_0.prototype = EditSession.prototype = new Object_0;
_.getClass$ = function getClass_837(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_edit_EditSession_2_classLit;
}
;
_.onFocusMoved = function onFocusMoved(oldUi, newUi){
  var wasEditing;
  wasEditing = !!this.editing;
  $endSession(this);
  wasEditing && !!newUi && $startEditing(this, newUi);
}
;
_.onInit = function onInit_0(){
}
;
_.castableTypeMap$ = {199:1, 269:1, 280:1};
_.container = null;
_.documents = null;
_.editing = null;
_.editor = null;
_.selectionExtractor = null;
_.views = null;
var EDITOR_SETTINGS, KEY_BINDINGS;
function EditSession$1_0(){
}

function EditSession$1(){
}

_ = EditSession$1_0.prototype = EditSession$1.prototype = new Object_0;
_.execute_2 = function execute_52(context){
  onCreateLink(context);
}
;
_.getClass$ = function getClass_838(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_edit_EditSession$1_2_classLit;
}
;
_.castableTypeMap$ = {233:1};
function EditSession$2_0(){
}

function EditSession$2(){
}

_ = EditSession$2_0.prototype = EditSession$2.prototype = new Object_0;
_.execute_2 = function execute_53(context){
  !!$getSelectionRange((checkState_2(!!context.passiveSelectionHelper, 'Using the selection helper of an editor not set up.') , $checkContextConsistency(context) , context.passiveSelectionHelper)) && clearAnnotationsOverSelection(context, ($clinit_684() , LINK_KEYS));
}
;
_.getClass$ = function getClass_839(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_edit_EditSession$2_2_classLit;
}
;
_.castableTypeMap$ = {233:1};
function $addContinuation_0(this$static){
  var threadUi;
  threadUi = parentOf(this$static.focus_0.blip);
  !!threadUi && $addContinuation(this$static.actions, threadUi);
}

function $deleteBlip(this$static){
  var blipUi;
  blipUi = this$static.focus_0.blip;
  !!blipUi && $delete(this$static.actions, blipUi);
}

function $deleteThread(this$static){
  var threadUi;
  threadUi = parentOf(this$static.focus_0.blip);
  !!threadUi && ($delete_2($threadOf_0(this$static.actions.views.viewIdMapper, threadUi.getId())) , undefined);
}

function $reply_0(this$static){
  var blipUi;
  blipUi = this$static.focus_0.blip;
  !!blipUi && $reply(this$static.actions, blipUi);
}

function $startEditing_0(this$static){
  var blipUi;
  blipUi = this$static.focus_0.blip;
  !!blipUi && $focusAndEdit(this$static.actions, blipUi);
}

function FocusedActions_0(focus_0, actions){
  this.focus_0 = focus_0;
  this.actions = actions;
}

function parentOf(blip){
  return blip?$asThread($parentOf(dynamicCast(dynamicCast(blip.helper, 272), 273).this$0, dynamicCast(blip.impl, 274))):null;
}

function FocusedActions(){
}

_ = FocusedActions_0.prototype = FocusedActions.prototype = new Object_0;
_.getClass$ = function getClass_840(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_edit_FocusedActions_2_classLit;
}
;
_.castableTypeMap$ = {};
_.actions = null;
_.focus_0 = null;
function $init_6(this$static){
  $add_33(this$static.edit.listeners, this$static);
}

function KeepFocusInView_0(edit, waveUi){
  this.edit = edit;
  this.waveUi = waveUi;
}

function KeepFocusInView(){
}

_ = KeepFocusInView_0.prototype = KeepFocusInView.prototype = new Object_0;
_.getClass$ = function getClass_841(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_edit_KeepFocusInView_2_classLit;
}
;
_.onSessionEnd = function onSessionEnd_0(editor, blipUi){
  $remove_42(editor.updateEvent.updateListeners, this);
  this.viewport = null;
}
;
_.onSessionStart = function onSessionStart_0(editor, blipUi){
  this.viewport = $getThreadContainer(dynamicCast($getContents_0(this.waveUi).impl, 276));
  new DomScrollPanel_0(this.viewport);
  $add_33(editor.updateEvent.updateListeners, this);
}
;
_.onUpdate = function onUpdate_3(event_0){
  !!this.viewport && event_0.notedSelectionCoordsChanged && $clinit_1024();
}
;
_.castableTypeMap$ = {205:1, 275:1};
_.edit = null;
_.viewport = null;
_.waveUi = null;
function $handleAddButtonClicked(this$static, context){
  var $e0, addressString, conversation, e, participant, participant$index, participant$max, participants, participantsUi;
  addressString = $wnd.prompt("Add a participant(s) (separate with comma ','): ", '');
  if (addressString == null) {
    return;
  }
  try {
    participants = buildParticipantList(addressString);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 194)) {
      e = $e0;
      $wnd.alert("Invalid address '" + e.address + "': " + e.detailMessage);
      return;
    }
     else 
      throw $e0;
  }
  participantsUi = $fromAddButton(this$static.views, context);
  conversation = $participantsOf_0(this$static.models.viewIdMapper, dynamicCast(participantsUi.impl, 331).getId());
  for (participant$index = 0 , participant$max = participants.length; participant$index < participant$max; ++participant$index) {
    participant = participants[participant$index];
    checkState_2(conversation.isUsable, 'Cannot use destroyed conversation');
    $addParticipant_2(conversation.wavelet, participant);
  }
}

function $handleParticipantClicked(this$static, context){
  var participantView, participation, profile, profileUi, profileView, profileUi_0;
  participantView = $asParticipant(this$static.views, context);
  participation = $participantOf_0(this$static.models.viewIdMapper, dynamicCast(participantView.impl, 332).getId());
  profile = $getProfile(this$static.profiles, dynamicCast(participation.second, 160));
  profileView = new ProfilePopupWidget_0((dynamicCast((dynamicCast(participantView.helper, 277) , participantView.impl), 278) , $clinit_1562() , BELOW_RIGHT));
  profileUi = (profileUi_0 = new ProfilePopupPresenter_0(profile, profileView, this$static.profiles) , $init_15(profileUi_0.view, profileUi_0) , profileUi_0);
  $addButton_0(profileUi.view, ($clinit_572() , new SafeHtmlString_0('Remove')), new ParticipantController$3_0(participation, profileView));
  profileUi.view.address.textContent = profileUi.model.id_0.address || '';
  profileUi.view.name_0.textContent = $getFullName(profileUi.model) || '';
  profileUi.view.avatar.src = $getImageUrl(profileUi.model);
  $show_0(profileUi.view.popup);
}

function $install_6(this$static, handlers){
  $register_0(handlers.clickHandlers, ($clinit_1506() , dynamicCast($get_10(CODES, ($clinit_1428() , ADD_PARTICIPANT)), 1)), new ParticipantController$1_0(this$static));
  $register_0(handlers.clickHandlers, dynamicCast($get_10(CODES, PARTICIPANT), 1), new ParticipantController$2_0(this$static));
}

function ParticipantController_0(views, models, profiles){
  this.views = views;
  this.models = models;
  this.profiles = profiles;
}

function buildParticipantList(addresses){
  var address, addressList, i, participants;
  checkNotNull_1(addresses, 'Expected non-null address');
  addressList = $split(addresses, ',', 0);
  participants = initDim(_3Lorg_waveprotocol_wave_model_wave_ParticipantId_2_classLit, {9:1, 66:1}, 160, addressList.length, 0);
  for (i = 0; i < addressList.length; ++i) {
    address = $trim(addressList[i]);
    participants[i] = (validate_2(address) , new ParticipantId_0(address));
  }
  return participants;
}

function ParticipantController(){
}

_ = ParticipantController_0.prototype = ParticipantController.prototype = new Object_0;
_.getClass$ = function getClass_842(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_edit_ParticipantController_2_classLit;
}
;
_.castableTypeMap$ = {};
_.models = null;
_.profiles = null;
_.views = null;
function ParticipantController$1_0(this$0){
  this.this$0 = this$0;
}

function ParticipantController$1(){
}

_ = ParticipantController$1_0.prototype = ParticipantController$1.prototype = new Object_0;
_.getClass$ = function getClass_843(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_edit_ParticipantController$1_2_classLit;
}
;
_.onClick_0 = function onClick_4(event_0, context){
  $handleAddButtonClicked(this.this$0, context);
  return true;
}
;
_.castableTypeMap$ = {264:1};
_.this$0 = null;
function ParticipantController$2_0(this$0){
  this.this$0 = this$0;
}

function ParticipantController$2(){
}

_ = ParticipantController$2_0.prototype = ParticipantController$2.prototype = new Object_0;
_.getClass$ = function getClass_844(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_edit_ParticipantController$2_2_classLit;
}
;
_.onClick_0 = function onClick_5(event_0, context){
  $handleParticipantClicked(this.this$0, context);
  return true;
}
;
_.castableTypeMap$ = {264:1};
_.this$0 = null;
function ParticipantController$3_0(val$participation, val$profileView){
  this.val$participation = val$participation;
  this.val$profileView = val$profileView;
}

function ParticipantController$3(){
}

_ = ParticipantController$3_0.prototype = ParticipantController$3.prototype = new Object_0;
_.getClass$ = function getClass_845(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_edit_ParticipantController$3_2_classLit;
}
;
_.onClick = function onClick_6(event_0){
  $removeParticipant(dynamicCast(this.val$participation.first, 245), dynamicCast(this.val$participation.second, 160));
  $hide(this.val$profileView.popup);
}
;
_.castableTypeMap$ = {24:1, 37:1};
_.val$participation = null;
_.val$profileView = null;
function $findMostRecentlyModified(this$static, start){
  var blip, blipUi, blips, lmt, entrySet;
  blipUi = start;
  blips = ($clinit_2278() , new HashMap_0);
  while (blipUi) {
    blip = $blipOf_0(this$static.views.viewIdMapper, dynamicCast(blipUi.impl, 330).getId());
    blips.put(valueOf_13(valueOf_13(blip.blip.blip.lastModifiedTime).value_0), blipUi);
    blipUi = $getNext_2(this$static.traverser, blipUi);
  }
  lmt = dynamicCast(($clinit_467() , max_3((entrySet = blips.entrySet_0() , new AbstractMap$1_0(blips, entrySet)))), 65).value_0;
  return dynamicCast(blips.get(valueOf_13(lmt)), 279);
}

function $getOrFindRootBlip(this$static){
  var blip, conversation, rootBlipUi;
  if (!this$static.rootBlip) {
    conversation = $getRoot(this$static.wave);
    if (!conversation) {
      return null;
    }
     else {
      blip = $getFirstBlip($getRoot(this$static.wave).rootThread);
      rootBlipUi = $getBlipView(this$static.views, blip);
      if (!rootBlipUi) {
        return null;
      }
      this$static.rootBlip = rootBlipUi;
    }
  }
  return this$static.rootBlip;
}

function $selectMostRecentlyModified(this$static){
  var blip, conversation, rootBlipUi;
  conversation = $getRoot(this$static.wave);
  if (!conversation) {
    return null;
  }
   else {
    blip = $getFirstBlip($getRoot(this$static.wave).rootThread);
    rootBlipUi = $getBlipView(this$static.views, blip);
    if (!rootBlipUi) {
      return null;
    }
    return $findMostRecentlyModified(this$static, rootBlipUi);
  }
}

function FocusBlipSelector_0(wave, models, traverser){
  this.wave = wave;
  this.views = models;
  this.traverser = traverser;
}

function FocusBlipSelector(){
}

_ = FocusBlipSelector_0.prototype = FocusBlipSelector.prototype = new Object_0;
_.getClass$ = function getClass_846(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_focus_FocusBlipSelector_2_classLit;
}
;
_.castableTypeMap$ = {};
_.rootBlip = null;
_.traverser = null;
_.views = null;
_.wave = null;
function ReplyIndicatorController_0(actions, editSession, panel){
  this.actions = actions;
  this.panel = panel;
  this.editSession = editSession;
  $add_33(this.editSession.listeners, this);
}

function ReplyIndicatorController(){
}

_ = ReplyIndicatorController_0.prototype = ReplyIndicatorController.prototype = new Object_0;
_.getClass$ = function getClass_850(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_indicator_ReplyIndicatorController_2_classLit;
}
;
_.onMouseDown_0 = function onMouseDown_2(event_0, context){
  var indicatorView, threadView;
  if ($eventGetButton(event_0.nativeEvent) != 1) {
    return false;
  }
  if ($equals_3(($clinit_1506() , dynamicCast($get_10(CODES, ($clinit_1428() , REPLY_BOX)), 1)), context.getAttribute('kind') || '')) {
    indicatorView = $asReplyBox_0(this.panel, context);
    threadView = $asRootThread_0($parentOf(dynamicCast(dynamicCast(indicatorView.helper, 300), 301).this$0, dynamicCast(indicatorView.impl, 302)));
    $addContinuation(this.actions, threadView);
  }
   else if ($equals_3(dynamicCast($get_10(CODES, CONTINUATION_INDICATOR), 1), context.getAttribute('kind') || '')) {
    indicatorView = $asContinuationIndicator(this.panel, context);
    threadView = $asInlineThread_0($parentOf(dynamicCast(dynamicCast(indicatorView.helper, 303), 304).this$0, dynamicCast(indicatorView.impl, 305)));
    $addContinuation(this.actions, threadView);
  }
  event_0.nativeEvent.preventDefault();
  return true;
}
;
_.onSessionEnd = function onSessionEnd_1(e, blipView){
  $asThread($parentOf(dynamicCast(dynamicCast(blipView.helper, 272), 273).this$0, dynamicCast(blipView.impl, 274))).getReplyIndicator().enable_0();
}
;
_.onSessionStart = function onSessionStart_1(e, blipUi){
  var threadUi;
  threadUi = $asThread($parentOf(dynamicCast(dynamicCast(blipUi.helper, 272), 273).this$0, dynamicCast(blipUi.impl, 274)));
  !threadUi.getBlipAfter(blipUi) && threadUi.getReplyIndicator().disable_0();
}
;
_.castableTypeMap$ = {267:1, 275:1};
_.actions = null;
_.editSession = null;
_.panel = null;
function MenuController_0(actions, panel){
  this.actions = actions;
  this.panel = panel;
}

function MenuController(){
}

_ = MenuController_0.prototype = MenuController.prototype = new Object_0;
_.getClass$ = function getClass_851(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_menu_MenuController_2_classLit;
}
;
_.onClick_0 = function onClick_7(event_0, context){
  var item;
  if ($eventGetButton(event_0.nativeEvent) != 1) {
    return false;
  }
  item = $asBlipMenuItem(this.panel, context);
  switch (dynamicCast(item.impl, 306).getOption().ordinal) {
    case 3:
      dynamicCast(item.impl, 306).isSelected()?$endSession(this.actions.edit):$focusAndEdit(this.actions, $getParent_4($asBlipMeta_0($parentOf(dynamicCast(dynamicCast(item.helper, 307), 308).this$0, dynamicCast(item.impl, 309)))));
      break;
    case 0:
      $reply(this.actions, $getParent_4($asBlipMeta_0($parentOf(dynamicCast(dynamicCast(item.helper, 307), 308).this$0, dynamicCast(item.impl, 309)))));
      break;
    case 1:
      $delete(this.actions, $getParent_4($asBlipMeta_0($parentOf(dynamicCast(dynamicCast(item.helper, 307), 308).this$0, dynamicCast(item.impl, 309)))));
      break;
    case 2:
      $popupLink(this.actions, $getParent_4($asBlipMeta_0($parentOf(dynamicCast(dynamicCast(item.helper, 307), 308).this$0, dynamicCast(item.impl, 309)))));
      break;
    default:throw new AssertionError_0;
  }
  event_0.nativeEvent.preventDefault();
  return true;
}
;
_.castableTypeMap$ = {264:1};
_.actions = null;
_.panel = null;
function $isRead(this$static, blipUi){
  return !$isUnread(this$static.supplement, $blipOf_0(this$static.models.viewIdMapper, dynamicCast(blipUi.impl, 330).getId()));
}

function $maybeSetOrUpdateTitle(this$static){
  var document_0, editBlip, titleRange, start;
  if (!!this$static.blipUi && !!this$static.editor) {
    document_0 = $getDocument_0(this$static.editor);
    editBlip = $blipOf_0(this$static.views.viewIdMapper, dynamicCast(this$static.blipUi.impl, 330).getId());
    if (editBlip.parentThread == editBlip.helper.this$0.rootThread && editBlip == $getFirstBlip(editBlip.parentThread) && !($clinit_1724() , start = $firstAnnotationChange_0(document_0, 0, $size_15(document_0.doc), TITLE_KEY, null) , start != -1 && !!$getAnnotation_2(document_0.doc, start, TITLE_KEY).length)) {
      titleRange = findImplicitTitle(document_0);
      setImplicitTitle(document_0, titleRange.start, titleRange.end);
    }
  }
}

function WaveTitleHandler_0(editSession, views){
  this.views = views;
  this.editSession = editSession;
  $add_33(this.editSession.listeners, this);
}

function WaveTitleHandler(){
}

_ = WaveTitleHandler_0.prototype = WaveTitleHandler.prototype = new Object_0;
_.getClass$ = function getClass_853(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_title_WaveTitleHandler_2_classLit;
}
;
_.onSessionEnd = function onSessionEnd_2(editor, blipUi){
  $remove_42(editor.updateEvent.updateListeners, this);
  this.blipUi = null;
  this.editor = null;
}
;
_.onSessionStart = function onSessionStart_2(editor, blipUi){
  $add_33(editor.updateEvent.updateListeners, this);
  this.blipUi = blipUi;
}
;
_.onUpdate = function onUpdate_4(event_0){
  this.editor = event_0.editor;
  event_0.notedContentChanged && this.editor.editing && $maybeSetOrUpdateTitle(this);
}
;
_.castableTypeMap$ = {205:1, 275:1};
_.blipUi = null;
_.editSession = null;
_.editor = null;
_.views = null;
function $createAlignButtons(this$static, toolbar_0){
  var alignment, alignment$array, alignment$index, alignment$max, b, group, submenu, fakeButton;
  submenu = $addSubmenu(toolbar_0);
  $applyToDisplay($setIcon(new ToolbarButtonViewBuilder_0, 'C-IJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-alignDrop'), submenu);
  submenu.button_0.setShowDropdownArrow(false);
  group = new GroupingToolbar_0(submenu, (fakeButton = $addClickButton_0(submenu) , $setState_0(fakeButton, ($clinit_1613() , INVISIBLE)) , fakeButton));
  for (alignment$array = initValues(_3Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$Alignment_2_classLit, {9:1, 66:1}, 115, [new EditToolbar$Alignment_0('Left', 'C-KJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-alignLeft', ($clinit_910() , LEFT_1)), new EditToolbar$Alignment_0('Centre', 'C-HJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-alignCentre', CENTER_1), new EditToolbar$Alignment_0('Right', 'C-LJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-alignRight', RIGHT_1)]) , alignment$index = 0 , alignment$max = alignment$array.length; alignment$index < alignment$max; ++alignment$index) {
    alignment = alignment$array[alignment$index];
    b = $addToggleButton(group);
    $applyTo_1($setIcon($setText_3(new ToolbarButtonViewBuilder_0, alignment.description), alignment.iconCss), b, $createParagraphApplicationController(this$static, b, alignment.style_0));
  }
}

function $createFontFamilyGroup(this$static, toolbar_0, families){
  var b, family, family$index, family$max, e;
  for (family$index = 0 , family$max = families.length; family$index < family$max; ++family$index) {
    family = families[family$index];
    b = $addToggleButton(toolbar_0);
    b.button_0.setVisualElement((e = $doc.createElement('span') , e.style['fontFamily'] = family.style_0 , e.textContent = family.description || '' , e));
    b.listener = $createTextSelectionController(this$static, b, family.style_0);
  }
}

function $createFontSizeButton(this$static, toolbar_0){
  var b, group, size, size$array, size$index, size$max, submenu, fakeButton, e;
  submenu = $addSubmenu(toolbar_0);
  $applyToDisplay($setIcon(new ToolbarButtonViewBuilder_0, 'C-PJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-fontSize'), submenu);
  submenu.button_0.setShowDropdownArrow(false);
  group = new GroupingToolbar_0(submenu, (fakeButton = $addClickButton_0(submenu) , $setState_0(fakeButton, ($clinit_1613() , INVISIBLE)) , fakeButton));
  for (size$array = initValues(_3Ljava_lang_Integer_2_classLit, {9:1, 66:1}, 64, [valueOf_12(8), valueOf_12(9), valueOf_12(10), valueOf_12(11), valueOf_12(12), valueOf_12(14), valueOf_12(16), valueOf_12(18), valueOf_12(21), valueOf_12(24), valueOf_12(28), valueOf_12(32), valueOf_12(36), valueOf_12(42), valueOf_12(48), valueOf_12(56), valueOf_12(64), valueOf_12(72)]) , size$index = 0 , size$max = size$array.length; size$index < size$max; ++size$index) {
    size = size$array[size$index].value_0;
    b = $addToggleButton(group);
    b.button_0.setVisualElement((e = $doc.createElement('span') , e.style['fontSize'] = size / 12 + ($clinit_88() , 'em') , e.textContent = ~~Math.max(Math.min(size, 2147483647), -2147483648) + '' || '' , e));
    b.listener = dynamicCast($add_19(this$static.updater, new TextSelectionController_0(b, this$static.editor, ($clinit_890() , 'style/fontSize'), size / 12 + 'em')), 310);
  }
}

function $createHeadingButton(this$static, toolbar_0){
  var b, defaultButton, group, level, level$array, level$index, level$max, submenu, fakeButton, e;
  submenu = $addSubmenu(toolbar_0);
  $applyToDisplay($setIcon(new ToolbarButtonViewBuilder_0, 'C-AK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-heading'), submenu);
  submenu.button_0.setShowDropdownArrow(false);
  defaultButton = $addClickButton_0(submenu);
  $applyTo_0($setText_3(new ToolbarButtonViewBuilder_0, 'Default'), defaultButton, new ParagraphTraversalController_0(this$static.editor, new EditToolbar$6_0));
  group = new GroupingToolbar_0(submenu, (fakeButton = $addClickButton_0(submenu) , $setState_0(fakeButton, ($clinit_1613() , INVISIBLE)) , fakeButton));
  for (level$array = initValues(_3Ljava_lang_Integer_2_classLit, {9:1, 66:1}, 64, [valueOf_12(1), valueOf_12(2), valueOf_12(3), valueOf_12(4)]) , level$index = 0 , level$max = level$array.length; level$index < level$max; ++level$index) {
    level = level$array[level$index].value_0;
    b = $addToggleButton(group);
    b.button_0.setVisualElement((e = $doc.createElement('h' + level) , e.style['marginTop'] = 2 + ($clinit_88() , 'px') , e.style['marginBottom'] = '2px' , e.textContent = 'Heading ' + level || '' , e));
    b.listener = $createParagraphApplicationController(this$static, b, ($clinit_905() , checkArgument_2(!$equals_3('li', 'h' + level), "Don't use regularStyle() for list styles, use listStyle()") , new Paragraph$RegularStyler_0('h' + level)));
  }
}

function $createParagraphApplicationController(this$static, b, style){
  return dynamicCast($add_19(this$static.updater, new ParagraphApplicationController_0(b, this$static.editor, style)), 310);
}

function $createTextSelectionController(this$static, b, value){
  return dynamicCast($add_19(this$static.updater, new TextSelectionController_0(b, this$static.editor, ($clinit_890() , 'style/fontFamily'), value)), 310);
}

function $disable(this$static, editor){
  checkState_2(this$static.editor.editor == editor, 'wrong editor');
  checkState(!!editor);
  $remove_42(editor.updateEvent.updateListeners, this$static.updater);
  this$static.editor.editor = null;
}

function $enable(this$static, editor){
  checkState_2(this$static.editor.editor == null, 'wrong editor');
  checkArgument(!!editor);
  this$static.editor.editor = editor;
  $add_33(editor.updateEvent.updateListeners, this$static.updater);
  $updateButtonStates(this$static.updater);
}

function $init_7(this$static){
  var group, b, b_0, b_1, b_2, b_3, b_4, submenu, fakeButton, fakeButton_0, fakeButton_1, b_5, b_6, b_7, b_8, waveRef, waveRefToken;
  group = $addGroup(this$static.toolbarUi);
  b = $addToggleButton(group);
  $applyTo_1($setIcon(new ToolbarButtonViewBuilder_0, 'C-MJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-bold'), b, dynamicCast($add_19(this$static.updater, new TextSelectionController_0(b, this$static.editor, ($clinit_890() , 'style/fontWeight'), 'bold')), 310));
  b_0 = $addToggleButton(group);
  $applyTo_1($setIcon(new ToolbarButtonViewBuilder_0, 'C-FK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-italic'), b_0, dynamicCast($add_19(this$static.updater, new TextSelectionController_0(b_0, this$static.editor, 'style/fontStyle', 'italic')), 310));
  b_1 = $addToggleButton(group);
  $applyTo_1($setIcon(new ToolbarButtonViewBuilder_0, 'C-MK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-underline'), b_1, dynamicCast($add_19(this$static.updater, new TextSelectionController_0(b_1, this$static.editor, 'style/textDecoration', 'underline')), 310));
  b_2 = $addToggleButton(group);
  $applyTo_1($setIcon(new ToolbarButtonViewBuilder_0, 'C-JK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-strikethrough'), b_2, dynamicCast($add_19(this$static.updater, new TextSelectionController_0(b_2, this$static.editor, 'style/textDecoration', 'line-through')), 310));
  group = $addGroup(this$static.toolbarUi);
  b_3 = $addToggleButton(group);
  $applyTo_1($setIcon(new ToolbarButtonViewBuilder_0, 'C-LK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-superscript'), b_3, dynamicCast($add_19(this$static.updater, new TextSelectionController_0(b_3, this$static.editor, 'style/verticalAlign', 'super')), 310));
  b_4 = $addToggleButton(group);
  $applyTo_1($setIcon(new ToolbarButtonViewBuilder_0, 'C-KK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-subscript'), b_4, dynamicCast($add_19(this$static.updater, new TextSelectionController_0(b_4, this$static.editor, 'style/verticalAlign', 'sub')), 310));
  group = $addGroup(this$static.toolbarUi);
  $createFontSizeButton(this$static, group);
  submenu = $addSubmenu(group);
  $applyToDisplay($setIcon(new ToolbarButtonViewBuilder_0, 'C-OJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-fontFamily'), submenu);
  submenu.button_0.setShowDropdownArrow(false);
  $createFontFamilyGroup(this$static, new GroupingToolbar_0(submenu, (fakeButton = $addClickButton_0(submenu) , $setState_0(fakeButton, ($clinit_1613() , INVISIBLE)) , fakeButton)), initValues(_3Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$FontFamily_2_classLit, {9:1, 66:1}, 116, [new EditToolbar$FontFamily_0('Default', null)]));
  $createFontFamilyGroup(this$static, new GroupingToolbar_0(submenu, (fakeButton_0 = $addClickButton_0(submenu) , $setState_0(fakeButton_0, INVISIBLE) , fakeButton_0)), initValues(_3Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$FontFamily_2_classLit, {9:1, 66:1}, 116, [new EditToolbar$FontFamily_0('Sans Serif', 'sans-serif'), new EditToolbar$FontFamily_0('Serif', 'serif'), new EditToolbar$FontFamily_0('Wide', 'arial black,sans-serif'), new EditToolbar$FontFamily_0('Narrow', 'arial narrow,sans-serif'), new EditToolbar$FontFamily_0('Fixed Width', 'monospace')]));
  $createFontFamilyGroup(this$static, new GroupingToolbar_0(submenu, (fakeButton_1 = $addClickButton_0(submenu) , $setState_0(fakeButton_1, INVISIBLE) , fakeButton_1)), initValues(_3Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$FontFamily_2_classLit, {9:1, 66:1}, 116, [new EditToolbar$FontFamily_0('Arial', 'arial,helvetica,sans-serif'), new EditToolbar$FontFamily_0('Comic Sans MS', 'comic sans ms,sans-serif'), new EditToolbar$FontFamily_0('Courier New', 'courier new,monospace'), new EditToolbar$FontFamily_0('Garamond', 'garamond,serif'), new EditToolbar$FontFamily_0('Georgia', 'georgia,serif'), new EditToolbar$FontFamily_0('Tahoma', 'tahoma,sans-serif'), new EditToolbar$FontFamily_0('Times New Roman', 'times new roman,serif'), new EditToolbar$FontFamily_0('Trebuchet MS', 'trebuchet ms,sans-serif'), new EditToolbar$FontFamily_0('Verdana', 'verdana,sans-serif')]));
  $createHeadingButton(this$static, group);
  group = $addGroup(this$static.toolbarUi);
  b_5 = $addClickButton(group);
  $applyTo_0($setIcon(new ToolbarButtonViewBuilder_0, 'C-BK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-indent'), b_5, new ParagraphTraversalController_0(this$static.editor, ($clinit_905() , INDENTER)));
  b_6 = $addClickButton(group);
  $applyTo_0($setIcon(new ToolbarButtonViewBuilder_0, 'C-HK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-outdent'), b_6, new ParagraphTraversalController_0(this$static.editor, OUTDENTER));
  group = $addGroup(this$static.toolbarUi);
  b_7 = $addToggleButton(group);
  $applyTo_1($setIcon(new ToolbarButtonViewBuilder_0, 'C-NK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-unorderedlist'), b_7, $createParagraphApplicationController(this$static, b_7, new Paragraph$ListStyler_0(null)));
  b_8 = $addToggleButton(group);
  $applyTo_1($setIcon(new ToolbarButtonViewBuilder_0, 'C-GK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-orderedlist'), b_8, $createParagraphApplicationController(this$static, b_8, new Paragraph$ListStyler_0('decimal')));
  group = $addGroup(this$static.toolbarUi);
  $createAlignButtons(this$static, group);
  $applyTo_0($setIcon(new ToolbarButtonViewBuilder_0, 'C-NJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-clearFormatting'), $addClickButton(group), new EditToolbar$1_0(this$static));
  group = $addGroup(this$static.toolbarUi);
  $applyTo_0($setIcon(new ToolbarButtonViewBuilder_0, 'C-EK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-insertLink'), $addClickButton(group), new EditToolbar$4_0(this$static));
  $applyTo_0($setIcon(new ToolbarButtonViewBuilder_0, 'C-IK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-removeLink'), $addClickButton(group), new EditToolbar$5_0(this$static));
  group = $addGroup(this$static.toolbarUi);
  $applyTo_0($setIcon(new ToolbarButtonViewBuilder_0, 'C-DK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-insertGadget'), $addClickButton(group), new EditToolbar$2_0(this$static));
  group = $addGroup(this$static.toolbarUi);
  waveRef = of_11(this$static.waveId);
  checkState(!!waveRef);
  waveRefToken = encode(($clinit_2410() , $encode_0(waveRef, ($clinit_2408() , QUERY))));
  $applyTo_0($setTooltip_0($setIcon(new ToolbarButtonViewBuilder_0, 'C-CK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-insertAttachment')), $addClickButton(group), new EditToolbar$3_0(this$static, waveRefToken));
}

function $insertGadget(this$static, url){
  var document_0, focusedRange, from, point, xml;
  from = -1;
  focusedRange = $getSelectionHelper(this$static.editor).getSelectionRange();
  !!focusedRange && (from = focusedRange.focus_0);
  if (url != null && !!url.length) {
    xml = constructXml(url, this$static.user.address);
    document_0 = $getDocument(this$static.editor);
    if (!document_0) {
      return;
    }
    if (from != -1) {
      point = $locate_0(document_0.doc, from);
      $insertXml(document_0, point, xml);
    }
     else {
      $clinit_2104();
      appendLine(document_0, xml, ($clinit_1849() , EMPTY_MAP_0));
    }
  }
}

function EditToolbar_0(toolbarUi, user, idGenerator, waveId){
  this.editor = new EditorContextAdapter_0;
  this.updater = new ButtonUpdater_0(this.editor);
  this.toolbarUi = toolbarUi;
  this.user = user;
  this.waveId = waveId;
  this.attachmentIdGenerator = new AttachmentIdGeneratorImpl_0(idGenerator);
}

function create_36(user, idGenerator, waveId){
  var toolbarUi;
  toolbarUi = new ToplevelToolbarWidget_0;
  $clinit_1317();
  return new EditToolbar_0(toolbarUi, user, idGenerator, waveId);
}

function EditToolbar(){
}

_ = EditToolbar_0.prototype = EditToolbar.prototype = new Object_0;
_.getClass$ = function getClass_854(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar_2_classLit;
}
;
_.castableTypeMap$ = {};
_.attachmentIdGenerator = null;
_.toolbarUi = null;
_.user = null;
_.waveId = null;
function EditToolbar$1_0(this$0){
  this.this$0 = this$0;
}

function EditToolbar$1(){
}

_ = EditToolbar$1_0.prototype = EditToolbar$1.prototype = new Object_0;
_.getClass$ = function getClass_855(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$1_2_classLit;
}
;
_.onClicked = function onClicked_0(){
  clearAnnotationsOverSelection(this.this$0.editor, initValues(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, [($clinit_890() , 'style/backgroundColor'), 'style/color', 'style/fontFamily', 'style/fontSize', 'style/fontStyle', 'style/fontWeight', 'style/textDecoration', 'style/verticalAlign']));
  $onClicked(new ParagraphTraversalController_0(this.this$0.editor, new EditToolbar$6_0));
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function EditToolbar$2_0(this$0){
  this.this$0 = this$0;
}

function EditToolbar$2(){
}

_ = EditToolbar$2_0.prototype = EditToolbar$2.prototype = new Object_0;
_.getClass$ = function getClass_856(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$2_2_classLit;
}
;
_.onClicked = function onClicked_1(){
  var popup, selector, popup_0, titleBar;
  selector = new GadgetSelectorWidget_0(new GadgetInfoProviderImpl_0);
  $addFeaturedOptions(selector);
  popup = (!provider_0 && (provider_0 = new MobilePopupChromeProvider_0) , popup_0 = (!provider_1 && (provider_1 = new MobilePopupProvider_0) , new MobileUniversalPopup_0(provider_1.root)) , titleBar = $getTitleBar(popup_0) , $setTextOrHtml(titleBar.title_0.directionalTextHelper, 'Select Gadget', false) , $add_28(popup_0.popup, selector) , $show_0(popup_0) , $scheduleDeferred(($clinit_30() , INSTANCE), new GadgetSelectorWidget$1_0(selector)) , $addDomHandler(selector.gadgetFilter, new GadgetSelectorWidget$2_0(selector), ($clinit_145() , $clinit_145() , TYPE_5)) , $addDomHandler(selector.gadgetFilter, new GadgetSelectorWidget$3_0(selector), ($clinit_143() , $clinit_143() , TYPE_4)) , $addDomHandler(selector.gadgetUrl, new GadgetSelectorWidget$4_0(selector), TYPE_4) , $addDomHandler(selector.categoryDropBox, new GadgetSelectorWidget$5_0(selector), ($clinit_109() , $clinit_109() , TYPE_0)) , popup_0);
  selector.listener = new EditToolbar$2$1_0(this, popup);
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function $onSelect(this$static, url){
  $insertGadget(this$static.this$1.this$0, url);
  $hide(this$static.val$popup);
}

function EditToolbar$2$1_0(this$1, val$popup){
  this.this$1 = this$1;
  this.val$popup = val$popup;
}

function EditToolbar$2$1(){
}

_ = EditToolbar$2$1_0.prototype = EditToolbar$2$1.prototype = new Object_0;
_.getClass$ = function getClass_857(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$2$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$1 = null;
_.val$popup = null;
function EditToolbar$3_0(this$0, val$waveRefToken){
  this.this$0 = this$0;
  this.val$waveRefToken = val$waveRefToken;
}

function EditToolbar$3(){
}

_ = EditToolbar$3_0.prototype = EditToolbar$3.prototype = new Object_0;
_.getClass$ = function getClass_858(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$3_2_classLit;
}
;
_.onClicked = function onClicked_2(){
  var attachmentView, focusedRange, tmpCursor;
  tmpCursor = -1;
  focusedRange = $getSelectionHelper(this.this$0.editor).getSelectionRange();
  !!focusedRange && (tmpCursor = focusedRange.focus_0);
  attachmentView = new AttachmentPopupWidget_0;
  $init_10(attachmentView, new EditToolbar$3$1_0(this, tmpCursor));
  attachmentView.attachmentId = $newAttachmentId(this.this$0.attachmentIdGenerator);
  attachmentView.waveRefStr = this.val$waveRefToken;
  checkState(!!attachmentView.attachmentId);
  attachmentView.form.element.action = '/attachment/' + attachmentView.attachmentId.id_0;
  attachmentView.spinnerPanel.element.style.display = 'none';
  $show_0(attachmentView.popup);
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
_.val$waveRefToken = null;
function $onDone(this$static, encodedWaveRef, attachmentId, fullFileName){
  var doc, docSize, fileName, lastBackSlashPos, lastSlashPos, linkValue, point, to, xml;
  lastSlashPos = fullFileName.lastIndexOf('/');
  lastBackSlashPos = fullFileName.lastIndexOf('\\');
  fileName = fullFileName;
  lastSlashPos != -1?(fileName = $substring_0(fullFileName, lastSlashPos + 1, fullFileName.length)):lastBackSlashPos != -1 && (fileName = $substring_0(fullFileName, lastBackSlashPos + 1, fullFileName.length));
  xml = innerXml($parse_1(($clinit_2081() , fileName)));
  docSize = $size_15($getDocument(this$static.this$1.this$0.editor).doc);
  if (this$static.val$cursorLoc != -1) {
    doc = $getDocument(this$static.this$1.this$0.editor);
    point = $locate_0(doc.doc, this$static.val$cursorLoc);
    $insertXml(doc, point, xml);
  }
   else {
    $clinit_2104();
    appendLine($getDocument(this$static.this$1.this$0.editor), xml, ($clinit_1849() , EMPTY_MAP_0));
  }
  to = this$static.val$cursorLoc + $size_15($getDocument(this$static.this$1.this$0.editor).doc) - docSize;
  linkValue = getHostPageBaseURL() + 'attachment/' + attachmentId + '?fileName=' + fileName + '&waveRef=' + encodedWaveRef;
  setAnnotationOverRange($getDocument(this$static.this$1.this$0.editor), $getCaretAnnotations(this$static.this$1.this$0.editor), 'link', linkValue, this$static.val$cursorLoc, to);
  setAnnotationOverRange($getDocument(this$static.this$1.this$0.editor), $getCaretAnnotations(this$static.this$1.this$0.editor), 'attachment/id', attachmentId, this$static.val$cursorLoc, to);
  setAnnotationOverRange($getDocument(this$static.this$1.this$0.editor), $getCaretAnnotations(this$static.this$1.this$0.editor), 'attachment/fileName', fileName, this$static.val$cursorLoc, to);
}

function EditToolbar$3$1_0(this$1, val$cursorLoc){
  this.this$1 = this$1;
  this.val$cursorLoc = val$cursorLoc;
}

function EditToolbar$3$1(){
}

_ = EditToolbar$3$1_0.prototype = EditToolbar$3$1.prototype = new Object_0;
_.getClass$ = function getClass_859(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$3$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$1 = null;
_.val$cursorLoc = 0;
function EditToolbar$4_0(this$0){
  this.this$0 = this$0;
}

function EditToolbar$4(){
}

_ = EditToolbar$4_0.prototype = EditToolbar$4.prototype = new Object_0;
_.getClass$ = function getClass_860(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$4_2_classLit;
}
;
_.onClicked = function onClicked_3(){
  onCreateLink(this.this$0.editor);
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function EditToolbar$5_0(this$0){
  this.this$0 = this$0;
}

function EditToolbar$5(){
}

_ = EditToolbar$5_0.prototype = EditToolbar$5.prototype = new Object_0;
_.getClass$ = function getClass_861(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$5_2_classLit;
}
;
_.onClicked = function onClicked_4(){
  onClearLink(this.this$0.editor);
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function EditToolbar$6_0(){
}

function EditToolbar$6(){
}

_ = EditToolbar$6_0.prototype = EditToolbar$6.prototype = new Object_0;
_.execute_3 = function execute_54(e){
  $setElementAttribute(e.context.this$0.mutableContent, e, 't', null);
}
;
_.getClass$ = function getClass_862(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$6_2_classLit;
}
;
_.castableTypeMap$ = {12:1};
function EditToolbar$Alignment_0(description, iconCss, style){
  this.description = description;
  this.iconCss = iconCss;
  this.style_0 = style;
}

function EditToolbar$Alignment(){
}

_ = EditToolbar$Alignment_0.prototype = EditToolbar$Alignment.prototype = new Object_0;
_.getClass$ = function getClass_863(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$Alignment_2_classLit;
}
;
_.castableTypeMap$ = {115:1};
_.description = null;
_.iconCss = null;
_.style_0 = null;
function EditToolbar$FontFamily_0(description, style){
  this.description = description;
  this.style_0 = style;
}

function EditToolbar$FontFamily(){
}

_ = EditToolbar$FontFamily_0.prototype = EditToolbar$FontFamily.prototype = new Object_0;
_.getClass$ = function getClass_864(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$FontFamily_2_classLit;
}
;
_.castableTypeMap$ = {116:1};
_.description = null;
_.style_0 = null;
function $clinit_1317(){
  $clinit_1317 = nullMethod;
  $clinit_1318();
  $clinit_99();
  $push_1(toInject, ($clinit_204() , '.C-MJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-bold {\n  height : ' + bold.height_0 + 'px;\n  width : ' + bold.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + bold.url + '") -' + bold.left + 'px -' + bold.top_0 + 'px  no-repeat;\n}\n.C-FK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-italic {\n  height : ' + italic.height_0 + 'px;\n  width : ' + italic.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + italic.url + '") -' + italic.left + 'px -' + italic.top_0 + 'px  no-repeat;\n}\n.C-MK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-underline {\n  height : ' + underline.height_0 + 'px;\n  width : ' + underline.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + underline.url + '") -' + underline.left + 'px -' + underline.top_0 + 'px  no-repeat;\n}\n.C-JK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-strikethrough {\n  height : ' + strikethrough.height_0 + 'px;\n  width : ' + strikethrough.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + strikethrough.url + '") -' + strikethrough.left + 'px -' + strikethrough.top_0 + 'px  no-repeat;\n}\n.C-LK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-superscript {\n  height : ' + superscript.height_0 + 'px;\n  width : ' + superscript.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + superscript.url + '") -' + superscript.left + 'px -' + superscript.top_0 + 'px  no-repeat;\n}\n.C-KK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-subscript {\n  height : ' + subscript.height_0 + 'px;\n  width : ' + subscript.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + subscript.url + '") -' + subscript.left + 'px -' + subscript.top_0 + 'px  no-repeat;\n}\n.C-PJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-fontSize {\n  height : ' + fontSize_0.height_0 + 'px;\n  width : ' + fontSize_0.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + fontSize_0.url + '") -' + fontSize_0.left + 'px -' + fontSize_0.top_0 + 'px  no-repeat;\n}\n.C-OJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-fontFamily {\n  height : ' + fontFamily.height_0 + 'px;\n  width : ' + fontFamily.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + fontFamily.url + '") -' + fontFamily.left + 'px -' + fontFamily.top_0 + 'px  no-repeat;\n}\n.C-AK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-heading {\n  height : ' + heading.height_0 + 'px;\n  width : ' + heading.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + heading.url + '") -' + heading.left + 'px -' + heading.top_0 + 'px  no-repeat;\n}\n.C-BK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-indent {\n  height : ' + indent_4.height_0 + 'px;\n  width : ' + indent_4.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + indent_4.url + '") -' + indent_4.left + 'px -' + indent_4.top_0 + 'px  no-repeat;\n}\n.C-HK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-outdent {\n  height : ' + outdent_0.height_0 + 'px;\n  width : ' + outdent_0.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + outdent_0.url + '") -' + outdent_0.left + 'px -' + outdent_0.top_0 + 'px  no-repeat;\n}\n.C-NK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-unorderedlist {\n  height : ' + unorderedlist.height_0 + 'px;\n  width : ' + unorderedlist.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + unorderedlist.url + '") -' + unorderedlist.left + 'px -' + unorderedlist.top_0 + 'px  no-repeat;\n}\n.C-GK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-orderedlist {\n  height : ' + orderedlist.height_0 + 'px;\n  width : ' + orderedlist.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + orderedlist.url + '") -' + orderedlist.left + 'px -' + orderedlist.top_0 + 'px  no-repeat;\n}\n.C-IJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-alignDrop {\n  height : ' + alignDrop.height_0 + 'px;\n  width : ' + alignDrop.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + alignDrop.url + '") -' + alignDrop.left + 'px -' + alignDrop.top_0 + 'px  no-repeat;\n}\n.C-KJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-alignLeft {\n  height : ' + alignLeft.height_0 + 'px;\n  width : ' + alignLeft.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + alignLeft.url + '") -' + alignLeft.left + 'px -' + alignLeft.top_0 + 'px  no-repeat;\n}\n.C-HJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-alignCentre {\n  height : ' + alignCentre.height_0 + 'px;\n  width : ' + alignCentre.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + alignCentre.url + '") -' + alignCentre.left + 'px -' + alignCentre.top_0 + 'px  no-repeat;\n}\n.C-LJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-alignRight {\n  height : ' + alignRight.height_0 + 'px;\n  width : ' + alignRight.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + alignRight.url + '") -' + alignRight.left + 'px -' + alignRight.top_0 + 'px  no-repeat;\n}\n.C-JJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-alignJustify {\n  height : ' + alignJustify.height_0 + 'px;\n  width : ' + alignJustify.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + alignJustify.url + '") -' + alignJustify.left + 'px -' + alignJustify.top_0 + 'px  no-repeat;\n}\n.C-NJ-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-clearFormatting {\n  height : ' + clearFormatting.height_0 + 'px;\n  width : ' + clearFormatting.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + clearFormatting.url + '") -' + clearFormatting.left + 'px -' + clearFormatting.top_0 + 'px  no-repeat;\n}\n.C-EK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-insertLink {\n  height : ' + insertLink.height_0 + 'px;\n  width : ' + insertLink.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + insertLink.url + '") -' + insertLink.left + 'px -' + insertLink.top_0 + 'px  no-repeat;\n}\n.C-IK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-removeLink {\n  height : ' + removeLink.height_0 + 'px;\n  width : ' + removeLink.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + removeLink.url + '") -' + removeLink.left + 'px -' + removeLink.top_0 + 'px  no-repeat;\n}\n.C-DK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-insertGadget {\n  height : ' + insertGadget.height_0 + 'px;\n  width : ' + insertGadget.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + insertGadget.url + '") -' + insertGadget.left + 'px -' + insertGadget.top_0 + 'px  no-repeat;\n}\n.C-CK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-EditorToolbarResources-Css-insertAttachment {\n  height : ' + insertAttachment.height_0 + 'px;\n  width : ' + insertAttachment.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + insertAttachment.url + '") -' + insertAttachment.left + 'px -' + insertAttachment.top_0 + 'px  no-repeat;\n  margin-top : 3px;\n}\n'));
  flush();
}

function $clinit_1318(){
  $clinit_1318 = nullMethod;
  alignCentre = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVCAYAAABc6S4mAAAAKUlEQVR42mNgGAUjFvwnA5NoAxmAVj6hMKwG0OWjcTAaB8M9DkYB/QAALEpIxjawtskAAAAASUVORK5CYII=', 24, 21);
  alignDrop = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAVCAYAAACzK0UYAAAAPklEQVR42mNgGAWjgF7gPxmYDFvIALTwCRXCiwYuH3Jx0oAF0yRO4BYA7QZjWsUJfguoFSf4LBjNJ6OAugAA56Bet1lUs00AAAAASUVORK5CYII=', 25, 21);
  alignJustify = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVCAYAAABc6S4mAAAAI0lEQVR42mNgGAUjFvwnA5NoAxlg1AejPhj1wUjzwSigHwAA4laEikWGyLEAAAAASUVORK5CYII=', 24, 21);
  alignLeft = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVCAYAAABc6S4mAAAAKElEQVR42mNgGAUjFvwnA5NoAxmA2j6gMIyo7OLROBiNg9E4GAUDCQBgTkjGCZ8eSAAAAABJRU5ErkJggg==', 24, 21);
  alignRight = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVCAYAAABc6S4mAAAAKElEQVR42mNgGAUjFvwnA5NoAxmA1j6iMMyo7IPROBiNg9E4GAX0BAD4N0jGY+zEbwAAAABJRU5ErkJggg==', 24, 21);
  bold = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAVCAYAAACZm7S3AAAAUUlEQVR42mNgGAUDB/7jwQ1kazY2Nv4fGhp6gCjNyABNvIEozUSIE+fskJAQZJeQpXk1RX4mWjPV/AyKqvr6evI0QzWewRdVqJ7FBA0jPQsCAP6fsbS3vx6MAAAAAElFTkSuQmCC', 15, 21);
  clearFormatting = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAABFklEQVR42mNgGAWjgBTgAMQfgPgAHvyfHIMn8PHx3dmzZ8+XjRs3XoAa8h/EBmFVVdXPEhIS3/8DAakGXzh9+vQ8oL4LixYtigAZqq+v/x8KHIyNjRe4uLh8ALIfkOxkkKFArABkBoC4+fn5IEMvIMk3APEGSsJ7Asic+fPngwyeQM2IBEfU+fPnQQYnUNPg/9zc3L+h4WtALUNBBv23t7cHGfqBmq4tABlcX18PMvgAMG3NB2J4cKDziQECQNwAxKDk9F9eXv5/aGgozGBQ4k1AYseTZLCGhobPzJkzF+zcufPF/v37/586deoZOIkhDCTJ0P+E8HyEof9JCob/+EBCAsTABQsQbBLDGJd35iN7H51PcwAAOC/iQ5Sv2fYAAAAASUVORK5CYII=', 22, 21);
  fontFamily = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAABGElEQVR42u2UIQ+CQBTHabCxMSPRT+D8CCQCiUwyS8COgW8AlWaiQsXEN4CNxGZwJmdgmKQ939OncwbBi87/9tvu4O7/7t69O0n666c1QYxvJ02RCMmQAgGk4/YNXdeXADDaeEFmSZLMcFJU1/WWTD3Pwy50SPHCYuy2OtM0M5xAUH9FpmVZkmkkkiubDFzX7dEg4G+FLMsXuGsuYmqoqnpK0/SxKlopYP4uvu/32A448Hei5CN7xObDgjAMIc/zYxzHG9oB/5M4yDuDyhRF6XnrKw74fuJPQw44aNxZlnWgUx8YN9qQyqVq2/aMgzcj0hZ8uiXGo1abpqECr7i0hES3BzRN2zmOs6bCfqlVcbEJ8Ors/xMnpCtTSdF/c+RQpQAAAABJRU5ErkJggg==', 21, 21);
  fontSize_0 = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAVCAYAAACzK0UYAAAAvklEQVR42mNgGAWjYKDBByD+jwdTBTjs2bPny/79+//r6+uDMYgNwufPn/8PAlSxBWiOAwiLiIhcMDMz+wxkX4CJAbEBtYPugJGR0XugwQfI0awAMgANT6C6JTIyMhNABoBCJzc398H8+fOvAA2bQIQlDVgwznBXCA0NPQBhgkEDEAcQ6RO4BVB9Dfh81ACzhIw4IcoCSi1hIMYCii0hOgGsW7duBh5LDK5du3aCUkvACQBfBgPJgdSMlrY0AQDOmcFMOhSTIQAAAABJRU5ErkJggg==', 25, 21);
  heading = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAVCAYAAAC33pUlAAAA6klEQVR42mNgGAWjYLCCD0DcgEW8AIj/owtKxFx3EIu9+Z9cy/5XV1f/+P//P7qFIP5/EIAJiCbcMgBadAFkGbI4SZbV19f/J2QZ0IIPIEtgmKaWgYLv0NWvX3JnPqfMMnl5+f8qKioPgOwDSPgBejACmQ6uNQ8XUGSZvb39//Ly8g+5ubkPYNjIyOg9umXg4Iy72YDFsgYsGG8wHgAFJQyHhoYeIMEyFAthZpAdZ0RYxkDIImpbxoDPIqpbRgg4vH//HptlCuvWrZuBbqhEwnWFrWc/zyDXMnCSBmIBLOIKQGxArPgooBkAAJLUIIUT8ZXEAAAAAElFTkSuQmCC', 27, 21);
  indent_4 = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAAUElEQVR42mNgGAUjD/wnAxMwkQxAyMw0El1O2JFJSUnLSHE5UeGIZihlLsRmKMUunDlzJkx9NsUuRDOMYhemoRtGqQsZ0AyjyIVDI6cMcwAAAGA7Ue6PNx8AAAAASUVORK5CYII=', 20, 21);
  insertAttachment = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB90lEQVR42mNgIAbU1zPpugaWazt47wJhXbfAaAZSgFVI0iwz/5gUmGEWwXFrLSISFPBqcorKDHWIyVJxjMpwt4tK70aWs4tMi7ePSgvFqdkvqYzXOS5nr0NCAgeItk5K4kWWd4nP63OLzdPBaYBnSmGrZ1KBp2dyYY5nckESSCw0NJQZRDtkZfEAxXfi1OyTVi7nm1G6wTuzQtA3o2xXPdDPYFdlVpT6ZZZ7+2eUt/qkl3rhNCAot2ahf06tbmBe1YSg7Go7sO1Z9RLBudXbQrMqVIJzq9bi1BxVWG8WXlQ/I7ygWTO8sGEpTDy8uGFeeEG9UXhRw5rQwnoVnAbEVbRvi6xqFY8r71idUNEOjqaE6k6LuMq2GbGVbV6xFa1tODWnN/eHpNX3VaXVT5BLa+ifCxb8/58xval/Z0ZLn3Raw4R9sSXd3Nh1AxUWdM3Ym1A/n6Oga6oBkD0BJFzYM7O4oGNmdkHnjMr89hnhOG2vnbLIvGriwiYYv2LivJbKSQt3Vk5Y0Fg9dZ5sxaRFW/CmupZ5q8Lb5qyKxSbXOmf14qaZq3TxGjBx6RbjSSu296KLT1u5w2Xisq0TiMow8zYdWLlk52EfGH/Z9hM2CzYf2D111X4eogyYv38/x+q9pzrWHTi7c8Ohc9tX7zszadXuM/yE9AEAOba+sp+3XNYAAAAASUVORK5CYII=', 16, 16);
  insertGadget = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAABV0lEQVR42u2UyUrDUBSG81buNc25qUtfQXcOdaQoSC1BQVs1tdQOVm1IpQgiqGiKKOKAL+DOvY/gppBjTkzCVdo02FtX/eGDkHM5350SSRrkP6MZsYPENtgEPfdduKArrUxDRv1MxqUcsxFxoq/CyU3A05dhl6ktcHxoCBfwzGQBG88jLitFxZX6UF2I8ORRjoS34nrPQvNBjoQwYe0+FglhQmq0uAdYthQ8uutMsvA9dm4XWqlDqPxZSrNeq459agZg9TacsgW4bgImsoxWO+61SLUhPM7sPzSDYaUZTumG4Uad+UKTaxHInPcuoVu6XGSYv1SxZHUmWWDu2Hldtc3m6vsvodRVRqEG+9fxgPSxirM7gNMZwHRN/VHzL42HwW0pfzyprpcmfxUPoA//9e38iSApX6OxQm5p7mI0wG/qMEQralcT+mvjm4bVegp3LgFRaoP4+QIA8AkZ35vrTAAAAABJRU5ErkJggg==', 28, 21);
  insertLink = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAWElEQVR42mNgGAWDGyTmPP0vJiKCgWHy2ORAevAahg3ANOOSw2oosgZsLsGGkdXjNBAmictF2NTgNZBqLsQVhvX1iIgCsYkOQ6rH8uAHxEYELjxaLAxiAAA+X/5nYJBxKQAAAABJRU5ErkJggg==', 20, 20);
  italic = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAYAAABPPm7SAAAArklEQVR42mNgGAWDHzgA8QYgPgDFIHYBSSbExcXVAqn/vLy8f968eXP2////O4G4jBQz1oMMaGhoAOr7/weIBUjRrADSDMIfPnwAGdBGahjMB2lOSEj4DwUk2Q5S/B5kwIMHD0CaV5Bqez1Is729/T+o7YqkGnAfZMCBAwdAmk+SqjkepFlWVvYP1HYnUhLOBJjfBQQE/ldVVX0lyWqgbc5APAMa57C4bx/NlLgBADbedGj/yDIeAAAAAElFTkSuQmCC', 16, 21);
  orderedlist = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAARUlEQVR42mNgGAXEgv/UMuQ/CFDFMDSD/pOIMTShmkwCwNBEcRgxUCuAqBlzDEheG2aBTb0ESbXUTa2UjRxrlAU2Jd4BAAwCBAtmEJv9AAAAAElFTkSuQmCC', 18, 19);
  outdent_0 = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAATklEQVR42mNgGAUjD/wnAxMwkQxArGvTiHQ50YaBLM8mxuVEGQYzg1IXpiErRradbBcmJSUto6YLUQyliguRDaWaC5FcRXEsD62cMkwBAK+yN7EKa+GMAAAAAElFTkSuQmCC', 20, 21);
  removeLink = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAUUlEQVR42mNgGAWDGyTmPP0PpNAxOkCRh+rBbRg6QDMUqzwuQ9ENIehCHJaiGohLEgcgbCDVXIgtDOvrn2KEIUiM2DCkbiwPCfCfQjwKBisAAKdhtrHKt7z6AAAAAElFTkSuQmCC', 20, 20);
  strikethrough = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAVCAYAAACg/AXsAAABCklEQVR42mNgGAUDAhygWIAczQFA/AGI/8MwDw/PdFIMUABp8vT0nPv///8P79+//5+fnw82KDs7+yCxhjSANEBBAQOEIyAsLPzJ3t4eLkYIgBTBbEcOC4Pbt28/ARpygKAJHz586JgxY8a7hoaG/yDc29v7cvHixSeuX78+A2iAARAr4NL7n0yMZgoU3L9////58+f/IwNQ4Pb39/9vb2//jw5wueoACwsLyO8GSBY0xMTEnIDa9YPogJ0+ffobdMNVVFQe4LMdGQgoKCjcARkkIiLyCKQZmvAuvHr16ghRsQNLF/Pnz79SX1//v6io6MXGjRsvgBIeEINo0rIAUEMAKDyg2GGElBcAcAjaUhWbDDUAAAAASUVORK5CYII=', 17, 21);
  subscript = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAABdUlEQVR42mNgGAWjABlcAOIPQKyAJj4BKi5AjqEOQPzfxsbm9////xWQxXp7ezcDxT4AMekGa2lprQEZ0tfXdwPqsgdSUlJH/kNAANlhICsr+5qfn/+/vr7+EUZGxo9v3759BDRwA6VhawByLQhPmTJlH9neRgMKzMzMn0GG1tfXU+ZtJHCAnZ39GijCQAavW7duBqUGFoAMOnz48JmbN29e4+bm/g0MW5BrDWAKRGNvJYjF3vwAxjE3CfoClIw++Pn57YDGtoGysnITyJLk5OTXMEUgw+qXvZpUsfDlD9/mR78JBQ/Y29CIaYDbpKBwB2TwggULQMmNQSLmusODV78+qWXcuZ817fkJoNoDuAwExa7Dq1evQGnyAroPNm7ceOH9+/cg1zuIJtwykEu+9cK85F4TSC2yAzAAKNmANGFLPqAcBpMDeV8m4dYzr8aH3wNbHx+kSgEB8v6hq1+/7L/09cWtpz9B3p9AFYOhroZhBZoWcwCUP+zzPR33PAAAAABJRU5ErkJggg==', 21, 21);
  superscript = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAABeElEQVR42mNgGAWDCojG3koQi735AYxjbgZQxVCQYfXLXk2qWPjyh2/zo9/////Ha/AFIP4AxApo4hOg4gIgjkTMdYcHr359Usu4cz9r2vMTQEMP4DPUAYj/29jYgGxXQBbr7e3dDBT7AMQCogm3DOSSb70wL7nXBORfAOIGvF7T0tJaAzKkr6/vBtRlD6SkpI78h4AAmPdlEm4982p8+D2w9fFBosJMVlb2NT8//399ff0jjIyMH9++ffsIaOAGmDzI+4eufv2y/9LXF7ee/gR5fwIx5hqAXAvCU6ZM2QfzNrICIN8BCSsQY6gCMzPzZ5De+vr6/4Ril1hwgJ2d/RoowkAGr1u3bgalBhaADDp8+PCZmzdvXuPm5v4NDFuQaw3INRAUNh/8/Px2QGPbQFlZuQlkSXJy8muKvA2NGHjaU1BQuAMyeMGCBWtINRAUuw6vXr0CpckL6D7YuHHjhffv34Nc70CSqaBkA00iAljkFHDJjQIwAACPxOzzQ23T+AAAAABJRU5ErkJggg==', 21, 21);
  underline = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAYAAABPPm7SAAAAU0lEQVR42mNgGAWDE/wH4nos4vVQuVED6GVAPxbxfmINWA/E74FYAElMACq2nhgD9KGKQXgCFMP4+sQmJn2obf+heD0pmilOxsRgPCYQCQZP1gUAz2VTI+TOucwAAAAASUVORK5CYII=', 16, 21);
  unorderedlist = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVCAYAAABc6S4mAAAAP0lEQVR42mNgGAUjDkQC8X8oTRPwH4aBIA5djEhM2AfLli0DWQBX/J9EgN8LQJdD1cWNRvJoJI9G8mgkDxcAABlUBFwoPRjrAAAAAElFTkSuQmCC', 24, 21);
}

var alignCentre = null, alignDrop = null, alignJustify = null, alignLeft = null, alignRight = null, bold = null, clearFormatting = null, fontFamily = null, fontSize_0 = null, heading = null, indent_4 = null, insertAttachment = null, insertGadget = null, insertLink = null, italic = null, orderedlist = null, outdent_0 = null, removeLink = null, strikethrough = null, subscript = null, superscript = null, underline = null, unorderedlist = null;
function onClearLink(editor){
  !!$getSelectionHelper(editor).getSelectionRange() && clearAnnotationsOverSelection(editor, ($clinit_684() , LINK_KEYS));
}

function onCreateLink(editor){
  var $e0, $e1, e2, linkAnnotationValue, range, rawLinkValue, rg, text;
  range = editor.getSelectionHelper().getSelectionRange();
  if (!range || range.anchor == range.focus_0) {
    $wnd.alert('Select some text to create a link.');
    return;
  }
  try {
    rg = (!range.range && (range.range = range.anchor < range.focus_0?new Range_2(range.anchor, range.focus_0):new Range_2(range.focus_0, range.anchor)) , range.range);
    text = getText(editor.getDocument(), rg.start, rg.end);
    linkAnnotationValue = normalizeLink(text);
    setAnnotationOverSelection(editor, 'link', linkAnnotationValue);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 187)) {
      rawLinkValue = $wnd.prompt('Enter link: URL or Wave ID.', 'wave://');
      if (rawLinkValue == null) {
        return;
      }
      try {
        linkAnnotationValue = normalizeLink(rawLinkValue);
        setAnnotationOverSelection(editor, 'link', linkAnnotationValue);
      }
       catch ($e1) {
        $e1 = caught_0($e1);
        if (instanceOf($e1, 187)) {
          e2 = $e1;
          $wnd.alert(e2.getMessage());
        }
         else 
          throw $e1;
      }
    }
     else 
      throw $e0;
  }
}

function $startEditSession(this$static, editor){
  $setToolbar_1($getContents_0(this$static.panel), this$static.editToolbar.toolbarUi.element);
  $doAdopt(this$static.panel.panel, this$static.editToolbar.toolbarUi);
  $enable(this$static.editToolbar, editor);
}

function ToolbarSwitcher_0(panel, editSession, viewToolbar, editToolbar){
  this.panel = panel;
  this.editSession = editSession;
  this.viewToolbar = viewToolbar;
  this.editToolbar = editToolbar;
}

function ToolbarSwitcher(){
}

_ = ToolbarSwitcher_0.prototype = ToolbarSwitcher.prototype = new Object_0;
_.getClass$ = function getClass_865(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_ToolbarSwitcher_2_classLit;
}
;
_.onSessionEnd = function onSessionEnd_3(editor, blipUi){
  $disable(this.editToolbar, editor);
  $removeFromParent_0(this.editToolbar.toolbarUi);
  $setToolbar_1($getContents_0(this.panel), this.viewToolbar.toolbarUi.element);
  $doAdopt(this.panel.panel, this.viewToolbar.toolbarUi);
}
;
_.onSessionStart = function onSessionStart_3(editor, blipUi){
  $removeFromParent_0(this.viewToolbar.toolbarUi);
  $startEditSession(this, editor);
}
;
_.castableTypeMap$ = {275:1};
_.editSession = null;
_.editToolbar = null;
_.panel = null;
_.viewToolbar = null;
function $init_9(this$static){
  var group;
  group = $addGroup(this$static.toolbarUi);
  $applyTo_0($setText_3(new ToolbarButtonViewBuilder_0, 'Recent'), $addClickButton(group), new ViewToolbar$1_0(this$static));
  $applyTo_0($setText_3(new ToolbarButtonViewBuilder_0, 'Next Unread'), $addClickButton(group), new ViewToolbar$2_0(this$static));
  $applyTo_0($setText_3(new ToolbarButtonViewBuilder_0, 'Previous'), $addClickButton(group), new ViewToolbar$3_0(this$static));
  $applyTo_0($setText_3(new ToolbarButtonViewBuilder_0, 'Next'), $addClickButton(group), new ViewToolbar$4_0(this$static));
  group = $addGroup(this$static.toolbarUi);
  $applyTo_0($setText_3(new ToolbarButtonViewBuilder_0, ''), $addClickButton(group), null);
}

function ViewToolbar_0(toolbarUi, focusFrame, views, wave, reader){
  this.toolbarUi = toolbarUi;
  this.focusFrame = focusFrame;
  this.reader = reader;
  this.blipSelector = new FocusBlipSelector_0(wave, views, new ViewTraverser_0);
}

function create_37(focus_0, views, wave, reader){
  return new ViewToolbar_0(new ToplevelToolbarWidget_0, focus_0, views, wave, reader);
}

function ViewToolbar(){
}

_ = ViewToolbar_0.prototype = ViewToolbar.prototype = new Object_0;
_.getClass$ = function getClass_866(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_ViewToolbar_2_classLit;
}
;
_.castableTypeMap$ = {};
_.blipSelector = null;
_.focusFrame = null;
_.reader = null;
_.toolbarUi = null;
function ViewToolbar$1_0(this$0){
  this.this$0 = this$0;
}

function ViewToolbar$1(){
}

_ = ViewToolbar$1_0.prototype = ViewToolbar$1.prototype = new Object_0;
_.getClass$ = function getClass_867(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_ViewToolbar$1_2_classLit;
}
;
_.onClicked = function onClicked_5(){
  $focus_2(this.this$0.focusFrame, $selectMostRecentlyModified(this.this$0.blipSelector));
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function ViewToolbar$2_0(this$0){
  this.this$0 = this$0;
}

function ViewToolbar$2(){
}

_ = ViewToolbar$2_0.prototype = ViewToolbar$2.prototype = new Object_0;
_.getClass$ = function getClass_868(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_ViewToolbar$2_2_classLit;
}
;
_.onClicked = function onClicked_6(){
  var focusedBlip, isRead;
  focusedBlip = this.this$0.focusFrame.blip;
  if (!focusedBlip) {
    focusedBlip = $getOrFindRootBlip(this.this$0.blipSelector);
    isRead = $isRead(this.this$0.reader, focusedBlip);
    $focus_2(this.this$0.focusFrame, focusedBlip);
    isRead && $focusNext(this.this$0.focusFrame);
  }
   else {
    $focusNext(this.this$0.focusFrame);
  }
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function ViewToolbar$3_0(this$0){
  this.this$0 = this$0;
}

function ViewToolbar$3(){
}

_ = ViewToolbar$3_0.prototype = ViewToolbar$3.prototype = new Object_0;
_.getClass$ = function getClass_869(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_ViewToolbar$3_2_classLit;
}
;
_.onClicked = function onClicked_7(){
  $moveUp(this.this$0.focusFrame);
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function ViewToolbar$4_0(this$0){
  this.this$0 = this$0;
}

function ViewToolbar$4(){
}

_ = ViewToolbar$4_0.prototype = ViewToolbar$4.prototype = new Object_0;
_.getClass$ = function getClass_870(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_ViewToolbar$4_2_classLit;
}
;
_.onClicked = function onClicked_8(){
  $moveDown(this.this$0.focusFrame);
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function $clinit_1326(){
  $clinit_1326 = nullMethod;
  $clinit_1331();
  $clinit_99();
  $push_1(toInject, ($clinit_204() , '.C-AL-org-waveprotocol-wave-client-wavepanel-impl-toolbar-attachment-AttachmentPopupWidget-Style-self {\n  margin : 0 2px 0 2px;\n  line-height : 1.5;\n  overflow : hidden;\n}\n.C-EL-org-waveprotocol-wave-client-wavepanel-impl-toolbar-attachment-AttachmentPopupWidget-Style-title {\n  font-size : 15px;\n  whitespace : nowrap;\n  color : #5a99df;\n  margin-left : 5px;\n}\n.C-CL-org-waveprotocol-wave-client-wavepanel-impl-toolbar-attachment-AttachmentPopupWidget-Style-spinnerPanel {\n  margin-left : 15px;\n}\n.C-BL-org-waveprotocol-wave-client-wavepanel-impl-toolbar-attachment-AttachmentPopupWidget-Style-spinner {\n  margin : 3px 5px 0 0;\n}\n.C-DL-org-waveprotocol-wave-client-wavepanel-impl-toolbar-attachment-AttachmentPopupWidget-Style-status {\n  font-size : 15px;\n  whitespace : nowrap;\n  margin-top : 0;\n}\n.C-PK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-attachment-AttachmentPopupWidget-Style-error {\n  color : red;\n}\n.C-OK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-attachment-AttachmentPopupWidget-Style-done {\n  color : green;\n}\n'));
  flush();
}

function $init_10(this$static, listener){
  checkState(!this$static.listener);
  checkArgument(!!listener);
  this$static.listener = listener;
}

function AttachmentPopupWidget_0(){
  $clinit_1326();
  $initWidget(this, $createAndBindUi_0(this));
  $setEncoding(this.form.element, 'multipart/form-data');
  this.form.element.method = 'post';
  $addHandler_1(this.form, new AttachmentPopupWidget$1_0, ($clinit_324() , !TYPE_14 && (TYPE_14 = new GwtEvent$Type_0) , $clinit_324() , TYPE_14));
  $addHandler_1(this.form, new AttachmentPopupWidget$2_0(this), (!TYPE_13 && (TYPE_13 = new GwtEvent$Type_0) , TYPE_13));
  $addDomHandler(this.uploadBtn, new AttachmentPopupWidget$3_0(this), ($clinit_112() , $clinit_112() , TYPE_1));
  !provider_0 && (provider_0 = new MobilePopupChromeProvider_0);
  this.popup = (!provider_1 && (provider_1 = new MobilePopupProvider_0) , new MobileUniversalPopup_0(provider_1.root));
  $add_28(this.popup.popup, this);
  $add_9(this.popup.listeners, this);
}

function AttachmentPopupWidget(){
}

_ = AttachmentPopupWidget_0.prototype = AttachmentPopupWidget.prototype = new Composite;
_.getClass$ = function getClass_871(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_attachment_AttachmentPopupWidget_2_classLit;
}
;
_.onHide = function onHide_1(source){
}
;
_.onShow = function onShow_1(source){
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 345:1};
_.attachmentId = null;
_.fileUpload = null;
_.form = null;
_.formAttachmentId = null;
_.formWaveRef = null;
_.listener = null;
_.popup = null;
_.spinnerImg = null;
_.spinnerPanel = null;
_.status_0 = null;
_.uploadBtn = null;
_.waveRefStr = null;
function AttachmentPopupWidget$1_0(){
}

function AttachmentPopupWidget$1(){
}

_ = AttachmentPopupWidget$1_0.prototype = AttachmentPopupWidget$1.prototype = new Object_0;
_.getClass$ = function getClass_872(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_attachment_AttachmentPopupWidget$1_2_classLit;
}
;
_.castableTypeMap$ = {37:1, 56:1};
function $onSubmitComplete(this$static, event_0){
  var results;
  this$static.this$0.spinnerImg.element.style.display = 'none';
  results = event_0.resultHtml;
  if (results != null && results.indexOf('OK') != -1) {
    $setTextOrHtml(this$static.this$0.status_0.directionalTextHelper, 'Done!', false);
    setStyleName_0(this$static.this$0.status_0.element, ($clinit_1326() , 'C-OK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-attachment-AttachmentPopupWidget-Style-done'), true);
    $onDone(this$static.this$0.listener, this$static.this$0.waveRefStr, this$static.this$0.attachmentId.id_0, this$static.this$0.fileUpload.element.value);
    $hide(this$static.this$0.popup);
  }
   else {
    $setTextOrHtml(this$static.this$0.status_0.directionalTextHelper, 'Error!', false);
    setStyleName_0(this$static.this$0.status_0.element, ($clinit_1326() , 'C-PK-org-waveprotocol-wave-client-wavepanel-impl-toolbar-attachment-AttachmentPopupWidget-Style-error'), true);
  }
}

function AttachmentPopupWidget$2_0(this$0){
  this.this$0 = this$0;
}

function AttachmentPopupWidget$2(){
}

_ = AttachmentPopupWidget$2_0.prototype = AttachmentPopupWidget$2.prototype = new Object_0;
_.getClass$ = function getClass_873(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_attachment_AttachmentPopupWidget$2_2_classLit;
}
;
_.castableTypeMap$ = {37:1, 55:1};
_.this$0 = null;
function AttachmentPopupWidget$3_0(this$0){
  this.this$0 = this$0;
}

function AttachmentPopupWidget$3(){
}

_ = AttachmentPopupWidget$3_0.prototype = AttachmentPopupWidget$3.prototype = new Object_0;
_.getClass$ = function getClass_874(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_attachment_AttachmentPopupWidget$3_2_classLit;
}
;
_.onClick = function onClick_8(event_0){
  var filename;
  filename = this.this$0.fileUpload.element.value;
  if (filename.length == 0) {
    $wnd.alert('No file to upload!');
  }
   else {
    this.this$0.spinnerPanel.element.style.display = '';
    this.this$0.formAttachmentId.element.value = this.this$0.attachmentId.id_0;
    this.this$0.formWaveRef.element.value = this.this$0.waveRefStr;
    $submit_0(this.this$0.form);
  }
}
;
_.castableTypeMap$ = {24:1, 37:1};
_.this$0 = null;
function $createAndBindUi_0(owner){
  var attachRecord0, domId0, domId0Element, domId1, domId1Element, f_HTMLPanel1, f_HorizontalPanel2, f_HorizontalPanel3, f_HorizontalPanel5, f_Label4, fileUpload, form, formAttachmentId, formWaveRef, spinnerImg, spinnerPanel, status_0, uploadBtn;
  $clinit_1326();
  $clinit_1331();
  domId0 = $createUniqueId($doc);
  f_Label4 = new Label_0;
  f_HorizontalPanel3 = new HorizontalPanel_0;
  spinnerImg = new Image_1(spinner);
  status_0 = new Label_0;
  spinnerPanel = new HorizontalPanel_0;
  f_HorizontalPanel2 = new HorizontalPanel_0;
  domId1 = $createUniqueId($doc);
  fileUpload = new FileUpload_0;
  uploadBtn = new Button_0;
  formAttachmentId = new Hidden_0;
  formWaveRef = new Hidden_0;
  f_HorizontalPanel5 = new HorizontalPanel_0;
  form = new FormPanel_0;
  f_HTMLPanel1 = new HTMLPanel_0("<span id='" + domId0 + "'><\/span> <span id='" + domId1 + "'><\/span>");
  f_HorizontalPanel3.horzAlign = ($clinit_340() , ALIGN_LEFT);
  $setTextOrHtml(f_Label4.directionalTextHelper, 'Upload attachment', false);
  f_Label4.element['className'] = 'C-EL-org-waveprotocol-wave-client-wavepanel-impl-toolbar-attachment-AttachmentPopupWidget-Style-title';
  $add_5(f_HorizontalPanel3, f_Label4);
  f_HorizontalPanel3.element.style['width'] = '150px;';
  $add_5(f_HorizontalPanel2, f_HorizontalPanel3);
  spinnerPanel.horzAlign = ALIGN_RIGHT;
  spinnerImg.element['className'] = 'C-BL-org-waveprotocol-wave-client-wavepanel-impl-toolbar-attachment-AttachmentPopupWidget-Style-spinner';
  spinnerImg.element.setAttribute('title', 'Loading');
  $add_5(spinnerPanel, spinnerImg);
  $setTextOrHtml(status_0.directionalTextHelper, 'Loading...', false);
  status_0.element['className'] = 'C-DL-org-waveprotocol-wave-client-wavepanel-impl-toolbar-attachment-AttachmentPopupWidget-Style-status';
  $add_5(spinnerPanel, status_0);
  spinnerPanel.element['className'] = 'C-CL-org-waveprotocol-wave-client-wavepanel-impl-toolbar-attachment-AttachmentPopupWidget-Style-spinnerPanel';
  $add_5(f_HorizontalPanel2, spinnerPanel);
  fileUpload.element.name = 'uploadFormElement';
  $add_5(f_HorizontalPanel5, fileUpload);
  uploadBtn.element.innerHTML = 'Upload file';
  $add_5(f_HorizontalPanel5, uploadBtn);
  $setName_0(formAttachmentId, 'attachmentId');
  $add_5(f_HorizontalPanel5, formAttachmentId);
  $setName_0(formWaveRef, 'waveRef');
  $add_5(f_HorizontalPanel5, formWaveRef);
  $add_3(form, f_HorizontalPanel5);
  f_HTMLPanel1.element['className'] = 'C-AL-org-waveprotocol-wave-client-wavepanel-impl-toolbar-attachment-AttachmentPopupWidget-Style-self';
  attachRecord0 = attachToDom(f_HTMLPanel1.element);
  domId0Element = $doc.getElementById(domId0);
  domId1Element = $doc.getElementById(domId1);
  attachRecord0.origParent?attachRecord0.origParent.insertBefore(attachRecord0.element, attachRecord0.origSibling):orphan(attachRecord0.element);
  $removeFromParent_0(f_HorizontalPanel2);
  $add_7(f_HTMLPanel1.getChildren(), f_HorizontalPanel2);
  domId0Element.parentNode.replaceChild(f_HorizontalPanel2.element, domId0Element);
  $setParent(f_HorizontalPanel2, f_HTMLPanel1);
  $removeFromParent_0(form);
  $add_7(f_HTMLPanel1.getChildren(), form);
  domId1Element.parentNode.replaceChild(form.element, domId1Element);
  $setParent(form, f_HTMLPanel1);
  owner.fileUpload = fileUpload;
  owner.form = form;
  owner.formAttachmentId = formAttachmentId;
  owner.formWaveRef = formWaveRef;
  owner.spinnerImg = spinnerImg;
  owner.spinnerPanel = spinnerPanel;
  owner.status_0 = status_0;
  owner.uploadBtn = uploadBtn;
  return f_HTMLPanel1;
}

function $clinit_1331(){
  $clinit_1331 = nullMethod;
  spinner = new ImageResourcePrototype_0('data:image/gif;base64,R0lGODlhEAAQAKIHADZmvyRl1FZ5upOjxHWOv7G5yb2/w////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAHACwAAAAAEAAQAAADQ3i6B8CQORdXCG0eIeC92cZ11seMZBlxjGFUC0EcrgvLcv1W+GzDB1lrxxgMILqi8bhIFgqHJbP5ej6j04gVClxcIwkAIfkEBQAABwAsAAAAABAAEAAAAz94uifCkDkXFwBtHkLgvdnGddbHjGQZcUwQVMswHK4Ly3L9VvhswwcZcFEoDIlFI8xgOCSVESbTCY1Kj4ppJAEAIfkEBQAABwAsAAAAABAADgAAAzt4ukfEkDkXlxBtnjHgvdnGddbHjGQZcQwAVEtRHK4Ly3L9VvhswwcZIxCIGAwQIpFxPA6VzGayCHEqEgAh+QQFAAAHACwAAAAAEAAQAAADPni6N8OQORcXIW2eUuC92cZ11seMZBlxjCBUi2EcrgvLcv1W+GzDBxkDAAAOiUXjAVkMBIzEg9OplE6r1koCACH5BAUAAAcALAAAAAAOABAAAAM8eLpXxVA5F88YbR5j1r3ZxnXWx4xkGXEKQVSM68KtTNc3IwhRECy7HcPnUwR5AMCB+DMik8piBKq8JSEJACH5BAUAAAcALAAAAAAQABAAAAM+eLpnxpA5F1cpbdZzb95cBzLeeAzDGAQnmlbr6r5RzKIquxBEBAAQHo/x+zGEPYHgUAQek8qlcRNdmg7KSgIAIfkEBQAABwAsAAACABAADgAAAz54aqZ+IbzD2Ivx1eaw1Nz1KUUxTQBwlOWppClrurDauq/qDMMpCBMe7/H7PYQ9AuFQBB6TyqURF13iHkpXAgAh+QQFAAAHACwAAAAAEAAQAAADPni6F8GQORfjfADURXPejKeBy7cYBikIB4pu6+qmVcy+4MoURUQQEB6P8fvthIfB4FAEHpPKpXETXZIUykoCADs=', 16, 16);
}

var spinner = null;
function $clinit_1333(){
  $clinit_1333 = nullMethod;
  ALL = new GadgetInfoProvider$GadgetCategoryType_0('ALL', 0, 'All');
  GAME = new GadgetInfoProvider$GadgetCategoryType_0('GAME', 1, 'Game');
  IMAGE = new GadgetInfoProvider$GadgetCategoryType_0('IMAGE', 2, 'Image');
  MAP = new GadgetInfoProvider$GadgetCategoryType_0('MAP', 3, 'Map');
  MUSIC = new GadgetInfoProvider$GadgetCategoryType_0('MUSIC', 4, 'Music');
  PRODUCTIVITY = new GadgetInfoProvider$GadgetCategoryType_0('PRODUCTIVITY', 5, 'Productivity');
  SEARCH = new GadgetInfoProvider$GadgetCategoryType_0('SEARCH', 6, 'Search');
  TEAM = new GadgetInfoProvider$GadgetCategoryType_0('TEAM', 7, 'Team');
  TIME = new GadgetInfoProvider$GadgetCategoryType_0('TIME', 8, 'Time');
  TRAVEL = new GadgetInfoProvider$GadgetCategoryType_0('TRAVEL', 9, 'Travel');
  UTILITY = new GadgetInfoProvider$GadgetCategoryType_0('UTILITY', 10, 'Utility');
  VIDEO = new GadgetInfoProvider$GadgetCategoryType_0('VIDEO', 11, 'Video');
  VOICE = new GadgetInfoProvider$GadgetCategoryType_0('VOICE', 12, 'Voice');
  VOTING = new GadgetInfoProvider$GadgetCategoryType_0('VOTING', 13, 'Voting');
  OTHER_0 = new GadgetInfoProvider$GadgetCategoryType_0('OTHER', 14, 'Other');
  $VALUES_40 = initValues(_3Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoProvider$GadgetCategoryType_2_classLit, {9:1, 66:1, 166:1}, 117, [ALL, GAME, IMAGE, MAP, MUSIC, PRODUCTIVITY, SEARCH, TEAM, TIME, TRAVEL, UTILITY, VIDEO, VOICE, VOTING, OTHER_0]);
}

function GadgetInfoProvider$GadgetCategoryType_0(enum$name, enum$ordinal, type){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
  this.type_0 = type;
}

function of_2(type){
  $clinit_1333();
  var g, g$array, g$index, g$max;
  for (g$array = $VALUES_40 , g$index = 0 , g$max = g$array.length; g$index < g$max; ++g$index) {
    g = g$array[g$index];
    if ($equalsIgnoreCase(type, g.type_0)) {
      return g;
    }
  }
  return ALL;
}

function valueOf_47(name_0){
  $clinit_1333();
  return valueOf_0(($clinit_1334() , $MAP_40), name_0);
}

function values_41(){
  $clinit_1333();
  return $VALUES_40;
}

function GadgetInfoProvider$GadgetCategoryType(){
}

_ = GadgetInfoProvider$GadgetCategoryType_0.prototype = GadgetInfoProvider$GadgetCategoryType.prototype = new Enum;
_.getClass$ = function getClass_875(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoProvider$GadgetCategoryType_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 117:1};
_.type_0 = null;
var $VALUES_40, ALL, GAME, IMAGE, MAP, MUSIC, OTHER_0, PRODUCTIVITY, SEARCH, TEAM, TIME, TRAVEL, UTILITY, VIDEO, VOICE, VOTING;
function $clinit_1334(){
  $clinit_1334 = nullMethod;
  $MAP_40 = createValueOfMap(($clinit_1333() , $VALUES_40));
}

var $MAP_40;
function GadgetInfoProvider$GadgetInfo_0(name_0, description, primaryCategory, secondaryCategory, gadgetUrl, author, imageUrl){
  this.name_0 = name_0;
  this.description = description;
  this.primaryCategory = primaryCategory;
  this.secondaryCategory = secondaryCategory;
  this.gadgetUrl = gadgetUrl;
  this.author = author;
  this.imageUrl = imageUrl;
}

function GadgetInfoProvider$GadgetInfo(){
}

_ = GadgetInfoProvider$GadgetInfo_0.prototype = GadgetInfoProvider$GadgetInfo.prototype = new Object_0;
_.getClass$ = function getClass_876(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoProvider$GadgetInfo_2_classLit;
}
;
_.castableTypeMap$ = {311:1};
_.author = null;
_.description = null;
_.gadgetUrl = null;
_.imageUrl = null;
_.name_0 = null;
_.primaryCategory = null;
_.secondaryCategory = null;
function $clinit_1337(){
  $clinit_1337 = nullMethod;
  new DomLogger_0('GadgetInfoProvider');
}

function $getGadgetInfoList(this$static, filter, category){
  var filteredList, gadget, gadget$iterator, gadgetDesc, gadgetName, lowerCaseFilter;
  filteredList = new ArrayList_0;
  lowerCaseFilter = filter.toLowerCase();
  for (gadget$iterator = new AbstractList$IteratorImpl_0(this$static.gadgetList); gadget$iterator.i < gadget$iterator.this$0_0.size_1();) {
    gadget = dynamicCast($next_4(gadget$iterator), 311);
    gadgetName = gadget.name_0.toLowerCase();
    gadgetDesc = gadget.description.toLowerCase();
    (gadgetName.indexOf(lowerCaseFilter) != -1 || gadgetDesc.indexOf(lowerCaseFilter) != -1) && ($equals_3(category, ($clinit_1333() , ALL).type_0) || $equals_3(category, gadget.primaryCategory.type_0) || $equals_3(category, gadget.secondaryCategory.type_0)) && (setCheck(filteredList.array, filteredList.size_0++, gadget) , true);
  }
  return filteredList;
}

function $notifyListener(this$static){
  !!this$static.listener && $filter(this$static.listener, '');
}

function $startLoadingGadgetList(this$static){
  var $e0, builder, e;
  builder = new RequestBuilder_0(($clinit_178() , GET), '/gadget/gadgetlist');
  try {
    $sendRequest(builder, null, new GadgetInfoProviderImpl$1_0(this$static));
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 239)) {
      e = $e0;
      $clinit_1628();
      initValues(_3Ljava_lang_Object_2_classLit, {9:1, 66:1}, 0, ['Exception while sending HTTP request: ' + $toString_1(e)]);
    }
     else 
      throw $e0;
  }
}

function GadgetInfoProviderImpl_0(){
  $clinit_1337();
  this.gadgetList = new ArrayList_0;
}

function GadgetInfoProviderImpl(){
}

_ = GadgetInfoProviderImpl_0.prototype = GadgetInfoProviderImpl.prototype = new Object_0;
_.getClass$ = function getClass_877(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoProviderImpl_2_classLit;
}
;
_.castableTypeMap$ = {};
_.gadgetList = null;
_.listener = null;
function GadgetInfoProviderImpl$1_0(this$0){
  this.this$0 = this$0;
}

function GadgetInfoProviderImpl$1(){
}

_ = GadgetInfoProviderImpl$1_0.prototype = GadgetInfoProviderImpl$1.prototype = new Object_0;
_.getClass$ = function getClass_878(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoProviderImpl$1_2_classLit;
}
;
_.onError = function onError_0(request, exception){
  $clinit_1337();
  $clinit_1628();
}
;
_.onResponseReceived = function onResponseReceived_0(request, response){
  var jsonResponse;
  if (200 == response.val$xmlHttpRequest.status) {
    jsonResponse = response.val$xmlHttpRequest.responseText;
    $addAll_0(this.this$0.gadgetList, $parseGadgetInfoJson(jsonResponse));
    $notifyListener(this.this$0);
    return;
  }
   else {
    $clinit_1337();
    $clinit_1628();
    initValues(_3Ljava_lang_Object_2_classLit, {9:1, 66:1}, 0, ['Server responded with a HTTP error: ' + response.val$xmlHttpRequest.status]);
  }
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function $onClick(this$static){
  !!this$static.listener && $onSelect_0(this$static.listener);
}

function $setAuthor(this$static, name_0){
  name_0 == null || !name_0.length?(this$static.author.textContent = '' , undefined):(this$static.author.textContent = 'By ' + name_0 || '' , undefined);
}

function GadgetInfoWidget_0(){
  var attachRecord0, author, description, domId0, domId1, domId2, domId3, handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames1, image, self_0, title;
  $initWidget(this, this.self_0 = ($clinit_1345() , domId0 = $createUniqueId($doc) , domId1 = $createUniqueId($doc) , domId2 = $createUniqueId($doc) , domId3 = $createUniqueId($doc) , self_0 = new ImplPanel_0("<div class='C-JW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetInfoWidget_BinderImpl_GenCss_style-img'> <img id='" + domId0 + "'> <\/div> <h3 id='" + domId1 + "'><\/h3> <div class='C-IW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetInfoWidget_BinderImpl_GenCss_style-description' id='" + domId2 + "'><\/div> <div class='C-IW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetInfoWidget_BinderImpl_GenCss_style-description' id='" + domId3 + "'><\/div>") , self_0.element['className'] = 'C-KW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetInfoWidget_BinderImpl_GenCss_style-self' , attachRecord0 = attachToDom(self_0.element) , image = $doc.getElementById(domId0) , image.removeAttribute('id') , title = $doc.getElementById(domId1) , title.removeAttribute('id') , description = $doc.getElementById(domId2) , description.removeAttribute('id') , author = $doc.getElementById(domId3) , author.removeAttribute('id') , attachRecord0.origParent?attachRecord0.origParent.insertBefore(attachRecord0.element, attachRecord0.origSibling):orphan(attachRecord0.element) , handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames1 = new GadgetInfoWidget_BinderImpl$1_0(this) , $addDomHandler(self_0, handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames1, ($clinit_112() , $clinit_112() , TYPE_1)) , this.author = author , this.description = description , this.image = image , this.self_0 = self_0 , this.title_0 = title , $ensureInjected(style_4) , self_0));
  $addDomHandler(this.self_0, new GadgetInfoWidget$1_0(this), ($clinit_151() , $clinit_151() , TYPE_8));
  $addDomHandler(this.self_0, new GadgetInfoWidget$2_0(this), ($clinit_149() , $clinit_149() , TYPE_7));
}

function GadgetInfoWidget(){
}

_ = GadgetInfoWidget_0.prototype = GadgetInfoWidget.prototype = new Composite;
_.getClass$ = function getClass_879(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoWidget_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 312:1};
_.author = null;
_.description = null;
_.gadgetUrl = null;
_.image = null;
_.listener = null;
_.self_0 = null;
_.title_0 = null;
function GadgetInfoWidget$1_0(this$0){
  this.this$0 = this$0;
}

function GadgetInfoWidget$1(){
}

_ = GadgetInfoWidget$1_0.prototype = GadgetInfoWidget$1.prototype = new Object_0;
_.getClass$ = function getClass_880(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoWidget$1_2_classLit;
}
;
_.onMouseOver = function onMouseOver(event_0){
  !!this.this$0.listener && $onMouseOver(this.this$0.listener, this.this$0);
}
;
_.castableTypeMap$ = {32:1, 37:1};
_.this$0 = null;
function GadgetInfoWidget$2_0(this$0){
  this.this$0 = this$0;
}

function GadgetInfoWidget$2(){
}

_ = GadgetInfoWidget$2_0.prototype = GadgetInfoWidget$2.prototype = new Object_0;
_.getClass$ = function getClass_881(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoWidget$2_2_classLit;
}
;
_.onMouseOut = function onMouseOut(event_0){
  !!this.this$0.listener && (this.this$0.self_0.element.style['backgroundColor'] = '#fff' , undefined);
}
;
_.castableTypeMap$ = {31:1, 37:1};
_.this$0 = null;
function GadgetInfoWidget_BinderImpl$1_0(val$owner){
  this.val$owner = val$owner;
}

function GadgetInfoWidget_BinderImpl$1(){
}

_ = GadgetInfoWidget_BinderImpl$1_0.prototype = GadgetInfoWidget_BinderImpl$1.prototype = new Object_0;
_.getClass$ = function getClass_882(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoWidget_1BinderImpl$1_2_classLit;
}
;
_.onClick = function onClick_9(event_0){
  $onClick(this.val$owner);
}
;
_.castableTypeMap$ = {24:1, 37:1};
_.val$owner = null;
function $clinit_1345(){
  $clinit_1345 = nullMethod;
  style_4 = new GadgetInfoWidget_BinderImpl_GenBundle_en_InlineClientBundleGenerator$1_0;
}

var style_4 = null;
function $ensureInjected(this$static){
  if (!this$static.injected) {
    this$static.injected = true;
    $clinit_99();
    $push_1(toInject, ($clinit_204() , '.C-KW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetInfoWidget_BinderImpl_GenCss_style-self {\n  overflow : hidden;\n  cursor : pointer;\n  border : 1px solid #ccc;\n  margin : 15px 0;\n}\n.C-JW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetInfoWidget_BinderImpl_GenCss_style-img {\n  float : left;\n  margin : 15px;\n}\n.C-JW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetInfoWidget_BinderImpl_GenCss_style-img img {\n  width : 120px;\n  height : 120px;\n}\n.C-IW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetInfoWidget_BinderImpl_GenCss_style-description {\n  overflow : hidden;\n  color : #888;\n  margin : 15px;\n}\n.C-KW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetInfoWidget_BinderImpl_GenCss_style-self h3 {\n  margin : 15px;\n}\n'));
    schedule();
    return true;
  }
  return false;
}

function GadgetInfoWidget_BinderImpl_GenBundle_en_InlineClientBundleGenerator$1_0(){
}

function GadgetInfoWidget_BinderImpl_GenBundle_en_InlineClientBundleGenerator$1(){
}

_ = GadgetInfoWidget_BinderImpl_GenBundle_en_InlineClientBundleGenerator$1_0.prototype = GadgetInfoWidget_BinderImpl_GenBundle_en_InlineClientBundleGenerator$1.prototype = new Object_0;
_.getClass$ = function getClass_883(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoWidget_1BinderImpl_1GenBundle_1en_1InlineClientBundleGenerator$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.injected = false;
function $addFeaturedOptions(this$static){
  var category, category$array, category$index, category$max;
  $filter(this$static, '');
  for (category$array = ($clinit_1333() , $clinit_1333() , $VALUES_40) , category$index = 0 , category$max = category$array.length; category$index < category$max; ++category$index) {
    category = category$array[category$index];
    $addItem(this$static.categoryDropBox, category.type_0);
  }
}

function $filter(this$static, filterText){
  var g, g$iterator, gadgetList, widget, option;
  if (this$static.selectedWidget) {
    this$static.selectedWidget.self_0.element.style['backgroundColor'] = '#fff';
    this$static.selectedWidget = null;
  }
  $clear_2(this$static.options);
  gadgetList = $getGadgetInfoList(this$static.gadgetInfoProvider, filterText, this$static.categoryFilter);
  for (g$iterator = new AbstractList$IteratorImpl_0(gadgetList); g$iterator.i < g$iterator.this$0_0.size_1();) {
    g = dynamicCast($next_4(g$iterator), 311);
    option = new GadgetInfoWidget_0;
    option.title_0.textContent = g.name_0 || '';
    option.image.src = g.imageUrl;
    option.description.textContent = g.description || '';
    $setAuthor(option, g.author);
    option.gadgetUrl = g.gadgetUrl;
    option.listener = new GadgetSelectorWidget$6_0(this$static, g);
    $add_2(this$static.options, option);
  }
  if (this$static.options.getChildren().size_0 > 0 && !$equals_3(filterText, '')) {
    widget = dynamicCast($get_4(this$static.options.children_0), 312);
    this$static.selectedWidget = widget;
    this$static.selectedWidget.self_0.element.style['backgroundColor'] = '#ddd';
  }
}

function $onClickCustom(this$static){
  $select_0(this$static, $getPropertyString(this$static.gadgetUrl.element, 'value'));
}

function $select_0(this$static, url){
  !!this$static.listener && $onSelect(this$static.listener, url);
}

function GadgetSelectorWidget_0(provider){
  var attachRecord0, attachRecord1, categoryDropBox, dockPanel, domId0, domId0Element, domId1, domId1Element, domId2, domId2Element, domId3, domId3Element, domId4, domId4Element, f_HTMLPanel1, f_ScrollPanel2, gadgetFilter, gadgetUrl, handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames1, options, self_0, useCustom;
  this.categoryFilter = ($clinit_1333() , ALL).type_0;
  $initWidget(this, ($clinit_1358() , domId0 = $createUniqueId($doc) , domId1 = $createUniqueId($doc) , gadgetUrl = new TextBox_0 , domId2 = $createUniqueId($doc) , useCustom = new Button_0 , domId3 = $createUniqueId($doc) , gadgetFilter = new TextBox_0 , domId4 = $createUniqueId($doc) , categoryDropBox = new ListBox_0 , f_HTMLPanel1 = new HTMLPanel_0("<div class='C-FW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetSelectorWidget_BinderImpl_GenCss_style-custom'> <label>Enter a custom gadget URL:<\/label> <span id='" + domId1 + "'><\/span> <span id='" + domId2 + "'><\/span> <\/div> <label>Or, choose one of these gadgets:<\/label> <label>Filter:<\/label> <span id='" + domId3 + "'><\/span> <span id='" + domId4 + "'><\/span>") , options = new FlowPanel_0 , f_ScrollPanel2 = new ScrollPanel_0 , dockPanel = new DockLayoutPanel_0(($clinit_88() , PX)) , self_0 = new ImplPanel_0("<span id='" + domId0 + "'><\/span>") , gadgetUrl.element.style['width'] = '500' , useCustom.element.innerHTML = 'Use' , gadgetFilter.element.style['width'] = '500' , categoryDropBox.element.style['width'] = '80' , $insert_0(dockPanel, f_HTMLPanel1, ($clinit_309() , NORTH), 200) , $add_3(f_ScrollPanel2, options) , $insert_0(dockPanel, f_ScrollPanel2, CENTER, 0) , dockPanel.element['className'] = 'C-GW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetSelectorWidget_BinderImpl_GenCss_style-dock' , self_0.element['className'] = 'C-HW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetSelectorWidget_BinderImpl_GenCss_style-self' , attachRecord0 = attachToDom(f_HTMLPanel1.element) , domId1Element = $doc.getElementById(domId1) , domId2Element = $doc.getElementById(domId2) , domId3Element = $doc.getElementById(domId3) , domId4Element = $doc.getElementById(domId4) , attachRecord0.origParent?attachRecord0.origParent.insertBefore(attachRecord0.element, attachRecord0.origSibling):orphan(attachRecord0.element) , $removeFromParent_0(gadgetUrl) , $add_7(f_HTMLPanel1.getChildren(), gadgetUrl) , domId1Element.parentNode.replaceChild(gadgetUrl.element, domId1Element) , $setParent(gadgetUrl, f_HTMLPanel1) , $removeFromParent_0(useCustom) , $add_7(f_HTMLPanel1.getChildren(), useCustom) , domId2Element.parentNode.replaceChild(useCustom.element, domId2Element) , $setParent(useCustom, f_HTMLPanel1) , $removeFromParent_0(gadgetFilter) , $add_7(f_HTMLPanel1.getChildren(), gadgetFilter) , domId3Element.parentNode.replaceChild(gadgetFilter.element, domId3Element) , $setParent(gadgetFilter, f_HTMLPanel1) , $removeFromParent_0(categoryDropBox) , $add_7(f_HTMLPanel1.getChildren(), categoryDropBox) , domId4Element.parentNode.replaceChild(categoryDropBox.element, domId4Element) , $setParent(categoryDropBox, f_HTMLPanel1) , attachRecord1 = attachToDom(self_0.element) , domId0Element = $doc.getElementById(domId0) , attachRecord1.origParent?attachRecord1.origParent.insertBefore(attachRecord1.element, attachRecord1.origSibling):orphan(attachRecord1.element) , $removeFromParent_0(dockPanel) , $add_7(self_0.getChildren(), dockPanel) , domId0Element.parentNode.replaceChild(dockPanel.element, domId0Element) , $setParent(dockPanel, self_0) , handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames1 = new GadgetSelectorWidget_BinderImpl$1_0(this) , $addDomHandler(useCustom, handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames1, ($clinit_112() , $clinit_112() , TYPE_1)) , this.categoryDropBox = categoryDropBox , this.dockPanel = dockPanel , this.gadgetFilter = gadgetFilter , this.gadgetUrl = gadgetUrl , this.options = options , $ensureInjected_0(style_5) , self_0));
  this.gadgetInfoProvider = provider;
  this.gadgetInfoProvider.listener = this;
  $startLoadingGadgetList(this.gadgetInfoProvider);
}

function GadgetSelectorWidget(){
}

_ = GadgetSelectorWidget_0.prototype = GadgetSelectorWidget.prototype = new Composite;
_.getClass$ = function getClass_884(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
_.categoryDropBox = null;
_.dockPanel = null;
_.gadgetFilter = null;
_.gadgetInfoProvider = null;
_.gadgetUrl = null;
_.listener = null;
_.options = null;
_.selectedWidget = null;
function GadgetSelectorWidget$1_0(this$0){
  this.this$0 = this$0;
}

function GadgetSelectorWidget$1(){
}

_ = GadgetSelectorWidget$1_0.prototype = GadgetSelectorWidget$1.prototype = new Object_0;
_.execute_0 = function execute_55(){
  impl_0.focus_1(this.this$0.gadgetFilter.element);
  $setHeight(this.this$0.dockPanel, (this.this$0.parent_0.element.offsetHeight || 0) - 20 + 'px');
}
;
_.getClass$ = function getClass_885(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget$1_2_classLit;
}
;
_.castableTypeMap$ = {41:1};
_.this$0 = null;
function GadgetSelectorWidget$2_0(this$0){
  this.this$0 = this$0;
}

function GadgetSelectorWidget$2(){
}

_ = GadgetSelectorWidget$2_0.prototype = GadgetSelectorWidget$2.prototype = new Object_0;
_.getClass$ = function getClass_886(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget$2_2_classLit;
}
;
_.onKeyUp = function onKeyUp_1(event_0){
  $filter(this.this$0, $getPropertyString(this.this$0.gadgetFilter.element, 'value'));
}
;
_.castableTypeMap$ = {29:1, 37:1};
_.this$0 = null;
function GadgetSelectorWidget$3_0(this$0){
  this.this$0 = this$0;
}

function GadgetSelectorWidget$3(){
}

_ = GadgetSelectorWidget$3_0.prototype = GadgetSelectorWidget$3.prototype = new Object_0;
_.getClass$ = function getClass_887(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget$3_2_classLit;
}
;
_.onKeyPress = function onKeyPress_0(event_0){
  $filter(this.this$0, $getPropertyString(this.this$0.gadgetFilter.element, 'value'));
  (event_0.nativeEvent.keyCode || 0) == 13 && !!this.this$0.selectedWidget && $select_0(this.this$0, this.this$0.selectedWidget.gadgetUrl);
}
;
_.castableTypeMap$ = {28:1, 37:1};
_.this$0 = null;
function GadgetSelectorWidget$4_0(this$0){
  this.this$0 = this$0;
}

function GadgetSelectorWidget$4(){
}

_ = GadgetSelectorWidget$4_0.prototype = GadgetSelectorWidget$4.prototype = new Object_0;
_.getClass$ = function getClass_888(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget$4_2_classLit;
}
;
_.onKeyPress = function onKeyPress_1(event_0){
  var gadgetUrlText;
  gadgetUrlText = $getPropertyString(this.this$0.gadgetUrl.element, 'value');
  (event_0.nativeEvent.keyCode || 0) == 13 && !$equals_3(gadgetUrlText, '') && $select_0(this.this$0, gadgetUrlText);
}
;
_.castableTypeMap$ = {28:1, 37:1};
_.this$0 = null;
function GadgetSelectorWidget$5_0(this$0){
  this.this$0 = this$0;
}

function GadgetSelectorWidget$5(){
}

_ = GadgetSelectorWidget$5_0.prototype = GadgetSelectorWidget$5.prototype = new Object_0;
_.getClass$ = function getClass_889(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget$5_2_classLit;
}
;
_.castableTypeMap$ = {23:1, 37:1};
_.this$0 = null;
function $onMouseOver(this$static, widget){
  !!this$static.this$0.selectedWidget && (this$static.this$0.selectedWidget.self_0.element.style['backgroundColor'] = '#fff' , undefined);
  this$static.this$0.selectedWidget = widget;
  widget.self_0.element.style['backgroundColor'] = '#ddd';
}

function $onSelect_0(this$static){
  $select_0(this$static.this$0, this$static.val$gadgetInfo.gadgetUrl);
}

function GadgetSelectorWidget$6_0(this$0, val$gadgetInfo){
  this.this$0 = this$0;
  this.val$gadgetInfo = val$gadgetInfo;
}

function GadgetSelectorWidget$6(){
}

_ = GadgetSelectorWidget$6_0.prototype = GadgetSelectorWidget$6.prototype = new Object_0;
_.getClass$ = function getClass_890(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget$6_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
_.val$gadgetInfo = null;
function GadgetSelectorWidget_BinderImpl$1_0(val$owner){
  this.val$owner = val$owner;
}

function GadgetSelectorWidget_BinderImpl$1(){
}

_ = GadgetSelectorWidget_BinderImpl$1_0.prototype = GadgetSelectorWidget_BinderImpl$1.prototype = new Object_0;
_.getClass$ = function getClass_891(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget_1BinderImpl$1_2_classLit;
}
;
_.onClick = function onClick_10(event_0){
  $onClickCustom(this.val$owner);
}
;
_.castableTypeMap$ = {24:1, 37:1};
_.val$owner = null;
function $clinit_1358(){
  $clinit_1358 = nullMethod;
  style_5 = new GadgetSelectorWidget_BinderImpl_GenBundle_en_InlineClientBundleGenerator$1_0;
}

var style_5 = null;
function $ensureInjected_0(this$static){
  if (!this$static.injected) {
    this$static.injected = true;
    $clinit_99();
    $push_1(toInject, ($clinit_204() , '.C-HW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetSelectorWidget_BinderImpl_GenCss_style-self {\n  padding : 0 15px;\n  height : 700px;\n}\n.C-FW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetSelectorWidget_BinderImpl_GenCss_style-custom {\n  margin : 15px 0;\n}\n.C-HW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetSelectorWidget_BinderImpl_GenCss_style-self label {\n  margin : 15px 0;\n  display : block;\n  font-weight : bold;\n}\n.C-HW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetSelectorWidget_BinderImpl_GenCss_style-self input {\n  width : 503px;\n}\n.C-GW-org-waveprotocol-wave-client-wavepanel-impl-toolbar-gadget-GadgetSelectorWidget_BinderImpl_GenCss_style-dock {\n  width : 600px;\n}\n'));
    schedule();
    return true;
  }
  return false;
}

function GadgetSelectorWidget_BinderImpl_GenBundle_en_InlineClientBundleGenerator$1_0(){
}

function GadgetSelectorWidget_BinderImpl_GenBundle_en_InlineClientBundleGenerator$1(){
}

_ = GadgetSelectorWidget_BinderImpl_GenBundle_en_InlineClientBundleGenerator$1_0.prototype = GadgetSelectorWidget_BinderImpl_GenBundle_en_InlineClientBundleGenerator$1.prototype = new Object_0;
_.getClass$ = function getClass_892(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget_1BinderImpl_1GenBundle_1en_1InlineClientBundleGenerator$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.injected = false;
function $parseGadgetInfo(item){
  var author, desc, gadgetUrl, imageUrl, name_0, object, primaryCategory, secondaryCategory;
  object = item.isObject();
  if (object) {
    name_0 = $get_3(object, 'name').isString().value_0;
    desc = $get_3(object, 'desc').isString().value_0;
    primaryCategory = of_2($get_3(object, 'primaryCategory').isString().value_0);
    secondaryCategory = of_2($get_3(object, 'secondaryCategory').isString().value_0);
    gadgetUrl = $get_3(object, 'gadgetUrl').isString().value_0;
    author = $get_3(object, 'author').isString().value_0;
    $get_3(object, 'submittedBy').isString();
    imageUrl = $get_3(object, 'imageUrl').isString().value_0;
    return new GadgetInfoProvider$GadgetInfo_0(name_0, desc, primaryCategory, secondaryCategory, gadgetUrl, author, imageUrl);
  }
  return null;
}

function $parseGadgetInfoJson(json){
  var array, gadgetList, i, info, item, value;
  gadgetList = new ArrayList_0;
  value = ($clinit_226() , parse(json, true));
  array = value.isArray();
  if (array) {
    for (i = 0; i < array.jsArray.length; ++i) {
      item = $get_2(array, i);
      info = $parseGadgetInfo(item);
      !!info && (setCheck(gadgetList.array, gadgetList.size_0++, info) , true);
    }
  }
  return gadgetList;
}

_ = InlineAnchorLiveRenderer$1.prototype;
_.handleBackspaceAfterNode = function handleBackspaceAfterNode_2(element, event_0){
  return true;
}
;
_.handleClick = function handleClick_0(element, event_0){
  placeCaretBeforeElement(element.context.this$0.editingConcerns.getSelectionHelper(), element);
  return true;
}
;
_.handleDeleteBeforeNode = function handleDeleteBeforeNode_2(element, event_0){
  return true;
}
;
_ = LiveConversationViewRenderer$LiveConversationRenderer.prototype;
_.onParticipantRemoved = function onParticipantRemoved_3(participant){
  var participantUi;
  participantUi = $getParticipantView(this.this$0.views, this.conversation, participant);
  !!participantUi && $remove_35(dynamicCast((dynamicCast(participantUi.helper, 277) , participantUi.impl), 278));
  $unmonitorParticipation(this.profileRenderer, this.conversation, participant);
}
;
function $unmonitorParticipation(this$static, c, p){
  var conversations;
  conversations = dynamicCast(this$static.participations.get_4(p.address), 320);
  if (conversations) {
    conversations.remove_6(c);
    conversations.isEmpty() && this$static.participations.remove_8(p.address);
  }
}

function $locateConversation(this$static, modelId){
  return $getConversation(this$static.model, $fromString(($clinit_2152() , dynamicCast(this$static.shortIdToLongIdMap.get_4(modelId), 1))));
}

function $locateParticipant(this$static, modelId){
  var c, longId, p, parts;
  longId = dynamicCast(this$static.shortIdToLongIdMap.get_4(modelId), 1);
  parts = split_1(longId);
  if (parts.length != 2) {
    throw new IllegalArgumentException_1('Not a participant model id: ' + modelId);
  }
   else {
    c = $getConversation(this$static.model, $fromString(($clinit_2152() , parts[0])));
    p = new ParticipantId_0(parts[1]);
    return new Pair_0(c, p);
  }
}

function $locateThread(this$static, modelId){
  var c, longId, parts;
  longId = dynamicCast(this$static.shortIdToLongIdMap.get_4(modelId), 1);
  parts = split_1(longId);
  if (parts.length != 2) {
    throw new IllegalArgumentException_1('Not a thread model id: ' + modelId);
  }
   else {
    c = $getConversation(this$static.model, $fromString(($clinit_2152() , parts[0])));
    return c?dynamicCast(c.threads.get_4(parts[1]), 363):null;
  }
}

function $participantOf_0(this$static, domId){
  return $locateParticipant(this$static.modelMapper, domId.substr(0, domId.length - 1 - 0));
}

function $participantsOf_0(this$static, domId){
  return $locateConversation(this$static.modelMapper, domId.substr(0, domId.length - 1 - 0));
}

function $threadOf_0(this$static, domId){
  return $locateThread(this$static.modelMapper, domId.substr(0, domId.length - 1 - 0));
}

_ = BlipMenuItemDomImpl.prototype;
_.getOption = function getOption(){
  return getMenuOption(this.self_0.getAttribute('o') || '');
}
;
_.isSelected = function isSelected(){
  return this.self_0.hasAttribute('s');
}
;
function $getMenuState(this$static){
  var e, item, option, options, selected;
  options = new EnumMap_0(Lorg_waveprotocol_wave_client_wavepanel_view_IntrinsicBlipMetaView$MenuOption_2_classLit);
  selected = noneOf(Lorg_waveprotocol_wave_client_wavepanel_view_IntrinsicBlipMetaView$MenuOption_2_classLit);
  e = $getFirstChildElement((!this$static.menu && (this$static.menu = load(this$static.id_0, ($clinit_1470() , MENU))) , this$static.menu));
  while (e) {
    if (e.hasAttribute('kind') && $equals_3(e.getAttribute('kind') || '', ($clinit_1506() , dynamicCast($get_10(CODES, ($clinit_1428() , MENU_ITEM)), 1)))) {
      item = new BlipMenuItemDomImpl_0(e);
      option = getMenuOption(item.self_0.getAttribute('o') || '');
      $add_11(options.keySet, option);
      $set_5(options, option.ordinal, item);
      item.self_0.hasAttribute('s') && $add_11(selected, option);
    }
    e = $getNextSiblingElement(e);
  }
  return new Pair_0(options, selected);
}

function $setMenuState(this$static, options, selected){
  var builder, out;
  builder = ($clinit_1468() , new BlipMetaViewBuilder$1_0(options, selected));
  out = new SafeHtmlBuilder_0;
  $outputHtml_1(builder, out);
  (!this$static.menu && (this$static.menu = load(this$static.id_0, ($clinit_1470() , MENU))) , this$static.menu).innerHTML = (new SafeHtmlString_0(out.sb.impl.string)).html || '';
}

_ = BlipMetaDomImpl.prototype;
_.deselect = function deselect(option){
  var item;
  item = dynamicCast($get_10(dynamicCast($getMenuState(this).first, 322), option), 309);
  !!item && (item.self_0.removeAttribute('s') , item.self_0.className = 'C-NL-org-waveprotocol-wave-client-wavepanel-view-dom-full-BlipViewBuilder-Css-menuOption' , undefined);
}
;
_.disable = function disable(toDisable){
  var options, selected, state;
  state = $getMenuState(this);
  options = copyOf($keySet_0(dynamicCast(state.first, 322)));
  selected = dynamicCast(state.second, 323);
  $removeAll(options, toDisable);
  $removeAll(selected, toDisable);
  $setMenuState(this, options, selected);
}
;
_.enable = function enable_0(toEnable){
  var options, selected, state;
  state = $getMenuState(this);
  options = copyOf($keySet_0(dynamicCast(state.first, 322)));
  selected = dynamicCast(state.second, 323);
  $addAll(options, toEnable);
  $setMenuState(this, options, selected);
}
;
_.select = function select_0(option){
  var item;
  item = dynamicCast($get_10(dynamicCast($getMenuState(this).first, 322), option), 309);
  !!item && (item.self_0.setAttribute('s', 's') , item.self_0.className = 'C-NL-org-waveprotocol-wave-client-wavepanel-view-dom-full-BlipViewBuilder-Css-menuOption C-OL-org-waveprotocol-wave-client-wavepanel-view-dom-full-BlipViewBuilder-Css-menuOptionSelected' , undefined);
}
;
_ = ContinuationIndicatorDomImpl.prototype;
_.disable_0 = function disable_0(){
  this.self_0.style['display'] = ($clinit_63() , 'none');
}
;
_.enable_0 = function enable_1(){
  this.self_0.style['display'] = '';
}
;
function $asBlipMenuItem(this$static, e){
  return checkArgument(!e || $typeOf(e) == ($clinit_1428() , MENU_ITEM)) , !e?null:new BlipMenuItemViewImpl_0(this$static.menuHelper, new BlipMenuItemDomImpl_0(e, this$static.cssProvider));
}

function $asBlipMeta_0(v){
  checkArgument(!v || v.getType_1() == ($clinit_1428() , META_0));
  return dynamicCast(v, 290);
}

function $asContinuationIndicator(this$static, e){
  checkArgument(!e || $typeOf(e) == ($clinit_1428() , CONTINUATION_INDICATOR));
  return !e?null:new ContinuationIndicatorViewImpl_0(this$static.inlineThreadIndicatorHelper, new ContinuationIndicatorDomImpl_0(e, e.id));
}

function $asInlineThread_0(v){
  checkArgument(!v || v.getType_1() == ($clinit_1428() , INLINE_THREAD));
  return dynamicCast(v, 289);
}

function $asReplyBox(this$static, e){
  checkArgument(!e || $typeOf(e) == ($clinit_1428() , REPLY_BOX));
  return !e?null:new ReplyBoxViewImpl_0(this$static.rootThreadIndicatorHelper, new ReplyBoxDomImpl_0(e, e.id));
}

function $asReplyBox_0(this$static, e){
  return checkArgument(!e || $typeOf(e) == ($clinit_1428() , REPLY_BOX)) , !e?null:new ReplyBoxViewImpl_0(this$static.rootThreadIndicatorHelper, new ReplyBoxDomImpl_0(e, e.id));
}

function $asRootThread_0(v){
  checkArgument(!v || v.getType_1() == ($clinit_1428() , ROOT_THREAD));
  return dynamicCast(v, 292);
}

function $fromAddButton(this$static, e){
  checkArgument(!e || $typeOf(e) == ($clinit_1428() , ADD_PARTICIPANT));
  while (!!e && !(e.hasAttribute('kind') && KNOWN_KINDS.contains_0(e.getAttribute('kind') || ''))) {
    e = $getParentElement(e);
  }
  return checkArgument(!e || $typeOf(e) == ($clinit_1428() , PARTICIPANTS)) , !e?null:new ParticipantsViewImpl_0(this$static.participantsHelper, new ParticipantsDomImpl_0(e, e.id));
}

function $remove_35(impl){
  var container, parent_0;
  container = (parent_0 = impl.self_0.parentNode , (!parent_0 || parent_0.nodeType != 1) && (parent_0 = null) , parent_0);
  $removeFromParent(impl.self_0);
  container.style['display'] = ($clinit_63() , 'none');
  container.offsetParent;
  container.style['display'] = '';
}

function $setToolbar(impl, e){
  $getToolbarContainer(impl).innerHTML = '';
  !!e && $getToolbarContainer(impl).appendChild(e);
}

function $setToolbar_0(impl, e){
  $setToolbar(dynamicCast(impl, 276), e);
}

function $getParticipantView(this$static, conv, source){
  var e;
  e = $doc.getElementById($participantId(this$static.viewIdMapper.modelMapper, conv, source) + 'P');
  return $asParticipant(this$static.viewProvider, e);
}

_ = ReplyBoxDomImpl.prototype;
_.disable_0 = function disable_1(){
  this.self_0.style['display'] = ($clinit_63() , 'none');
}
;
_.enable_0 = function enable_2(){
  this.self_0.style['display'] = ($clinit_63() , 'block');
}
;
function $getToolbarContainer(this$static){
  !this$static.toolbarContainer && (this$static.toolbarContainer = $doc.getElementById($getDomId_5(($clinit_1502() , TOOLBAR_CONTAINER), this$static.id_0)));
  return this$static.toolbarContainer;
}

function $clinit_1466(){
  $clinit_1466 = nullMethod;
  $clinit_99();
  $push_1(toInject, ($clinit_204() , '.C-HL-org-waveprotocol-wave-client-wavepanel-view-dom-full-BlipLinkPopupWidget-Style-self {\n  margin : 0 2px 0 2px;\n  line-height : 1.5;\n  overflow : hidden;\n}\n.C-IL-org-waveprotocol-wave-client-wavepanel-view-dom-full-BlipLinkPopupWidget-Style-title {\n  font-size : 15px;\n  whitespace : nowrap;\n  color : #5a99df;\n}\n.C-FL-org-waveprotocol-wave-client-wavepanel-view-dom-full-BlipLinkPopupWidget-Style-explanation {\n  font-size : 10px;\n  color : gray;\n}\n.C-GL-org-waveprotocol-wave-client-wavepanel-view-dom-full-BlipLinkPopupWidget-Style-link {\n  font-size : 14px;\n  color : black;\n  overflow : hidden;\n  width : 32em;\n}\n'));
  flush();
}

function BlipLinkPopupWidget_0(){
  var attachRecord0, domId0, domId0Element, domId1, domId1Element, f_HTMLPanel1, linkInfoBox, waverefLink;
  $clinit_1466();
  $initWidget(this, (domId0 = $createUniqueId($doc) , linkInfoBox = new TextBox_0 , domId1 = $createUniqueId($doc) , waverefLink = new TextBox_0 , f_HTMLPanel1 = new HTMLPanel_0("<div class='C-IL-org-waveprotocol-wave-client-wavepanel-view-dom-full-BlipLinkPopupWidget-Style-title'>Link to this blip<\/div> <div class='C-FL-org-waveprotocol-wave-client-wavepanel-view-dom-full-BlipLinkPopupWidget-Style-explanation'>Use this Wave ID to link to this blip from other blips<\/div> <span id='" + domId0 + "'><\/span> <div class='C-FL-org-waveprotocol-wave-client-wavepanel-view-dom-full-BlipLinkPopupWidget-Style-explanation'>Use this reference to link to this blip from the web<\/div> <span id='" + domId1 + "'><\/span>") , linkInfoBox.element['className'] = 'C-GL-org-waveprotocol-wave-client-wavepanel-view-dom-full-BlipLinkPopupWidget-Style-link' , linkInfoBox.element['readOnly'] = true , $setStyleName(linkInfoBox, getStylePrimaryName(linkInfoBox.element) + '-readonly') , waverefLink.element['className'] = 'C-GL-org-waveprotocol-wave-client-wavepanel-view-dom-full-BlipLinkPopupWidget-Style-link' , waverefLink.element['readOnly'] = true , $setStyleName(waverefLink, getStylePrimaryName(waverefLink.element) + '-readonly') , f_HTMLPanel1.element['className'] = 'C-HL-org-waveprotocol-wave-client-wavepanel-view-dom-full-BlipLinkPopupWidget-Style-self' , attachRecord0 = attachToDom(f_HTMLPanel1.element) , domId0Element = $doc.getElementById(domId0) , domId1Element = $doc.getElementById(domId1) , attachRecord0.origParent?attachRecord0.origParent.insertBefore(attachRecord0.element, attachRecord0.origSibling):orphan(attachRecord0.element) , $removeFromParent_0(linkInfoBox) , $add_7(f_HTMLPanel1.getChildren(), linkInfoBox) , domId0Element.parentNode.replaceChild(linkInfoBox.element, domId0Element) , $setParent(linkInfoBox, f_HTMLPanel1) , $removeFromParent_0(waverefLink) , $add_7(f_HTMLPanel1.getChildren(), waverefLink) , domId1Element.parentNode.replaceChild(waverefLink.element, domId1Element) , $setParent(waverefLink, f_HTMLPanel1) , this.linkInfoBox = linkInfoBox , this.waverefLink = waverefLink , f_HTMLPanel1));
  !provider_0 && (provider_0 = new MobilePopupChromeProvider_0);
  this.popup = createPopup_1($clinit_1562());
  $add_28(this.popup.popup, this);
  $add_9(this.popup.listeners, this);
}

function BlipLinkPopupWidget(){
}

_ = BlipLinkPopupWidget_0.prototype = BlipLinkPopupWidget.prototype = new Composite;
_.getClass$ = function getClass_954(){
  return Lorg_waveprotocol_wave_client_wavepanel_view_dom_full_BlipLinkPopupWidget_2_classLit;
}
;
_.onHide = function onHide_2(source){
}
;
_.onShow = function onShow_2(source){
  $selectAll(this.linkInfoBox);
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 345:1};
_.linkInfoBox = null;
_.popup = null;
_.waverefLink = null;
function getMenuOption(id){
  $clinit_1468();
  var option;
  option = dynamicCast(MENU_OPTIONS.get_4(id), 118);
  if (!option) {
    throw new IllegalArgumentException_1('No such option: ' + id);
  }
  return option;
}

_ = BlipMetaViewBuilder.prototype;
_.deselect = function deselect_0(option){
  $remove_15(this.selected, option);
}
;
_.disable = function disable_2(options){
  $removeAll(this.options, options);
  $removeAll(this.selected, options);
}
;
_.enable = function enable_3(options){
  this.options.addAll(options);
}
;
_.select = function select_1(option){
  $add_11(this.selected, option);
}
;
function $flush_3(this$static){
  if (!this$static.toPageIn.isEmpty()) {
    while ($pageIn_0(this$static.pager, dynamicCast(this$static.toPageIn.remove_5(), 243)) , !this$static.toPageIn.isEmpty()) {
    }
    $cancel_3(this$static.timer.scheduler, this$static);
  }
}

_ = ContinuationIndicatorViewBuilder.prototype;
_.disable_0 = function disable_3(){
  this.enabled = false;
}
;
_.enable_0 = function enable_4(){
  this.enabled = true;
}
;
_ = InlineThreadViewBuilder.prototype;
_.getId = function getId_13(){
  return this.id_0;
}
;
_ = ParticipantNameViewBuilder.prototype;
_.getId = function getId_14(){
  return this.id_0;
}
;
_ = ReplyBoxViewBuilder.prototype;
_.disable_0 = function disable_4(){
  this.enabled = false;
}
;
_.enable_0 = function enable_5(){
  this.enabled = true;
}
;
_ = RootThreadViewBuilder.prototype;
_.getId = function getId_15(){
  return this.id_0;
}
;
_ = BlipMenuItemViewImpl.prototype;
_.getOption = function getOption_0(){
  return dynamicCast(this.impl, 306).getOption();
}
;
_.isSelected = function isSelected_0(){
  return dynamicCast(this.impl, 306).isSelected();
}
;
function $deselect(this$static, option){
  dynamicCast(this$static.impl, 335).deselect(option);
}

function $disable_0(this$static, options){
  dynamicCast(this$static.impl, 335).disable(options);
}

function $enable_0(this$static, options){
  dynamicCast(this$static.impl, 335).enable(options);
}

function $getParent_4(this$static){
  return $asBlip_0($parentOf(dynamicCast(dynamicCast(this$static.helper, 282), 297).this$0, dynamicCast(this$static.impl, 298)));
}

function $select_1(this$static, option){
  dynamicCast(this$static.impl, 335).select(option);
}

_ = BlipMetaViewImpl.prototype;
_.deselect = function deselect_1(option){
  dynamicCast(this.impl, 335).deselect(option);
}
;
_.disable = function disable_5(options){
  dynamicCast(this.impl, 335).disable(options);
}
;
_.enable = function enable_6(options){
  dynamicCast(this.impl, 335).enable(options);
}
;
_.select = function select_2(option){
  dynamicCast(this.impl, 335).select(option);
}
;
_ = ContinuationIndicatorViewImpl.prototype;
_.disable_0 = function disable_6(){
  dynamicCast(this.impl, 336).disable_0();
}
;
_.enable_0 = function enable_7(){
  dynamicCast(this.impl, 336).enable_0();
}
;
_ = ThreadViewImpl.prototype;
_.getId = function getId_17(){
  return dynamicCast(this.impl, 340).getId();
}
;
_ = InlineThreadViewImpl.prototype;
_.getReplyIndicator = function getReplyIndicator(){
  return $asContinuationIndicator(dynamicCast(dynamicCast(this.helper, 319), 337).this$0, $getNextSiblingElement($getFirstChildElement($getChrome(dynamicCast(this.impl, 328).c))));
}
;
_ = ParticipantViewImpl.prototype;
_.getId = function getId_18(){
  return dynamicCast(this.impl, 332).getId();
}
;
_ = ParticipantsViewImpl.prototype;
_.getId = function getId_19(){
  return dynamicCast(this.impl, 331).getId();
}
;
_ = ReplyBoxViewImpl.prototype;
_.disable_0 = function disable_7(){
  dynamicCast(this.impl, 339).disable_0();
}
;
_.enable_0 = function enable_8(){
  dynamicCast(this.impl, 339).enable_0();
}
;
_ = RootThreadViewImpl.prototype;
_.getReplyIndicator = function getReplyIndicator_0(){
  return $asReplyBox(dynamicCast(dynamicCast(this.helper, 341), 342).this$0, $getNextSiblingElement($getFirstChildElement(dynamicCast(this.impl, 327).self_0)));
}
;
function $setToolbar_1(this$static, toolbar_0){
  $setToolbar_0((dynamicCast(this$static.helper, 343) , this$static.impl), toolbar_0);
}

function ImplPanel_0(html){
  HTMLPanel_0.call(this, html);
}

function ImplPanel(){
}

_ = ImplPanel_0.prototype = ImplPanel.prototype = new HTMLPanel;
_.doAdopt = function doAdopt_1(child){
  checkArgument_0(!!child && !child.parent_0, 'Not an orphan');
  $add_7(this.children_0, child);
  $setParent(child, this);
}
;
_.doOrphan = function doOrphan_1(child){
  checkArgument_0(!!child && child.parent_0 == this, 'Not a child');
  $setParent(child, null);
  $remove_5(this.children_0, child);
}
;
_.getChildren = function getChildren_0(){
  return this.children_0;
}
;
_.getClass$ = function getClass_1001(){
  return Lorg_waveprotocol_wave_client_widget_common_ImplPanel_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 59:1, 231:1};
function $updateState(this$static){
  var itemHasOverflowed, lastOnTop, numChildren;
  $onBeginOverflowLayout(this$static.panel);
  numChildren = this$static.panel.items.size_0;
  itemHasOverflowed = false;
  for (lastOnTop = numChildren - 1; lastOnTop >= 0; --lastOnTop) {
    if (!(dynamicCast($get_7(this$static.panel.items, lastOnTop), 346).proxy.proxy.state != ($clinit_1613() , INVISIBLE))) {
      continue;
    }
    if (!((dynamicCast($get_7(this$static.panel.items, lastOnTop), 346).onToplevel.element.offsetTop || 0) > 0)) {
      break;
    }
    itemHasOverflowed = true;
  }
  itemHasOverflowed && $setState_0(this$static.panel.overflowSubmenu, ($clinit_1613() , DISABLED_0));
  for (; lastOnTop >= 0; --lastOnTop) {
    if (!(dynamicCast($get_7(this$static.panel.items, lastOnTop), 346).proxy.proxy.state != ($clinit_1613() , INVISIBLE))) {
      continue;
    }
    if (!((dynamicCast($get_7(this$static.panel.items, lastOnTop), 346).onToplevel.element.offsetTop || 0) > 0)) {
      break;
    }
  }
  while (++lastOnTop < numChildren) {
    $moveToOverflowBucket(this$static.panel, lastOnTop);
  }
  $onEndOverflowLayout(this$static.panel);
}

function $updateStateEventually(this$static){
  (!instance_7 && (instance_7 = new BrowserBackedScheduler_0 , setDefaultTimerService() , undefined) , instance_7.taskInfos.get(this$static.stateUpdater) != null) || (!instance_7 && (instance_7 = new BrowserBackedScheduler_0 , setDefaultTimerService() , undefined) , $schedule_2(instance_7, ($clinit_1175() , LOW), this$static.stateUpdater));
}

function OverflowPanelUpdater_0(panel){
  this.stateUpdater = new OverflowPanelUpdater$1_0(this);
  this.panel = panel;
}

function OverflowPanelUpdater(){
}

_ = OverflowPanelUpdater_0.prototype = OverflowPanelUpdater.prototype = new Object_0;
_.getClass$ = function getClass_1010(){
  return Lorg_waveprotocol_wave_client_widget_overflowpanel_OverflowPanelUpdater_2_classLit;
}
;
_.castableTypeMap$ = {};
_.panel = null;
function OverflowPanelUpdater$1_0(this$0){
  this.this$0 = this$0;
}

function OverflowPanelUpdater$1(){
}

_ = OverflowPanelUpdater$1_0.prototype = OverflowPanelUpdater$1.prototype = new Object_0;
_.execute_0 = function execute_57(){
  $updateState(this.this$0);
}
;
_.getClass$ = function getClass_1011(){
  return Lorg_waveprotocol_wave_client_widget_overflowpanel_OverflowPanelUpdater$1_2_classLit;
}
;
_.castableTypeMap$ = {248:1, 249:1};
_.this$0 = null;
function $clinit_1571(){
  $clinit_1571 = nullMethod;
  $clinit_99();
  $push_1(toInject, ($clinit_204() , '.C-HS-org-waveprotocol-wave-client-widget-popup-DesktopTitleBar-Resources-Css-titleBar {\n  position : static;\n  font : 12px;\n  color : white;\n  padding : 1px 5px 3px 7px;\n  background : #5690d2;\n}\n.C-FS-org-waveprotocol-wave-client-widget-popup-DesktopTitleBar-Resources-Css-buttons div {\n  float : left;\n  margin : 3px 5px 0 0;\n}\n.C-FS-org-waveprotocol-wave-client-widget-popup-DesktopTitleBar-Resources-Css-buttons {\n  position : absolute;\n  top : -2px;\n  right : -3px;\n}\n.C-GS-org-waveprotocol-wave-client-widget-popup-DesktopTitleBar-Resources-Css-title {\n  color : white;\n}\n'));
  schedule();
}

function DesktopTitleBar_0(){
  $clinit_1571();
  FlowPanel_0.call(this);
  this.title_0 = new Label_0;
  this.buttons = new FlowPanel_0;
  $add_0(this, this.title_0, this.element);
  $add_0(this, this.buttons, this.element);
  this.element['className'] = 'C-HS-org-waveprotocol-wave-client-widget-popup-DesktopTitleBar-Resources-Css-titleBar';
  this.buttons.element['className'] = 'C-FS-org-waveprotocol-wave-client-widget-popup-DesktopTitleBar-Resources-Css-buttons';
  this.title_0.element['className'] = 'C-GS-org-waveprotocol-wave-client-widget-popup-DesktopTitleBar-Resources-Css-title';
}

function DesktopTitleBar(){
}

_ = DesktopTitleBar_0.prototype = DesktopTitleBar.prototype = new FlowPanel;
_.getClass$ = function getClass_1019(){
  return Lorg_waveprotocol_wave_client_widget_popup_DesktopTitleBar_2_classLit;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 59:1};
function $getTitleBar(this$static){
  if (!this$static.titleBar) {
    this$static.titleBar = new DesktopTitleBar_0;
    $insertFirst(this$static.popup, this$static.titleBar);
  }
  return this$static.titleBar;
}

function $insertFirst(this$static, child){
  $insert(this$static, child, this$static.content_0, 0);
}

function $onHide_0(this$static){
  $remove_42(this$static.events.listeners, this$static);
  $reset_0(this$static.view);
}

function $onShow_0(this$static){
  $add_33(this$static.events.listeners, this$static);
}

function ProfilePopupPresenter_0(model, view, events){
  this.model = model;
  this.view = view;
  this.events = events;
}

function ProfilePopupPresenter(){
}

_ = ProfilePopupPresenter_0.prototype = ProfilePopupPresenter.prototype = new Object_0;
_.getClass$ = function getClass_1025(){
  return Lorg_waveprotocol_wave_client_widget_profile_ProfilePopupPresenter_2_classLit;
}
;
_.castableTypeMap$ = {174:1};
_.events = null;
_.model = null;
_.view = null;
function $clinit_1589(){
  $clinit_1589 = nullMethod;
  $clinit_99();
  $push_1(toInject, ($clinit_204() , '.C-GU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-self {\n  max-width : 40em;\n  overflow : hidden;\n}\n.C-IU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-state {\n  margin : 0.5em;\n  overflow : hidden;\n}\n.C-PT-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-avatar {\n  float : left;\n  height : 100px;\n  width : 100px;\n  border : 1px solid gray;\n}\n.C-CU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-details {\n  margin-left : 102px;\n  padding-left : 1em;\n}\n.C-FU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-name {\n  font-size : 20px;\n  height : 2em;\n}\n.C-DU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-extra {\n  font-size : small;\n}\n.C-EU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-label {\n  color : gray;\n  padding-right : 1em;\n}\n.C-HU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-separator {\n  clear : both;\n  border-bottom : 1px solid #ccf;\n}\n.C-BU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-controls {\n  margin : 0.5em;\n  float : right;\n}\n.C-AU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-button {\n  margin : 0;\n}\n'));
  flush();
}

function $addButton_0(this$static, label, handler){
  var button;
  button = new Button_2(label.html, handler);
  button.element['className'] = 'C-AU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-button';
  $add_4(this$static.self_0, button, this$static.controls);
}

function $init_15(this$static, listener){
  checkState(!this$static.listener);
  checkArgument(!!listener);
  this$static.listener = listener;
}

function $reset_0(this$static){
  var child, child$iterator;
  checkState(!!this$static.listener);
  this$static.listener = null;
  this$static.avatar.src = null;
  this$static.name_0.textContent = '';
  this$static.address.textContent = '';
  for (child$iterator = new WidgetCollection$WidgetIterator_0(this$static.self_0.children_0); child$iterator.index_0 < child$iterator.this$0.size_0 - 1;) {
    child = $next_1(child$iterator);
    $removeFromParent_0(child);
  }
}

function ProfilePopupWidget_0(){
  var address, attachRecord0, avatar, controls, domId0, domId1, domId2, domId3, name_0, self_0;
  $clinit_1589();
  $initWidget(this, (domId0 = $createUniqueId($doc) , domId1 = $createUniqueId($doc) , domId2 = $createUniqueId($doc) , domId3 = $createUniqueId($doc) , self_0 = new ImplPanel_0("<div class='C-IU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-state'> <img class='C-PT-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-avatar' id='" + domId0 + "' src='static/images/unknown.jpg'> <div class='C-CU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-details'> <div class='C-FU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-name' id='" + domId1 + "'><\/div> <table cellpadding='0' cellspacing='0' class='C-DU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-extra'> <tr> <td class='C-EU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-label'>Address:<\/td> <td id='" + domId2 + "'><\/td> <\/tr>  <\/table> <\/div> <\/div> <div class='C-HU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-separator'><\/div> <div class='C-BU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-controls' id='" + domId3 + "'> <\/div>") , self_0.element['className'] = 'C-GU-org-waveprotocol-wave-client-widget-profile-ProfilePopupWidget-Style-self' , attachRecord0 = attachToDom(self_0.element) , avatar = $doc.getElementById(domId0) , avatar.removeAttribute('id') , name_0 = $doc.getElementById(domId1) , name_0.removeAttribute('id') , address = $doc.getElementById(domId2) , address.removeAttribute('id') , controls = $doc.getElementById(domId3) , controls.removeAttribute('id') , attachRecord0.origParent?attachRecord0.origParent.insertBefore(attachRecord0.element, attachRecord0.origSibling):orphan(attachRecord0.element) , this.address = address , this.avatar = avatar , this.controls = controls , this.name_0 = name_0 , this.self_0 = self_0 , self_0));
  !provider_0 && (provider_0 = new MobilePopupChromeProvider_0);
  this.popup = (!provider_1 && (provider_1 = new MobilePopupProvider_0) , new MobileUniversalPopup_0(provider_1.root));
  $add_28(this.popup.popup, this);
  $add_9(this.popup.listeners, this);
}

function ProfilePopupWidget(){
}

_ = ProfilePopupWidget_0.prototype = ProfilePopupWidget.prototype = new Composite;
_.getClass$ = function getClass_1026(){
  return Lorg_waveprotocol_wave_client_widget_profile_ProfilePopupWidget_2_classLit;
}
;
_.onHide = function onHide_4(source){
  !!this.listener && $onHide_0(this.listener);
}
;
_.onShow = function onShow_4(source){
  !!this.listener && $onShow_0(this.listener);
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1, 345:1};
_.address = null;
_.avatar = null;
_.controls = null;
_.listener = null;
_.name_0 = null;
_.popup = null;
_.self_0 = null;
function $addClickButton(this$static){
  var button;
  button = this$static.toolbar_0.insertClickButton($getAndIncrementNextIndex(this$static));
  this$static.size_0 == 1 && this$static.toolbar_0.indexOf_0(button) > 1 && button.button_0.setShowDivider(true);
  return button;
}

function $addSubmenu(this$static){
  var submenu;
  submenu = this$static.toolbar_0.insertSubmenu($getAndIncrementNextIndex(this$static));
  this$static.size_0 == 1 && this$static.toolbar_0.indexOf_0(submenu) > 1 && submenu.button_0.setShowDivider(true);
  return submenu;
}

function $addToggleButton(this$static){
  var button;
  button = this$static.toolbar_0.insertToggleButton($getAndIncrementNextIndex(this$static));
  this$static.size_0 == 1 && this$static.toolbar_0.indexOf_0(button) > 1 && button.button_0.setShowDivider(true);
  return button;
}

function $getAndIncrementNextIndex(this$static){
  var nextIndex;
  nextIndex = this$static.toolbar_0.indexOf_0(this$static.stubItem) + this$static.size_0 + 1;
  ++this$static.size_0;
  return nextIndex;
}

function GroupingToolbar_0(toolbar_0, stubItem){
  checkNotNull_0(stubItem, 'stub item cannot be null');
  this.toolbar_0 = toolbar_0;
  this.stubItem = stubItem;
}

function GroupingToolbar(){
}

_ = GroupingToolbar_0.prototype = GroupingToolbar.prototype = new Object_0;
_.getClass$ = function getClass_1027(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_GroupingToolbar_2_classLit;
}
;
_.castableTypeMap$ = {};
_.size_0 = 0;
_.stubItem = null;
_.toolbar_0 = null;
function $setState_0(this$static, state){
  if (state != this$static.state) {
    this$static.state = state;
    this$static.button_0.setState(state);
    !!this$static.parent_0 && this$static.parent_0.onChildStateChanged(this$static, state);
  }
}

function AbstractToolbarButton_0(button, listenToButton){
  this.button_0 = button;
  listenToButton && button.setListener(this);
}

function AbstractToolbarButton(){
}

_ = AbstractToolbarButton.prototype = new Object_0;
_.addDebugClass = function addDebugClass_0(dc){
  this.button_0.addDebugClass(dc);
}
;
_.getClass$ = function getClass_1028(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_buttons_AbstractToolbarButton_2_classLit;
}
;
_.hackGetWidget = function hackGetWidget(){
  return this.button_0.hackGetWidget();
}
;
_.onClick_1 = function onClick_13(){
}
;
_.setShowDivider = function setShowDivider(showDivider){
  this.button_0.setShowDivider(showDivider);
}
;
_.setShowDropdownArrow = function setShowDropdownArrow(showDropdown){
  this.button_0.setShowDropdownArrow(showDropdown);
}
;
_.setState = function setState(state){
  $setState_0(this, state);
}
;
_.setText = function setText(text){
  this.button_0.setText(text);
}
;
_.setTooltip = function setTooltip(tooltip){
  this.button_0.setTooltip(tooltip);
}
;
_.setVisualElement = function setVisualElement(element){
  this.button_0.setVisualElement(element);
}
;
_.castableTypeMap$ = {};
_.button_0 = null;
_.parent_0 = null;
_.state = null;
function $clinit_1597(){
  $clinit_1597 = nullMethod;
  $clinit_99();
  $push_1(toInject, ($clinit_204() , '.C-LU-org-waveprotocol-wave-client-widget-toolbar-SubmenuToolbarWidget-Css-toolbar {\n  background-color : white;\n}\n'));
  flush();
}

function $addClickButton_0(this$static){
  var button;
  button = $insertClickButton(this$static, this$static.items.size_0);
  button !== $get_7(this$static.items, 0) && button.button_0.setShowDivider(true);
  return button;
}

function $insertAbstractButton(this$static, button, beforeIndex){
  button.parent_0 = this$static;
  $insert_1(this$static.panel, button.button_0.hackGetWidget(), beforeIndex);
  $add_10(this$static.items, beforeIndex, button);
  this$static.enabledChildren.add_2(button);
  $setState_0(this$static, ($clinit_1613() , ENABLED));
}

function $insertClickButton(this$static, beforeIndex){
  var button;
  button = new ToolbarClickButton_0(new VerticalToolbarButtonWidget_0);
  $insertAbstractButton(this$static, button, beforeIndex);
  return button;
}

function $onChildStateChanged(this$static, item, newState){
  if (newState == ($clinit_1613() , ENABLED)) {
    this$static.enabledChildren.add_2(item);
    $setState_0(this$static, ENABLED);
  }
   else {
    this$static.enabledChildren.remove_6(item);
    $setState_0(this$static, this$static.enabledChildren.isEmpty()?DISABLED_0:ENABLED);
  }
}

function $onPopupCreated(this$static, popup){
  $add_28(popup.popup, this$static.panel);
  this$static.activePopup = popup;
}

function SubmenuToolbarWidget_0(button){
  $clinit_1597();
  AbstractToolbarButton_0.call(this, button.button_0, false);
  this.items = ($clinit_2278() , new ArrayList_0);
  this.enabledChildren = defaultCollectionFactory.createIdentitySet();
  this.panel = new FlowPanel_0;
  $init_16(new ToolbarPopupToggler_0(button, this));
}

function SubmenuToolbarWidget(){
}

_ = SubmenuToolbarWidget_0.prototype = SubmenuToolbarWidget.prototype = new AbstractToolbarButton;
_.getClass$ = function getClass_1029(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_SubmenuToolbarWidget_2_classLit;
}
;
_.indexOf_0 = function indexOf(button){
  return $indexOf_4(this.items, button, 0);
}
;
_.insertClickButton = function insertClickButton(beforeIndex){
  var button;
  return button = new ToolbarClickButton_0(new VerticalToolbarButtonWidget_0) , $insertAbstractButton(this, button, beforeIndex) , button;
}
;
_.insertSubmenu = function insertSubmenu(beforeIndex){
  var submenu, submenuButton;
  return submenuButton = new ToolbarToggleButton_0(new VerticalToolbarButtonWidget_0) , submenuButton.button_0.setShowDropdownArrow(true) , $insert_1(this.panel, submenuButton.button_0.hackGetWidget(), beforeIndex) , submenu = new SubmenuToolbarWidget_0(submenuButton) , submenu.parent_0 = this , $add_10(this.items, beforeIndex, submenu) , submenu;
}
;
_.insertToggleButton = function insertToggleButton(beforeIndex){
  var button;
  return button = new ToolbarToggleButton_0(new VerticalToolbarButtonWidget_0) , $insertAbstractButton(this, button, beforeIndex) , button;
}
;
_.onActionPerformed = function onActionPerformed(){
  if (this.activePopup) {
    $hide(this.activePopup);
    !!this.parent_0 && this.parent_0.onActionPerformed();
  }
}
;
_.onChildStateChanged = function onChildStateChanged(item, newState){
  $onChildStateChanged(this, item, newState);
}
;
_.castableTypeMap$ = {};
_.activePopup = null;
function $applyTo_0(this$static, button, listener){
  $applyToDisplay(this$static, button);
  !!listener && (button.listener = listener);
  return button;
}

function $applyTo_1(this$static, button, listener){
  $applyToDisplay(this$static, button);
  !!listener && (button.listener = listener);
  return button;
}

function $applyToDisplay(this$static, button){
  this$static.text_0 != null && (button.button_0.setText(this$static.text_0) , undefined);
  this$static.tooltip != null && (button.button_0.setTooltip(this$static.tooltip) , undefined);
  this$static.iconCss != null && (button.button_0.setVisualElement($createIcon(this$static.iconCss)) , undefined);
  return button;
}

function $createIcon(css_0){
  var sprite;
  sprite = $doc.createElement('div');
  sprite.className = css_0;
  return sprite;
}

function $setIcon(this$static, iconCss){
  this$static.iconCss = iconCss;
  return this$static;
}

function $setText_3(this$static, text){
  this$static.text_0 = text;
  return this$static;
}

function $setTooltip_0(this$static){
  this$static.tooltip = 'Insert attachment';
  return this$static;
}

function ToolbarButtonViewBuilder_0(){
}

function ToolbarButtonViewBuilder(){
}

_ = ToolbarButtonViewBuilder_0.prototype = ToolbarButtonViewBuilder.prototype = new Object_0;
_.getClass$ = function getClass_1030(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_ToolbarButtonViewBuilder_2_classLit;
}
;
_.castableTypeMap$ = {};
_.iconCss = null;
_.text_0 = null;
_.tooltip = null;
function $clinit_1600(){
  $clinit_1600 = nullMethod;
  $clinit_1603();
  $clinit_99();
  $push_1(toInject, ($clinit_204() , '.C-OU-org-waveprotocol-wave-client-widget-toolbar-ToplevelToolbarWidget-Css-toolbar {\n  position : relative;\n  z-index : 0;\n  height : ' + fillImage.height_0 + 'px;\n  overflow : hidden;\n  background : url("' + fillImage.url + '") -' + fillImage.left + 'px -' + fillImage.top_0 + 'px  repeat-x;\n  overflow : hidden;\n}\n.C-MU-org-waveprotocol-wave-client-widget-toolbar-ToplevelToolbarWidget-Css-overflowButton {\n  position : relative;\n  z-index : 0;\n  height : ' + fillImage.height_0 + 'px;\n  overflow : hidden;\n  background : url("' + fillImage.url + '") -' + fillImage.left + 'px -' + fillImage.top_0 + 'px  repeat-x;\n  float : right;\n}\n.C-NU-org-waveprotocol-wave-client-widget-toolbar-ToplevelToolbarWidget-Css-overflowButtonIcon {\n  height : ' + overflowButtonIcon.height_0 + 'px;\n  width : ' + overflowButtonIcon.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + overflowButtonIcon.url + '") -' + overflowButtonIcon.left + 'px -' + overflowButtonIcon.top_0 + 'px  no-repeat;\n  float : right;\n}\n'));
  flush();
}

function $addGroup(this$static){
  var fakeButton, button, button_0, item;
  return new GroupingToolbar_0(this$static, (fakeButton = (button = (item = $insertItem_0(this$static, this$static.items.size_0) , button_0 = new ToolbarClickButton_0(item.proxy) , item.asAbstractButton = button_0 , button_0) , button.button_0.hackGetWidget() != dynamicCast($get_7(this$static.items, 0), 346).onToplevel && button.button_0.setShowDivider(true) , button) , $setState_0(fakeButton, ($clinit_1613() , INVISIBLE)) , fakeButton));
}

function $insertItem_0(this$static, beforeIndex){
  var item, overflowButton, toplevelButton;
  toplevelButton = new HorizontalToolbarButtonWidget_0;
  $insert_1(this$static.self_0, toplevelButton, beforeIndex);
  $updateStateEventually(this$static.overflowLogic);
  overflowButton = new VerticalToolbarButtonWidget_0;
  $insert_1(this$static.overflowSubmenu.panel, overflowButton, beforeIndex);
  item = new ToplevelToolbarWidget$Item_0(toplevelButton, overflowButton, new ToolbarButtonUiProxy_0(toplevelButton));
  $add_10(this$static.items, beforeIndex, item);
  return item;
}

function $moveToOverflowBucket(this$static, index){
  var item;
  item = dynamicCast($get_7(this$static.items, index), 346);
  item.asAbstractButton.parent_0 = this$static.overflowSubmenu;
  $setDelegate_0(item.proxy, item.onOverflow);
  $setState_1(item.onToplevel, ($clinit_1613() , INVISIBLE));
  $onChildStateChanged(this$static.overflowSubmenu, item.asAbstractButton, item.proxy.proxy.state);
}

function $onBeginOverflowLayout(this$static){
  var item, item$iterator;
  for (item$iterator = new AbstractList$IteratorImpl_0(this$static.items); item$iterator.i < item$iterator.this$0_0.size_1();) {
    item = dynamicCast($next_4(item$iterator), 346);
    item.asAbstractButton.parent_0 = this$static;
    $setDelegate_0(item.proxy, item.onToplevel);
    $setState_3(item.onOverflow, ($clinit_1613() , INVISIBLE));
  }
  $setState_0(this$static.overflowSubmenu, ($clinit_1613() , INVISIBLE));
}

function $onEndOverflowLayout(this$static){
  var item, item$iterator;
  for (item$iterator = new AbstractList$IteratorImpl_0(this$static.items); item$iterator.i < item$iterator.this$0_0.size_1();) {
    item = dynamicCast($next_4(item$iterator), 346);
    item.proxy.delegate == item.onOverflow && $setShowDivider_1(item.onOverflow, false);
  }
}

function ToplevelToolbarWidget_0(){
  var f_FlowPanel1, overflowButton, self_0;
  $clinit_1600();
  var icon;
  this.overflowSubmenu = new SubmenuToolbarWidget_0(new ToolbarToggleButton_0(new HorizontalToolbarButtonWidget_0));
  this.items = ($clinit_2278() , new ArrayList_0);
  $initWidget(this, (overflowButton = new SimplePanel_0 , self_0 = new FlowPanel_0 , f_FlowPanel1 = new FlowPanel_0 , overflowButton.element['className'] = 'C-MU-org-waveprotocol-wave-client-widget-toolbar-ToplevelToolbarWidget-Css-overflowButton' , $add_0(f_FlowPanel1, overflowButton, f_FlowPanel1.element) , self_0.element['className'] = 'C-OU-org-waveprotocol-wave-client-widget-toolbar-ToplevelToolbarWidget-Css-toolbar' , $add_0(f_FlowPanel1, self_0, f_FlowPanel1.element) , this.overflowButton = overflowButton , this.self_0 = self_0 , f_FlowPanel1));
  $setWidget(this.overflowButton, this.overflowSubmenu.button_0.hackGetWidget());
  this.overflowSubmenu.button_0.addDebugClass('more');
  icon = $doc.createElement('div');
  icon.className = 'C-NU-org-waveprotocol-wave-client-widget-toolbar-ToplevelToolbarWidget-Css-overflowButtonIcon';
  this.overflowSubmenu.button_0.setVisualElement(icon);
  this.overflowSubmenu.button_0.setShowDivider(true);
  this.overflowLogic = new OverflowPanelUpdater_0(this);
}

function ToplevelToolbarWidget(){
}

_ = ToplevelToolbarWidget_0.prototype = ToplevelToolbarWidget.prototype = new Composite;
_.getClass$ = function getClass_1031(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_ToplevelToolbarWidget_2_classLit;
}
;
_.indexOf_0 = function indexOf_0(button){
  var i;
  for (i = 0; i < this.items.size_0; ++i) {
    if (dynamicCast($get_7(this.items, i), 346).asAbstractButton == button) {
      return i;
    }
  }
  throw new IllegalArgumentException_1('button is not in this toolbar');
}
;
_.insertClickButton = function insertClickButton_0(beforeIndex){
  var button, item;
  return item = $insertItem_0(this, beforeIndex) , button = new ToolbarClickButton_0(item.proxy) , item.asAbstractButton = button , button;
}
;
_.insertSubmenu = function insertSubmenu_0(beforeIndex){
  var item, submenu;
  return item = $insertItem_0(this, beforeIndex) , submenu = new SubmenuToolbarWidget_0(new ToolbarToggleButton_0(item.proxy)) , submenu.button_0.setShowDropdownArrow(true) , item.asAbstractButton = submenu , submenu;
}
;
_.insertToggleButton = function insertToggleButton_0(beforeIndex){
  var button, item;
  return item = $insertItem_0(this, beforeIndex) , button = new ToolbarToggleButton_0(item.proxy) , item.asAbstractButton = button , button;
}
;
_.onActionPerformed = function onActionPerformed_0(){
}
;
_.onChildStateChanged = function onChildStateChanged_0(item, newState){
  $updateStateEventually(this.overflowLogic);
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
_.overflowButton = null;
_.overflowLogic = null;
_.self_0 = null;
function ToplevelToolbarWidget$Item_0(onToplevel, onOverflow, proxy){
  this.onToplevel = onToplevel;
  this.onOverflow = onOverflow;
  this.proxy = proxy;
}

function ToplevelToolbarWidget$Item(){
}

_ = ToplevelToolbarWidget$Item_0.prototype = ToplevelToolbarWidget$Item.prototype = new Object_0;
_.getClass$ = function getClass_1032(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_ToplevelToolbarWidget$Item_2_classLit;
}
;
_.castableTypeMap$ = {346:1};
_.asAbstractButton = null;
_.onOverflow = null;
_.onToplevel = null;
_.proxy = null;
function $clinit_1603(){
  $clinit_1603 = nullMethod;
  fillImage = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAYCAYAAABKtPtEAAAAcElEQVR42u3YYQYAIBiD4d3/KN0pSSRJJImkdZB947nA+3NwzlEZKD4LYAEsgHiA9x6V4d5LZTjnUBn23lSGtRaVYc5JZRhjUBl671SG1hqVodZKZSilUBlyzlSGlBKVIcZIZQghUBm891RmAdRv8Q8+U3zLFCicDAAAAABJRU5ErkJggg==', 64, 24);
  overflowButtonIcon = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAWCAYAAAAinad/AAAALUlEQVR42mNgGAWjYBTQCqSlpf0HYWL5RBkGBKuJ4RMEIIXIignxR8EooCcAAG0wOzXQicwkAAAAAElFTkSuQmCC', 19, 22);
}

var fillImage = null, overflowButtonIcon = null;
function $clinit_1604(){
  $clinit_1604 = nullMethod;
  $clinit_1608();
  $clinit_99();
  $push_1(toInject, ($clinit_204() , '.C-GV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-self {\n  height : ' + buttonDown.height_0 + 'px;\n  display : inline;\n  float : left;\n  font-size : 8pt;\n  position : relative;\n  margin-right : -1px;\n  opacity : 0.5;\n}\n.C-GV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-self.C-KV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-wide {\n  padding : 0 12px;\n}\n.C-GV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-self.C-PU-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-compact {\n  padding : 0 4px;\n}\n.C-GV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-self.C-DV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-enabled {\n  opacity : 1;\n  cursor : pointer;\n  cursor : hand;\n}\n.C-GV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-self.C-DV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-enabled:active, .C-GV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-self.C-DV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-enabled.C-BV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-down {\n  height : ' + buttonDown.height_0 + 'px;\n  overflow : hidden;\n  background : url("' + buttonDown.url + '") -' + buttonDown.left + 'px -' + buttonDown.top_0 + 'px  repeat-x;\n}\n.C-AV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-divider {\n  height : ' + divider_0.height_0 + 'px;\n  width : ' + divider_0.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + divider_0.url + '") -' + divider_0.left + 'px -' + divider_0.top_0 + 'px  no-repeat;\n  width : 1px;\n  position : absolute;\n  top : 0;\n  bottom : 0;\n  left : 0;\n  right : 0;\n  z-index : -1;\n}\n.C-FV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-overlay {\n  position : absolute;\n  left : 0;\n  top : 0;\n  right : 0;\n  bottom : 0;\n}\n.C-DV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-enabled.C-BV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-down>.C-FV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-overlay {\n  border : 1px solid #aaa;\n}\n.C-DV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-enabled>.C-FV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-overlay:hover {\n  border : 1px solid #7f7f7f;\n}\n.C-JV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-visualElement {\n  float : left;\n  margin-top : 1px;\n}\n.C-HV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-textElement {\n  float : left;\n  margin-top : 6px;\n}\n.C-IV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-textElementWithVisualElement {\n  margin-left : 4px;\n}\n.C-CV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-dropdownArrow {\n  height : ' + dropdownArrow_0.height_0 + 'px;\n  width : ' + dropdownArrow_0.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + dropdownArrow_0.url + '") -' + dropdownArrow_0.left + 'px -' + dropdownArrow_0.top_0 + 'px  no-repeat;\n  float : left;\n  margin-top : 10px;\n  margin-left : 5px;\n}\n.C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden {\n  display : none;\n}\n'));
  flush();
}

function $handleButtonClicked(this$static){
  !!this$static.listener && this$static.listener.onClick_1();
}

function $setState_1(this$static, state){
  switch (state.ordinal) {
    case 0:
      $removeClassName(this$static.self_0.element, 'C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden');
      $addClassName(this$static.self_0.element, 'C-DV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-enabled');
      checkNotNull_0(this$static, 'uiObject cannot be null');
      break;
    case 1:
      $removeClassName(this$static.self_0.element, 'C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden');
      $removeClassName(this$static.self_0.element, 'C-DV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-enabled');
      checkNotNull_0(this$static, 'uiObject cannot be null');
      checkNotNull_0(this$static.element, 'addDebugClass: Element must not be null');
      break;
    case 2:
      $addClassName(this$static.self_0.element, 'C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden');
  }
}

function HorizontalToolbarButtonWidget_0(){
  var attachRecord0, divider, domId0, domId1, domId2, domId3, domId4, dropdownArrow, handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames1, handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames2, overlay, self_0, textElement, visualElement;
  $clinit_1604();
  $initWidget(this, (domId0 = $createUniqueId($doc) , domId1 = $createUniqueId($doc) , domId2 = $createUniqueId($doc) , domId3 = $createUniqueId($doc) , domId4 = $createUniqueId($doc) , self_0 = new ImplPanel_0("<div class='C-JV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-visualElement C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden' id='" + domId0 + "'><\/div> <span class='C-HV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-textElement C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden' id='" + domId1 + "'><\/span> <div class='C-CV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-dropdownArrow C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden' id='" + domId2 + "'><\/div> <div class='C-AV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-divider C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden' id='" + domId3 + "'><\/div> <div class='C-FV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-overlay' id='" + domId4 + "'><\/div>") , self_0.element['className'] = 'C-GV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-self C-DV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-enabled' , attachRecord0 = attachToDom(self_0.element) , visualElement = $doc.getElementById(domId0) , visualElement.removeAttribute('id') , textElement = $doc.getElementById(domId1) , textElement.removeAttribute('id') , dropdownArrow = $doc.getElementById(domId2) , dropdownArrow.removeAttribute('id') , divider = $doc.getElementById(domId3) , divider.removeAttribute('id') , overlay = $doc.getElementById(domId4) , overlay.removeAttribute('id') , attachRecord0.origParent?attachRecord0.origParent.insertBefore(attachRecord0.element, attachRecord0.origSibling):orphan(attachRecord0.element) , handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames1 = new HorizontalToolbarButtonWidget_BinderImpl$1_0(this) , $addDomHandler(self_0, handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames1, ($clinit_112() , $clinit_112() , TYPE_1)) , handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames2 = new HorizontalToolbarButtonWidget_BinderImpl$2_0 , $addDomHandler(self_0, handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames2, ($clinit_147() , $clinit_147() , TYPE_6)) , this.divider = divider , this.dropdownArrow = dropdownArrow , this.self_0 = self_0 , this.textElement = textElement , this.visualElement = visualElement , self_0));
  $addClassName(this.self_0.element, 'C-PU-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-compact');
}

function HorizontalToolbarButtonWidget(){
}

_ = HorizontalToolbarButtonWidget_0.prototype = HorizontalToolbarButtonWidget.prototype = new Composite;
_.addDebugClass = function addDebugClass_1(dc){
  checkNotNull_0(this, 'uiObject cannot be null');
  checkNotNull_0(this.element, 'addDebugClass: Element must not be null');
}
;
_.getClass$ = function getClass_1033(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_buttons_HorizontalToolbarButtonWidget_2_classLit;
}
;
_.hackGetWidget = function hackGetWidget_0(){
  return this;
}
;
_.setDown = function setDown(isDown){
  isDown?(setStyleName_0(this.self_0.element, 'C-BV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-down', true) , undefined):(setStyleName_0(this.self_0.element, 'C-BV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-down', false) , undefined);
}
;
_.setListener = function setListener(listener){
  this.listener = listener;
}
;
_.setShowDivider = function setShowDivider_0(showDivider){
  showDivider?$removeClassName(this.divider, 'C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden'):$addClassName(this.divider, 'C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden');
}
;
_.setShowDropdownArrow = function setShowDropdownArrow_0(showDropdownArrow){
  showDropdownArrow?$removeClassName(this.dropdownArrow, 'C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden'):$addClassName(this.dropdownArrow, 'C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden');
}
;
_.setState = function setState_0(state){
  $setState_1(this, state);
}
;
_.setText = function setText_0(text){
  this.textElement.textContent = text || '';
  this.debugText = text;
  if (!text.length) {
    $addClassName(this.textElement, 'C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden');
    $replaceClassName(this.self_0.element, 'C-KV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-wide', 'C-PU-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-compact');
  }
   else {
    $removeClassName(this.textElement, 'C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden');
    $replaceClassName(this.self_0.element, 'C-PU-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-compact', 'C-KV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-wide');
  }
}
;
_.setTooltip = function setTooltip_0(tooltip){
  tooltip == null || tooltip.length == 0?(this.element.removeAttribute('title') , undefined):(this.element.setAttribute('title', tooltip) , undefined);
}
;
_.setVisualElement = function setVisualElement_0(element){
  !!this.currentVisualElement && $removeFromParent(this.currentVisualElement);
  this.currentVisualElement = element;
  $removeClassName(this.visualElement, 'C-EV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-hidden');
  this.visualElement.appendChild(element);
  $addClassName(this.textElement, 'C-IV-org-waveprotocol-wave-client-widget-toolbar-buttons-HorizontalToolbarButtonWidget-Css-textElementWithVisualElement');
}
;
_.toString$ = function toString_78(){
  return this.debugText;
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
_.currentVisualElement = null;
_.debugText = null;
_.divider = null;
_.dropdownArrow = null;
_.listener = null;
_.self_0 = null;
_.textElement = null;
_.visualElement = null;
function HorizontalToolbarButtonWidget_BinderImpl$1_0(val$owner){
  this.val$owner = val$owner;
}

function HorizontalToolbarButtonWidget_BinderImpl$1(){
}

_ = HorizontalToolbarButtonWidget_BinderImpl$1_0.prototype = HorizontalToolbarButtonWidget_BinderImpl$1.prototype = new Object_0;
_.getClass$ = function getClass_1034(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_buttons_HorizontalToolbarButtonWidget_1BinderImpl$1_2_classLit;
}
;
_.onClick = function onClick_14(event_0){
  $handleButtonClicked(this.val$owner);
}
;
_.castableTypeMap$ = {24:1, 37:1};
_.val$owner = null;
function HorizontalToolbarButtonWidget_BinderImpl$2_0(){
}

function HorizontalToolbarButtonWidget_BinderImpl$2(){
}

_ = HorizontalToolbarButtonWidget_BinderImpl$2_0.prototype = HorizontalToolbarButtonWidget_BinderImpl$2.prototype = new Object_0;
_.getClass$ = function getClass_1035(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_buttons_HorizontalToolbarButtonWidget_1BinderImpl$2_2_classLit;
}
;
_.onMouseDown = function onMouseDown_4(event_0){
  event_0.nativeEvent.preventDefault();
  event_0.nativeEvent.stopPropagation();
}
;
_.castableTypeMap$ = {30:1, 37:1};
function $clinit_1608(){
  $clinit_1608 = nullMethod;
  buttonDown = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAYCAIAAADF1mwTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAERJREFUeNrs0wENAEAIw0AC+BeCGSy9DvI3B027npm4vIzj68zbDF1VDADwAQYASAiAhCQkIQYkxACALxPa3dMAT4ABAHUfBV0fX6ZtAAAAAElFTkSuQmCC', 64, 24);
  divider_0 = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAWCAYAAADq8U2pAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACxJREFUeNpiWLVqFdf///+5WBgYGMSBmIEmDHYY4yWM8YIIEWIUPwIxAAIMABaGD2C3Iu2JAAAAAElFTkSuQmCC', 2, 22);
  dropdownArrow_0 = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAFCAYAAABmWJ3mAAAAOElEQVR42mNIS0tbD8T/0fB6huTkZHkg4z2S4HuQGAMIADn1SBL1DMgAKHAfhBnQQWpqqj0Iw/gA8EQmffV229MAAAAASUVORK5CYII=', 6, 5);
}

var buttonDown = null, divider_0 = null, dropdownArrow_0 = null;
function $setDelegate_0(this$static, delegate){
  if (this$static.delegate != delegate) {
    this$static.delegate = delegate;
    $setDelegate_1(this$static.proxy, delegate);
    !!this$static.listener && delegate.setListener(this$static.listener);
    !!this$static.isDown && delegate.setDown(this$static.isDown.value_0);
  }
}

function ToolbarButtonUiProxy_0(delegate){
  this.proxy = new ToolbarButtonViewProxy_0;
  $setDelegate_0(this, delegate);
}

function ToolbarButtonUiProxy(){
}

_ = ToolbarButtonUiProxy_0.prototype = ToolbarButtonUiProxy.prototype = new Object_0;
_.addDebugClass = function addDebugClass_2(dc){
  $addDebugClass_1(this.proxy, dc);
}
;
_.getClass$ = function getClass_1036(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarButtonUiProxy_2_classLit;
}
;
_.hackGetWidget = function hackGetWidget_1(){
  return $hackGetWidget_0(this.proxy);
}
;
_.setDown = function setDown_0(isDown){
  this.isDown = ($clinit_415() , isDown?TRUE_0:FALSE_0);
  !!this.delegate && this.delegate.setDown(isDown);
}
;
_.setListener = function setListener_0(listener){
  this.listener = listener;
  !!this.delegate && this.delegate.setListener(listener);
}
;
_.setShowDivider = function setShowDivider_1(showDivider){
  $setShowDivider_0(this.proxy, showDivider);
}
;
_.setShowDropdownArrow = function setShowDropdownArrow_1(showDropdown){
  $setShowDropdownArrow_0(this.proxy, showDropdown);
}
;
_.setState = function setState_1(state){
  $setState_2(this.proxy, state);
}
;
_.setText = function setText_1(text){
  $setText_4(this.proxy, text);
}
;
_.setTooltip = function setTooltip_1(tooltip){
  $setTooltip_1(this.proxy, tooltip);
}
;
_.setVisualElement = function setVisualElement_1(element){
  $setVisualElement_0(this.proxy, element);
}
;
_.castableTypeMap$ = {};
_.delegate = null;
_.isDown = null;
_.listener = null;
function $clinit_1613(){
  $clinit_1613 = nullMethod;
  ENABLED = new ToolbarButtonView$State_0('ENABLED', 0);
  DISABLED_0 = new ToolbarButtonView$State_0('DISABLED', 1);
  INVISIBLE = new ToolbarButtonView$State_0('INVISIBLE', 2);
  $VALUES_52 = initValues(_3Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarButtonView$State_2_classLit, {9:1, 66:1, 166:1}, 129, [ENABLED, DISABLED_0, INVISIBLE]);
}

function ToolbarButtonView$State_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function valueOf_59(name_0){
  $clinit_1613();
  return valueOf_0(($clinit_1614() , $MAP_52), name_0);
}

function values_53(){
  $clinit_1613();
  return $VALUES_52;
}

function ToolbarButtonView$State(){
}

_ = ToolbarButtonView$State_0.prototype = ToolbarButtonView$State.prototype = new Enum;
_.getClass$ = function getClass_1037(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarButtonView$State_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 129:1};
var $VALUES_52, DISABLED_0, ENABLED, INVISIBLE;
function $clinit_1614(){
  $clinit_1614 = nullMethod;
  $MAP_52 = createValueOfMap(($clinit_1613() , $VALUES_52));
}

var $MAP_52;
function $addDebugClass_1(this$static, dc){
  this$static.dcs.add_3(dc);
  !!this$static.delegate && this$static.delegate.addDebugClass(dc);
}

function $hackGetWidget_0(this$static){
  return this$static.delegate?this$static.delegate.hackGetWidget():null;
}

function $setDelegate_1(this$static, delegate){
  checkState_0(!!delegate, 'Cannot set a null delegate');
  if (this$static.delegate != delegate) {
    this$static.delegate = delegate;
    !!this$static.state && delegate.setState(this$static.state);
    this$static.text_0 != null && delegate.setText(this$static.text_0);
    this$static.tooltip != null && delegate.setTooltip(this$static.tooltip);
    !!this$static.element && delegate.setVisualElement(this$static.element);
    !!this$static.showDropdownArrow && delegate.setShowDropdownArrow(this$static.showDropdownArrow.value_0);
    !!this$static.showDivider && delegate.setShowDivider(this$static.showDivider.value_0);
    this$static.dcs.each_3(new ToolbarButtonViewProxy$1_0(delegate));
  }
}

function $setShowDivider_0(this$static, showDivider){
  this$static.showDivider = ($clinit_415() , showDivider?TRUE_0:FALSE_0);
  !!this$static.delegate && this$static.delegate.setShowDivider(showDivider);
}

function $setShowDropdownArrow_0(this$static, showDropdownArrow){
  this$static.showDropdownArrow = ($clinit_415() , showDropdownArrow?TRUE_0:FALSE_0);
  !!this$static.delegate && this$static.delegate.setShowDropdownArrow(showDropdownArrow);
}

function $setState_2(this$static, state){
  this$static.state = state;
  !!this$static.delegate && this$static.delegate.setState(state);
}

function $setText_4(this$static, text){
  this$static.text_0 = text;
  !!this$static.delegate && this$static.delegate.setText(text);
}

function $setTooltip_1(this$static, tooltip){
  this$static.tooltip = tooltip;
  !!this$static.delegate && this$static.delegate.setTooltip(tooltip);
}

function $setVisualElement_0(this$static, element){
  this$static.element = element;
  !!this$static.delegate && this$static.delegate.setVisualElement(element);
}

function ToolbarButtonViewProxy_0(){
  this.dcs = ($clinit_2278() , defaultCollectionFactory.createStringSet());
}

function ToolbarButtonViewProxy(){
}

_ = ToolbarButtonViewProxy_0.prototype = ToolbarButtonViewProxy.prototype = new Object_0;
_.addDebugClass = function addDebugClass_3(dc){
  this.dcs.add_3(dc);
  !!this.delegate && this.delegate.addDebugClass(dc);
}
;
_.getClass$ = function getClass_1038(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarButtonViewProxy_2_classLit;
}
;
_.hackGetWidget = function hackGetWidget_2(){
  return this.delegate?this.delegate.hackGetWidget():null;
}
;
_.setShowDivider = function setShowDivider_2(showDivider){
  this.showDivider = ($clinit_415() , showDivider?TRUE_0:FALSE_0);
  !!this.delegate && this.delegate.setShowDivider(showDivider);
}
;
_.setShowDropdownArrow = function setShowDropdownArrow_2(showDropdownArrow){
  this.showDropdownArrow = ($clinit_415() , showDropdownArrow?TRUE_0:FALSE_0);
  !!this.delegate && this.delegate.setShowDropdownArrow(showDropdownArrow);
}
;
_.setState = function setState_2(state){
  this.state = state;
  !!this.delegate && this.delegate.setState(state);
}
;
_.setText = function setText_2(text){
  this.text_0 = text;
  !!this.delegate && this.delegate.setText(text);
}
;
_.setTooltip = function setTooltip_2(tooltip){
  this.tooltip = tooltip;
  !!this.delegate && this.delegate.setTooltip(tooltip);
}
;
_.setVisualElement = function setVisualElement_2(element){
  this.element = element;
  !!this.delegate && this.delegate.setVisualElement(element);
}
;
_.castableTypeMap$ = {};
_.delegate = null;
_.element = null;
_.showDivider = null;
_.showDropdownArrow = null;
_.state = null;
_.text_0 = null;
_.tooltip = null;
function ToolbarButtonViewProxy$1_0(val$display){
  this.val$display = val$display;
}

function ToolbarButtonViewProxy$1(){
}

_ = ToolbarButtonViewProxy$1_0.prototype = ToolbarButtonViewProxy$1.prototype = new Object_0;
_.apply_4 = function apply_76(dc){
  this.val$display.addDebugClass(dc);
}
;
_.getClass$ = function getClass_1039(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarButtonViewProxy$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.val$display = null;
function ToolbarClickButton_0(button){
  this.button_0 = button;
  button.setListener(this);
}

function ToolbarClickButton(){
}

_ = ToolbarClickButton_0.prototype = ToolbarClickButton.prototype = new AbstractToolbarButton;
_.getClass$ = function getClass_1040(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarClickButton_2_classLit;
}
;
_.onClick_1 = function onClick_15(){
  if (!(!!this.state && this.state != ($clinit_1613() , ENABLED))) {
    !!this.listener && this.listener.onClicked();
    !!this.parent_0 && this.parent_0.onActionPerformed();
  }
}
;
_.castableTypeMap$ = {};
_.listener = null;
function $init_16(this$static){
  this$static.toggleButton.listener = this$static;
}

function ToolbarPopupToggler_0(toggleButton, listener){
  this.toggleButton = toggleButton;
  this.listener = listener;
}

function ToolbarPopupToggler(){
}

_ = ToolbarPopupToggler_0.prototype = ToolbarPopupToggler.prototype = new Object_0;
_.getClass$ = function getClass_1041(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarPopupToggler_2_classLit;
}
;
_.onHide = function onHide_5(source){
  $setToggledOn(this.toggleButton, false);
  $remove_13(this.activePopup.listeners, this);
  this.activePopup = null;
}
;
_.onShow = function onShow_5(source){
}
;
_.onToggledOff = function onToggledOff_1(){
  $hide(this.activePopup);
  this.listener.activePopup = null;
}
;
_.onToggledOn = function onToggledOn_1(){
  this.activePopup = createPopup_1((this.toggleButton.button_0.hackGetWidget() , $clinit_1562() , !provider_0 && (provider_0 = new MobilePopupChromeProvider_0)));
  this.toggleButton.button_0.hackGetWidget();
  $add_9(this.activePopup.listeners, this);
  $onPopupCreated(this.listener, this.activePopup);
  $show_0(this.activePopup);
}
;
_.castableTypeMap$ = {345:1};
_.activePopup = null;
_.listener = null;
_.toggleButton = null;
function $setToggledOn(this$static, toggledOn){
  this$static.isToggledOn = toggledOn;
  this$static.button_0.setDown(this$static.isToggledOn);
}

function ToolbarToggleButton_0(button){
  this.button_0 = button;
  button.setListener(this);
}

function ToolbarToggleButton(){
}

_ = ToolbarToggleButton_0.prototype = ToolbarToggleButton.prototype = new AbstractToolbarButton;
_.getClass$ = function getClass_1042(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarToggleButton_2_classLit;
}
;
_.onClick_1 = function onClick_16(){
  if (!(!!this.state && this.state != ($clinit_1613() , ENABLED))) {
    $setToggledOn(this, !this.isToggledOn);
    !!this.listener && (this.isToggledOn?this.listener.onToggledOn():this.listener.onToggledOff());
    !!this.parent_0 && this.parent_0.onActionPerformed();
  }
}
;
_.castableTypeMap$ = {};
_.isToggledOn = false;
_.listener = null;
function $clinit_1623(){
  $clinit_1623 = nullMethod;
  $clinit_1627();
  $clinit_99();
  $push_1(toInject, ($clinit_204() , '.C-BW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-self {\n  padding : 0 1px;\n  -webkit-user-select : none;\n  -moz-user-select : none;\n}\n.C-LV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-content {\n  color : #003ea8;\n  font-size : 1em;\n  padding : 0 11px;\n  min-height : 22px;\n  overflow : auto;\n  zoom : 1;\n  opacity : 0.5;\n}\n.C-PV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-enabled>.C-LV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-content {\n  opacity : 1;\n  cursor : pointer;\n  cursor : hand;\n}\n.C-PV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-enabled>.C-LV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-content:hover, .C-PV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-enabled>.C-LV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-content:active, .C-PV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-enabled.C-NV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-down>.C-LV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-content {\n  background-color : #5690d2;\n  color : white;\n}\n.C-EW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-visualElement {\n  float : left;\n  min-width : 24px;\n}\n.C-CW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-textElement {\n  float : left;\n  margin-top : 4px;\n}\n.C-DW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-textElementWithVisualElement {\n  margin-left : 4px;\n}\n.C-OV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-dropdownArrow {\n  height : ' + dropdownArrow_1.height_0 + 'px;\n  width : ' + dropdownArrow_1.width_0 + 'px;\n  overflow : hidden;\n  background : url("' + dropdownArrow_1.url + '") -' + dropdownArrow_1.left + 'px -' + dropdownArrow_1.top_0 + 'px  no-repeat;\n  float : left;\n  margin-top : 9px;\n  margin-left : 7px;\n}\n.C-MV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-divider {\n  background-color : white;\n  border-bottom : 1px solid #e3e8f2;\n  margin : 3px 1px;\n}\n.C-AW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-hidden {\n  display : none;\n}\n'));
  flush();
}

function $handleButtonClicked_0(this$static){
  !!this$static.listener && this$static.listener.onClick_1();
}

function $setShowDivider_1(this$static, showDivider){
  showDivider?$removeClassName(this$static.divider, 'C-AW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-hidden'):$addClassName(this$static.divider, 'C-AW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-hidden');
}

function $setState_3(this$static, state){
  switch (state.ordinal) {
    case 0:
      $removeClassName(this$static.self_0.element, 'C-AW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-hidden');
      $addClassName(this$static.self_0.element, 'C-PV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-enabled');
      removeDebugClass(this$static.content_0);
      break;
    case 1:
      $removeClassName(this$static.self_0.element, 'C-AW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-hidden');
      $removeClassName(this$static.self_0.element, 'C-PV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-enabled');
      addDebugClass(this$static.content_0);
      break;
    case 2:
      $addClassName(this$static.self_0.element, 'C-AW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-hidden');
  }
}

function VerticalToolbarButtonWidget_0(){
  var attachRecord0, attachRecord1, content_0, divider, domId0, domId1, domId1Element, domId2, domId3, domId4, dropdownArrow, handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames1, handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames2, self_0, textElement, visualElement;
  $clinit_1623();
  $initWidget(this, (domId0 = $createUniqueId($doc) , domId1 = $createUniqueId($doc) , domId2 = $createUniqueId($doc) , domId3 = $createUniqueId($doc) , domId4 = $createUniqueId($doc) , content_0 = new ImplPanel_0("<div class='C-EW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-visualElement' id='" + domId2 + "'><\/div> <span class='C-CW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-textElement' id='" + domId3 + "'><\/span> <div class='C-OV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-dropdownArrow C-AW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-hidden' id='" + domId4 + "'><\/div>") , self_0 = new HTMLPanel_0("<div class='C-MV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-divider C-AW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-hidden' id='" + domId0 + "'><\/div>  <span id='" + domId1 + "'><\/span>") , content_0.element['className'] = 'C-LV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-content' , self_0.element['className'] = 'C-BW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-self C-PV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-enabled' , attachRecord0 = attachToDom(self_0.element) , divider = $doc.getElementById(domId0) , divider.removeAttribute('id') , attachRecord1 = attachToDom(content_0.element) , visualElement = $doc.getElementById(domId2) , visualElement.removeAttribute('id') , textElement = $doc.getElementById(domId3) , textElement.removeAttribute('id') , dropdownArrow = $doc.getElementById(domId4) , dropdownArrow.removeAttribute('id') , attachRecord1.origParent?attachRecord1.origParent.insertBefore(attachRecord1.element, attachRecord1.origSibling):orphan(attachRecord1.element) , domId1Element = $doc.getElementById(domId1) , attachRecord0.origParent?attachRecord0.origParent.insertBefore(attachRecord0.element, attachRecord0.origSibling):orphan(attachRecord0.element) , $removeFromParent_0(content_0) , $add_7(self_0.getChildren(), content_0) , domId1Element.parentNode.replaceChild(content_0.element, domId1Element) , $setParent(content_0, self_0) , handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames1 = new VerticalToolbarButtonWidget_BinderImpl$1_0(this) , $addDomHandler(content_0, handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames1, ($clinit_112() , $clinit_112() , TYPE_1)) , handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames2 = new VerticalToolbarButtonWidget_BinderImpl$2_0 , $addDomHandler(content_0, handlerMethodWithNameVeryUnlikelyToCollideWithUserFieldNames2, ($clinit_147() , $clinit_147() , TYPE_6)) , this.content_0 = content_0 , this.divider = divider , this.dropdownArrow = dropdownArrow , this.self_0 = self_0 , this.textElement = textElement , this.visualElement = visualElement , self_0));
}

function VerticalToolbarButtonWidget(){
}

_ = VerticalToolbarButtonWidget_0.prototype = VerticalToolbarButtonWidget.prototype = new Composite;
_.addDebugClass = function addDebugClass_4(dc){
  addDebugClass(this.content_0);
}
;
_.getClass$ = function getClass_1043(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_buttons_VerticalToolbarButtonWidget_2_classLit;
}
;
_.hackGetWidget = function hackGetWidget_3(){
  return this;
}
;
_.setDown = function setDown_1(isDown){
  isDown?(setStyleName_0(this.self_0.element, 'C-NV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-down', true) , undefined):(setStyleName_0(this.self_0.element, 'C-NV-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-down', false) , undefined);
}
;
_.setListener = function setListener_1(listener){
  this.listener = listener;
}
;
_.setShowDivider = function setShowDivider_3(showDivider){
  showDivider?$removeClassName(this.divider, 'C-AW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-hidden'):$addClassName(this.divider, 'C-AW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-hidden');
}
;
_.setShowDropdownArrow = function setShowDropdownArrow_3(showDropdownArrow){
  showDropdownArrow?$removeClassName(this.dropdownArrow, 'C-AW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-hidden'):$addClassName(this.dropdownArrow, 'C-AW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-hidden');
}
;
_.setState = function setState_3(state){
  $setState_3(this, state);
}
;
_.setText = function setText_3(text){
  this.textElement.textContent = text || '';
}
;
_.setTooltip = function setTooltip_3(tooltip){
  tooltip == null || tooltip.length == 0?(this.element.removeAttribute('title') , undefined):(this.element.setAttribute('title', tooltip) , undefined);
}
;
_.setVisualElement = function setVisualElement_3(element){
  !!this.currentVisualElement && $removeFromParent(this.currentVisualElement);
  this.visualElement.appendChild(element);
  this.currentVisualElement = element;
  $addClassName(this.textElement, 'C-DW-org-waveprotocol-wave-client-widget-toolbar-buttons-VerticalToolbarButtonWidget-Css-textElementWithVisualElement');
}
;
_.castableTypeMap$ = {5:1, 6:1, 7:1, 8:1, 53:1, 57:1};
_.content_0 = null;
_.currentVisualElement = null;
_.divider = null;
_.dropdownArrow = null;
_.listener = null;
_.self_0 = null;
_.textElement = null;
_.visualElement = null;
function VerticalToolbarButtonWidget_BinderImpl$1_0(val$owner){
  this.val$owner = val$owner;
}

function VerticalToolbarButtonWidget_BinderImpl$1(){
}

_ = VerticalToolbarButtonWidget_BinderImpl$1_0.prototype = VerticalToolbarButtonWidget_BinderImpl$1.prototype = new Object_0;
_.getClass$ = function getClass_1044(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_buttons_VerticalToolbarButtonWidget_1BinderImpl$1_2_classLit;
}
;
_.onClick = function onClick_17(event_0){
  $handleButtonClicked_0(this.val$owner);
}
;
_.castableTypeMap$ = {24:1, 37:1};
_.val$owner = null;
function VerticalToolbarButtonWidget_BinderImpl$2_0(){
}

function VerticalToolbarButtonWidget_BinderImpl$2(){
}

_ = VerticalToolbarButtonWidget_BinderImpl$2_0.prototype = VerticalToolbarButtonWidget_BinderImpl$2.prototype = new Object_0;
_.getClass$ = function getClass_1045(){
  return Lorg_waveprotocol_wave_client_widget_toolbar_buttons_VerticalToolbarButtonWidget_1BinderImpl$2_2_classLit;
}
;
_.onMouseDown = function onMouseDown_5(event_0){
  event_0.nativeEvent.preventDefault();
  event_0.nativeEvent.stopPropagation();
}
;
_.castableTypeMap$ = {30:1, 37:1};
function $clinit_1627(){
  $clinit_1627 = nullMethod;
  new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAYCAIAAADF1mwTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAERJREFUeNrs0wENAEAIw0AC+BeCGSy9DvI3B027npm4vIzj68zbDF1VDADwAQYASAiAhCQkIQYkxACALxPa3dMAT4ABAHUfBV0fX6ZtAAAAAElFTkSuQmCC', 64, 24);
  dropdownArrow_1 = new ImageResourcePrototype_0('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAGCAYAAAAL+1RLAAAAO0lEQVR42mNIS0tbn5GRocCADICC/4H4PRA3oAvC8H2gLgcMwfT0dH9kwXog5gdrT01N3Z+cnCyPbA8ADTYoDF6Q2w0AAAAASUVORK5CYII=', 5, 6);
}

var dropdownArrow_1 = null;
function $log_1(this$static, messages){
  this$static.this$0.handleClientErrors(this$static.level, null, messages);
  this$static.this$0.shouldLog(this$static.level) && (this$static.this$0.sink.lazyLog(this$static.level, messages) , undefined);
}

function $logPlainText_0(this$static, msg, t){
  this$static.this$0.handleClientErrors(this$static.level, t, initValues(_3Ljava_lang_Object_2_classLit, {9:1, 66:1}, 0, [msg]));
  this$static.this$0.shouldLog(this$static.level) && this$static.this$0.logPlainTextInner(this$static.level, msg + t.toString$());
}

function $showAll(this$static){
  var o, o$iterator, ret;
  ret = new ArrayList_2(this$static.buffer.data_0.size_0);
  for (o$iterator = $listIterator_2(this$static.buffer.data_0, 0); o$iterator.currentNode != o$iterator.this$0.header;) {
    o = $next_11(o$iterator);
    $add_9(ret, stringifyLogObject(o));
  }
  return ret;
}

function $compareTo_10(this$static, other){
  var domainCompare;
  domainCompare = compareTo_5(this$static.domain, other.domain);
  return domainCompare == 0?compareTo_5(this$static.id_0, other.id_0):domainCompare;
}

function AttachmentId_0(domain, id){
  checkNotNull_1(domain, 'Null domain');
  checkNotNull_1(id, 'Null id');
  domain.indexOf('/') != -1 && illegalArgument("An AttachmentId domain component cannot contain the '/' domain separator: " + domain);
  id.indexOf('/') != -1 && illegalArgument("An AttachmentId id component cannot contain the '/' id separator: " + id);
  this.domain = String(domain);
  this.id_0 = id;
}

function AttachmentId(){
}

_ = AttachmentId_0.prototype = AttachmentId.prototype = new Object_0;
_.compareTo$ = function compareTo_11(other){
  return $compareTo_10(this, dynamicCast(other, 348));
}
;
_.equals$ = function equals_43(obj){
  var other;
  if (this === obj) {
    return true;
  }
  if (obj == null) {
    return false;
  }
  if (Lorg_waveprotocol_wave_media_model_AttachmentId_2_classLit != getClass__devirtual$(obj)) {
    return false;
  }
  other = dynamicCast(obj, 348);
  return this.domain == other.domain && $equals_3(this.id_0, other.id_0);
}
;
_.getClass$ = function getClass_1051(){
  return Lorg_waveprotocol_wave_media_model_AttachmentId_2_classLit;
}
;
_.hashCode$ = function hashCode_42(){
  var result;
  result = 31 + getHashCode_0(this.domain);
  result = 31 * result + getHashCode_0(this.id_0);
  return result;
}
;
_.toString$ = function toString_81(){
  return '[AttachmentId:' + (this.serialized == null && (!this.domain.length?(this.serialized = this.id_0):(this.serialized = this.domain + '/' + this.id_0)) , this.serialized) + ']';
}
;
_.castableTypeMap$ = {10:1, 348:1};
_.domain = null;
_.id_0 = null;
_.serialized = null;
function $newAttachmentId(this$static){
  return new AttachmentId_0(this$static.idGenerator.defaultDomain, $newUniqueToken(this$static.idGenerator));
}

function AttachmentIdGeneratorImpl_0(idGenerator){
  this.idGenerator = idGenerator;
}

function AttachmentIdGeneratorImpl(){
}

_ = AttachmentIdGeneratorImpl_0.prototype = AttachmentIdGeneratorImpl.prototype = new Object_0;
_.getClass$ = function getClass_1052(){
  return Lorg_waveprotocol_wave_media_model_AttachmentIdGeneratorImpl_2_classLit;
}
;
_.castableTypeMap$ = {};
_.idGenerator = null;
function $remove_40(this$static, child){
  var element;
  element = this$static.valueToElement.remove_3(child);
  if (element == null) {
    return false;
  }
  this$static.router.getDocument_0().deleteNode(element);
  return true;
}

function $removeReply(this$static, reply){
  return !!reply && $remove_40(this$static.replies, reply);
}

function $removeBlip(this$static, blip){
  return !!blip && $remove_40(this$static.blips, blip);
}

function $clinit_1724(){
  var op;
  $clinit_1724 = nullMethod;
  var b;
  TITLE_KEY = join(initValues(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, ['title']));
  b = new DocInitializationBuilder_0;
  $clinit_1685();
  $elementStart_2(b, 'body', ($clinit_1849() , EMPTY_MAP_0));
  $annotationBoundary_0(b, $build_5($initializationValues(($clinit_1989() , new AnnotationBoundaryMapImpl$Builder_0), initValues(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, [TITLE_KEY, '']))));
  $elementStart_2(b, 'line', EMPTY_MAP_0);
  $add_9(b.accu, ($clinit_2022() , INSTANCE_16));
  $add_9(b.accu, INSTANCE_16);
  $annotationBoundary_0(b, $build_5($initializationEnd(new AnnotationBoundaryMapImpl$Builder_0, initValues(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, [TITLE_KEY]))));
  asInitialization((op = new BufferedDocOpImpl_0(dynamicCast($toArray_1(b.accu, ($clinit_2001() , EMPTY_ARRAY_0)), 223)) , checkWellformedness(op) , op));
}

function findImplicitTitle(doc){
  $clinit_1724();
  var afterPunctuation, c, el, end, firstLineReached, node, node$iterator, start, text, textIndex;
  afterPunctuation = false;
  start = -1;
  end = $size_15(doc.doc) - 1;
  firstLineReached = null;
  outer: for (node$iterator = ($clinit_2067() , $iterator_17(iterate(doc, ($clinit_1685() , getElementWithTagName(doc, ($clinit_2104() , checkState_2(topLevelContainerTagname != null, 'Top level line container tag name not set!') , $clinit_2104() , topLevelContainerTagname))), null, FORWARD_DEPTH_FIRST_ITERATOR))); node$iterator.next != null;) {
    node = $next_24(node$iterator);
    el = doc.doc.substrate.asElement_0(node);
    if (el == null) {
      if (firstLineReached != null) {
        text = $getData_0(doc, doc.doc.substrate.asText_0(node));
        for (textIndex = 0; textIndex < text.length; ++textIndex) {
          c = text.charCodeAt(textIndex);
          if (c == 46 || c == 33 || c == 63) {
            afterPunctuation = true;
          }
           else if (afterPunctuation && c == 32) {
            end = doc.doc.getLocation(node) + textIndex;
            break outer;
          }
           else {
            afterPunctuation = false;
          }
        }
      }
    }
     else {
      if ($equals_3(doc.doc.substrate.getTagName(el), 'line')) {
        if (firstLineReached != null) {
          end = doc.doc.getLocation(node);
          break;
        }
         else {
          start = doc.doc.getLocation(node);
          firstLineReached = el;
        }
      }
    }
  }
  if (start > 0 && end > start) {
    return new Range_2(start, end);
  }
  return null;
}

function setImplicitTitle(doc, start, end){
  $clinit_1724();
  checkArgument_2(start < end, 'Implicit title range is invalid');
  guardedResetAnnotation(doc, start, end, TITLE_KEY, '');
}

var TITLE_KEY;
function $removeParticipant(this$static, participant){
  checkState_2(this$static.isUsable, 'Cannot use destroyed conversation');
  $removeParticipant_1(this$static.wavelet, participant);
}

function $triggerOnParticipantRemoved(this$static, participant){
  var l_0, l$iterator;
  for (l$iterator = $iterator_20(this$static.listeners); l$iterator.hasNext();) {
    l_0 = dynamicCast(l$iterator.next_0(), 370);
    l_0.onParticipantRemoved(participant);
  }
}

_ = WaveletBasedConversation$1.prototype;
_.onParticipantRemoved_0 = function onParticipantRemoved_4(wavelet, participant){
  $triggerOnParticipantRemoved(this.this$0, participant);
}
;
function $clearInlineReplyAnchors(this$static, threadIds){
  this$static.blip.blip.content_0.getMutableDocument().with_$(new WaveletBasedConversationBlip$5_0(threadIds));
}

function $delete_1(this$static){
  var allReplies, replyThread, replyThread$iterator;
  this$static.isUsable || illegalState('Deleted blip is not usable: ' + this$static);
  allReplies = ($clinit_2278() , defaultCollectionFactory.createQueue());
  this$static.replies.each_2(new CollectionUtils$9_0(allReplies));
  for (replyThread$iterator = allReplies.iterator_0(); replyThread$iterator.hasNext();) {
    replyThread = dynamicCast(replyThread$iterator.next_0(), 363);
    $deleteThread_0(this$static, replyThread);
  }
  $deleteBlip_0(this$static.parentThread, this$static, true);
}

function $deleteThread_0(this$static, threadToDelete){
  $deleteBlips(threadToDelete);
  $removeReply(this$static.manifestBlip, threadToDelete.manifestThread);
  $clearInlineReplyAnchors(this$static, ($clinit_2278() , $clinit_467() , new Collections$UnmodifiableSet_0(newHashSet(initValues(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, [threadToDelete == threadToDelete.helper.this$0.rootThread?'':dynamicCast($get_21(threadToDelete.manifestThread.id_0), 1)])))));
}

function $deleteThreads(this$static){
  var threadToDelete, threadToDelete$iterator, threads, manifestBlips;
  threads = newArrayList((manifestBlips = this$static.manifestBlip.replies.orderedValues , new WaveletBasedConversationBlip$2_0(this$static, manifestBlips)));
  for (threadToDelete$iterator = new AbstractList$IteratorImpl_0(threads); threadToDelete$iterator.i < threadToDelete$iterator.this$0_0.size_1();) {
    threadToDelete = dynamicCast($next_4(threadToDelete$iterator), 363);
    $deleteBlips(threadToDelete);
    $removeReply(this$static.manifestBlip, threadToDelete.manifestThread);
  }
  this$static.blip.blip.content_0.getMutableDocument().with_$(new WaveletBasedConversationBlip$6_0);
}

function WaveletBasedConversationBlip$5_0(val$threadIds){
  this.val$threadIds = val$threadIds;
}

function WaveletBasedConversationBlip$5(){
}

_ = WaveletBasedConversationBlip$5_0.prototype = WaveletBasedConversationBlip$5.prototype = new Object_0;
_.exec_0 = function exec_0(doc){
  var el, el$iterator, elId, elementsToDelete;
  elementsToDelete = ($clinit_2278() , new ArrayList_0);
  for (el$iterator = ($clinit_2067() , $iterator_17(iterate(doc, doc.doc.substrate.getDocumentElement(), null, FORWARD_DEPTH_FIRST_ELEMENT_ITERATOR))); el$iterator.next != null;) {
    el = $next_24(el$iterator);
    if ($equals_3('reply', doc.doc.substrate.getTagName(el))) {
      elId = doc.doc.substrate.getAttribute_0(el, 'id');
      this.val$threadIds.contains(elId) && (setCheck(elementsToDelete.array, elementsToDelete.size_0++, el) , true);
    }
  }
  reverse_0(elementsToDelete);
  for (el$iterator = new AbstractList$IteratorImpl_0(elementsToDelete); el$iterator.i < el$iterator.this$0_0.size_1();) {
    el = $next_4(el$iterator);
    $deleteNode(doc, el);
  }
}
;
_.getClass$ = function getClass_1098(){
  return Lorg_waveprotocol_wave_model_conversation_WaveletBasedConversationBlip$5_2_classLit;
}
;
_.castableTypeMap$ = {};
_.val$threadIds = null;
function WaveletBasedConversationBlip$6_0(){
}

function WaveletBasedConversationBlip$6(){
}

_ = WaveletBasedConversationBlip$6_0.prototype = WaveletBasedConversationBlip$6.prototype = new Object_0;
_.exec_0 = function exec_1(doc){
  var el, el$iterator, elementsToDelete;
  elementsToDelete = ($clinit_2278() , new ArrayList_0);
  for (el$iterator = ($clinit_2067() , $iterator_17(iterate(doc, doc.doc.substrate.getDocumentElement(), null, FORWARD_DEPTH_FIRST_ELEMENT_ITERATOR))); el$iterator.next != null;) {
    el = $next_24(el$iterator);
    $equals_3('reply', doc.doc.substrate.getTagName(el)) && (setCheck(elementsToDelete.array, elementsToDelete.size_0++, el) , true);
  }
  reverse_0(elementsToDelete);
  for (el$iterator = new AbstractList$IteratorImpl_0(elementsToDelete); el$iterator.i < el$iterator.this$0_0.size_1();) {
    el = $next_4(el$iterator);
    $deleteNode(doc, el);
  }
}
;
_.getClass$ = function getClass_1099(){
  return Lorg_waveprotocol_wave_model_conversation_WaveletBasedConversationBlip$6_2_classLit;
}
;
_.castableTypeMap$ = {};
function $appendBlip_0(this$static){
  return this$static.isUsable || illegalState('Deleted thread is not usable: ' + this$static) , $appendBlipWithContent(this$static);
}

function $delete_2(this$static){
  !this$static.parentBlip?$deleteBlips(this$static):$deleteThread_0(this$static.parentBlip, this$static);
}

function $deleteBlip_0(this$static, blipToDelete, shouldDeleteSelfIfEmpty){
  checkArgument_2(this$static.blips.containsKey_1(dynamicCast($get_21(blipToDelete.manifestBlip.id_0), 1)), "Can't delete blip not from this thread");
  $deleteThreads(blipToDelete);
  $removeBlip(this$static.manifestThread, blipToDelete.manifestBlip);
  blipToDelete.blip.blip.content_0.getMutableDocument().size_1() != 0 && blipToDelete.blip.blip.content_0.getMutableDocument().emptyElement(dynamicCast(blipToDelete.blip.blip.content_0.getMutableDocument().getDocumentElement(), 256));
  shouldDeleteSelfIfEmpty && this$static.blips.isEmpty() && !!this$static.parentBlip && $deleteThread_0(this$static.parentBlip, this$static);
}

function $deleteBlips(this$static){
  var replyBlip, replyBlip$iterator;
  for (replyBlip$iterator = new AbstractList$IteratorImpl_0(valueList(this$static.blips)); replyBlip$iterator.i < replyBlip$iterator.this$0_0.size_1();) {
    replyBlip = dynamicCast($next_4(replyBlip$iterator), 369);
    $deleteBlip_0(this$static, replyBlip, false);
  }
}

function $getFirstBlip(this$static){
  var firstBlip, firstBlip$iterator, manifestBlip, result, manifestBlips, result_0;
  result = null;
  if (!this$static.blips.isEmpty()) {
    manifestBlip = dynamicCast($get_7(this$static.manifestThread.blips.orderedValues, 0), 365);
    result = dynamicCast(this$static.blips.get_4(dynamicCast($get_21(manifestBlip.id_0), 1)), 369);
    if (!result) {
      for (firstBlip$iterator = $iterator_13((manifestBlips = this$static.manifestThread.blips.orderedValues , new WaveletBasedConversationThread$1_0(this$static, manifestBlips))); firstBlip$iterator.next != null;) {
        firstBlip = dynamicCast((result_0 = firstBlip$iterator.next , $advance(firstBlip$iterator) , result_0), 369);
        result = firstBlip;
        break;
      }
    }
  }
  return result;
}

function $clinit_1753(){
  $clinit_1753 = nullMethod;
  FROM_LEFT = new AnnotationBehaviour$CursorDirection_0('FROM_LEFT', 0);
  FROM_RIGHT = new AnnotationBehaviour$CursorDirection_0('FROM_RIGHT', 1);
  NEUTRAL_0 = new AnnotationBehaviour$CursorDirection_0('NEUTRAL', 2);
  $VALUES_58 = initValues(_3Lorg_waveprotocol_wave_model_document_AnnotationBehaviour$CursorDirection_2_classLit, {9:1, 66:1, 166:1}, 135, [FROM_LEFT, FROM_RIGHT, NEUTRAL_0]);
}

function AnnotationBehaviour$CursorDirection_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function toBiasDirection(cursor){
  $clinit_1753();
  switch (cursor.ordinal) {
    case 0:
      return $clinit_1749() , LEFT_4;
    case 1:
      return $clinit_1749() , RIGHT_4;
  }
  return $clinit_1749() , NEITHER;
}

function valueOf_65(name_0){
  $clinit_1753();
  return valueOf_0(($clinit_1754() , $MAP_58), name_0);
}

function values_59(){
  $clinit_1753();
  return $VALUES_58;
}

function AnnotationBehaviour$CursorDirection(){
}

_ = AnnotationBehaviour$CursorDirection_0.prototype = AnnotationBehaviour$CursorDirection.prototype = new Enum;
_.getClass$ = function getClass_1108(){
  return Lorg_waveprotocol_wave_model_document_AnnotationBehaviour$CursorDirection_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 135:1};
var $VALUES_58, FROM_LEFT, FROM_RIGHT, NEUTRAL_0;
function $clinit_1754(){
  $clinit_1754 = nullMethod;
  $MAP_58 = createValueOfMap(($clinit_1753() , $VALUES_58));
}

var $MAP_58;
function DocumentEvent$AttributesModified_0(element, oldValues, newValues){
  var entry, entry$iterator, key, key$iterator, keysToRemove, newV, oldV;
  this.type_0 = ($clinit_1801() , ATTRIBUTES);
  this.element = element;
  oldV = new HashMap_3(oldValues);
  newV = new HashMap_3(newValues);
  keysToRemove = new ArrayList_0;
  for (entry$iterator = oldV.entrySet_0().iterator_0(); entry$iterator.hasNext();) {
    entry = dynamicCast(entry$iterator.next_0(), 11);
    key = dynamicCast(entry.getKey(), 1);
    if (newV.containsKey(key)) {
      if (equal_0(dynamicCast(newV.get(key), 1), dynamicCast(entry.getValue(), 1))) {
        newV.remove_3(key);
        setCheck(keysToRemove.array, keysToRemove.size_0++, key);
      }
    }
     else {
      newV.put(key, null);
    }
  }
  for (key$iterator = new AbstractList$IteratorImpl_0(keysToRemove); key$iterator.i < key$iterator.this$0_0.size_1();) {
    key = dynamicCast($next_4(key$iterator), 1);
    oldV.remove_3(key);
  }
  for (entry$iterator = newV.entrySet_0().iterator_0(); entry$iterator.hasNext();) {
    entry = dynamicCast(entry$iterator.next_0(), 11);
    oldV.containsKey(entry.getKey()) || oldV.put(dynamicCast(entry.getKey(), 1), null);
  }
  this.oldValues = ($clinit_467() , new Collections$UnmodifiableMap_0(oldV));
  this.newValues = new Collections$UnmodifiableMap_0(newV);
}

_ = DocumentEvent$AttributesModified_0.prototype = DocumentEvent$AttributesModified.prototype;
function IndexedDocumentImpl$9_0(val$iterable){
  this.val$iterable = val$iterable;
}

function IndexedDocumentImpl$9(){
}

_ = IndexedDocumentImpl$9_0.prototype = IndexedDocumentImpl$9.prototype = new Object_0;
_.getClass$ = function getClass_1145(){
  return Lorg_waveprotocol_wave_model_document_indexed_IndexedDocumentImpl$9_2_classLit;
}
;
_.iterator_0 = function iterator_26(){
  var iterator;
  return iterator = this.val$iterable.iterator_0() , new IndexedDocumentImpl$9$1_0(iterator);
}
;
_.castableTypeMap$ = {};
_.val$iterable = null;
function $next_16(this$static){
  var end, key, rawRange, start, value;
  rawRange = dynamicCast(this$static.val$iterator.next_0(), 176);
  key = rawRange.key;
  value = dynamicCast(rawRange.value_0, 1);
  start = rawRange.start;
  end = rawRange.end;
  return new RangedAnnotationImpl_0(key, value, start, end);
}

function IndexedDocumentImpl$9$1_0(val$iterator){
  this.val$iterator = val$iterator;
}

function IndexedDocumentImpl$9$1(){
}

_ = IndexedDocumentImpl$9$1_0.prototype = IndexedDocumentImpl$9$1.prototype = new Object_0;
_.getClass$ = function getClass_1146(){
  return Lorg_waveprotocol_wave_model_document_indexed_IndexedDocumentImpl$9$1_2_classLit;
}
;
_.hasNext = function hasNext_18(){
  return this.val$iterator.hasNext();
}
;
_.next_0 = function next_26(){
  return $next_16(this);
}
;
_.remove_1 = function remove_55(){
  this.val$iterator.remove_1();
}
;
_.castableTypeMap$ = {};
_.val$iterator = null;
_ = IndexedDocumentImpl$InvertibleCursor.prototype;
_.replaceAttributes = function replaceAttributes_0(oldAttrs, newAttrs){
  var attribute, attribute$iterator, key, node;
  this.this$0.annotations.skip(1);
  node = this.this$0.substrate.asElement_0(this.this$0.currentContainer.value_0);
  for (attribute$iterator = new ImmutableStateMap$1$1_0(oldAttrs.entrySet); attribute$iterator.iterator.hasNext();) {
    attribute = dynamicCast(attribute$iterator.iterator.next_0(), 390);
    key = attribute.name_0;
    !!$implFindEntry(newAttrs, key, false) || this.this$0.substrate.removeAttribute_0(node, key);
  }
  for (attribute$iterator = new ImmutableStateMap$1$1_0(newAttrs.entrySet); attribute$iterator.iterator.hasNext();) {
    attribute = dynamicCast(attribute$iterator.iterator.next_0(), 390);
    if (attribute.value_0 == null) {
      throw new OpCursorException_0('Null attribute value in setAttributes');
    }
    this.this$0.substrate.setAttribute_0(node, attribute.name_0, attribute.value_0);
  }
  ++this.this$0.currentLocation;
  this.this$0.currentContainer = this.this$0.currentContainer.nextContainer;
  this.this$0.currentParent = node;
  this.this$0.onModifyAttributes(this.this$0.currentParent, oldAttrs, newAttrs);
}
;
_ = IndexedDocumentImpl$NonInvertibleCursor.prototype;
_.replaceAttributes_0 = function replaceAttributes_1(newAttrs){
  var attribute, attribute$iterator, key, node, oldAttributes;
  $beginUpdate(this);
  node = this.this$0.substrate.asElement_0(this.this$0.currentContainer.value_0);
  oldAttributes = new AttributesImpl_1(this.this$0.substrate.getAttributes(node));
  for (attribute$iterator = new ImmutableStateMap$1$1_0(oldAttributes.entrySet); attribute$iterator.iterator.hasNext();) {
    attribute = dynamicCast(attribute$iterator.iterator.next_0(), 390);
    key = attribute.name_0;
    !!$implFindEntry(newAttrs, key, false) || this.this$0.substrate.removeAttribute_0(node, attribute.name_0);
  }
  for (attribute$iterator = new ImmutableStateMap$1$1_0(newAttrs.entrySet); attribute$iterator.iterator.hasNext();) {
    attribute = dynamicCast(attribute$iterator.iterator.next_0(), 390);
    if (attribute.value_0 == null) {
      throw new OpCursorException_0('Null attribute value in setAttributes');
    }
    this.this$0.substrate.setAttribute_0(node, attribute.name_0, attribute.value_0);
  }
  ++this.this$0.currentLocation;
  this.this$0.currentContainer = this.this$0.currentContainer.nextContainer;
  this.this$0.currentParent = node;
  this.this$0.annotations.skip(1);
  $replaceAttributes_0(this.builder, oldAttributes, newAttrs);
  this.this$0.onModifyAttributes(this.this$0.currentParent, oldAttributes, newAttrs);
}
;
function after_0(doc, node){
  return doc.getLocation_0(new Point$El_0(doc.substrate.getParentElement(node), doc.substrate.getNextSibling(node)));
}

_ = ObservableIndexedDocument.prototype;
_.onModifyAttributes = function onModifyAttributes_2(element, oldAttributes, newAttributes){
  $event(this, new DocumentEvent$AttributesModified_0(element, oldAttributes, newAttributes));
}
;
_ = StubModifiableAnnotations.prototype;
_.rangedAnnotations = function rangedAnnotations_5(start, end, keys){
  !keys && (keys = ($clinit_2278() , defaultCollectionFactory.createStringSet()));
  return new GenericRangedAnnotationIterable_0(this, start, end, keys);
}
;
_ = LocationModifier.prototype;
_.replaceAttributes = function replaceAttributes_2(oldAttributes, newAttributes){
  this.scanPoint += 1;
}
;
function setAnnotation(start, end, key, value){
  var mutationList;
  mutationList = new ArrayList_2(0);
  if (start != end) {
    checkPositionIndexesInRange(start, end, 2147483647);
    start > 0 && $add_9(mutationList, new Nindo$Skip_0(start));
    $add_9(mutationList, new Nindo$StartAnnotation_0(key, value));
    $add_9(mutationList, new Nindo$Skip_0(end - start));
    $add_9(mutationList, new Nindo$EndAnnotation_0(key));
  }
  return new Nindo_0(mutationList);
}

_ = Nindo$1.prototype;
_.replaceAttributes_0 = function replaceAttributes_3(attributes){
  $append_11(this.val$builder, 's@ ' + attributes + '; ');
}
;
function Nindo$2_0(val$b){
  this.val$b = val$b;
}

function Nindo$2(){
}

_ = Nindo$2_0.prototype = Nindo$2.prototype = new Object_0;
_.annotationBoundary = function annotationBoundary_2(map){
  var i;
  for (i = 0; i < map.endSize(); ++i) {
    $add_9(this.val$b.mutationList, new Nindo$EndAnnotation_0(map.getEndKey_0(i)));
  }
  for (i = 0; i < map.changeSize(); ++i) {
    $add_9(this.val$b.mutationList, new Nindo$StartAnnotation_0(map.getChangeKey_0(i), map.getNewValue(i)));
  }
}
;
_.characters_0 = function characters_5(chars){
  $characters(this.val$b, chars);
}
;
_.deleteCharacters = function deleteCharacters_4(chars){
  $add_9(this.val$b.mutationList, new Nindo$DeleteCharacters_0(chars.length));
}
;
_.deleteElementEnd = function deleteElementEnd_4(){
  $add_9(this.val$b.mutationList, ($clinit_1871() , INSTANCE_12));
}
;
_.deleteElementStart = function deleteElementStart_4(type, attrs){
  $add_9(this.val$b.mutationList, ($clinit_1872() , INSTANCE_13));
}
;
_.elementEnd = function elementEnd_4(){
  $add_9(this.val$b.mutationList, ($clinit_1873() , INSTANCE_14));
}
;
_.elementStart = function elementStart_4(type, attrs){
  $add_9(this.val$b.mutationList, new Nindo$ElementStart_0(type, attrs));
}
;
_.getClass$ = function getClass_1178(){
  return Lorg_waveprotocol_wave_model_document_operation_Nindo$2_2_classLit;
}
;
_.replaceAttributes = function replaceAttributes_4(oldAttrs, newAttrs){
  $add_9(this.val$b.mutationList, new Nindo$ReplaceAttributes_0(newAttrs));
}
;
_.retain = function retain_2(itemCount){
  $add_9(this.val$b.mutationList, new Nindo$Skip_0(itemCount));
}
;
_.updateAttributes = function updateAttributes_4(attrUpdate){
  var i, updates;
  updates = new HashMap_0;
  for (i = 0; i < attrUpdate.updates.size_1(); ++i) {
    updates.put(dynamicCast(attrUpdate.updates.get_0(i), 380).name_0, dynamicCast(attrUpdate.updates.get_0(i), 380).newValue);
  }
  $add_9(this.val$b.mutationList, new Nindo$UpdateAttributes_0(updates));
}
;
_.castableTypeMap$ = {};
_.val$b = null;
_ = Nindo$Builder.prototype;
_.replaceAttributes_0 = function replaceAttributes_5(attributes){
  $add_9(this.mutationList, new Nindo$ReplaceAttributes_0(attributes));
}
;
function Nindo$ReplaceAttributes_0(attributes){
  this.attributes = attributes;
}

function Nindo$ReplaceAttributes(){
}

_ = Nindo$ReplaceAttributes_0.prototype = Nindo$ReplaceAttributes.prototype = new Nindo$MutationComponent;
_.apply_13 = function apply_108(document_0){
  document_0.replaceAttributes_0(this.attributes);
}
;
_.getClass$ = function getClass_1188(){
  return Lorg_waveprotocol_wave_model_document_operation_Nindo$ReplaceAttributes_2_classLit;
}
;
_.castableTypeMap$ = {396:1};
_.attributes = null;
function $doSetAttributes(this$static){
  this$static.effectivePos += 1;
  this$static.resultingPos += 1;
}

_ = NindoValidator$1.prototype;
_.replaceAttributes_0 = function replaceAttributes_6(attributes){
  if ($checkChangeAttributes(this.val$a, attributes, this.val$v, false) == ($clinit_1975() , ILL_FORMED)) {
    throw new NindoValidator$IllFormed_0;
  }
  $doSetAttributes(this.val$a);
}
;
function $replaceAttributes_0(this$static, oldAttrs, newAttrs){
  $flushAnnotations(this$static);
  this$static.target_0.replaceAttributes(oldAttrs, newAttrs);
}

_ = AnnotationsNormalizer.prototype;
_.replaceAttributes = function replaceAttributes_7(oldAttrs, newAttrs){
  $flushAnnotations(this);
  this.target_0.replaceAttributes(oldAttrs, newAttrs);
}
;
function compose_3(operations){
  var collector, operation, operation$iterator;
  collector = new DocOpCollector_0;
  for (operation$iterator = new AbstractList$IteratorImpl_0(operations); operation$iterator.i < operation$iterator.this$0_0.size_1();) {
    operation = dynamicCast($next_4(operation$iterator), 202);
    $add_31(collector, operation);
  }
  return $composeAll(collector);
}

_ = Composer$CharactersPostTarget.prototype;
_.replaceAttributes = function replaceAttributes_8(oldAttrs, newAttrs){
  throw new Composer$ComposeException_0;
}
;
_ = Composer$DefaultPreTarget.prototype;
_.replaceAttributes = function replaceAttributes_9(oldAttrs, newAttrs){
  this.this$0.target_0 = new Composer$ReplaceAttributesPostTarget_0(this.this$0, oldAttrs, newAttrs);
}
;
_ = Composer$DeleteCharactersPreTarget.prototype;
_.replaceAttributes = function replaceAttributes_10(oldAttrs, newAttrs){
  throw new Composer$ComposeException_0;
}
;
_ = Composer$ElementEndPostTarget.prototype;
_.replaceAttributes = function replaceAttributes_11(oldAttrs, newAttrs){
  throw new Composer$ComposeException_0;
}
;
_ = Composer$ElementStartPostTarget.prototype;
_.replaceAttributes = function replaceAttributes_12(oldAttrs, newAttrs){
  $flushAnnotations_0(this.this$0);
  $elementStart_0(this.this$0.normalizer, this.type_0, newAttrs);
  this.this$0.target_0 = this.this$0.defaultTarget;
}
;
_ = Composer$FinisherPostTarget.prototype;
_.replaceAttributes = function replaceAttributes_13(oldAttrs, newAttrs){
  throw new Composer$ComposeException_0;
}
;
function Composer$ReplaceAttributesPostTarget_0(this$0, oldAttrs, newAttrs){
  this.this$0 = this$0;
  this.this$0_0 = this$0;
  this.oldAttrs = oldAttrs;
  this.newAttrs = newAttrs;
}

function Composer$ReplaceAttributesPostTarget(){
}

_ = Composer$ReplaceAttributesPostTarget_0.prototype = Composer$ReplaceAttributesPostTarget.prototype = new Composer$PostTarget;
_.deleteCharacters = function deleteCharacters_13(chars){
  throw new Composer$ComposeException_0;
}
;
_.deleteElementEnd = function deleteElementEnd_13(){
  throw new Composer$ComposeException_0;
}
;
_.deleteElementStart = function deleteElementStart_13(type, attrs){
  $flushAnnotations_0(this.this$0);
  $deleteElementStart_0(this.this$0.normalizer, type, this.oldAttrs);
  this.this$0.target_0 = this.this$0.defaultTarget;
}
;
_.getClass$ = function getClass_1217(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_Composer$ReplaceAttributesPostTarget_2_classLit;
}
;
_.replaceAttributes = function replaceAttributes_14(oldAttrs, newAttrs){
  $flushAnnotations_0(this.this$0);
  $replaceAttributes_0(this.this$0.normalizer, this.oldAttrs, newAttrs);
  this.this$0.target_0 = this.this$0.defaultTarget;
}
;
_.retain = function retain_10(itemCount){
  $flushAnnotations_0(this.this$0);
  $replaceAttributes_0(this.this$0.normalizer, this.oldAttrs, this.newAttrs);
  itemCount > 1?(this.this$0.target_0 = new Composer$RetainPreTarget_0(this.this$0, itemCount - 1)):(this.this$0.target_0 = this.this$0.defaultTarget);
}
;
_.updateAttributes = function updateAttributes_14(attrUpdate){
  $flushAnnotations_0(this.this$0);
  $replaceAttributes_0(this.this$0.normalizer, this.oldAttrs, dynamicCast($updateWith(this.newAttrs, attrUpdate, true), 406));
  this.this$0.target_0 = this.this$0.defaultTarget;
}
;
_.castableTypeMap$ = {};
_.newAttrs = null;
_.oldAttrs = null;
_.this$0 = null;
_ = Composer$RetainPostTarget.prototype;
_.replaceAttributes = function replaceAttributes_15(oldAttrs, newAttrs){
  $flushAnnotations_0(this.this$0);
  $replaceAttributes_0(this.this$0.normalizer, oldAttrs, newAttrs);
  1 < this.itemCount?(this.itemCount -= 1):(this.this$0.target_0 = this.this$0.defaultTarget);
}
;
_ = Composer$RetainPreTarget.prototype;
_.replaceAttributes = function replaceAttributes_16(oldAttrs, newAttrs){
  $flushAnnotations_0(this.this$0);
  $replaceAttributes_0(this.this$0.normalizer, oldAttrs, newAttrs);
  1 < this.itemCount?(this.itemCount -= 1):(this.this$0.target_0 = this.this$0.defaultTarget);
}
;
_ = Composer$UpdateAttributesPostTarget.prototype;
_.replaceAttributes = function replaceAttributes_17(oldAttrs, newAttrs){
  $flushAnnotations_0(this.this$0);
  $replaceAttributes_0(this.this$0.normalizer, dynamicCast($updateWith(oldAttrs, invertUpdate(this.attrUpdate), true), 406), newAttrs);
  this.this$0.target_0 = this.this$0.defaultTarget;
}
;
function decompose(op){
  var target;
  target = new Decomposer$Target_0;
  op.apply_8(target);
  return new Pair_0(dynamicCast($finish_2(target.insertionOp), 202), dynamicCast($finish_2(target.noninsertionOp), 202));
}

function Decomposer$Target_0(){
  this.insertionOp = new AnnotationsNormalizer_0(new RangeNormalizer_0(new DocOpBuffer_0));
  this.noninsertionOp = new AnnotationsNormalizer_0(new RangeNormalizer_0(new DocOpBuffer_0));
}

function Decomposer$Target(){
}

_ = Decomposer$Target_0.prototype = Decomposer$Target.prototype = new Object_0;
_.annotationBoundary = function annotationBoundary_6(map){
  $annotationBoundary(this.noninsertionOp, map);
}
;
_.characters_0 = function characters_13(chars){
  $characters_0(this.insertionOp, chars);
  $retain_0(this.noninsertionOp, chars.length);
}
;
_.deleteCharacters = function deleteCharacters_16(chars){
  $retain_0(this.insertionOp, chars.length);
  $deleteCharacters_0(this.noninsertionOp, chars);
}
;
_.deleteElementEnd = function deleteElementEnd_16(){
  $retain_0(this.insertionOp, 1);
  $deleteElementEnd_0(this.noninsertionOp);
}
;
_.deleteElementStart = function deleteElementStart_16(type, attrs){
  $retain_0(this.insertionOp, 1);
  $deleteElementStart_0(this.noninsertionOp, type, attrs);
}
;
_.elementEnd = function elementEnd_12(){
  $elementEnd_0(this.insertionOp);
  $retain_0(this.noninsertionOp, 1);
}
;
_.elementStart = function elementStart_12(type, attrs){
  $elementStart_0(this.insertionOp, type, attrs);
  $retain_0(this.noninsertionOp, 1);
}
;
_.finish_0 = function finish_6(){
  return new Pair_0(dynamicCast($finish_2(this.insertionOp), 202), dynamicCast($finish_2(this.noninsertionOp), 202));
}
;
_.getClass$ = function getClass_1221(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_Decomposer$Target_2_classLit;
}
;
_.replaceAttributes = function replaceAttributes_18(oldAttrs, newAttrs){
  $retain_0(this.insertionOp, 1);
  $replaceAttributes_0(this.noninsertionOp, oldAttrs, newAttrs);
}
;
_.retain = function retain_14(itemCount){
  $retain_0(this.insertionOp, itemCount);
  $retain_0(this.noninsertionOp, itemCount);
}
;
_.updateAttributes = function updateAttributes_18(attrUpdate){
  $retain_0(this.insertionOp, 1);
  $updateAttributes_0(this.noninsertionOp, attrUpdate);
}
;
_.castableTypeMap$ = {};
function DocOpInverter_0(target){
  this.target_0 = target;
}

function invert(input){
  var inverter;
  inverter = new DocOpInverter_0(new DocOpBuffer_0);
  input.apply_8(inverter);
  return inverter.target_0.finish_1();
}

function DocOpInverter(){
}

_ = DocOpInverter_0.prototype = DocOpInverter.prototype = new Object_0;
_.annotationBoundary = function annotationBoundary_7(map){
  $add_9(this.target_0.accu, new OperationComponents$AnnotationBoundary_0(new DocOpInverter$1_0(map)));
}
;
_.characters_0 = function characters_14(chars){
  $add_9(this.target_0.accu, new OperationComponents$DeleteCharacters_0(chars));
}
;
_.deleteCharacters = function deleteCharacters_17(chars){
  $add_9(this.target_0.accu, new OperationComponents$Characters_0(chars));
}
;
_.deleteElementEnd = function deleteElementEnd_17(){
  $add_9(this.target_0.accu, ($clinit_2022() , INSTANCE_16));
}
;
_.deleteElementStart = function deleteElementStart_17(type, attrs){
  $add_9(this.target_0.accu, new OperationComponents$ElementStart_0(type, attrs));
}
;
_.elementEnd = function elementEnd_13(){
  $add_9(this.target_0.accu, ($clinit_2020() , INSTANCE_15));
}
;
_.elementStart = function elementStart_13(type, attrs){
  $add_9(this.target_0.accu, new OperationComponents$DeleteElementStart_0(type, attrs));
}
;
_.finish_0 = function finish_7(){
  return this.target_0.finish_1();
}
;
_.getClass$ = function getClass_1223(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_DocOpInverter_2_classLit;
}
;
_.replaceAttributes = function replaceAttributes_19(oldAttrs, newAttrs){
  $add_9(this.target_0.accu, new OperationComponents$ReplaceAttributes_0(newAttrs, oldAttrs));
}
;
_.retain = function retain_15(itemCount){
  $add_9(this.target_0.accu, new OperationComponents$Retain_0(itemCount));
}
;
_.updateAttributes = function updateAttributes_19(attrUpdate){
  var i, update;
  update = new AttributesUpdateImpl_0;
  for (i = 0; i < attrUpdate.updates.size_1(); ++i) {
    update = $composeWith(update, new AttributesUpdateImpl_1(initValues(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, [dynamicCast(attrUpdate.updates.get_0(i), 380).name_0, dynamicCast(attrUpdate.updates.get_0(i), 380).newValue, dynamicCast(attrUpdate.updates.get_0(i), 380).oldValue])));
  }
  $add_9(this.target_0.accu, new OperationComponents$UpdateAttributes_0(update));
}
;
_.castableTypeMap$ = {};
_.target_0 = null;
function DocOpInverter$1_0(val$map){
  this.val$map = val$map;
}

function DocOpInverter$1(){
}

_ = DocOpInverter$1_0.prototype = DocOpInverter$1.prototype = new Object_0;
_.changeSize = function changeSize_2(){
  return this.val$map.changeSize();
}
;
_.endSize = function endSize_2(){
  return this.val$map.endSize();
}
;
_.getChangeKey_0 = function getChangeKey_3(changeIndex){
  return this.val$map.getChangeKey_0(changeIndex);
}
;
_.getClass$ = function getClass_1224(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_DocOpInverter$1_2_classLit;
}
;
_.getEndKey_0 = function getEndKey_3(endIndex){
  return this.val$map.getEndKey_0(endIndex);
}
;
_.getNewValue = function getNewValue_1(changeIndex){
  return this.val$map.getOldValue(changeIndex);
}
;
_.getOldValue = function getOldValue_1(changeIndex){
  return this.val$map.getNewValue(changeIndex);
}
;
_.castableTypeMap$ = {405:1};
_.val$map = null;
function $transformOperations(insertionOp, noninsertionOp){
  var insertionIndex, insertionPosition, insertionTarget, noninsertionIndex, noninsertionPosition, noninsertionTarget, positionTracker;
  positionTracker = new PositionTracker_0;
  insertionPosition = new PositionTracker$1_0(positionTracker);
  noninsertionPosition = new PositionTracker$2_0(positionTracker);
  insertionTarget = new InsertionNoninsertionTransformer$InsertionTarget_0(insertionPosition);
  noninsertionTarget = new InsertionNoninsertionTransformer$NoninsertionTarget_0(noninsertionPosition);
  insertionTarget.otherTarget = noninsertionTarget;
  noninsertionTarget.otherTarget = insertionTarget;
  insertionIndex = 0;
  noninsertionIndex = 0;
  while (insertionIndex < insertionOp.size_1()) {
    insertionOp.applyComponent(insertionIndex++, insertionTarget);
    while (insertionPosition.this$0.position_0 > 0) {
      if (noninsertionIndex >= noninsertionOp.size_1()) {
        throw new TransformException_0('Ran out of ' + noninsertionOp.size_1() + ' noninsertion op components after ' + insertionIndex + ' of ' + insertionOp.size_1() + ' insertion op components, with ' + insertionPosition.this$0.position_0 + ' spare positions');
      }
      noninsertionOp.applyComponent(noninsertionIndex++, noninsertionTarget);
    }
  }
  while (noninsertionIndex < noninsertionOp.size_1()) {
    noninsertionOp.applyComponent(noninsertionIndex++, noninsertionTarget);
  }
  insertionOp = dynamicCast(insertionTarget.targetDocument.finish_0(), 202);
  noninsertionOp = dynamicCast(noninsertionTarget.targetDocument.finish_0(), 202);
  return new OperationPair_0(insertionOp, noninsertionOp);
}

function InsertionNoninsertionTransformer$Target(){
}

_ = InsertionNoninsertionTransformer$Target.prototype = new Object_0;
_.finish_0 = function finish_8(){
  return dynamicCast(this.targetDocument.finish_0(), 202);
}
;
_.getClass$ = function getClass_1225(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$Target_2_classLit;
}
;
_.castableTypeMap$ = {};
_.relativePosition = null;
_.targetDocument = null;
function InsertionNoninsertionTransformer$InsertionTarget_0(relativePosition){
  this.targetDocument = new RangeNormalizer_0(new DocOpBuffer_0);
  this.relativePosition = relativePosition;
}

function InsertionNoninsertionTransformer$InsertionTarget(){
}

_ = InsertionNoninsertionTransformer$InsertionTarget_0.prototype = InsertionNoninsertionTransformer$InsertionTarget.prototype = new InsertionNoninsertionTransformer$Target;
_.annotationBoundary = function annotationBoundary_8(map){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.characters_0 = function characters_15(chars){
  if (this.otherTarget.depth > 0) {
    this.otherTarget.targetDocument.deleteCharacters(chars);
  }
   else {
    this.targetDocument.characters_0(chars);
    this.otherTarget.targetDocument.retain(chars.length);
  }
}
;
_.deleteCharacters = function deleteCharacters_18(chars){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.deleteElementEnd = function deleteElementEnd_18(){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.deleteElementStart = function deleteElementStart_18(tag, attrs){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.elementEnd = function elementEnd_14(){
  if (this.otherTarget.depth > 0) {
    this.otherTarget.targetDocument.deleteElementEnd();
  }
   else {
    this.targetDocument.elementEnd();
    this.otherTarget.targetDocument.retain(1);
  }
}
;
_.elementStart = function elementStart_14(tag, attrs){
  if (this.otherTarget.depth > 0) {
    this.otherTarget.targetDocument.deleteElementStart(tag, attrs);
  }
   else {
    this.targetDocument.elementStart(tag, attrs);
    this.otherTarget.targetDocument.retain(1);
  }
}
;
_.getClass$ = function getClass_1226(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$InsertionTarget_2_classLit;
}
;
_.replaceAttributes = function replaceAttributes_20(oldAttrs, newAttrs){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.retain = function retain_16(itemCount){
  var oldPosition;
  oldPosition = this.relativePosition.get_5();
  this.relativePosition.increase(itemCount);
  this.relativePosition.get_5() < 0?this.otherTarget.rangeCache.resolve(itemCount):oldPosition < 0 && this.otherTarget.rangeCache.resolve(-oldPosition);
}
;
_.updateAttributes = function updateAttributes_20(attrUpdate){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.castableTypeMap$ = {};
_.otherTarget = null;
function $resolveRange(this$static, size, cache){
  var oldPosition;
  oldPosition = this$static.relativePosition.get_5();
  this$static.relativePosition.increase(size);
  if (this$static.relativePosition.get_5() > 0) {
    oldPosition < 0 && cache.resolve(-oldPosition);
    return -oldPosition;
  }
   else {
    cache.resolve(size);
    return -1;
  }
}

function InsertionNoninsertionTransformer$NoninsertionTarget_0(relativePosition){
  this.targetDocument = new AnnotationsNormalizer_0(new RangeNormalizer_0(new DocOpBuffer_0));
  this.relativePosition = relativePosition;
  this.retainCache = new InsertionNoninsertionTransformer$NoninsertionTarget$1_0(this);
  this.deleteElementEndCache = new InsertionNoninsertionTransformer$NoninsertionTarget$2_0(this);
  this.rangeCache = this.retainCache;
}

function InsertionNoninsertionTransformer$NoninsertionTarget(){
}

_ = InsertionNoninsertionTransformer$NoninsertionTarget_0.prototype = InsertionNoninsertionTransformer$NoninsertionTarget.prototype = new InsertionNoninsertionTransformer$Target;
_.annotationBoundary = function annotationBoundary_9(map){
  this.targetDocument.annotationBoundary(map);
}
;
_.characters_0 = function characters_16(chars){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.deleteCharacters = function deleteCharacters_19(chars){
  var cache, resolutionSize;
  cache = new InsertionNoninsertionTransformer$NoninsertionTarget$DeleteCharactersCache_0(this, chars);
  resolutionSize = $resolveRange(this, chars.length, cache);
  resolutionSize >= 0 && (this.rangeCache = cache);
}
;
_.deleteElementEnd = function deleteElementEnd_19(){
  $resolveRange(this, 1, this.deleteElementEndCache) == 0 && (this.rangeCache = this.deleteElementEndCache);
}
;
_.deleteElementStart = function deleteElementStart_19(tag, attrs){
  var cache;
  cache = new InsertionNoninsertionTransformer$NoninsertionTarget$DeleteElementStartCache_0(this, tag, attrs);
  $resolveRange(this, 1, cache) == 0 && (this.rangeCache = cache);
}
;
_.elementEnd = function elementEnd_15(){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.elementStart = function elementStart_15(tag, attrs){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.getClass$ = function getClass_1227(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$NoninsertionTarget_2_classLit;
}
;
_.replaceAttributes = function replaceAttributes_21(oldAttrs, newAttrs){
  var cache;
  cache = new InsertionNoninsertionTransformer$NoninsertionTarget$ReplaceAttributesCache_0(this, oldAttrs, newAttrs);
  $resolveRange(this, 1, cache) == 0 && (this.rangeCache = cache);
}
;
_.retain = function retain_17(itemCount){
  $resolveRange(this, itemCount, this.retainCache);
  this.rangeCache = this.retainCache;
}
;
_.updateAttributes = function updateAttributes_21(attrUpdate){
  var cache;
  cache = new InsertionNoninsertionTransformer$NoninsertionTarget$UpdateAttributesCache_0(this, attrUpdate);
  $resolveRange(this, 1, cache) == 0 && (this.rangeCache = new InsertionNoninsertionTransformer$NoninsertionTarget$UpdateAttributesCache_0(this, attrUpdate));
}
;
_.castableTypeMap$ = {};
_.depth = 0;
_.otherTarget = null;
function InsertionNoninsertionTransformer$RangeCache(){
}

_ = InsertionNoninsertionTransformer$RangeCache.prototype = new Object_0;
_.getClass$ = function getClass_1228(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$RangeCache_2_classLit;
}
;
_.castableTypeMap$ = {};
function InsertionNoninsertionTransformer$NoninsertionTarget$1_0(this$1){
  this.this$1 = this$1;
}

function InsertionNoninsertionTransformer$NoninsertionTarget$1(){
}

_ = InsertionNoninsertionTransformer$NoninsertionTarget$1_0.prototype = InsertionNoninsertionTransformer$NoninsertionTarget$1.prototype = new InsertionNoninsertionTransformer$RangeCache;
_.getClass$ = function getClass_1229(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$NoninsertionTarget$1_2_classLit;
}
;
_.resolve = function resolve(itemCount){
  this.this$1.targetDocument.retain(itemCount);
  this.this$1.otherTarget.targetDocument.retain(itemCount);
}
;
_.castableTypeMap$ = {};
_.this$1 = null;
function InsertionNoninsertionTransformer$NoninsertionTarget$2_0(this$1){
  this.this$1 = this$1;
}

function InsertionNoninsertionTransformer$NoninsertionTarget$2(){
}

_ = InsertionNoninsertionTransformer$NoninsertionTarget$2_0.prototype = InsertionNoninsertionTransformer$NoninsertionTarget$2.prototype = new InsertionNoninsertionTransformer$RangeCache;
_.getClass$ = function getClass_1230(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$NoninsertionTarget$2_2_classLit;
}
;
_.resolve = function resolve_0(itemCount){
  this.this$1.targetDocument.deleteElementEnd();
  --this.this$1.depth;
}
;
_.castableTypeMap$ = {};
_.this$1 = null;
function InsertionNoninsertionTransformer$NoninsertionTarget$DeleteCharactersCache_0(this$1, characters){
  this.this$1 = this$1;
  this.characters = characters;
}

function InsertionNoninsertionTransformer$NoninsertionTarget$DeleteCharactersCache(){
}

_ = InsertionNoninsertionTransformer$NoninsertionTarget$DeleteCharactersCache_0.prototype = InsertionNoninsertionTransformer$NoninsertionTarget$DeleteCharactersCache.prototype = new InsertionNoninsertionTransformer$RangeCache;
_.getClass$ = function getClass_1231(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$NoninsertionTarget$DeleteCharactersCache_2_classLit;
}
;
_.resolve = function resolve_1(itemCount){
  this.this$1.targetDocument.deleteCharacters(this.characters.substr(0, itemCount - 0));
  this.characters = $substring(this.characters, itemCount);
}
;
_.castableTypeMap$ = {};
_.characters = null;
_.this$1 = null;
function InsertionNoninsertionTransformer$NoninsertionTarget$DeleteElementStartCache_0(this$1, type, attributes){
  this.this$1 = this$1;
  this.type_0 = type;
  this.attributes = attributes;
}

function InsertionNoninsertionTransformer$NoninsertionTarget$DeleteElementStartCache(){
}

_ = InsertionNoninsertionTransformer$NoninsertionTarget$DeleteElementStartCache_0.prototype = InsertionNoninsertionTransformer$NoninsertionTarget$DeleteElementStartCache.prototype = new InsertionNoninsertionTransformer$RangeCache;
_.getClass$ = function getClass_1232(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$NoninsertionTarget$DeleteElementStartCache_2_classLit;
}
;
_.resolve = function resolve_2(itemCount){
  this.this$1.targetDocument.deleteElementStart(this.type_0, this.attributes);
  ++this.this$1.depth;
}
;
_.castableTypeMap$ = {};
_.attributes = null;
_.this$1 = null;
_.type_0 = null;
function InsertionNoninsertionTransformer$NoninsertionTarget$ReplaceAttributesCache_0(this$1, oldAttributes, newAttributes){
  this.this$1 = this$1;
  this.oldAttributes = oldAttributes;
  this.newAttributes = newAttributes;
}

function InsertionNoninsertionTransformer$NoninsertionTarget$ReplaceAttributesCache(){
}

_ = InsertionNoninsertionTransformer$NoninsertionTarget$ReplaceAttributesCache_0.prototype = InsertionNoninsertionTransformer$NoninsertionTarget$ReplaceAttributesCache.prototype = new InsertionNoninsertionTransformer$RangeCache;
_.getClass$ = function getClass_1233(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$NoninsertionTarget$ReplaceAttributesCache_2_classLit;
}
;
_.resolve = function resolve_3(itemCount){
  this.this$1.targetDocument.replaceAttributes(this.oldAttributes, this.newAttributes);
  this.this$1.otherTarget.targetDocument.retain(1);
}
;
_.castableTypeMap$ = {};
_.newAttributes = null;
_.oldAttributes = null;
_.this$1 = null;
function InsertionNoninsertionTransformer$NoninsertionTarget$UpdateAttributesCache_0(this$1, update){
  this.this$1 = this$1;
  this.update = update;
}

function InsertionNoninsertionTransformer$NoninsertionTarget$UpdateAttributesCache(){
}

_ = InsertionNoninsertionTransformer$NoninsertionTarget$UpdateAttributesCache_0.prototype = InsertionNoninsertionTransformer$NoninsertionTarget$UpdateAttributesCache.prototype = new InsertionNoninsertionTransformer$RangeCache;
_.getClass$ = function getClass_1234(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$NoninsertionTarget$UpdateAttributesCache_2_classLit;
}
;
_.resolve = function resolve_4(itemCount){
  this.this$1.targetDocument.updateAttributes(this.update);
  this.this$1.otherTarget.targetDocument.retain(1);
}
;
_.castableTypeMap$ = {};
_.this$1 = null;
_.update = null;
function $transformOperations_0(clientOp, serverOp){
  var clientIndex, clientPosition, clientTarget, positionTracker, serverIndex, serverPosition, serverTarget;
  positionTracker = new PositionTracker_0;
  clientPosition = new PositionTracker$1_0(positionTracker);
  serverPosition = new PositionTracker$2_0(positionTracker);
  clientTarget = new InsertionTransformer$Target_0(clientPosition);
  serverTarget = new InsertionTransformer$Target_0(serverPosition);
  clientTarget.otherTarget = serverTarget;
  serverTarget.otherTarget = clientTarget;
  clientIndex = 0;
  serverIndex = 0;
  while (clientIndex < clientOp.size_1()) {
    clientOp.applyComponent(clientIndex++, clientTarget);
    while (clientPosition.this$0.position_0 > 0) {
      if (serverIndex >= serverOp.size_1()) {
        throw new TransformException_0('Ran out of ' + serverOp.size_1() + ' server op components after ' + clientIndex + ' of ' + clientOp.size_1() + ' client op components, with ' + clientPosition.this$0.position_0 + ' spare positions');
      }
      serverOp.applyComponent(serverIndex++, serverTarget);
    }
  }
  while (serverIndex < serverOp.size_1()) {
    serverOp.applyComponent(serverIndex++, serverTarget);
  }
  clientOp = $finish_4(clientTarget.targetDocument);
  serverOp = $finish_4(serverTarget.targetDocument);
  return new OperationPair_0(clientOp, serverOp);
}

function InsertionTransformer$Target_0(relativePosition){
  this.targetDocument = new RangeNormalizer_0(new DocOpBuffer_0);
  this.relativePosition = relativePosition;
}

function InsertionTransformer$Target(){
}

_ = InsertionTransformer$Target_0.prototype = InsertionTransformer$Target.prototype = new Object_0;
_.annotationBoundary = function annotationBoundary_10(map){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.characters_0 = function characters_17(chars){
  $characters_1(this.targetDocument, chars);
  $retain_1(this.otherTarget.targetDocument, chars.length);
}
;
_.deleteCharacters = function deleteCharacters_20(chars){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.deleteElementEnd = function deleteElementEnd_20(){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.deleteElementStart = function deleteElementStart_20(tag, attrs){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.elementEnd = function elementEnd_16(){
  $elementEnd_1(this.targetDocument);
  $retain_1(this.otherTarget.targetDocument, 1);
}
;
_.elementStart = function elementStart_16(tag, attrs){
  $elementStart_1(this.targetDocument, tag, attrs);
  $retain_1(this.otherTarget.targetDocument, 1);
}
;
_.finish_0 = function finish_9(){
  return $finish_4(this.targetDocument);
}
;
_.getClass$ = function getClass_1235(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionTransformer$Target_2_classLit;
}
;
_.replaceAttributes = function replaceAttributes_22(oldAttrs, newAttrs){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.retain = function retain_18(itemCount){
  var oldPosition;
  oldPosition = this.relativePosition.get_5();
  this.relativePosition.increase(itemCount);
  if (this.relativePosition.get_5() < 0) {
    $retain_1(this.targetDocument, itemCount);
    $retain_1(this.otherTarget.targetDocument, itemCount);
  }
   else if (oldPosition < 0) {
    $retain_1(this.targetDocument, -oldPosition);
    $retain_1(this.otherTarget.targetDocument, -oldPosition);
  }
}
;
_.updateAttributes = function updateAttributes_22(attrUpdate){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.castableTypeMap$ = {};
_.otherTarget = null;
_.relativePosition = null;
function $clinit_1933(){
  $clinit_1933 = nullMethod;
  retainResolver = new NoninsertionTransformer$1_0;
  deleteElementEndResolver = new NoninsertionTransformer$2_0;
}

function $transformOperations_1(this$static, clientOp, serverOp){
  var $e0, clientIndex, clientPosition, clientTarget, e, positionTracker, serverIndex, serverPosition, serverTarget;
  try {
    positionTracker = new PositionTracker_0;
    clientPosition = new PositionTracker$1_0(positionTracker);
    serverPosition = new PositionTracker$2_0(positionTracker);
    clientTarget = new NoninsertionTransformer$Target_0(this$static.clientOperation, clientPosition, this$static.clientAnnotationTracker);
    serverTarget = new NoninsertionTransformer$Target_0(this$static.serverOperation, serverPosition, this$static.serverAnnotationTracker);
    clientTarget.otherTarget = serverTarget;
    serverTarget.otherTarget = clientTarget;
    clientIndex = 0;
    serverIndex = 0;
    while (clientIndex < clientOp.size_1()) {
      clientOp.applyComponent(clientIndex++, clientTarget);
      while (clientPosition.this$0.position_0 > 0) {
        if (serverIndex >= serverOp.size_1()) {
          throw new TransformException_0('Ran out of ' + serverOp.size_1() + ' server op components after ' + clientIndex + ' of ' + clientOp.size_1() + ' client op components, with ' + clientPosition.this$0.position_0 + ' spare positions');
        }
        serverOp.applyComponent(serverIndex++, serverTarget);
      }
    }
    while (serverIndex < serverOp.size_1()) {
      serverOp.applyComponent(serverIndex++, serverTarget);
    }
    clientOp = dynamicCast($finish_2(clientTarget.targetDocument), 202);
    serverOp = dynamicCast($finish_2(serverTarget.targetDocument), 202);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 407)) {
      e = $e0;
      throw new TransformException_0(e.detailMessage);
    }
     else 
      throw $e0;
  }
  return new OperationPair_0(clientOp, serverOp);
}

function NoninsertionTransformer_0(){
  $clinit_1933();
  this.clientOperation = new AnnotationsNormalizer_0(new RangeNormalizer_0(new DocOpBuffer_0));
  this.serverOperation = new AnnotationsNormalizer_0(new RangeNormalizer_0(new DocOpBuffer_0));
  this.clientAnnotationTracker = new NoninsertionTransformer$3_0(this, this.clientOperation);
  this.serverAnnotationTracker = new NoninsertionTransformer$4_0(this, this.serverOperation);
}

function NoninsertionTransformer(){
}

_ = NoninsertionTransformer_0.prototype = NoninsertionTransformer.prototype = new Object_0;
_.getClass$ = function getClass_1236(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer_2_classLit;
}
;
_.castableTypeMap$ = {};
var deleteElementEndResolver, retainResolver;
function NoninsertionTransformer$1_0(){
}

function NoninsertionTransformer$1(){
}

_ = NoninsertionTransformer$1_0.prototype = NoninsertionTransformer$1.prototype = new Object_0;
_.getClass$ = function getClass_1237(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$1_2_classLit;
}
;
_.resolve_0 = function resolve_5(size, range){
  range.resolveRetain(size);
}
;
_.castableTypeMap$ = {};
function NoninsertionTransformer$2_0(){
}

function NoninsertionTransformer$2(){
}

_ = NoninsertionTransformer$2_0.prototype = NoninsertionTransformer$2.prototype = new Object_0;
_.getClass$ = function getClass_1238(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$2_2_classLit;
}
;
_.resolve_0 = function resolve_6(size, range){
  range.resolveDeleteElementEnd();
}
;
_.castableTypeMap$ = {};
function $commenceDeletion(this$static){
  var changeKeys, changeNewValues, changeOldValues, currentActive, entry, entry$iterator, forCombining, key, otherTracker, update;
  otherTracker = this$static.opposingTracker();
  changeKeys = new ArrayList_0;
  changeOldValues = new ArrayList_0;
  changeNewValues = new ArrayList_0;
  for (entry$iterator = otherTracker.propagating.entrySet_0().iterator_0(); entry$iterator.hasNext();) {
    entry = dynamicCast(entry$iterator.next_0(), 11);
    key = dynamicCast(entry.getKey(), 1);
    update = dynamicCast(entry.getValue(), 403);
    forCombining = dynamicCast(this$static.active.get(key), 403);
    this$static.temporary.put(key, forCombining);
    if (update) {
      setCheck(changeKeys.array, changeKeys.size_0++, key);
      $add_9(changeNewValues, update.newValue);
      forCombining?$add_9(changeOldValues, forCombining.oldValue):otherTracker.active.containsKey(key)?$add_9(changeOldValues, dynamicCast(otherTracker.active.get(key), 403).newValue):$add_9(changeOldValues, update.oldValue);
    }
     else if (otherTracker.active.containsKey(key)) {
      currentActive = dynamicCast(otherTracker.active.get(key), 403);
      setCheck(changeKeys.array, changeKeys.size_0++, key);
      $add_9(changeOldValues, currentActive.newValue);
      forCombining?$add_9(changeNewValues, forCombining.newValue):$add_9(changeNewValues, currentActive.oldValue);
    }
  }
  $commit(this$static, new AnnotationBoundaryMapImpl_0(initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0), dynamicCast($toArray_1(changeKeys, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(changeOldValues, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(changeNewValues, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404)));
}

function $commit(this$static, map){
  var i, key, oldActive;
  for (i = 0; i < map.endKeys.length; ++i) {
    key = map.endKeys[i];
    this$static.propagating.containsKey(key) || this$static.propagating.put(key, dynamicCast(this$static.active.get(key), 403));
    this$static.active.remove_3(key);
  }
  for (i = 0; i < map.changeKeys.length; ++i) {
    key = map.changeKeys[i];
    oldActive = dynamicCast(this$static.active.get(key), 403);
    if (!oldActive || !equal_0(oldActive.oldValue, map.changeOldValues[i]) || !equal_0(oldActive.newValue, map.changeNewValues[i])) {
      this$static.propagating.containsKey(key) || this$static.propagating.put(key, dynamicCast(this$static.active.get(key), 403));
      this$static.active.put(key, new ValueUpdate_0(map.changeOldValues[i], map.changeNewValues[i]));
    }
  }
  $annotationBoundary(this$static.output, map);
}

function $concludeDeletion(this$static){
  var changeKeys, changeNewValues, changeOldValues, endKeys, entry, entry$iterator, key, update;
  this$static.opposingTracker();
  endKeys = new ArrayList_0;
  changeKeys = new ArrayList_0;
  changeOldValues = new ArrayList_0;
  changeNewValues = new ArrayList_0;
  for (entry$iterator = this$static.temporary.entrySet_0().iterator_0(); entry$iterator.hasNext();) {
    entry = dynamicCast(entry$iterator.next_0(), 11);
    key = dynamicCast(entry.getKey(), 1);
    update = dynamicCast(entry.getValue(), 403);
    if (update) {
      setCheck(changeKeys.array, changeKeys.size_0++, key);
      $add_9(changeOldValues, update.oldValue);
      $add_9(changeNewValues, update.newValue);
    }
     else {
      setCheck(endKeys.array, endKeys.size_0++, key);
    }
  }
  this$static.propagating.clear();
  $commit(this$static, new AnnotationBoundaryMapImpl_0(dynamicCast($toArray_1(endKeys, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(changeKeys, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(changeOldValues, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(changeNewValues, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404)));
  this$static.temporary.clear();
}

function $register_2(this$static, map){
  var i;
  for (i = 0; i < map.endSize(); ++i) {
    this$static.tracked.remove_3(map.getEndKey_0(i));
  }
  for (i = 0; i < map.changeSize(); ++i) {
    this$static.tracked.put(map.getChangeKey_0(i), new ValueUpdate_0(map.getOldValue(i), map.getNewValue(i)));
  }
  this$static.process(map);
}

function NoninsertionTransformer$AnnotationTracker_0(output){
  this.tracked = new HashMap_0;
  this.active = new HashMap_0;
  this.temporary = new HashMap_0;
  this.propagating = new HashMap_0;
  this.output = output;
}

function NoninsertionTransformer$AnnotationTracker(){
}

_ = NoninsertionTransformer$AnnotationTracker.prototype = new Object_0;
_.getClass$ = function getClass_1239(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$AnnotationTracker_2_classLit;
}
;
_.castableTypeMap$ = {};
_.output = null;
function NoninsertionTransformer$3_0(this$0, $anonymous0){
  this.this$0 = this$0;
  NoninsertionTransformer$AnnotationTracker_0.call(this, $anonymous0);
}

function NoninsertionTransformer$3(){
}

_ = NoninsertionTransformer$3_0.prototype = NoninsertionTransformer$3.prototype = new NoninsertionTransformer$AnnotationTracker;
_.getClass$ = function getClass_1240(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$3_2_classLit;
}
;
_.opposingTracker = function opposingTracker(){
  return this.this$0.serverAnnotationTracker;
}
;
_.process = function process_0(map){
  var clientChangeKeys, clientChangeNewValues, clientChangeOldValues, clientEndKeys, i, key, newValue, oldValue, serverChangeKeys, serverChangeNewValues, serverChangeOldValues, serverEndKeys, serverValues;
  clientEndKeys = new ArrayList_0;
  clientChangeKeys = new ArrayList_0;
  clientChangeOldValues = new ArrayList_0;
  clientChangeNewValues = new ArrayList_0;
  serverEndKeys = new ArrayList_0;
  serverChangeKeys = new ArrayList_0;
  serverChangeOldValues = new ArrayList_0;
  serverChangeNewValues = new ArrayList_0;
  for (i = 0; i < map.endSize(); ++i) {
    key = map.getEndKey_0(i);
    serverValues = dynamicCast(this.this$0.serverAnnotationTracker.tracked.get(key), 403);
    setCheck(clientEndKeys.array, clientEndKeys.size_0++, key);
    if (serverValues) {
      setCheck(serverChangeKeys.array, serverChangeKeys.size_0++, key);
      $add_9(serverChangeOldValues, serverValues.oldValue);
      $add_9(serverChangeNewValues, serverValues.newValue);
    }
  }
  for (i = 0; i < map.changeSize(); ++i) {
    key = map.getChangeKey_0(i);
    oldValue = map.getOldValue(i);
    newValue = map.getNewValue(i);
    serverValues = dynamicCast(this.this$0.serverAnnotationTracker.tracked.get(key), 403);
    setCheck(clientChangeKeys.array, clientChangeKeys.size_0++, key);
    setCheck(clientChangeNewValues.array, clientChangeNewValues.size_0++, newValue);
    if (serverValues) {
      $add_9(clientChangeOldValues, serverValues.newValue);
      setCheck(serverEndKeys.array, serverEndKeys.size_0++, key);
    }
     else {
      setCheck(clientChangeOldValues.array, clientChangeOldValues.size_0++, oldValue);
    }
  }
  $commit(this, new AnnotationBoundaryMapImpl_0(dynamicCast($toArray_1(clientEndKeys, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(clientChangeKeys, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(clientChangeOldValues, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(clientChangeNewValues, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404)));
  $commit(this.this$0.serverAnnotationTracker, new AnnotationBoundaryMapImpl_0(dynamicCast($toArray_1(serverEndKeys, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(serverChangeKeys, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(serverChangeOldValues, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(serverChangeNewValues, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404)));
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function NoninsertionTransformer$4_0(this$0, $anonymous0){
  this.this$0 = this$0;
  NoninsertionTransformer$AnnotationTracker_0.call(this, $anonymous0);
}

function NoninsertionTransformer$4(){
}

_ = NoninsertionTransformer$4_0.prototype = NoninsertionTransformer$4.prototype = new NoninsertionTransformer$AnnotationTracker;
_.getClass$ = function getClass_1241(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$4_2_classLit;
}
;
_.opposingTracker = function opposingTracker_0(){
  return this.this$0.clientAnnotationTracker;
}
;
_.process = function process_1(map){
  var clientChangeKeys, clientChangeNewValues, clientChangeOldValues, clientEndKeys, clientValues, i, key, newValue, oldValue, serverChangeKeys, serverChangeNewValues, serverChangeOldValues, serverEndKeys;
  serverEndKeys = new ArrayList_0;
  serverChangeKeys = new ArrayList_0;
  serverChangeOldValues = new ArrayList_0;
  serverChangeNewValues = new ArrayList_0;
  clientEndKeys = new ArrayList_0;
  clientChangeKeys = new ArrayList_0;
  clientChangeOldValues = new ArrayList_0;
  clientChangeNewValues = new ArrayList_0;
  for (i = 0; i < map.endSize(); ++i) {
    key = map.getEndKey_0(i);
    clientValues = dynamicCast(this.this$0.clientAnnotationTracker.tracked.get(key), 403);
    if (clientValues) {
      setCheck(clientChangeKeys.array, clientChangeKeys.size_0++, key);
      $add_9(clientChangeOldValues, clientValues.oldValue);
      $add_9(clientChangeNewValues, clientValues.newValue);
    }
     else {
      setCheck(serverEndKeys.array, serverEndKeys.size_0++, key);
    }
  }
  for (i = 0; i < map.changeSize(); ++i) {
    key = map.getChangeKey_0(i);
    oldValue = map.getOldValue(i);
    newValue = map.getNewValue(i);
    clientValues = dynamicCast(this.this$0.clientAnnotationTracker.tracked.get(key), 403);
    if (clientValues) {
      setCheck(clientChangeKeys.array, clientChangeKeys.size_0++, key);
      setCheck(clientChangeOldValues.array, clientChangeOldValues.size_0++, newValue);
      $add_9(clientChangeNewValues, clientValues.newValue);
    }
     else {
      setCheck(serverChangeKeys.array, serverChangeKeys.size_0++, key);
      setCheck(serverChangeOldValues.array, serverChangeOldValues.size_0++, oldValue);
      setCheck(serverChangeNewValues.array, serverChangeNewValues.size_0++, newValue);
    }
  }
  $commit(this, new AnnotationBoundaryMapImpl_0(dynamicCast($toArray_1(serverEndKeys, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(serverChangeKeys, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(serverChangeOldValues, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(serverChangeNewValues, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404)));
  $commit(this.this$0.clientAnnotationTracker, new AnnotationBoundaryMapImpl_0(dynamicCast($toArray_1(clientEndKeys, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(clientChangeKeys, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(clientChangeOldValues, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404), dynamicCast($toArray_1(clientChangeNewValues, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, 0, 0)), 404)));
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function NoninsertionTransformer$DeleteCharactersResolver_0(characters){
  this.characters = characters;
}

function NoninsertionTransformer$DeleteCharactersResolver(){
}

_ = NoninsertionTransformer$DeleteCharactersResolver_0.prototype = NoninsertionTransformer$DeleteCharactersResolver.prototype = new Object_0;
_.getClass$ = function getClass_1242(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$DeleteCharactersResolver_2_classLit;
}
;
_.resolve_0 = function resolve_7(size, range){
  range.resolveDeleteCharacters(this.characters.substr(0, size - 0));
}
;
_.castableTypeMap$ = {};
_.characters = null;
function NoninsertionTransformer$DeleteElementStartResolver_0(type, attributes){
  this.type_0 = type;
  this.attributes = attributes;
}

function NoninsertionTransformer$DeleteElementStartResolver(){
}

_ = NoninsertionTransformer$DeleteElementStartResolver_0.prototype = NoninsertionTransformer$DeleteElementStartResolver.prototype = new Object_0;
_.getClass$ = function getClass_1243(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$DeleteElementStartResolver_2_classLit;
}
;
_.resolve_0 = function resolve_8(size, range){
  range.resolveDeleteElementStart(this.type_0, this.attributes);
}
;
_.castableTypeMap$ = {};
_.attributes = null;
_.type_0 = null;
function NoninsertionTransformer$InternalTransformException_0(){
  this.fillInStackTrace();
  this.detailMessage = 'Incompatible operations in transformation';
}

function NoninsertionTransformer$InternalTransformException(){
}

_ = NoninsertionTransformer$InternalTransformException_0.prototype = NoninsertionTransformer$InternalTransformException.prototype = new RuntimeException;
_.getClass$ = function getClass_1244(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$InternalTransformException_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 21:1, 38:1, 178:1, 407:1};
function NoninsertionTransformer$RangeCache(){
}

_ = NoninsertionTransformer$RangeCache.prototype = new Object_0;
_.getClass$ = function getClass_1245(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$RangeCache_2_classLit;
}
;
_.resolveDeleteCharacters = function resolveDeleteCharacters(characters){
  throw new NoninsertionTransformer$InternalTransformException_0;
}
;
_.resolveDeleteElementEnd = function resolveDeleteElementEnd(){
  throw new NoninsertionTransformer$InternalTransformException_0;
}
;
_.resolveDeleteElementStart = function resolveDeleteElementStart(type, attributes){
  throw new NoninsertionTransformer$InternalTransformException_0;
}
;
_.resolveReplaceAttributes = function resolveReplaceAttributes(oldAttributes, newAttributes){
  throw new NoninsertionTransformer$InternalTransformException_0;
}
;
_.resolveUpdateAttributes = function resolveUpdateAttributes(update){
  throw new NoninsertionTransformer$InternalTransformException_0;
}
;
_.castableTypeMap$ = {};
function NoninsertionTransformer$ReplaceAttributesResolver_0(oldAttributes, newAttributes){
  this.oldAttributes = oldAttributes;
  this.newAttributes = newAttributes;
}

function NoninsertionTransformer$ReplaceAttributesResolver(){
}

_ = NoninsertionTransformer$ReplaceAttributesResolver_0.prototype = NoninsertionTransformer$ReplaceAttributesResolver.prototype = new Object_0;
_.getClass$ = function getClass_1246(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$ReplaceAttributesResolver_2_classLit;
}
;
_.resolve_0 = function resolve_9(size, range){
  range.resolveReplaceAttributes(this.oldAttributes, this.newAttributes);
}
;
_.castableTypeMap$ = {};
_.newAttributes = null;
_.oldAttributes = null;
function $doDeleteCharacters_1(this$static, chars){
  $commenceDeletion(this$static.annotationTracker);
  $deleteCharacters_0(this$static.targetDocument, chars);
  $concludeDeletion(this$static.annotationTracker);
}

function $doDeleteElementEnd_0(this$static){
  $commenceDeletion(this$static.annotationTracker);
  $deleteElementEnd_0(this$static.targetDocument);
  $concludeDeletion(this$static.annotationTracker);
}

function $doDeleteElementStart_0(this$static, type, attrs){
  $commenceDeletion(this$static.annotationTracker);
  $deleteElementStart_0(this$static.targetDocument, type, attrs);
  $concludeDeletion(this$static.annotationTracker);
}

function $resolveRange_0(this$static, size, resolver){
  var oldPosition;
  oldPosition = this$static.relativePosition.get_5();
  this$static.relativePosition.increase(size);
  if (this$static.relativePosition.get_5() > 0) {
    oldPosition < 0 && resolver.resolve_0(-oldPosition, this$static.otherTarget.rangeCache);
    return -oldPosition;
  }
   else {
    resolver.resolve_0(size, this$static.otherTarget.rangeCache);
    return -1;
  }
}

function $syncAnnotations(this$static){
  this$static.annotationTracker.propagating.clear();
  this$static.otherTarget.annotationTracker.propagating.clear();
}

function NoninsertionTransformer$Target_0(targetDocument, relativePosition, annotationTracker){
  this.retainCache = new NoninsertionTransformer$Target$1_0(this);
  this.rangeCache = this.retainCache;
  this.targetDocument = targetDocument;
  this.relativePosition = relativePosition;
  this.annotationTracker = annotationTracker;
}

function NoninsertionTransformer$Target(){
}

_ = NoninsertionTransformer$Target_0.prototype = NoninsertionTransformer$Target.prototype = new Object_0;
_.annotationBoundary = function annotationBoundary_11(map){
  $register_2(this.annotationTracker, map);
}
;
_.characters_0 = function characters_18(chars){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.deleteCharacters = function deleteCharacters_21(chars){
  var resolutionSize;
  resolutionSize = $resolveRange_0(this, chars.length, new NoninsertionTransformer$DeleteCharactersResolver_0(chars));
  resolutionSize >= 0 && (this.rangeCache = new NoninsertionTransformer$Target$DeleteCharactersCache_0(this, chars.substr(resolutionSize, chars.length - resolutionSize)));
}
;
_.deleteElementEnd = function deleteElementEnd_21(){
  $resolveRange_0(this, 1, ($clinit_1933() , deleteElementEndResolver)) == 0 && (this.rangeCache = new NoninsertionTransformer$Target$DeleteElementEndCache_0(this));
}
;
_.deleteElementStart = function deleteElementStart_21(tag, attrs){
  $resolveRange_0(this, 1, new NoninsertionTransformer$DeleteElementStartResolver_0(tag, attrs)) == 0 && (this.rangeCache = new NoninsertionTransformer$Target$DeleteElementStartCache_0(this, tag, attrs));
}
;
_.elementEnd = function elementEnd_17(){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.elementStart = function elementStart_17(tag, attrs){
  throw new UnsupportedOperationException_1('This method should never be called.');
}
;
_.finish_0 = function finish_10(){
  return dynamicCast($finish_2(this.targetDocument), 202);
}
;
_.getClass$ = function getClass_1247(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$Target_2_classLit;
}
;
_.replaceAttributes = function replaceAttributes_23(oldAttrs, newAttrs){
  $resolveRange_0(this, 1, new NoninsertionTransformer$ReplaceAttributesResolver_0(oldAttrs, newAttrs)) == 0 && (this.rangeCache = new NoninsertionTransformer$Target$ReplaceAttributesCache_0(this, oldAttrs, newAttrs));
}
;
_.retain = function retain_19(itemCount){
  $resolveRange_0(this, itemCount, ($clinit_1933() , retainResolver));
  this.rangeCache = this.retainCache;
}
;
_.updateAttributes = function updateAttributes_23(attrUpdate){
  $resolveRange_0(this, 1, new NoninsertionTransformer$UpdateAttributesResolver_0(attrUpdate)) == 0 && (this.rangeCache = new NoninsertionTransformer$Target$UpdateAttributesCache_0(this, attrUpdate));
}
;
_.castableTypeMap$ = {};
_.annotationTracker = null;
_.depth = 0;
_.otherTarget = null;
_.relativePosition = null;
_.targetDocument = null;
function NoninsertionTransformer$Target$1_0(this$1){
  this.this$1 = this$1;
}

function NoninsertionTransformer$Target$1(){
}

_ = NoninsertionTransformer$Target$1_0.prototype = NoninsertionTransformer$Target$1.prototype = new NoninsertionTransformer$RangeCache;
_.getClass$ = function getClass_1248(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$Target$1_2_classLit;
}
;
_.resolveDeleteCharacters = function resolveDeleteCharacters_0(characters){
  $doDeleteCharacters_1(this.this$1.otherTarget, characters);
}
;
_.resolveDeleteElementEnd = function resolveDeleteElementEnd_0(){
  $doDeleteElementEnd_0(this.this$1.otherTarget);
  --this.this$1.otherTarget.depth;
}
;
_.resolveDeleteElementStart = function resolveDeleteElementStart_0(type, attributes){
  $doDeleteElementStart_0(this.this$1.otherTarget, type, attributes);
  ++this.this$1.otherTarget.depth;
}
;
_.resolveReplaceAttributes = function resolveReplaceAttributes_0(oldAttributes, newAttributes){
  $syncAnnotations(this.this$1);
  $retain_0(this.this$1.targetDocument, 1);
  $replaceAttributes_0(this.this$1.otherTarget.targetDocument, oldAttributes, newAttributes);
}
;
_.resolveRetain = function resolveRetain(itemCount){
  $syncAnnotations(this.this$1);
  $retain_0(this.this$1.targetDocument, itemCount);
  $retain_0(this.this$1.otherTarget.targetDocument, itemCount);
}
;
_.resolveUpdateAttributes = function resolveUpdateAttributes_0(update){
  $syncAnnotations(this.this$1);
  $retain_0(this.this$1.targetDocument, 1);
  $updateAttributes_0(this.this$1.otherTarget.targetDocument, update);
}
;
_.castableTypeMap$ = {};
_.this$1 = null;
function NoninsertionTransformer$Target$DeleteCharactersCache_0(this$1, characters){
  this.this$1 = this$1;
  this.characters = characters;
}

function NoninsertionTransformer$Target$DeleteCharactersCache(){
}

_ = NoninsertionTransformer$Target$DeleteCharactersCache_0.prototype = NoninsertionTransformer$Target$DeleteCharactersCache.prototype = new NoninsertionTransformer$RangeCache;
_.getClass$ = function getClass_1249(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$Target$DeleteCharactersCache_2_classLit;
}
;
_.resolveDeleteCharacters = function resolveDeleteCharacters_1(characters){
  this.characters = $substring(this.characters, characters.length);
}
;
_.resolveRetain = function resolveRetain_0(itemCount){
  $doDeleteCharacters_1(this.this$1, this.characters.substr(0, itemCount - 0));
  this.characters = $substring(this.characters, itemCount);
}
;
_.castableTypeMap$ = {};
_.characters = null;
_.this$1 = null;
function NoninsertionTransformer$Target$DeleteElementEndCache_0(this$1){
  this.this$1 = this$1;
}

function NoninsertionTransformer$Target$DeleteElementEndCache(){
}

_ = NoninsertionTransformer$Target$DeleteElementEndCache_0.prototype = NoninsertionTransformer$Target$DeleteElementEndCache.prototype = new NoninsertionTransformer$RangeCache;
_.getClass$ = function getClass_1250(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$Target$DeleteElementEndCache_2_classLit;
}
;
_.resolveDeleteElementEnd = function resolveDeleteElementEnd_1(){
  --this.this$1.depth;
  --this.this$1.otherTarget.depth;
}
;
_.resolveRetain = function resolveRetain_1(itemCount){
  $doDeleteElementEnd_0(this.this$1);
  --this.this$1.depth;
}
;
_.castableTypeMap$ = {};
_.this$1 = null;
function NoninsertionTransformer$Target$DeleteElementStartCache_0(this$1, type, attributes){
  this.this$1 = this$1;
  this.type_0 = type;
  this.attributes = attributes;
}

function NoninsertionTransformer$Target$DeleteElementStartCache(){
}

_ = NoninsertionTransformer$Target$DeleteElementStartCache_0.prototype = NoninsertionTransformer$Target$DeleteElementStartCache.prototype = new NoninsertionTransformer$RangeCache;
_.getClass$ = function getClass_1251(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$Target$DeleteElementStartCache_2_classLit;
}
;
_.resolveDeleteElementStart = function resolveDeleteElementStart_1(type, attributes){
  ++this.this$1.depth;
  ++this.this$1.otherTarget.depth;
}
;
_.resolveReplaceAttributes = function resolveReplaceAttributes_1(oldAttributes, newAttributes){
  $doDeleteElementStart_0(this.this$1, this.type_0, newAttributes);
  ++this.this$1.depth;
}
;
_.resolveRetain = function resolveRetain_2(itemCount){
  $doDeleteElementStart_0(this.this$1, this.type_0, this.attributes);
  ++this.this$1.depth;
}
;
_.resolveUpdateAttributes = function resolveUpdateAttributes_1(update){
  $doDeleteElementStart_0(this.this$1, this.type_0, dynamicCast($updateWith(this.attributes, update, true), 406));
  ++this.this$1.depth;
}
;
_.castableTypeMap$ = {};
_.attributes = null;
_.this$1 = null;
_.type_0 = null;
function NoninsertionTransformer$Target$ReplaceAttributesCache_0(this$1, oldAttributes, newAttributes){
  this.this$1 = this$1;
  this.oldAttributes = oldAttributes;
  this.newAttributes = newAttributes;
}

function NoninsertionTransformer$Target$ReplaceAttributesCache(){
}

_ = NoninsertionTransformer$Target$ReplaceAttributesCache_0.prototype = NoninsertionTransformer$Target$ReplaceAttributesCache.prototype = new NoninsertionTransformer$RangeCache;
_.getClass$ = function getClass_1252(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$Target$ReplaceAttributesCache_2_classLit;
}
;
_.resolveDeleteElementStart = function resolveDeleteElementStart_2(type, attributes){
  $doDeleteElementStart_0(this.this$1.otherTarget, type, this.newAttributes);
  ++this.this$1.otherTarget.depth;
}
;
_.resolveReplaceAttributes = function resolveReplaceAttributes_2(oldAttributes, newAttributes){
  $syncAnnotations(this.this$1);
  $replaceAttributes_0(this.this$1.targetDocument, newAttributes, this.newAttributes);
  $retain_0(this.this$1.otherTarget.targetDocument, 1);
}
;
_.resolveRetain = function resolveRetain_3(itemCount){
  $syncAnnotations(this.this$1);
  $replaceAttributes_0(this.this$1.targetDocument, this.oldAttributes, this.newAttributes);
  $retain_0(this.this$1.otherTarget.targetDocument, 1);
}
;
_.resolveUpdateAttributes = function resolveUpdateAttributes_2(update){
  $syncAnnotations(this.this$1);
  $replaceAttributes_0(this.this$1.targetDocument, dynamicCast($updateWith(this.oldAttributes, update, true), 406), this.newAttributes);
  $retain_0(this.this$1.otherTarget.targetDocument, 1);
}
;
_.castableTypeMap$ = {};
_.newAttributes = null;
_.oldAttributes = null;
_.this$1 = null;
function NoninsertionTransformer$Target$UpdateAttributesCache_0(this$1, update){
  this.this$1 = this$1;
  this.update = update;
}

function NoninsertionTransformer$Target$UpdateAttributesCache(){
}

_ = NoninsertionTransformer$Target$UpdateAttributesCache_0.prototype = NoninsertionTransformer$Target$UpdateAttributesCache.prototype = new NoninsertionTransformer$RangeCache;
_.getClass$ = function getClass_1253(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$Target$UpdateAttributesCache_2_classLit;
}
;
_.resolveDeleteElementStart = function resolveDeleteElementStart_3(type, attributes){
  $doDeleteElementStart_0(this.this$1.otherTarget, type, dynamicCast($updateWith(attributes, this.update, true), 406));
  ++this.this$1.otherTarget.depth;
}
;
_.resolveReplaceAttributes = function resolveReplaceAttributes_3(oldAttributes, newAttributes){
  $syncAnnotations(this.this$1);
  $retain_0(this.this$1.targetDocument, 1);
  $replaceAttributes_0(this.this$1.otherTarget.targetDocument, dynamicCast($updateWith(oldAttributes, this.update, true), 406), newAttributes);
}
;
_.resolveRetain = function resolveRetain_4(itemCount){
  $syncAnnotations(this.this$1);
  $updateAttributes_0(this.this$1.targetDocument, this.update);
  $retain_0(this.this$1.otherTarget.targetDocument, 1);
}
;
_.resolveUpdateAttributes = function resolveUpdateAttributes_3(update){
  var i, key, keySet, newOldValue, newUpdate, transformedAttributes, updated;
  $syncAnnotations(this.this$1);
  updated = new HashMap_0;
  for (i = 0; i < update.updates.size_1(); ++i) {
    updated.put(dynamicCast(update.updates.get_0(i), 380).name_0, dynamicCast(update.updates.get_0(i), 380).newValue);
  }
  newUpdate = new AttributesUpdateImpl_0;
  for (i = 0; i < this.update.updates.size_1(); ++i) {
    key = dynamicCast(this.update.updates.get_0(i), 380).name_0;
    newOldValue = updated.containsKey(key)?dynamicCast(updated.get(key), 1):dynamicCast(this.update.updates.get_0(i), 380).oldValue;
    newUpdate = $composeWith(newUpdate, new AttributesUpdateImpl_1(initValues(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, [key, newOldValue, dynamicCast(this.update.updates.get_0(i), 380).newValue])));
  }
  $updateAttributes_0(this.this$1.targetDocument, newUpdate);
  keySet = new HashSet_0;
  for (i = 0; i < this.update.updates.size_1(); ++i) {
    $add_13(keySet, dynamicCast(this.update.updates.get_0(i), 380).name_0);
  }
  transformedAttributes = $exclude(update, keySet);
  $updateAttributes_0(this.this$1.otherTarget.targetDocument, transformedAttributes);
}
;
_.castableTypeMap$ = {};
_.this$1 = null;
_.update = null;
function NoninsertionTransformer$UpdateAttributesResolver_0(update){
  this.update = update;
}

function NoninsertionTransformer$UpdateAttributesResolver(){
}

_ = NoninsertionTransformer$UpdateAttributesResolver_0.prototype = NoninsertionTransformer$UpdateAttributesResolver.prototype = new Object_0;
_.getClass$ = function getClass_1254(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$UpdateAttributesResolver_2_classLit;
}
;
_.resolve_0 = function resolve_10(size, range){
  range.resolveUpdateAttributes(this.update);
}
;
_.castableTypeMap$ = {};
_.update = null;
function PositionTracker_0(){
}

function PositionTracker(){
}

_ = PositionTracker_0.prototype = PositionTracker.prototype = new Object_0;
_.getClass$ = function getClass_1255(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_PositionTracker_2_classLit;
}
;
_.castableTypeMap$ = {};
_.position_0 = 0;
function PositionTracker$1_0(this$0){
  this.this$0 = this$0;
}

function PositionTracker$1(){
}

_ = PositionTracker$1_0.prototype = PositionTracker$1.prototype = new Object_0;
_.get_5 = function get_23(){
  return this.this$0.position_0;
}
;
_.getClass$ = function getClass_1256(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_PositionTracker$1_2_classLit;
}
;
_.increase = function increase(amount){
  this.this$0.position_0 += amount;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
function PositionTracker$2_0(this$0){
  this.this$0 = this$0;
}

function PositionTracker$2(){
}

_ = PositionTracker$2_0.prototype = PositionTracker$2.prototype = new Object_0;
_.get_5 = function get_24(){
  return -this.this$0.position_0;
}
;
_.getClass$ = function getClass_1257(){
  return Lorg_waveprotocol_wave_model_document_operation_algorithm_PositionTracker$2_2_classLit;
}
;
_.increase = function increase_0(amount){
  this.this$0.position_0 -= amount;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
_ = RangeNormalizer.prototype;
_.replaceAttributes = function replaceAttributes_24(oldAttrs, newAttrs){
  this.cache.flush_0();
  $add_9(this.target_0.accu, new OperationComponents$ReplaceAttributes_0(oldAttrs, newAttrs));
}
;
function transform(clientOp, serverOp){
  var $e0, c, ci0, ci1, ci2, cn0, cn1, cn2, e, r1, r2, r3, r4, s, si0, si1, si2, sn0, sn1, sn2;
  try {
    c = decompose(clientOp);
    s = decompose(serverOp);
    ci0 = dynamicCast(c.first, 202);
    cn0 = dynamicCast(c.second, 202);
    si0 = dynamicCast(s.first, 202);
    sn0 = dynamicCast(s.second, 202);
    r1 = $transformOperations_0(ci0, si0);
    ci1 = r1.clientOp;
    si1 = r1.serverOp;
    r2 = $transformOperations(ci1, sn0);
    ci2 = r2.clientOp;
    sn1 = r2.serverOp;
    r3 = $transformOperations(si1, cn0);
    si2 = r3.clientOp;
    cn1 = r3.serverOp;
    r4 = $transformOperations_1(new NoninsertionTransformer_0, cn1, sn1);
    cn2 = r4.clientOp;
    sn2 = r4.serverOp;
    return new OperationPair_0(compose_2(ci2, cn2), compose_2(si2, sn2));
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 184)) {
      e = $e0;
      throw new TransformException_1(e);
    }
     else 
      throw $e0;
  }
}

function $checkReplaceAttributes(this$static, oldAttrs, newAttrs, v){
  var actualOldAttrs, r, type;
  r = $checkAttributesWellFormed(this$static, oldAttrs, v);
  if (r != ($clinit_1975() , VALID)) {
    return r;
  }
  r = $checkAttributesWellFormed(this$static, newAttrs, v);
  if (r != VALID) {
    return r;
  }
  if (this$static.deletionStackDepth != 0) {
    return $addViolation_2(v, new DocOpAutomaton$OperationIllFormed_0('attribute change inside insert or delete', this$static.effectivePos, this$static.resultingPos));
  }
  if (this$static.insertionStack.size_0 != 0) {
    return $addViolation_2(v, new DocOpAutomaton$OperationIllFormed_0('attribute change inside insert or delete', this$static.effectivePos, this$static.resultingPos));
  }
  if ($effectiveDocSymbol_0(this$static) != ($clinit_1968() , OPEN_0)) {
    return $addViolation_3(v, new DocOpAutomaton$OperationInvalid_0('no element start to change attributes here', this$static.effectivePos, this$static.resultingPos));
  }
  type = $effectiveDocSymbolTag_0(this$static);
  actualOldAttrs = $effectiveDocSymbolAttributes(this$static);
  if (!$attributesEqual(actualOldAttrs, oldAttrs)) {
    return $addViolation_3(v, new DocOpAutomaton$OperationInvalid_0('old attributes differ from document', this$static.effectivePos, this$static.resultingPos));
  }
  r = $checkAnnotationsForRetain(this$static, v, 1);
  if (r != VALID) {
    return r;
  }
  r = $validateAttributes_0(this$static, type, newAttrs, v);
  if (r != VALID) {
    return r;
  }
  return VALID;
}

function $doReplaceAttributes(this$static){
  this$static.effectivePos += 1;
  this$static.effectivePos > this$static.doc.length_1()?(this$static.targetAnnotationsForDeletion = null):(this$static.targetAnnotationsForDeletion = $inheritedAnnotations(this$static).updateWithNoCompatibilityCheck(this$static.annotationsUpdate));
  this$static.resultingPos += 1;
  this$static.afterAnnotationBoundary = false;
}

function $initializationEnd(this$static, keys){
  this$static.endKeys = keys;
  return this$static;
}

function $initializationValues(this$static, pairs){
  var i, keys, values;
  if (pairs.length % 2 != 0) {
    throw new IllegalArgumentException_1('pairs must be even in size');
  }
  keys = initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, ~~(pairs.length / 2), 0);
  values = initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, ~~(pairs.length / 2), 0);
  for (i = 0; i < keys.length; ++i) {
    keys[i] = pairs[i * 2];
    values[i] = pairs[i * 2 + 1];
  }
  this$static.changeKeys = keys;
  this$static.changeOldValues = initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, keys.length, 0);
  this$static.changeNewValues = values;
  return this$static;
}

function $exclude(this$static, names){
  var newAttributes, update, update$iterator;
  newAttributes = new ArrayList_0;
  for (update$iterator = this$static.updates.iterator_0(); update$iterator.hasNext();) {
    update = dynamicCast(update$iterator.next_0(), 380);
    names.map.containsKey(update.name_0) || (setCheck(newAttributes.array, newAttributes.size_0++, update) , true);
  }
  return new AttributesUpdateImpl_2(newAttributes);
}

function $annotationBoundary_0(this$static, map){
  $add_9(this$static.accu, new OperationComponents$AnnotationBoundary_0(map));
  return this$static;
}

function $elementStart_2(this$static, type, attrs){
  $add_9(this$static.accu, new OperationComponents$ElementStart_0(type, attrs));
  return this$static;
}

_ = UncheckedDocOpBuffer.prototype;
_.replaceAttributes = function replaceAttributes_25(oldAttrs, newAttrs){
  $add_9(this.accu, new OperationComponents$ReplaceAttributes_0(oldAttrs, newAttrs));
}
;
_ = DocOpUtil$2.prototype;
_.replaceAttributes = function replaceAttributes_26(oldAttrs, newAttrs){
  $append_11(this.val$b, 'r@ ' + toConciseString_0(oldAttrs) + ' ' + toConciseString_0(newAttrs) + '; ');
}
;
_ = DocOpUtil$4.prototype;
_.replaceAttributes = function replaceAttributes_27(oldAttrs, newAttrs){
  ++this.val$size[0];
}
;
_ = DocOpUtil$5.prototype;
_.replaceAttributes = function replaceAttributes_28(oldAttrs, newAttrs){
  ++this.val$size[0];
}
;
_ = DocOpValidator$1.prototype;
_.replaceAttributes = function replaceAttributes_29(oldAttrs, newAttrs){
  this.val$accu[0] = $mergeWith(this.val$accu[0], $checkReplaceAttributes(this.val$a, oldAttrs, newAttrs, this.val$v));
  $abortIfIllFormed(this);
  $doReplaceAttributes(this.val$a);
}
;
_ = InitializationCursorAdapter.prototype;
_.replaceAttributes = function replaceAttributes_30(oldAttrs, newAttrs){
  throw new UnsupportedOperationException_1('replaceAttributes');
}
;
function OperationComponents$ReplaceAttributes_0(oldAttrs, newAttrs){
  this.oldAttrs = oldAttrs;
  this.newAttrs = newAttrs;
}

function OperationComponents$ReplaceAttributes(){
}

_ = OperationComponents$ReplaceAttributes_0.prototype = OperationComponents$ReplaceAttributes.prototype = new OperationComponents$DocOpComponent;
_.apply_8 = function apply_126(c){
  c.replaceAttributes(this.oldAttrs, this.newAttrs);
}
;
_.getClass$ = function getClass_1315(){
  return Lorg_waveprotocol_wave_model_document_operation_impl_OperationComponents$ReplaceAttributes_2_classLit;
}
;
_.getType_2 = function getType_31(){
  return $clinit_1855() , REPLACE_ATTRIBUTES;
}
;
_.castableTypeMap$ = {146:1, 414:1};
_.newAttrs = null;
_.oldAttrs = null;
function $getClosestBehaviour(this$static, key){
  var behaviours, closest, ret;
  closest = null;
  behaviours = $getBehaviours(this$static, key);
  while (behaviours.next) {
    closest = (ret = behaviours.next , $getNext_5(behaviours) , ret);
  }
  return closest;
}

function firstAnnotationBoundary(annotations, end, key){
  var ret;
  ret = $firstAnnotationChange(annotations.fullAnnotationSet, 0, end, key, null);
  return ret != -1?ret:end;
}

function ensureNodeBoundary(point, doc, textNodeOrganiser){
  var maybeSecond, textNode, textPoint;
  textPoint = point.asTextPoint();
  if (textPoint) {
    textNode = doc.asText_0(textPoint.container);
    maybeSecond = $splitText_2(textNodeOrganiser, textNode, $getTextOffset(textPoint));
    return maybeSecond?new Point$El_0(doc.getParentElement(maybeSecond), maybeSecond):new Point$El_0(doc.getParentElement(textNode), doc.getNextSibling(textNode));
  }
   else {
    return point.asElementPoint();
  }
}

function getElementWithTagName(doc, tagName){
  return getElementWithTagName_0(doc, tagName, doc.doc.substrate.getDocumentElement());
}

function isAncestor(doc, ancestor, child, canEqual){
  checkNotNull_1(ancestor, "Shouldn't check ancestry of a null node");
  while (child != null) {
    if ((ancestor == null?null:ancestor) === (child == null?null:child)) {
      return canEqual;
    }
    canEqual = true;
    child = doc.inner_0.getParentElement(child);
  }
  return false;
}

function jumpOut(doc, location_0){
  var el, nodeAfter;
  if (location_0.offset >= 0) {
    el = doc.doc.substrate.getParentElement(location_0.container);
    nodeAfter = doc.doc.substrate.getNextSibling(location_0.container);
    if (isLineContainer(doc, el)) {
      return location_0;
    }
  }
   else {
    el = location_0.container;
    nodeAfter = $getNodeAfter(location_0);
  }
  while (el != null && !isLineContainer(doc, el)) {
    nodeAfter = doc.doc.substrate.getNextSibling(el);
    el = doc.doc.substrate.getParentElement(el);
  }
  if (el == null) {
    return null;
  }
  return (el == null?null:el) === maskUndefined(location_0.container)?location_0:new Point$El_0(el, nodeAfter);
}

function leftAlign_0(current, fullDoc, important){
  var at, lastBefore, lcaVis, nodeLast, parent_0, visibleParent;
  if (!current || current.offset >= 0) {
    return current;
  }
  parent_0 = current.container;
  at = $getNodeAfter(current);
  at == null?(lastBefore = fullDoc.inner_0.getLastChild_0(parent_0)):(lastBefore = fullDoc.inner_0.getPreviousSibling(at));
  visibleParent = $getVisibleNode(important, parent_0);
  if (lastBefore == null) {
    if ((parent_0 == null?null:parent_0) === (visibleParent == null?null:visibleParent)) {
      return textOrElementStart(fullDoc, parent_0);
    }
    lastBefore = parent_0;
  }
  nodeLast = $getPreviousVisibleNodeDepthFirst(important, lastBefore, null, true);
  lcaVis = nodeLast == null?lastBefore:nearestCommonAncestor_0(fullDoc, nodeLast, lastBefore);
  if (isAncestor(fullDoc, lcaVis, visibleParent, false)) {
    return textOrElementStart(fullDoc, visibleParent);
  }
  at = nodeLast == null?null:$getNextSibling_3(important, nodeLast);
  at != null?(parent_0 = fullDoc.inner_0.getParentElement(at)):nodeLast != null && (parent_0 = fullDoc.inner_0.getParentElement(nodeLast));
  return at == null?new Point$El_0(parent_0, null):new Point$El_0(fullDoc.inner_0.getParentElement(at), at);
}

function nearestCommonAncestor_0(doc, node1, node2){
  var ancestors, commonAncestor;
  ancestors = ($clinit_2278() , defaultCollectionFactory.createIdentityMap());
  if ((node1 == null?null:node1) === (node2 == null?null:node2)) {
    return node1;
  }
  commonAncestor = null;
  while (node1 != null || node2 != null) {
    if (node1 != null) {
      if (ancestors.has(node1)) {
        commonAncestor = node1;
        break;
      }
      ancestors.put_0(node1, node1);
      node1 = doc.getParentElement(node1);
    }
    if (node2 != null) {
      if (ancestors.has(node2)) {
        commonAncestor = node2;
        break;
      }
      ancestors.put_0(node2, node2);
      node2 = doc.getParentElement(node2);
    }
  }
  if (commonAncestor == null) {
    throw new IllegalArgumentException_1('nearestCommonAncestor: Given nodes are not in the same document');
  }
  return commonAncestor;
}

function normalizePoint(point, doc){
  var nodeAfterAsText, previous, previousAsText;
  previous = null;
  if (point.offset >= 0) {
    $getTextOffset(point) == 0 && (previous = $getPreviousSibling_3(doc, point.container));
  }
   else {
    previous = nodeBefore_0(doc, point.asElementPoint());
    nodeAfterAsText = doc.inner_0.asText_0($getNodeAfter(point));
    nodeAfterAsText != null && (point = new Point$Tx_0(nodeAfterAsText, 0));
  }
  previousAsText = doc.inner_0.asText_0(previous);
  previous != null && previousAsText != null && (point = new Point$Tx_0(previous, doc.inner_0.getLength(previousAsText)));
  return point;
}

function transparentSlice(splitAt, cxt){
  var location_0, nodeAfter, pParent, pPoint, text;
  location_0 = $getLocation_4(cxt.this$0.indexedDoc, getFilteredPoint(cxt.this$0.persistentContentView, splitAt));
  pPoint = $locate_0(cxt.this$0.indexedDoc, location_0);
  if (pPoint.offset >= 0) {
    text = cxt.this$0.mutableContent.doc.substrate.asText_0(pPoint.container);
    pParent = cxt.this$0.mutableContent.doc.substrate.getParentElement(text);
    if ((pParent == null?null:pParent) === maskUndefined(cxt.this$0.fullContentView.inner_0.getParentElement(text))) {
      return pPoint;
    }
     else {
      pPoint = ensureNodeBoundary(pPoint, cxt.this$0.mutableContent, cxt.this$0.indexedDoc);
    }
  }
  if ($getNodeAfter(pPoint) != null) {
    nodeAfter = $getNodeAfter(pPoint);
    return maskUndefined(cxt.this$0.fullContentView.inner_0.getParentElement(nodeAfter)) !== maskUndefined(pPoint.container)?new Point$El_0(pPoint.container, $transparentSlice(cxt.this$0.fullContentView, dynamicCast(nodeAfter, 192))):pPoint;
  }
   else {
    return pPoint;
  }
}

_ = DocOpScrub$3.prototype;
_.replaceAttributes = function replaceAttributes_31(oldAttrs, newAttrs){
  $add_9(this.val$target.accu, new OperationComponents$ReplaceAttributes_0(scrubAttributes(oldAttrs, this.val$attrNames), scrubAttributes(newAttrs, this.val$attrNames)));
}
;
function $asRange(this$static){
  !this$static.range && (this$static.range = this$static.anchor < this$static.focus_0?new Range_2(this$static.anchor, this$static.focus_0):new Range_2(this$static.focus_0, this$static.anchor));
  return this$static.range;
}

function $isOrdered(this$static){
  return this$static.anchor <= this$static.focus_0;
}

function GenericRangedAnnotationIterable_0(a_0, start, end, keys){
  this.a_0 = a_0;
  this.start = start;
  this.end = end;
  this.keys = keys;
}

function GenericRangedAnnotationIterable(){
}

_ = GenericRangedAnnotationIterable_0.prototype = GenericRangedAnnotationIterable.prototype = new Object_0;
_.getClass$ = function getClass_1367(){
  return Lorg_waveprotocol_wave_model_document_util_GenericRangedAnnotationIterable_2_classLit;
}
;
_.iterator_0 = function iterator_30(){
  return new GenericRangedAnnotationIterable$GenericRangedAnnotationIterator_0(this.a_0, this.start, this.end, this.keys);
}
;
_.castableTypeMap$ = {};
_.a_0 = null;
_.end = 0;
_.keys = null;
_.start = 0;
function $next_28(this$static){
  var entry;
  if (this$static.entries.heap.size_0 == 0) {
    throw new NoSuchElementException_1('No more ranged annotations');
  }
  entry = dynamicCast($remove_11(this$static.entries), 436);
  !this$static.rangedAnnotation?(this$static.rangedAnnotation = new RangedAnnotationImpl_0(entry.key, entry.value_0, entry.start, entry.end)):$set_9(this$static.rangedAnnotation, entry.key, entry.value_0, entry.start, entry.end);
  entry.start = entry.end;
  if (entry.start < this$static.end) {
    entry.value_0 = this$static.a_0.getAnnotation(entry.start, entry.key);
    entry.end = this$static.a_0.firstAnnotationChange(entry.start, this$static.a_0.size_1(), entry.key, entry.value_0);
    entry.end == -1 && (entry.end = this$static.a_0.size_1());
    $add_8(this$static.entries, entry);
  }
  return this$static.rangedAnnotation;
}

function GenericRangedAnnotationIterable$GenericRangedAnnotationIterator_0(a_0, start, end, keys){
  this.entries = new PriorityQueue_0;
  checkPositionIndexesInRange(start, end, a_0.size_1());
  checkNotNull_1(keys, 'GenericRangedAnnotationIterator: Key set must not be null');
  this.a_0 = a_0;
  this.end = end;
  if (start >= end) {
    return;
  }
  keys.each_3(new GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$1_0(this, a_0, start));
}

function GenericRangedAnnotationIterable$GenericRangedAnnotationIterator(){
}

_ = GenericRangedAnnotationIterable$GenericRangedAnnotationIterator_0.prototype = GenericRangedAnnotationIterable$GenericRangedAnnotationIterator.prototype = new Object_0;
_.getClass$ = function getClass_1368(){
  return Lorg_waveprotocol_wave_model_document_util_GenericRangedAnnotationIterable$GenericRangedAnnotationIterator_2_classLit;
}
;
_.hasNext = function hasNext_24(){
  return this.entries.heap.size_0 != 0;
}
;
_.next_0 = function next_34(){
  return $next_28(this);
}
;
_.remove_1 = function remove_61(){
  throw new UnsupportedOperationException_1('Removing a ranged annotation is not supported');
}
;
_.castableTypeMap$ = {};
_.a_0 = null;
_.end = 0;
_.rangedAnnotation = null;
function GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$1_0(this$1, val$a, val$start){
  this.this$1 = this$1;
  this.val$a = val$a;
  this.val$start = val$start;
}

function GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$1(){
}

_ = GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$1_0.prototype = GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$1.prototype = new Object_0;
_.apply_4 = function apply_132(key){
  var firstEnd, firstStart, firstValue;
  firstValue = this.val$a.getAnnotation(this.val$start, key);
  firstStart = this.val$a.lastAnnotationChange(0, this.val$start, key, firstValue);
  firstStart == -1 && (firstStart = 0);
  firstEnd = this.val$a.firstAnnotationChange(this.val$start, this.val$a.size_1(), key, firstValue);
  firstEnd == -1 && (firstEnd = this.val$a.size_1());
  $add_8(this.this$1.entries, new GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$KeyEntry_0(key, firstStart, firstEnd, firstValue));
}
;
_.getClass$ = function getClass_1369(){
  return Lorg_waveprotocol_wave_model_document_util_GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$1 = null;
_.val$a = null;
_.val$start = 0;
function GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$KeyEntry_0(key, initialStart, initialEnd, initialValue){
  this.key = key;
  this.start = initialStart;
  this.end = initialEnd;
  this.value_0 = initialValue;
}

function GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$KeyEntry(){
}

_ = GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$KeyEntry_0.prototype = GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$KeyEntry.prototype = new Object_0;
_.compareTo$ = function compareTo_15(other){
  return this.start - dynamicCast(other, 436).start;
}
;
_.getClass$ = function getClass_1370(){
  return Lorg_waveprotocol_wave_model_document_util_GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$KeyEntry_2_classLit;
}
;
_.castableTypeMap$ = {10:1, 436:1};
_.end = 0;
_.key = null;
_.start = 0;
_.value_0 = null;
function appendLine(doc, content_0, attributes){
  $clinit_2104();
  var el, el$iterator, lc, line;
  checkArgument_2(!isUnsupportedParagraphDocument(doc), 'Paragraph docs no longer supported');
  lc = null;
  for (el$iterator = ($clinit_2067() , $iterator_17(iterate(doc, doc.doc.substrate.getDocumentElement(), null, REVERSE_DEPTH_FIRST_ELEMENT_ITERATOR))); el$iterator.next != null;) {
    el = $next_24(el$iterator);
    if (isLineContainer(doc, el)) {
      lc = el;
      break;
    }
  }
  if (lc == null) {
    lc = $appendXml(doc, $wrap_2($wrap_2(new XmlStringBuilderDoc_0(null, ($clinit_1980() , ANY)), 'line'), (checkState_2(topLevelContainerTagname != null, 'Top level line container tag name not set!') , topLevelContainerTagname)));
    !!content_0 && content_0.length_0 > 0 && $insertXml(doc, new Point$El_0(lc, null), content_0);
    line = $asElement_0(doc, doc.doc.substrate.getFirstChild_0(lc));
    !!attributes && $setElementAttributes(doc, line, attributes);
    return line;
  }
   else {
    return appendLine_0(doc, lc, content_0, attributes);
  }
}

function appendLine_0(doc, lineContainer, content_0, attributes){
  $clinit_2104();
  var line;
  line = $createElement_1(doc, new Point$El_0(lineContainer, null), 'line', attributes);
  !!content_0 && content_0.length_0 > 0 && $insertXml(doc, new Point$El_0(lineContainer, null), content_0);
  return line;
}

function getRelatedLineElement(doc, at){
  $clinit_2104();
  var atStart;
  atStart = roundLocation(doc, ($clinit_2107() , LINE_2), at, ($clinit_2105() , LEFT_5));
  if (!atStart || $getNodeAfter(atStart) == null) {
    return null;
  }
  return doc.doc.substrate.asElement_0($getNodeAfter(atStart));
}

function isAtLineEnd(doc, point){
  $clinit_2104();
  return (checkNotNull_1(point, 'getLocation: Null point') , doc.doc.getLocation_0(point)) == $getLocation_0(doc, roundLocation(doc, ($clinit_2107() , LINE_2), point, ($clinit_2105() , RIGHT_5)));
}

function isAtLineStart(doc, point){
  var el;
  $clinit_2104();
  var elementBefore;
  elementBefore = !point?null:point.offset >= 0?$getTextOffset(point) > 0?null:$asElement_0(doc, doc.doc.substrate.getPreviousSibling(point.container)):doc.doc.substrate.asElement_0(nodeBefore_0(doc, point.asElementPoint()));
  return elementBefore != null && (el = doc.doc.substrate.asElement_0(elementBefore) , el != null && $equals_3(doc.doc.substrate.getTagName(el), 'line'));
}

function isUnsupportedParagraphDocument(doc){
  var el;
  $clinit_2104();
  var child, root;
  if ($getFirstChild_1(doc, doc.doc.substrate.getDocumentElement()) == null) {
    return false;
  }
  root = doc.doc.substrate.getDocumentElement();
  for (child = doc.doc.substrate.getFirstChild_0(root); child != null; child = doc.doc.substrate.getNextSibling(child)) {
    if (el = doc.doc.substrate.asElement_0(child) , el != null && $equals_3(doc.doc.substrate.getTagName(el), 'p')) {
      return true;
    }
  }
  return false;
}

function roundLocation(doc, rounding, location_0, direction){
  var el, nodeAfter, nodeBefore, point, el_0, el_1;
  checkNotNull_1(direction, 'Rounding direction cannot be null.');
  switch (rounding.ordinal) {
    case 0:
      return location_0;
    case 1:
    case 2:
      throw new UnsupportedOperationException_1('Not implemented');
    case 3:
      checkArgument_2(!isUnsupportedParagraphDocument(doc), 'Paragraph docs no longer supported');
      point = jumpOut(doc, location_0);
      if (!point) {
        return null;
      }

      el = enclosingElement(doc, point.container);
      if (direction == ($clinit_2105() , RIGHT_5)) {
        nodeAfter = point.offset >= 0?doc.doc.substrate.getNextSibling(point.container):$getNodeAfter(point);
        while (nodeAfter != null && !(el_0 = doc.doc.substrate.asElement_0(nodeAfter) , el_0 != null && $equals_3(doc.doc.substrate.getTagName(el_0), 'line'))) {
          nodeAfter = doc.doc.substrate.getNextSibling(nodeAfter);
        }
        return new Point$El_0(el, nodeAfter);
      }
       else {
        nodeBefore = point.offset >= 0?doc.doc.substrate.getPreviousSibling(point.container):nodeBefore_0(doc, point.asElementPoint());
        while (nodeBefore != null && !(el_1 = doc.doc.substrate.asElement_0(nodeBefore) , el_1 != null && $equals_3(doc.doc.substrate.getTagName(el_1), 'line'))) {
          nodeBefore = doc.doc.substrate.getPreviousSibling(nodeBefore);
        }
        return nodeBefore == null?null:new Point$El_0(doc.doc.substrate.getParentElement(nodeBefore), nodeBefore);
      }

    default:throw new AssertionError_1('Missing rounding implementations');
  }
}

function $clinit_2105(){
  $clinit_2105 = nullMethod;
  LEFT_5 = new LineContainers$RoundDirection_0('LEFT', 0);
  RIGHT_5 = new LineContainers$RoundDirection_0('RIGHT', 1);
  $VALUES_70 = initValues(_3Lorg_waveprotocol_wave_model_document_util_LineContainers$RoundDirection_2_classLit, {9:1, 66:1, 166:1}, 153, [LEFT_5, RIGHT_5]);
}

function LineContainers$RoundDirection_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function valueOf_77(name_0){
  $clinit_2105();
  return valueOf_0(($clinit_2106() , $MAP_70), name_0);
}

function values_71(){
  $clinit_2105();
  return $VALUES_70;
}

function LineContainers$RoundDirection(){
}

_ = LineContainers$RoundDirection_0.prototype = LineContainers$RoundDirection.prototype = new Enum;
_.getClass$ = function getClass_1371(){
  return Lorg_waveprotocol_wave_model_document_util_LineContainers$RoundDirection_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 153:1};
var $VALUES_70, LEFT_5, RIGHT_5;
function $clinit_2106(){
  $clinit_2106 = nullMethod;
  $MAP_70 = createValueOfMap(($clinit_2105() , $VALUES_70));
}

var $MAP_70;
function $clinit_2107(){
  $clinit_2107 = nullMethod;
  NONE_5 = new LineContainers$Rounding_0('NONE', 0);
  WORD_1 = new LineContainers$Rounding_0('WORD', 1);
  SENTENCE_0 = new LineContainers$Rounding_0('SENTENCE', 2);
  LINE_2 = new LineContainers$Rounding_0('LINE', 3);
  $VALUES_71 = initValues(_3Lorg_waveprotocol_wave_model_document_util_LineContainers$Rounding_2_classLit, {9:1, 66:1, 166:1}, 154, [NONE_5, WORD_1, SENTENCE_0, LINE_2]);
}

function LineContainers$Rounding_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function valueOf_78(name_0){
  $clinit_2107();
  return valueOf_0(($clinit_2108() , $MAP_71), name_0);
}

function values_72(){
  $clinit_2107();
  return $VALUES_71;
}

function LineContainers$Rounding(){
}

_ = LineContainers$Rounding_0.prototype = LineContainers$Rounding.prototype = new Enum;
_.getClass$ = function getClass_1372(){
  return Lorg_waveprotocol_wave_model_document_util_LineContainers$Rounding_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 154:1};
var $VALUES_71, LINE_2, NONE_5, SENTENCE_0, WORD_1;
function $clinit_2108(){
  $clinit_2108 = nullMethod;
  $MAP_71 = createValueOfMap(($clinit_2107() , $VALUES_71));
}

var $MAP_71;
function textOrElementStart(doc, node){
  var elt;
  elt = doc.inner_0.asElement_0(node);
  return elt == null?new Point$Tx_0(node, 0):new Point$El_0(elt, doc.inner_0.getFirstChild_0(elt));
}

function $print(this$static, doc){
  this$static.indent = 0;
  this$static.builder.impl.string.length > 0 && (this$static.builder = new StringBuilder_0);
  $appendElement(this$static, doc, doc.getDocumentElement());
  return this$static.builder.impl.string;
}

function Range_2(start, end){
  (start < 0 || start > end) && illegalArgument('Bad range: (' + start + ', ' + end + ')');
  this.start = start;
  this.end = end;
}

function Range_1(){
}

_ = Range_2.prototype = Range_1.prototype = new Object_0;
_.equals$ = function equals_57(obj){
  var other;
  if (this === obj)
    return true;
  if (!(obj != null && obj.castableTypeMap$ && !!obj.castableTypeMap$[438]))
    return false;
  other = dynamicCast(obj, 438);
  if (this.end != other.end)
    return false;
  if (this.start != other.start)
    return false;
  return true;
}
;
_.getClass$ = function getClass_1382(){
  return Lorg_waveprotocol_wave_model_document_util_Range_2_classLit;
}
;
_.hashCode$ = function hashCode_56(){
  return this.start + 37 * this.end;
}
;
_.toString$ = function toString_120(){
  return 'Range(' + this.start + (this.start == this.end?'':'-' + this.end) + ')';
}
;
_.castableTypeMap$ = {438:1};
_.end = 0;
_.start = 0;
function $getFocusedRange(this$static){
  var end, size, start;
  if (!this$static.isTracking) {
    return null;
  }
  size = this$static.annotations.fullAnnotationSet.tree.sentinel.left.subtreeLength - 1;
  start = firstAnnotationBoundary(this$static.annotations, size, this$static.startKey);
  end = firstAnnotationBoundary(this$static.annotations, size, this$static.endKey);
  return new FocusedRange_0(start, end);
}

function RangeTracker_0(localAnnotationSet){
  $clinit_2121();
  this.annotations = localAnnotationSet;
  this.startKey = '@' + prefixIncrementor++ + '/savedsel';
  this.endKey = '@' + prefixIncrementor++ + '/savedsel';
}

function RangeTracker(){
}

_ = RangeTracker_0.prototype = RangeTracker.prototype = new Object_0;
_.getClass$ = function getClass_1383(){
  return Lorg_waveprotocol_wave_model_document_util_RangeTracker_2_classLit;
}
;
_.castableTypeMap$ = {};
_.annotations = null;
_.endKey = null;
_.isTracking = false;
_.startKey = null;
function $set_9(this$static, key, value, start, end){
  checkPositionIndexesInRange(start, end, 2147483647);
  checkNotNull_1(key, 'key must not be null');
  if (start >= end) {
    throw new IllegalArgumentException_1('Attempt to set RangedAnnotation to zero length');
  }
  this$static.key = key;
  this$static.value_0 = value;
  this$static.start = start;
  this$static.end = end;
}

function RangedAnnotationImpl_0(key, value, start, end){
  $set_9(this, key, value, start, end);
}

function RangedAnnotationImpl(){
}

_ = RangedAnnotationImpl_0.prototype = RangedAnnotationImpl.prototype = new Object_0;
_.getClass$ = function getClass_1384(){
  return Lorg_waveprotocol_wave_model_document_util_RangedAnnotationImpl_2_classLit;
}
;
_.toString$ = function toString_121(){
  return 'RangedAnnotationImpl(' + this.key + ', ' + this.value_0 + ', ' + this.start + ', ' + this.end + ')';
}
;
_.castableTypeMap$ = {176:1};
_.end = 0;
_.key = null;
_.start = 0;
_.value_0 = null;
function $clinit_2125(){
  $clinit_2125 = nullMethod;
  new TextLocator$PredicateBoundaryLocator_0(new TextLocator$1_0);
  new TextLocator$PredicateBoundaryLocator_0(new TextLocator$2_0);
  WHITESPACE_MATCHER = new TextLocator$3_0;
  NON_WHITESPACE_MATCHER = new TextLocator$4_0;
}

function findCharacterBoundary(doc, start, pred, forward_0){
  $clinit_2125();
  var boundary, locator;
  locator = new TextLocator$PredicateBoundaryLocator_0(pred);
  boundary = locateCharacters(doc, start, locator, forward_0);
  !boundary && (boundary = lastPointInTextSequence(doc, start, forward_0));
  return boundary;
}

function lastPointInTextSequence(doc, start, forward_0){
  var next, prev, ret, t;
  if (forward_0) {
    t = doc.doc.substrate.asText_0(start.offset >= 0 || start.nodeAfter == null?start.container:start.nodeAfter);
    next = $asText(doc, doc.doc.substrate.getNextSibling(t));
    while (next != null) {
      t = next;
      next = $asText(doc, doc.doc.substrate.getNextSibling(next));
    }
    ret = new Point$Tx_0(t, doc.doc.substrate.getLength(t));
  }
   else {
    t = doc.doc.substrate.asText_0(start.offset >= 0 || start.nodeAfter == null?start.container:start.nodeAfter);
    prev = $asText(doc, doc.doc.substrate.getPreviousSibling(t));
    while (prev != null) {
      t = prev;
      prev = $asText(doc, doc.doc.substrate.getPreviousSibling(prev));
    }
    ret = new Point$Tx_0(t, 0);
  }
  return ret;
}

function locateCharacters(doc, start, locator, forward_0){
  var current, found, node, data, index;
  current = start;
  node = start.container;
  while (true) {
    found = (data = $getData_0(doc, doc.doc.substrate.asText_0(current.container)) , index = $indexOf_5(locator, data, $getTextOffset(current), forward_0) , index != -1?new Point$Tx_0(current.container, index):null);
    if (found) {
      return found;
    }
    node = forward_0?doc.doc.substrate.getNextSibling(node):doc.doc.substrate.getPreviousSibling(node);
    if (doc.doc.substrate.asText_0(node) != null) {
      current = forward_0?new Point$Tx_0(node, 0):new Point$Tx_0(node, $getLength_1(doc, doc.doc.substrate.asText_0(node)));
    }
     else {
      return null;
    }
  }
}

var NON_WHITESPACE_MATCHER, WHITESPACE_MATCHER;
function TextLocator$1_0(){
}

function TextLocator$1(){
}

_ = TextLocator$1_0.prototype = TextLocator$1.prototype = new Object_0;
_.apply_15 = function apply_133(c){
  return $clinit_2125() , null != String.fromCharCode(c).match(/[A-Z\d]/i) || c == 95;
}
;
_.getClass$ = function getClass_1386(){
  return Lorg_waveprotocol_wave_model_document_util_TextLocator$1_2_classLit;
}
;
_.castableTypeMap$ = {};
function TextLocator$2_0(){
}

function TextLocator$2(){
}

_ = TextLocator$2_0.prototype = TextLocator$2.prototype = new Object_0;
_.apply_15 = function apply_134(c){
  return $clinit_2125() , !(null != String.fromCharCode(c).match(/[A-Z\d]/i) || c == 95);
}
;
_.getClass$ = function getClass_1387(){
  return Lorg_waveprotocol_wave_model_document_util_TextLocator$2_2_classLit;
}
;
_.castableTypeMap$ = {};
function TextLocator$3_0(){
}

function TextLocator$3(){
}

_ = TextLocator$3_0.prototype = TextLocator$3.prototype = new Object_0;
_.apply_15 = function apply_135(c){
  return $clinit_2125() , ' \t'.indexOf(fromCodePoint(c)) != -1;
}
;
_.getClass$ = function getClass_1388(){
  return Lorg_waveprotocol_wave_model_document_util_TextLocator$3_2_classLit;
}
;
_.castableTypeMap$ = {};
function TextLocator$4_0(){
}

function TextLocator$4(){
}

_ = TextLocator$4_0.prototype = TextLocator$4.prototype = new Object_0;
_.apply_15 = function apply_136(c){
  return $clinit_2125() , ' \t'.indexOf(fromCodePoint(c)) == -1;
}
;
_.getClass$ = function getClass_1389(){
  return Lorg_waveprotocol_wave_model_document_util_TextLocator$4_2_classLit;
}
;
_.castableTypeMap$ = {};
function $findBackwards(this$static, data, start){
  var i;
  for (i = start - 1; i >= 0; --i) {
    if (this$static.pred.apply_15(data.charCodeAt(i))) {
      return i + 1;
    }
  }
  return -1;
}

function $findForwards(this$static, data, start){
  var i;
  for (i = start; i < data.length; ++i) {
    if (this$static.pred.apply_15(data.charCodeAt(i))) {
      return i;
    }
  }
  return -1;
}

function $indexOf_5(this$static, data, start, forward_0){
  return forward_0?$findForwards(this$static, data, start):$findBackwards(this$static, data, start);
}

function TextLocator$PredicateBoundaryLocator_0(pred){
  this.pred = pred;
}

function TextLocator$PredicateBoundaryLocator(){
}

_ = TextLocator$PredicateBoundaryLocator_0.prototype = TextLocator$PredicateBoundaryLocator.prototype = new Object_0;
_.getClass$ = function getClass_1390(){
  return Lorg_waveprotocol_wave_model_document_util_TextLocator$PredicateBoundaryLocator_2_classLit;
}
;
_.castableTypeMap$ = {};
_.pred = null;
function $wrap_1(this$static, tagName, attribs){
  var attribList;
  attribList = new ArrayList_0;
  $each_4(attribs, new XmlStringBuilder$1_0(attribList));
  return $wrap_3(this$static, tagName, dynamicCast($toArray_1(attribList, initDim(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, attribs.backend.size_1() * 2, 0)), 404));
}

function createFromXmlStringWithContraints(xmlContent, permittedChars){
  return innerXml_0($parse_1(($clinit_2081() , xmlContent)), permittedChars);
}

function innerXml_0(doc, permittedChars){
  return $appendChildXmlFragment(new XmlStringBuilderDoc_0(doc, permittedChars), doc.substrate.getDocumentElement());
}

function $apply_44(this$static, key, value){
  checkNotNull_1(key, 'key should not be null be null');
  checkNotNull_1(value, 'value should not be null be null');
  $add_9(this$static.val$attribList, key);
  $add_9(this$static.val$attribList, value);
}

function XmlStringBuilder$1_0(val$attribList){
  this.val$attribList = val$attribList;
}

function XmlStringBuilder$1(){
}

_ = XmlStringBuilder$1_0.prototype = XmlStringBuilder$1.prototype = new Object_0;
_.apply_1 = function apply_137(key, value){
  $apply_44(this, key, dynamicCast(value, 1));
}
;
_.getClass$ = function getClass_1392(){
  return Lorg_waveprotocol_wave_model_document_util_XmlStringBuilder$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.val$attribList = null;
function constructXml(url, author){
  var builder;
  builder = new XmlStringBuilderDoc_0(null, ($clinit_1980() , ANY));
  $wrap_3(builder, 'gadget', initValues(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, ['url', url, 'title', '', 'prefs', '', 'state', '', 'author', author]));
  return builder;
}

function $deserialiseWaveletId(serialisedForm){
  var $e0;
  try {
    return $deserialiseWaveletId_1(serialisedForm);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 189)) {
      return $deserialiseWaveletId_0(serialisedForm);
    }
     else 
      throw $e0;
  }
}

function $deserialiseWaveletId_0(serialisedForm){
  var $e0, ex, parts;
  parts = $splitWithoutUnescaping(($clinit_2147() , DEFAULT_ESCAPER), 33, serialisedForm);
  if (parts.length != 2 || !parts[0].length || !parts[1].length) {
    throw new InvalidIdException_0(serialisedForm, 'Wavelet id must be of the form <domain>!<id>');
  }
  try {
    return checkNotNull_1(parts[0], 'Null domain') , checkNotNull_1(parts[1], 'Null id') , checkArgument_2(!!parts[0].length, 'Empty domain') , checkArgument_2(!!parts[1].length, 'Empty id') , $hasEscapeCharacters(DEFAULT_ESCAPER, parts[0]) && illegalArgument('Domain cannot contain characters that requires escaping: ' + parts[0]) , $isEscapedProperly(DEFAULT_ESCAPER, parts[1]) || illegalArgument('Id is not properly escaped: ' + parts[1]) , new WaveletId_0(parts[0], parts[1]);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 440)) {
      ex = $e0;
      throw new InvalidIdException_0(serialisedForm, ex.detailMessage);
    }
     else 
      throw $e0;
  }
}

function OperationPair_0(clientOp, serverOp){
  this.clientOp = clientOp;
  this.serverOp = serverOp;
}

function OperationPair(){
}

_ = OperationPair_0.prototype = OperationPair.prototype = new Object_0;
_.getClass$ = function getClass_1404(){
  return Lorg_waveprotocol_wave_model_operation_OperationPair_2_classLit;
}
;
_.castableTypeMap$ = {};
_.clientOp = null;
_.serverOp = null;
function TransformException_0(message){
  this.fillInStackTrace();
  this.detailMessage = message;
}

function TransformException_1(cause){
  Exception_3.call(this, cause);
}

function TransformException(){
}

_ = TransformException_1.prototype = TransformException_0.prototype = TransformException.prototype = new Exception;
_.getClass$ = function getClass_1408(){
  return Lorg_waveprotocol_wave_model_operation_TransformException_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 38:1, 178:1, 464:1};
function RemoveParticipant_0(context, participant){
  this.context = context;
  checkNotNull_1(participant, 'Null participant ID');
  this.participant = participant;
}

function RemoveParticipant(){
}

_ = RemoveParticipant_0.prototype = RemoveParticipant.prototype = new WaveletOperation;
_.doApply = function doApply_0(target){
  if (!$removeParticipant_0(target, this.participant)) {
    throw new OperationException_0('Attempt to remove non-existent participant ' + this.participant);
  }
}
;
_.equals$ = function equals_64(obj){
  var other;
  if (!(obj != null && obj.castableTypeMap$ && !!obj.castableTypeMap$[446])) {
    return false;
  }
  other = dynamicCast(obj, 446);
  return $equals_18(this.participant, other.participant);
}
;
_.getClass$ = function getClass_1416(){
  return Lorg_waveprotocol_wave_model_operation_wave_RemoveParticipant_2_classLit;
}
;
_.hashCode$ = function hashCode_63(){
  return getHashCode_0(this.participant.address);
}
;
_.toString$ = function toString_130(){
  return 'remove participant ' + this.participant + ' by ' + this.context.creator + ' at ' + new Date_2(this.context.timestamp) + ' version ' + this.context.hashedVersion;
}
;
_.castableTypeMap$ = {446:1, 462:1};
_.participant = null;
_ = WorthyChangeChecker$2.prototype;
_.replaceAttributes = function replaceAttributes_32(oldAttrs, newAttrs){
  throw $clinit_2182() , TRUE_1;
}
;
function $clinit_2186(){
  $clinit_2186 = nullMethod;
  defaultAnnotations = ($clinit_2278() , defaultCollectionFactory.createStringMap());
  defaultAnnotations.put_3('style/textDecoration', newStringSet(initValues(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, ['none'])));
  defaultAnnotations.put_3('style/fontWeight', newStringSet(initValues(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, ['normal'])));
  defaultAnnotations.put_3('style/fontStyle', newStringSet(initValues(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, ['normal'])));
  defaultAnnotations.put_3('style/backgroundColor', newStringSet(initValues(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, ['initial', 'transparent'])));
  defaultAnnotations.put_3('style/color', newStringSet(initValues(_3Ljava_lang_String_2_classLit, {9:1, 66:1, 404:1}, 1, ['black'])));
}

function $applyMutations(this$static, tokenizer, builder, doc, splitContainer){
  var i, key, key$iterator, tokenType, outerIter, entry;
  $reset_1(this$static);
  while (tokenizer.tokenIndex < tokenizer.tokenList.size_0 - 1) {
    tokenType = $next_30(tokenizer);
    switch (tokenType.ordinal) {
      case 4:
      case 5:
        $handleNewLine(this$static, tokenizer, builder, doc, splitContainer, $structuralAttributes(this$static, tokenizer));
        break;
      default:$handleBasicMutation(this$static, tokenizer, builder);
    }
    this$static.isFirstToken = false;
  }
  for (key$iterator = (outerIter = $keySet_0(this$static.startedAnnotations).val$entrySet.iterator_0() , new AbstractMap$1$1_0(outerIter)); key$iterator.val$outerIter.hasNext();) {
    key = dynamicCast((entry = dynamicCast(key$iterator.val$outerIter.next_0(), 11) , entry.getKey()), 1);
    $add_9(builder.mutationList, new Nindo$EndAnnotation_0(key));
  }
  this$static.lastGoodCursorOffset = this$static.offset;
  for (i = 0; i < this$static.elementCount; ++i) {
    $add_9(builder.mutationList, ($clinit_1873() , INSTANCE_14));
    ++this$static.offset;
  }
  return this$static.affectedKeys;
}

function $endAnnotation_2(this$static, builder, annotationKey){
  var annotationStack, current, nextAnnotation;
  annotationStack = dynamicCast(this$static.startedAnnotations.get(annotationKey), 450);
  checkNotNull_1(annotationStack, 'cannot end unstarted annotation');
  current = dynamicCast($pop(annotationStack), 1);
  if (annotationStack.arrayList.size_0 == 0 && current != null) {
    defaultAnnotations.containsKey_1(annotationKey) && dynamicCast(defaultAnnotations.get_4(annotationKey), 451).contains_0(current) || $add_9(builder.mutationList, new Nindo$EndAnnotation_0(annotationKey));
    this$static.defaultValueMap.containsKey_1(annotationKey)?($add_9(builder.mutationList, new Nindo$StartAnnotation_0(annotationKey, dynamicCast(this$static.defaultValueMap.get_4(annotationKey), 1))) , undefined):this$static.startedAnnotations.remove_3(annotationKey);
  }
   else {
    nextAnnotation = dynamicCast($peek_1(annotationStack), 1);
    (current == null?nextAnnotation != null:!$equals_3(current, nextAnnotation)) && (defaultAnnotations.containsKey_1(annotationKey) && dynamicCast(defaultAnnotations.get_4(annotationKey), 451).contains_0(nextAnnotation)?$add_9(builder.mutationList, new Nindo$EndAnnotation_0(annotationKey)):$add_9(builder.mutationList, new Nindo$StartAnnotation_0(annotationKey, nextAnnotation)));
  }
}

function $endElement(this$static, builder){
  if (--this$static.elementCount < 0) {
    throw new IllegalStateException_1('Element count is negative.');
  }
  $add_9(builder.mutationList, ($clinit_1873() , INSTANCE_14));
  ++this$static.offset;
}

function $handleBasicMutation(this$static, tokenizer, builder){
  var currentType;
  currentType = $getCurrentToken(tokenizer).type_0;
  switch (currentType.ordinal) {
    case 6:
      if ($getCurrentToken(tokenizer).data_0 != null) {
        $characters(builder, $coerceString(($clinit_1980() , $getCurrentToken(tokenizer).data_0)));
        this$static.offset += $getCurrentToken(tokenizer).data_0.length;
      }

      break;
    case 7:
      $startAnnotation_2(this$static, builder, 'style/fontWeight', $getCurrentToken(tokenizer).data_0);
      break;
    case 8:
      $endAnnotation_2(this$static, builder, 'style/fontWeight');
      break;
    case 9:
      $startAnnotation_2(this$static, builder, 'style/fontStyle', $getCurrentToken(tokenizer).data_0);
      break;
    case 10:
      $endAnnotation_2(this$static, builder, 'style/fontStyle');
      break;
    case 11:
      $startAnnotation_2(this$static, builder, 'style/textDecoration', $getCurrentToken(tokenizer).data_0);
      break;
    case 12:
      $endAnnotation_2(this$static, builder, 'style/textDecoration');
      break;
    case 13:
      $startAnnotation_2(this$static, builder, 'style/color', $getCurrentToken(tokenizer).data_0);
      break;
    case 14:
      $endAnnotation_2(this$static, builder, 'style/color');
      break;
    case 15:
      $startAnnotation_2(this$static, builder, 'style/backgroundColor', $getCurrentToken(tokenizer).data_0);
      break;
    case 16:
      $endAnnotation_2(this$static, builder, 'style/backgroundColor');
      break;
    case 17:
      $startAnnotation_2(this$static, builder, 'style/fontFamily', $getCurrentToken(tokenizer).data_0);
      break;
    case 18:
      $endAnnotation_2(this$static, builder, 'style/fontFamily');
      break;
    case 19:
      $startAnnotation_2(this$static, builder, 'link/manual', $getCurrentToken(tokenizer).data_0);
      break;
    case 20:
      $endAnnotation_2(this$static, builder, 'link/manual');
      break;
    case 0:
    case 2:
      $add_9(this$static.structureStack, currentType);
      this$static.indentationLevel += currentType.indent;
      break;
    case 1:
    case 3:
      this$static.structureStack.size_0 > 0 && (this$static.indentationLevel -= dynamicCast($remove_12(this$static.structureStack, this$static.structureStack.size_0 - 1), 157).indent);
      break;
    default:throw new IllegalStateException_1('Unhandled token: ' + currentType.name_1);
  }
}

function $handleNewLine(this$static, tokenizer, builder, doc, splitContainer, attributes){
  var el;
  isLineContainer(doc, (el = doc.asElement_0(splitContainer) , el == null?doc.getParentElement(splitContainer):el)) && $lcHandleNewLine(this$static, tokenizer, builder, attributes);
}

function $lcHandleNewLine(this$static, tokenizer, builder, attributes){
  var isLastToken;
  isLastToken = tokenizer.tokenIndex >= tokenizer.tokenList.size_0 - 1;
  if (!this$static.isFirstToken && !isLastToken || attributes.entrySet.this$0.attributes.size_1() != 0) {
    ++this$static.elementCount;
    $add_9(builder.mutationList, new Nindo$ElementStart_0('line', attributes));
    ++this$static.offset;
    $endElement(this$static, builder);
  }
}

function $peek_3(this$static){
  if (this$static.structureStack.size_0 == 0) {
    return null;
  }
  return dynamicCast($get_7(this$static.structureStack, this$static.structureStack.size_0 - 1), 157);
}

function $reset_1(this$static){
  this$static.offset = 0;
  $clear_4(this$static.structureStack);
  this$static.elementCount = 0;
  this$static.lastGoodCursorOffset = 0;
  this$static.startedAnnotations.clear();
  this$static.affectedKeys.clear();
  this$static.isFirstToken = true;
}

function $startAnnotation_2(this$static, builder, annotationKey, annotationValue){
  var annotationStack, current;
  annotationStack = dynamicCast(this$static.startedAnnotations.get(annotationKey), 450);
  if (!annotationStack) {
    annotationStack = new Stack_0;
    this$static.startedAnnotations.put(annotationKey, annotationStack);
    this$static.affectedKeys.add_3(annotationKey);
  }
  current = annotationStack.arrayList.size_0 == 0?null:dynamicCast($peek_1(annotationStack), 1);
  if (annotationValue == null?current != null:!$equals_3(annotationValue, current)) {
    if (current == null && defaultAnnotations.containsKey_1(annotationKey) && dynamicCast(defaultAnnotations.get_4(annotationKey), 451).contains_0(annotationValue))
    ;
    else {
      $add_9(builder.mutationList, new Nindo$StartAnnotation_0(annotationKey, annotationValue));
    }
  }
  $add_9(annotationStack.arrayList, annotationValue);
}

function $structuralAttributes(this$static, tokenizer){
  var attrList, attributes, currentStructureType, indent;
  currentStructureType = $peek_3(this$static);
  attrList = new ArrayList_0;
  if (currentStructureType) {
    indent = this$static.indentationLevel;
    if ($getCurrentToken(tokenizer).type_0 == ($clinit_2188() , LIST_ITEM)) {
      switch (currentStructureType.ordinal) {
        case 0:
          --indent;
          $add_9(attrList, new ImmutableStateMap$Attribute_1('t', 'li'));
          break;
        case 2:
          --indent;
          $add_9(attrList, new ImmutableStateMap$Attribute_1('t', 'li'));
          $add_9(attrList, new ImmutableStateMap$Attribute_1('listyle', 'decimal'));
      }
    }
     else 
      $getCurrentToken(tokenizer).data_0 != null && $add_9(attrList, new ImmutableStateMap$Attribute_1('t', $getCurrentToken(tokenizer).data_0));
    indent > 0 && $add_9(attrList, new ImmutableStateMap$Attribute_1('i', '' + indent));
  }
  attributes = fromUnsortedAttributes(attrList);
  return attributes;
}

function RichTextMutationBuilder_0(defaultValueMap){
  $clinit_2186();
  this.startedAnnotations = new HashMap_0;
  this.structureStack = new ArrayList_0;
  this.affectedKeys = ($clinit_2278() , defaultCollectionFactory.createStringSet());
  this.defaultValueMap = defaultValueMap;
  $reset_1(this);
}

function RichTextMutationBuilder(){
}

_ = RichTextMutationBuilder_0.prototype = RichTextMutationBuilder.prototype = new Object_0;
_.getClass$ = function getClass_1422(){
  return Lorg_waveprotocol_wave_model_richtext_RichTextMutationBuilder_2_classLit;
}
;
_.castableTypeMap$ = {};
_.defaultValueMap = null;
_.elementCount = 0;
_.indentationLevel = 0;
_.isFirstToken = false;
_.lastGoodCursorOffset = 0;
_.offset = 0;
var defaultAnnotations;
function $clinit_2188(){
  $clinit_2188 = nullMethod;
  UNORDERED_LIST_START = new RichTextTokenizer$Type_1('UNORDERED_LIST_START', 0, ($clinit_2190() , BLOCK_RANGE), 1);
  UNORDERED_LIST_END = new RichTextTokenizer$Type_0('UNORDERED_LIST_END', 1, BLOCK_RANGE);
  ORDERED_LIST_START = new RichTextTokenizer$Type_1('ORDERED_LIST_START', 2, BLOCK_RANGE, 1);
  ORDERED_LIST_END = new RichTextTokenizer$Type_0('ORDERED_LIST_END', 3, BLOCK_RANGE);
  NEW_LINE = new RichTextTokenizer$Type_0('NEW_LINE', 4, BLOCK_1);
  LIST_ITEM = new RichTextTokenizer$Type_0('LIST_ITEM', 5, BLOCK_1);
  TEXT_1 = new RichTextTokenizer$Type_0('TEXT', 6, TEXTUAL);
  STYLE_FONT_WEIGHT_START = new RichTextTokenizer$Type_0('STYLE_FONT_WEIGHT_START', 7, STYLE);
  STYLE_FONT_WEIGHT_END = new RichTextTokenizer$Type_0('STYLE_FONT_WEIGHT_END', 8, STYLE);
  STYLE_FONT_STYLE_START = new RichTextTokenizer$Type_0('STYLE_FONT_STYLE_START', 9, STYLE);
  STYLE_FONT_STYLE_END = new RichTextTokenizer$Type_0('STYLE_FONT_STYLE_END', 10, STYLE);
  STYLE_TEXT_DECORATION_START = new RichTextTokenizer$Type_0('STYLE_TEXT_DECORATION_START', 11, STYLE);
  STYLE_TEXT_DECORATION_END = new RichTextTokenizer$Type_0('STYLE_TEXT_DECORATION_END', 12, STYLE);
  STYLE_COLOR_START = new RichTextTokenizer$Type_0('STYLE_COLOR_START', 13, STYLE);
  STYLE_COLOR_END = new RichTextTokenizer$Type_0('STYLE_COLOR_END', 14, STYLE);
  STYLE_BG_COLOR_START = new RichTextTokenizer$Type_0('STYLE_BG_COLOR_START', 15, STYLE);
  STYLE_BG_COLOR_END = new RichTextTokenizer$Type_0('STYLE_BG_COLOR_END', 16, STYLE);
  STYLE_FONT_FAMILY_START = new RichTextTokenizer$Type_0('STYLE_FONT_FAMILY_START', 17, STYLE);
  STYLE_FONT_FAMILY_END = new RichTextTokenizer$Type_0('STYLE_FONT_FAMILY_END', 18, STYLE);
  LINK_START = new RichTextTokenizer$Type_0('LINK_START', 19, STYLE);
  LINK_END = new RichTextTokenizer$Type_0('LINK_END', 20, STYLE);
  $VALUES_73 = initValues(_3Lorg_waveprotocol_wave_model_richtext_RichTextTokenizer$Type_2_classLit, {9:1, 66:1, 166:1}, 157, [UNORDERED_LIST_START, UNORDERED_LIST_END, ORDERED_LIST_START, ORDERED_LIST_END, NEW_LINE, LIST_ITEM, TEXT_1, STYLE_FONT_WEIGHT_START, STYLE_FONT_WEIGHT_END, STYLE_FONT_STYLE_START, STYLE_FONT_STYLE_END, STYLE_TEXT_DECORATION_START, STYLE_TEXT_DECORATION_END, STYLE_COLOR_START, STYLE_COLOR_END, STYLE_BG_COLOR_START, STYLE_BG_COLOR_END, STYLE_FONT_FAMILY_START, STYLE_FONT_FAMILY_END, LINK_START, LINK_END]);
}

function RichTextTokenizer$Type_0(enum$name, enum$ordinal, group){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
  this.group = group;
  this.indent = -1;
}

function RichTextTokenizer$Type_1(enum$name, enum$ordinal, group, indent){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
  this.group = group;
  this.indent = indent;
}

function valueOf_80(name_0){
  $clinit_2188();
  return valueOf_0(($clinit_2189() , $MAP_73), name_0);
}

function values_74(){
  $clinit_2188();
  return $VALUES_73;
}

function RichTextTokenizer$Type(){
}

_ = RichTextTokenizer$Type_1.prototype = RichTextTokenizer$Type_0.prototype = RichTextTokenizer$Type.prototype = new Enum;
_.getClass$ = function getClass_1423(){
  return Lorg_waveprotocol_wave_model_richtext_RichTextTokenizer$Type_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 157:1};
_.group = null;
_.indent = 0;
var $VALUES_73, LINK_END, LINK_START, LIST_ITEM, NEW_LINE, ORDERED_LIST_END, ORDERED_LIST_START, STYLE_BG_COLOR_END, STYLE_BG_COLOR_START, STYLE_COLOR_END, STYLE_COLOR_START, STYLE_FONT_FAMILY_END, STYLE_FONT_FAMILY_START, STYLE_FONT_STYLE_END, STYLE_FONT_STYLE_START, STYLE_FONT_WEIGHT_END, STYLE_FONT_WEIGHT_START, STYLE_TEXT_DECORATION_END, STYLE_TEXT_DECORATION_START, TEXT_1, UNORDERED_LIST_END, UNORDERED_LIST_START;
function $clinit_2189(){
  $clinit_2189 = nullMethod;
  $MAP_73 = createValueOfMap(($clinit_2188() , $VALUES_73));
}

var $MAP_73;
function $clinit_2190(){
  $clinit_2190 = nullMethod;
  BLOCK_RANGE = new RichTextTokenizer$Type$TypeGroup_0('BLOCK_RANGE', 0);
  BLOCK_1 = new RichTextTokenizer$Type$TypeGroup_0('BLOCK', 1);
  TEXTUAL = new RichTextTokenizer$Type$TypeGroup_0('TEXTUAL', 2);
  STYLE = new RichTextTokenizer$Type$TypeGroup_0('STYLE', 3);
  $VALUES_74 = initValues(_3Lorg_waveprotocol_wave_model_richtext_RichTextTokenizer$Type$TypeGroup_2_classLit, {9:1, 66:1, 166:1}, 156, [BLOCK_RANGE, BLOCK_1, TEXTUAL, STYLE]);
}

function RichTextTokenizer$Type$TypeGroup_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function valueOf_81(name_0){
  $clinit_2190();
  return valueOf_0(($clinit_2191() , $MAP_74), name_0);
}

function values_75(){
  $clinit_2190();
  return $VALUES_74;
}

function RichTextTokenizer$Type$TypeGroup(){
}

_ = RichTextTokenizer$Type$TypeGroup_0.prototype = RichTextTokenizer$Type$TypeGroup.prototype = new Enum;
_.getClass$ = function getClass_1424(){
  return Lorg_waveprotocol_wave_model_richtext_RichTextTokenizer$Type$TypeGroup_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 63:1, 156:1};
var $VALUES_74, BLOCK_1, BLOCK_RANGE, STYLE, TEXTUAL;
function $clinit_2191(){
  $clinit_2191 = nullMethod;
  $MAP_74 = createValueOfMap(($clinit_2190() , $VALUES_74));
}

var $MAP_74;
function $clinit_2192(){
  $clinit_2192 = nullMethod;
  fontWeightMap = ($clinit_2278() , defaultCollectionFactory.createStringMap());
  fontWeightMap.put_3('b', 'bold');
  fontWeightMap.put_3('strong', 'bold');
  fontStyleMap = defaultCollectionFactory.createStringMap();
  fontStyleMap.put_3('i', 'italic');
  fontStyleMap.put_3('em', 'italic');
  textDecorationMap = defaultCollectionFactory.createStringMap();
  textDecorationMap.put_3('u', 'underline');
  FONT_WEIGHT_HANDLER = new RichTextTokenizerImpl$StyleTokenExtractor_0(($clinit_2188() , STYLE_FONT_WEIGHT_START), STYLE_FONT_WEIGHT_END, fontWeightMap, 'fontWeight');
  FONT_STYLE_HANDLER = new RichTextTokenizerImpl$StyleTokenExtractor_0(STYLE_FONT_STYLE_START, STYLE_FONT_STYLE_END, fontStyleMap, 'fontStyle');
  TEXT_DECORATION_HANDLER = new RichTextTokenizerImpl$StyleTokenExtractor_0(STYLE_TEXT_DECORATION_START, STYLE_TEXT_DECORATION_END, textDecorationMap, 'textDecoration');
}

function $addTextToken(this$static, text){
  var builder, ch, i;
  builder = new StringBuilder_1(text.length);
  for (i = 0; i < text.length; ++i) {
    ch = text.charCodeAt(i);
    if (ch == 160) {
      builder.impl.string += ' ';
    }
     else if (ch == 9) {
      builder.impl.string += '    ';
    }
     else if (ch == 10) {
      builder.impl.string.length != 0 && $addToken(this$static, new RichTextTokenizerImpl$Token_1(($clinit_2188() , TEXT_1), builder.impl.string));
      $addToken(this$static, new RichTextTokenizerImpl$Token_0(($clinit_2188() , NEW_LINE)));
      builder = new StringBuilder_1(text.length - i);
    }
     else {
      builder.impl.string += String.fromCharCode(ch);
    }
  }
  builder.impl.string.length != 0 && $addToken(this$static, new RichTextTokenizerImpl$Token_1(($clinit_2188() , TEXT_1), builder.impl.string));
}

function $addToken(this$static, token){
  token.type_0.group != ($clinit_2190() , STYLE) && (this$static.mergeNextNewLine = token.type_0.group == BLOCK_1);
  $add_9(this$static.tokenList, token);
}

function $addTokenOrIncrement(this$static, replace, token, endType){
  (replace || this$static.activeTokenCounts[endType.ordinal] <= 0) && (token.type_0.group != ($clinit_2190() , STYLE) && (this$static.mergeNextNewLine = token.type_0.group == BLOCK_1) , $add_9(this$static.tokenList, token));
  ++this$static.activeTokenCounts[endType.ordinal];
}

function $asElement_7(node){
  if (node) {
    return $asElement_4(dynamicCastJso(node));
  }
  return null;
}

function $getCurrentToken(this$static){
  if (this$static.tokenIndex >= this$static.tokenList.size_0) {
    throw new IllegalStateException_1('No token available.');
  }
  return dynamicCast($get_7(this$static.tokenList, this$static.tokenIndex), 452);
}

function $getDepthFromBlock(this$static, node){
  var depth, e;
  depth = 1;
  e = $getParentElement_5(node);
  while (e) {
    if (e == this$static.root || isBlockElement(dynamicCastJso(e).tagName)) {
      break;
    }
    ++depth;
    e = $getParentElement_5(e);
  }
  return depth;
}

function $getStyleProperty(el, tagName, tokenHandler){
  var lowerCaseTag, value;
  value = el.style[tokenHandler.stylePropertyName];
  if (value != null && !!value.length) {
    return value;
  }
  lowerCaseTag = tagName.toLowerCase();
  return tokenHandler.tagToValue.containsKey_1(lowerCaseTag)?dynamicCast(tokenHandler.tagToValue.get_4(lowerCaseTag), 1):null;
}

function $handleLinkElement(this$static, el, tagName){
  var attr;
  if ($equalsIgnoreCase('a', tagName)) {
    attr = $getAttribute_4(dynamicCastJso(el), 'href');
    if (attr != null) {
      $addTokenOrIncrement(this$static, false, new RichTextTokenizerImpl$Token_1(($clinit_2188() , LINK_START), attr), LINK_END);
      return LINK_END;
    }
  }
  return null;
}

function $handleListElement(this$static, tagName){
  if ($equalsIgnoreCase('ol', tagName)) {
    $addTokenOrIncrement(this$static, true, new RichTextTokenizerImpl$Token_0(($clinit_2188() , ORDERED_LIST_START)), ORDERED_LIST_END);
    return ORDERED_LIST_END;
  }
   else if ($equalsIgnoreCase('ul', tagName)) {
    $addTokenOrIncrement(this$static, true, new RichTextTokenizerImpl$Token_0(($clinit_2188() , UNORDERED_LIST_START)), UNORDERED_LIST_END);
    return UNORDERED_LIST_END;
  }
   else {
    return null;
  }
}

function $handleStyleElements(this$static, el, tagName, closeStack){
  var value, value_0, value_1, value_2;
  $maybeExtractStyleToken(this$static, el, tagName, closeStack, FONT_WEIGHT_HANDLER);
  $maybeExtractStyleToken(this$static, el, tagName, closeStack, FONT_STYLE_HANDLER);
  $maybeExtractStyleToken(this$static, el, tagName, closeStack, TEXT_DECORATION_HANDLER);
  if (value_0 = el.style['color'] , value_0 != null && !!value_0.length) {
    value = el.style['color'];
    $addTokenOrIncrement(this$static, true, new RichTextTokenizerImpl$Token_1(($clinit_2188() , STYLE_COLOR_START), value), STYLE_COLOR_END);
    $add_9(closeStack, STYLE_COLOR_END);
  }
  if (value_1 = el.style['backgroundColor'] , value_1 != null && !!value_1.length) {
    value = el.style['backgroundColor'];
    $addTokenOrIncrement(this$static, true, new RichTextTokenizerImpl$Token_1(($clinit_2188() , STYLE_BG_COLOR_START), value), STYLE_BG_COLOR_END);
    $add_9(closeStack, STYLE_BG_COLOR_END);
  }
  if (value_2 = el.style['fontFamily'] , value_2 != null && !!value_2.length) {
    value = el.style['fontFamily'];
    $addTokenOrIncrement(this$static, true, new RichTextTokenizerImpl$Token_1(($clinit_2188() , STYLE_FONT_FAMILY_START), value), STYLE_FONT_FAMILY_END);
    $add_9(closeStack, STYLE_FONT_FAMILY_END);
  }
}

function $ignorableBlock(this$static, element, tagName){
  if ($equalsIgnoreCase('div', tagName)) {
    if (!this$static.document_0.getFirstChild_1(element)) {
      return true;
    }
  }
  return false;
}

function $isLastLinebreak(this$static, element){
  var el, sibling;
  sibling = this$static.document_0.getNextSibling_0(element);
  if (sibling) {
    el = $asElement_7(sibling);
    if (!el || !isBlockElement(dynamicCastJso(el).tagName)) {
      return false;
    }
  }
  return $getDepthFromBlock(this$static, element) == 1;
}

function $maybeExtractStyleToken(this$static, el, tagName, closeStack, tokenHandler){
  var styleProperty;
  styleProperty = $getStyleProperty(el, tagName, tokenHandler);
  if (styleProperty != null) {
    $addTokenOrIncrement(this$static, true, new RichTextTokenizerImpl$Token_1(tokenHandler.tokenStartType, styleProperty), tokenHandler.tokenEndType);
    $add_9(closeStack, tokenHandler.tokenEndType);
  }
}

function $maybeInsertNewline(this$static){
  if (!this$static.mergeNextNewLine) {
    $addToken(this$static, new RichTextTokenizerImpl$Token_0(($clinit_2188() , NEW_LINE)));
    return true;
  }
  return false;
}

function $next_30(this$static){
  if (this$static.tokenIndex >= this$static.tokenList.size_0 - 1) {
    throw new NoSuchElementException_0;
  }
  ++this$static.tokenIndex;
  return $getCurrentToken(this$static).type_0;
}

function $process_0(this$static, container){
  var child, j;
  if (!container) {
    throw new IllegalArgumentException_0;
  }
  this$static.root = container;
  $clear_4(this$static.tokenList);
  this$static.tokenIndex = -1;
  for (child = this$static.document_0.getFirstChild_1(this$static.root); child; child = this$static.document_0.getNextSibling_0(child)) {
    $processNode(this$static, child);
  }
  for (j = 0; j < this$static.activeTokenCounts.length; ++j) {
  }
}

function $processElement(this$static, element){
  var child, closingType, closingTypeStack, maybeEndParagraph, setEndBlockPending, tagName, newValue;
  tagName = dynamicCastJso(element).tagName.toLowerCase();
  closingTypeStack = new ArrayList_0;
  maybeEndParagraph = false;
  setEndBlockPending = false;
  if ($equalsIgnoreCase('p', tagName) || $equalsIgnoreCase('div', tagName) || $equalsIgnoreCase('li', tagName)) {
    if ($equalsIgnoreCase('li', tagName)) {
      $addToken(this$static, new RichTextTokenizerImpl$Token_0(($clinit_2188() , LIST_ITEM)));
    }
     else {
      if (!$ignorableBlock(this$static, element, tagName)) {
        $maybeInsertNewline(this$static);
        maybeEndParagraph = true;
        setEndBlockPending = true;
      }
    }
  }
   else if ($equalsIgnoreCase('br', tagName)) {
    if (!$isLastLinebreak(this$static, element)) {
      $addToken(this$static, new RichTextTokenizerImpl$Token_0(($clinit_2188() , NEW_LINE)));
      this$static.mergeNextNewLine = false;
    }
  }
   else if (isHeading_0(tagName)) {
    $addToken(this$static, new RichTextTokenizerImpl$Token_1(($clinit_2188() , NEW_LINE), tagName));
    maybeEndParagraph = true;
    setEndBlockPending = true;
  }
   else if ($equalsIgnoreCase('ol', tagName) || $equalsIgnoreCase('ul', tagName)) {
    $putIfNotNull(closingTypeStack, $handleListElement(this$static, tagName));
    maybeEndParagraph = false;
    setEndBlockPending = true;
  }
   else if ($equalsIgnoreCase('table', tagName) || $equalsIgnoreCase('tr', tagName) || $equalsIgnoreCase('th', tagName) || $equalsIgnoreCase('td', tagName) || $equalsIgnoreCase('thead', tagName) || $equalsIgnoreCase('tbody', tagName)) {
    if ($equalsIgnoreCase('table', tagName)) {
      $addToken(this$static, new RichTextTokenizerImpl$Token_0(($clinit_2188() , NEW_LINE)));
    }
     else if ($equalsIgnoreCase('tr', tagName)) {
      maybeEndParagraph = true;
      setEndBlockPending = true;
    }
     else 
      ($equalsIgnoreCase('th', tagName) || $equalsIgnoreCase('td', tagName)) && $addToken(this$static, new RichTextTokenizerImpl$Token_1(($clinit_2188() , TEXT_1), ' '));
  }
   else {
    $putIfNotNull(closingTypeStack, $handleLinkElement(this$static, element, tagName));
  }
  $handleStyleElements(this$static, element, tagName, closingTypeStack);
  for (child = this$static.document_0.getFirstChild_1(element); child; child = this$static.document_0.getNextSibling_0(child)) {
    $processNode(this$static, child);
  }
  while (closingTypeStack.size_0 != 0) {
    closingType = dynamicCast($remove_12(closingTypeStack, closingTypeStack.size_0 - 1), 157);
    $addToken(this$static, new RichTextTokenizerImpl$Token_0(closingType));
    newValue = --this$static.activeTokenCounts[closingType.ordinal];
  }
  this$static.endBlockPending |= setEndBlockPending;
  if (maybeEndParagraph && this$static.endBlockPending) {
    $maybeInsertNewline(this$static);
    this$static.endBlockPending = false;
  }
}

function $processNode(this$static, node){
  var element, textNode;
  textNode = $asText_3(dynamicCastJso(node));
  if (textNode) {
    $processTextNode(this$static, textNode);
    return;
  }
  element = $asElement_7(node);
  !!element && $processElement(this$static, element);
}

function $processTextNode(this$static, textNode){
  var text;
  if (this$static.endBlockPending) {
    $maybeInsertNewline(this$static);
    this$static.endBlockPending = false;
  }
  text = dynamicCastJso(textNode).data;
  !text.length || $addTextToken(this$static, text);
}

function $putIfNotNull(list, item){
  !!item && (setCheck(list.array, list.size_0++, item) , true);
}

function RichTextTokenizerImpl_0(doc){
  $clinit_2192();
  var i;
  this.document_0 = doc;
  this.tokenList = new ArrayList_0;
  this.activeTokenCounts = initDim(_3I_classLit, {9:1}, -1, ($clinit_2188() , $clinit_2188() , $VALUES_73).length, 1);
  for (i = 0; i < this.activeTokenCounts.length; ++i) {
    this.activeTokenCounts[i] = 0;
  }
  $process_0(this, doc.documentElement_0);
}

function isBlockElement(tagName){
  return $equalsIgnoreCase('p', tagName) || $equalsIgnoreCase('div', tagName) || $equalsIgnoreCase('li', tagName);
}

function isHeading_0(tagName){
  var size;
  if (tagName.length == 2) {
    if (tagName.charCodeAt(0) == 104 || tagName.charCodeAt(0) == 72) {
      size = tagName.charCodeAt(1) - 48;
      if (size >= 1 && size <= 4) {
        return true;
      }
    }
  }
  return false;
}

function RichTextTokenizerImpl(){
}

_ = RichTextTokenizerImpl_0.prototype = RichTextTokenizerImpl.prototype = new Object_0;
_.getClass$ = function getClass_1425(){
  return Lorg_waveprotocol_wave_model_richtext_RichTextTokenizerImpl_2_classLit;
}
;
_.toString$ = function toString_134(){
  return $toString_7(this.tokenList);
}
;
_.castableTypeMap$ = {};
_.activeTokenCounts = null;
_.document_0 = null;
_.endBlockPending = false;
_.mergeNextNewLine = false;
_.root = null;
_.tokenIndex = -1;
_.tokenList = null;
var FONT_STYLE_HANDLER, FONT_WEIGHT_HANDLER, TEXT_DECORATION_HANDLER, fontStyleMap = null, fontWeightMap = null, textDecorationMap = null;
function RichTextTokenizerImpl$StyleTokenExtractor_0(tokenStartType, tokenEndType, tagToValue, stylePropertyName){
  this.tokenStartType = tokenStartType;
  this.tokenEndType = tokenEndType;
  this.tagToValue = tagToValue;
  this.stylePropertyName = stylePropertyName;
}

function RichTextTokenizerImpl$StyleTokenExtractor(){
}

_ = RichTextTokenizerImpl$StyleTokenExtractor_0.prototype = RichTextTokenizerImpl$StyleTokenExtractor.prototype = new Object_0;
_.getClass$ = function getClass_1426(){
  return Lorg_waveprotocol_wave_model_richtext_RichTextTokenizerImpl$StyleTokenExtractor_2_classLit;
}
;
_.castableTypeMap$ = {};
_.stylePropertyName = null;
_.tagToValue = null;
_.tokenEndType = null;
_.tokenStartType = null;
function RichTextTokenizerImpl$Token_0(type){
  this.type_0 = type;
  this.data_0 = null;
}

function RichTextTokenizerImpl$Token_1(type, data){
  this.type_0 = type;
  this.data_0 = data;
}

function RichTextTokenizerImpl$Token(){
}

_ = RichTextTokenizerImpl$Token_1.prototype = RichTextTokenizerImpl$Token_0.prototype = RichTextTokenizerImpl$Token.prototype = new Object_0;
_.getClass$ = function getClass_1427(){
  return Lorg_waveprotocol_wave_model_richtext_RichTextTokenizerImpl$Token_2_classLit;
}
;
_.toString$ = function toString_135(){
  return '(' + this.type_0 + ',' + this.data_0 + ')';
}
;
_.castableTypeMap$ = {452:1};
_.data_0 = null;
_.type_0 = null;
function $nonUndoableOp(this$static, op){
  $nonUndoableOperation(this$static.undoStack, op);
  $nonUndoableOperation(this$static.redoStack, op);
}

function $redoPlus(this$static){
  var ops;
  ops = $pop_0(this$static.redoStack);
  if (ops) {
    $checkpoint_0(this$static.checkpointer);
    $push_2(this$static.undoStack.stack_0, new UndoStack$StackEntry_0(ops.first));
    ++this$static.checkpointer.lastPartition;
  }
  return ops;
}

function $undoPlus(this$static){
  var i, numToUndo, op, operations, ops;
  numToUndo = $releaseCheckpoint(this$static.checkpointer);
  if (numToUndo == 0) {
    return null;
  }
  operations = new ArrayList_0;
  for (i = 0; i < numToUndo - 1; ++i) {
    $add_9(operations, $pop_0(this$static.undoStack).first);
  }
  ops = $pop_0(this$static.undoStack);
  $add_9(operations, ops.first);
  op = compose_3(operations);
  $push_2(this$static.redoStack.stack_0, new UndoStack$StackEntry_0(op));
  return new Pair_0(op, ops.second);
}

function $undoableOp(this$static, op){
  $push_2(this$static.undoStack.stack_0, new UndoStack$StackEntry_0(op));
  ++this$static.checkpointer.lastPartition;
  $clear_4(this$static.redoStack.stack_0.arrayList);
}

function UndoManagerImpl_0(){
  this.checkpointer = new UndoManagerImpl$Checkpointer_0;
  this.undoStack = new UndoStack_0;
  this.redoStack = new UndoStack_0;
}

function UndoManagerImpl(){
}

_ = UndoManagerImpl_0.prototype = UndoManagerImpl.prototype = new Object_0;
_.getClass$ = function getClass_1475(){
  return Lorg_waveprotocol_wave_model_undo_UndoManagerImpl_2_classLit;
}
;
_.castableTypeMap$ = {};
_.redoStack = null;
_.undoStack = null;
function $checkpoint_0(this$static){
  if (this$static.lastPartition > 0) {
    $push_2(this$static.partitions, valueOf_12(this$static.lastPartition));
    this$static.lastPartition = 0;
  }
}

function $releaseCheckpoint(this$static){
  var value;
  if (this$static.lastPartition > 0) {
    value = this$static.lastPartition;
    this$static.lastPartition = 0;
    return value;
  }
  if (this$static.partitions.arrayList.size_0 == 0) {
    return 0;
  }
  return dynamicCast($pop(this$static.partitions), 64).value_0;
}

function UndoManagerImpl$Checkpointer_0(){
  this.partitions = new Stack_0;
}

function UndoManagerImpl$Checkpointer(){
}

_ = UndoManagerImpl$Checkpointer_0.prototype = UndoManagerImpl$Checkpointer.prototype = new Object_0;
_.getClass$ = function getClass_1476(){
  return Lorg_waveprotocol_wave_model_undo_UndoManagerImpl$Checkpointer_2_classLit;
}
;
_.castableTypeMap$ = {};
_.lastPartition = 0;
function $nonUndoableOperation(this$static, op){
  this$static.stack_0.arrayList.size_0 == 0 || $add_9(dynamicCast($peek_1(this$static.stack_0), 463).nonUndoables, op);
}

function $pop_0(this$static){
  var $e0, e, entry, nextEntry, op, pair;
  if (this$static.stack_0.arrayList.size_0 == 0) {
    return null;
  }
  entry = dynamicCast($pop(this$static.stack_0), 463);
  op = invert(dynamicCast(entry.op, 202));
  if (entry.nonUndoables.size_0 == 0) {
    return new Pair_0(op, null);
  }
  try {
    pair = transform(op, compose_3(entry.nonUndoables));
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 464)) {
      e = $e0;
      throw new IllegalStateException_2('invalid operation transformation encountered', e);
    }
     else 
      throw $e0;
  }
  nextEntry = this$static.stack_0.arrayList.size_0 == 0?null:dynamicCast($peek_1(this$static.stack_0), 463);
  !!nextEntry && $add_9(nextEntry.nonUndoables, pair.serverOp);
  return new Pair_0(pair.clientOp, pair.serverOp);
}

function UndoStack_0(){
  this.stack_0 = new Stack_0;
}

function UndoStack(){
}

_ = UndoStack_0.prototype = UndoStack.prototype = new Object_0;
_.getClass$ = function getClass_1477(){
  return Lorg_waveprotocol_wave_model_undo_UndoStack_2_classLit;
}
;
_.castableTypeMap$ = {};
function UndoStack$StackEntry_0(op){
  this.nonUndoables = new ArrayList_0;
  this.op = op;
}

function UndoStack$StackEntry(){
}

_ = UndoStack$StackEntry_0.prototype = UndoStack$StackEntry.prototype = new Object_0;
_.getClass$ = function getClass_1478(){
  return Lorg_waveprotocol_wave_model_undo_UndoStack$StackEntry_2_classLit;
}
;
_.castableTypeMap$ = {463:1};
_.op = null;
function join(rest){
  $clinit_2278();
  var i, ret;
  ret = new StringBuilder_2('conv');
  for (i = 0; i < rest.length; ++i) {
    ret.impl.string += '/';
    ret.impl.string += rest[i];
  }
  return ret.impl.string;
}

function newHashSet(elements){
  var capacity, set;
  capacity = max_1(~~Math.max(Math.min(elements.length / 0.75, 2147483647), -2147483648) + 1, 16);
  set = new HashSet_2(capacity);
  addAll_2(set, elements);
  return set;
}

function $removeParticipant_0(this$static, p){
  var participants;
  participants = this$static.participants;
  if (participants.map.remove_3(p) == null) {
    return false;
  }
  $onParticipantRemoved_0(this$static.listenerManager, this$static, p);
  return true;
}

function $onParticipantRemoved_0(this$static, waveletData, participant){
  var l_0, l$iterator;
  for (l$iterator = $iterator_20(this$static.listeners); l$iterator.hasNext();) {
    l_0 = dynamicCast(l$iterator.next_0(), 470);
    l_0.onParticipantRemoved_1(waveletData, participant);
  }
}

_ = WaveletDataListenerManager.prototype;
_.onParticipantRemoved_1 = function onParticipantRemoved_5(waveletData, participant){
  $onParticipantRemoved_0(this, waveletData, participant);
}
;
function $authoriseApplyAndSend(this$static, op){
  $authorise(this$static, op);
  this$static.executor.consume(op);
  this$static.output.consume(op);
}

function $removeParticipant_1(this$static, participant){
  ($clinit_467() , new Collections$UnmodifiableSet_0(this$static.wavelet.participants)).contains(participant) && $authoriseApplyAndSend(this$static, new RemoveParticipant_0($createContext(this$static.contextFactory), participant));
}

_ = OpBasedWavelet$2.prototype;
_.onParticipantRemoved_1 = function onParticipantRemoved_6(wavelet, participantId){
  var l_0, l$iterator;
  for (l$iterator = $iterator_20(this.this$0.listeners); l$iterator.hasNext();) {
    l_0 = dynamicCast(l$iterator.next_0(), 476);
    l_0.onParticipantRemoved_0(this.this$0, participantId);
  }
}
;
var Lcom_google_gwt_animation_client_Animation_2_classLit = createForClass('com.google.gwt.animation.client.', 'Animation'), _3Lcom_google_gwt_animation_client_Animation_2_classLit = createForArray('[Lcom.google.gwt.animation.client.', 'Animation;', Lcom_google_gwt_animation_client_Animation_2_classLit), Lcom_google_gwt_animation_client_Animation$1_2_classLit = createForClass('com.google.gwt.animation.client.', 'Animation$1'), Lcom_google_gwt_core_client_impl_SchedulerImpl$Flusher_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'SchedulerImpl$Flusher'), Lcom_google_gwt_core_client_impl_SchedulerImpl$Rescuer_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'SchedulerImpl$Rescuer'), Lcom_google_gwt_dom_client_Style$Overflow_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Overflow', Ljava_lang_Enum_2_classLit, values_2, valueOf_3), _3Lcom_google_gwt_dom_client_Style$Overflow_2_classLit = createForArray('[Lcom.google.gwt.dom.client.', 'Style$Overflow;', Lcom_google_gwt_dom_client_Style$Overflow_2_classLit), Lcom_google_gwt_dom_client_Style$Overflow$1_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Overflow$1', Lcom_google_gwt_dom_client_Style$Overflow_2_classLit, null, null), Lcom_google_gwt_dom_client_Style$Overflow$2_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Overflow$2', Lcom_google_gwt_dom_client_Style$Overflow_2_classLit, null, null), Lcom_google_gwt_dom_client_Style$Overflow$3_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Overflow$3', Lcom_google_gwt_dom_client_Style$Overflow_2_classLit, null, null), Lcom_google_gwt_dom_client_Style$Overflow$4_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Overflow$4', Lcom_google_gwt_dom_client_Style$Overflow_2_classLit, null, null), Lcom_google_gwt_dom_client_Style$Position_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Position', Ljava_lang_Enum_2_classLit, values_3, valueOf_4), _3Lcom_google_gwt_dom_client_Style$Position_2_classLit = createForArray('[Lcom.google.gwt.dom.client.', 'Style$Position;', Lcom_google_gwt_dom_client_Style$Position_2_classLit), Lcom_google_gwt_dom_client_Style$Position$1_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Position$1', Lcom_google_gwt_dom_client_Style$Position_2_classLit, null, null), Lcom_google_gwt_dom_client_Style$Position$2_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Position$2', Lcom_google_gwt_dom_client_Style$Position_2_classLit, null, null), Lcom_google_gwt_dom_client_Style$Position$3_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Position$3', Lcom_google_gwt_dom_client_Style$Position_2_classLit, null, null), Lcom_google_gwt_dom_client_Style$Position$4_2_classLit = createForEnum('com.google.gwt.dom.client.', 'Style$Position$4', Lcom_google_gwt_dom_client_Style$Position_2_classLit, null, null), Lcom_google_gwt_event_dom_client_BlurEvent_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'BlurEvent'), Lcom_google_gwt_event_dom_client_ChangeEvent_2_classLit = createForClass('com.google.gwt.event.dom.client.', 'ChangeEvent'), Lcom_google_gwt_event_logical_shared_ValueChangeEvent_2_classLit = createForClass('com.google.gwt.event.logical.shared.', 'ValueChangeEvent'), Lcom_google_gwt_i18n_client_AutoDirectionHandler_2_classLit = createForClass('com.google.gwt.i18n.client.', 'AutoDirectionHandler'), Lcom_google_gwt_lang_asyncloaders_AsyncLoader2_2_classLit = createForClass('com.google.gwt.lang.asyncloaders.', 'AsyncLoader2'), Lcom_google_gwt_layout_client_LayoutImpl_2_classLit = createForClass('com.google.gwt.layout.client.', 'LayoutImpl'), Lcom_google_gwt_layout_client_Layout_2_classLit = createForClass('com.google.gwt.layout.client.', 'Layout'), Lcom_google_gwt_layout_client_Layout$Alignment_2_classLit = createForEnum('com.google.gwt.layout.client.', 'Layout$Alignment', Ljava_lang_Enum_2_classLit, values_7, valueOf_8), _3Lcom_google_gwt_layout_client_Layout$Alignment_2_classLit = createForArray('[Lcom.google.gwt.layout.client.', 'Layout$Alignment;', Lcom_google_gwt_layout_client_Layout$Alignment_2_classLit), Lcom_google_gwt_layout_client_Layout$Layer_2_classLit = createForClass('com.google.gwt.layout.client.', 'Layout$Layer'), Lcom_google_gwt_layout_client_Layout$1_2_classLit = createForClass('com.google.gwt.layout.client.', 'Layout$1'), Lcom_google_gwt_text_shared_testing_PassthroughParser_2_classLit = createForClass('com.google.gwt.text.shared.testing.', 'PassthroughParser'), Lcom_google_gwt_text_shared_AbstractRenderer_2_classLit = createForClass('com.google.gwt.text.shared.', 'AbstractRenderer'), Lcom_google_gwt_text_shared_testing_PassthroughRenderer_2_classLit = createForClass('com.google.gwt.text.shared.testing.', 'PassthroughRenderer'), Lcom_google_gwt_uibinder_client_UiBinderUtil$TempAttachment_2_classLit = createForClass('com.google.gwt.uibinder.client.', 'UiBinderUtil$TempAttachment'), Lcom_google_gwt_user_client_ui_AbstractImagePrototype_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'AbstractImagePrototype'), Lcom_google_gwt_user_client_ui_impl_ClippedImagePrototype_2_classLit = createForClass('com.google.gwt.user.client.ui.impl.', 'ClippedImagePrototype'), Lcom_google_gwt_user_client_ui_impl_FocusImpl_2_classLit = createForClass('com.google.gwt.user.client.ui.impl.', 'FocusImpl'), Lcom_google_gwt_user_client_ui_impl_FocusImplStandard_2_classLit = createForClass('com.google.gwt.user.client.ui.impl.', 'FocusImplStandard'), Lcom_google_gwt_user_client_ui_impl_FocusImplSafari_2_classLit = createForClass('com.google.gwt.user.client.ui.impl.', 'FocusImplSafari'), Lcom_google_gwt_user_client_ui_FocusWidget_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'FocusWidget'), Lcom_google_gwt_user_client_ui_ButtonBase_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'ButtonBase'), Lcom_google_gwt_user_client_ui_Button_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'Button'), Lcom_google_gwt_user_client_ui_CellPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'CellPanel'), Lcom_google_gwt_user_client_ui_CheckBox_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'CheckBox'), Lcom_google_gwt_user_client_ui_CheckBox$1_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'CheckBox$1'), Lcom_google_gwt_user_client_ui_ComplexPanel$1_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'ComplexPanel$1'), Lcom_google_gwt_user_client_ui_SimplePanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'SimplePanel'), Lcom_google_gwt_user_client_ui_DockLayoutPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'DockLayoutPanel'), Lcom_google_gwt_user_client_ui_DockLayoutPanel$Direction_2_classLit = createForEnum('com.google.gwt.user.client.ui.', 'DockLayoutPanel$Direction', Ljava_lang_Enum_2_classLit, values_8, valueOf_9), _3Lcom_google_gwt_user_client_ui_DockLayoutPanel$Direction_2_classLit = createForArray('[Lcom.google.gwt.user.client.ui.', 'DockLayoutPanel$Direction;', Lcom_google_gwt_user_client_ui_DockLayoutPanel$Direction_2_classLit), Lcom_google_gwt_user_client_ui_DockLayoutPanel$LayoutData_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'DockLayoutPanel$LayoutData'), Lcom_google_gwt_user_client_ui_LayoutCommand_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'LayoutCommand'), Lcom_google_gwt_user_client_ui_DockLayoutPanel$DockAnimateCommand_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'DockLayoutPanel$DockAnimateCommand'), Lcom_google_gwt_user_client_ui_FileUpload_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'FileUpload'), Lcom_google_gwt_user_client_ui_FlowPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'FlowPanel'), Lcom_google_gwt_user_client_ui_FormPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'FormPanel'), Lcom_google_gwt_user_client_ui_FormPanel$SubmitCompleteEvent_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'FormPanel$SubmitCompleteEvent'), Lcom_google_gwt_user_client_ui_FormPanel$SubmitEvent_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'FormPanel$SubmitEvent'), Lcom_google_gwt_user_client_ui_FormPanel$1_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'FormPanel$1'), Lcom_google_gwt_user_client_ui_HTML_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'HTML'), Lcom_google_gwt_user_client_ui_HTMLPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'HTMLPanel'), Lcom_google_gwt_user_client_ui_HasVerticalAlignment$VerticalAlignmentConstant_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'HasVerticalAlignment$VerticalAlignmentConstant'), Lcom_google_gwt_user_client_ui_Hidden_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'Hidden'), Lcom_google_gwt_user_client_ui_HorizontalPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'HorizontalPanel'), Lcom_google_gwt_user_client_ui_Image_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'Image'), Lcom_google_gwt_user_client_ui_Image$State_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'Image$State'), Lcom_google_gwt_user_client_ui_Image$ClippedState_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'Image$ClippedState'), Lcom_google_gwt_user_client_ui_Image$State$1_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'Image$State$1'), Lcom_google_gwt_user_client_ui_LayoutCommand$1_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'LayoutCommand$1'), Lcom_google_gwt_user_client_ui_ListBox_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'ListBox'), Lcom_google_gwt_user_client_ui_MenuBar_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'MenuBar'), Lcom_google_gwt_user_client_ui_MenuBar$2_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'MenuBar$2'), Lcom_google_gwt_user_client_ui_RadioButton_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'RadioButton'), Lcom_google_gwt_user_client_ui_ScrollPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'ScrollPanel'), Lcom_google_gwt_user_client_ui_SimplePanel$1_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'SimplePanel$1'), Lcom_google_gwt_user_client_ui_ValueBoxBase_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'ValueBoxBase'), Lcom_google_gwt_user_client_ui_TextBoxBase_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'TextBoxBase'), Lcom_google_gwt_user_client_ui_TextArea_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'TextArea'), Lcom_google_gwt_user_client_ui_TextBox_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'TextBox'), Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_2_classLit = createForEnum('com.google.gwt.user.client.ui.', 'ValueBoxBase$TextAlignment', Ljava_lang_Enum_2_classLit, values_9, valueOf_10), _3Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_2_classLit = createForArray('[Lcom.google.gwt.user.client.ui.', 'ValueBoxBase$TextAlignment;', Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_2_classLit), Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$1_2_classLit = createForEnum('com.google.gwt.user.client.ui.', 'ValueBoxBase$TextAlignment$1', Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_2_classLit, null, null), Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$2_2_classLit = createForEnum('com.google.gwt.user.client.ui.', 'ValueBoxBase$TextAlignment$2', Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_2_classLit, null, null), Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$3_2_classLit = createForEnum('com.google.gwt.user.client.ui.', 'ValueBoxBase$TextAlignment$3', Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_2_classLit, null, null), Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment$4_2_classLit = createForEnum('com.google.gwt.user.client.ui.', 'ValueBoxBase$TextAlignment$4', Lcom_google_gwt_user_client_ui_ValueBoxBase$TextAlignment_2_classLit, null, null), Lcom_google_gwt_user_client_ui_VerticalPanel_2_classLit = createForClass('com.google.gwt.user.client.ui.', 'VerticalPanel'), Lorg_waveprotocol_wave_client_clipboard_AnnotationSerializer$Builder_2_classLit = createForClass('org.waveprotocol.wave.client.clipboard.', 'AnnotationSerializer$Builder'), Lorg_waveprotocol_wave_client_clipboard_Clipboard_2_classLit = createForClass('org.waveprotocol.wave.client.clipboard.', 'Clipboard'), Lorg_waveprotocol_wave_client_clipboard_PasteBufferImpl_2_classLit = createForClass('org.waveprotocol.wave.client.clipboard.', 'PasteBufferImpl'), Lorg_waveprotocol_wave_client_common_util_ClientDebugException_2_classLit = createForClass('org.waveprotocol.wave.client.common.util.', 'ClientDebugException'), Lorg_waveprotocol_wave_client_common_util_DomHelper$ElementEditability_2_classLit = createForEnum('org.waveprotocol.wave.client.common.util.', 'DomHelper$ElementEditability', Ljava_lang_Enum_2_classLit, values_11, valueOf_17), _3Lorg_waveprotocol_wave_client_common_util_DomHelper$ElementEditability_2_classLit = createForArray('[Lorg.waveprotocol.wave.client.common.util.', 'DomHelper$ElementEditability;', Lorg_waveprotocol_wave_client_common_util_DomHelper$ElementEditability_2_classLit), Lorg_waveprotocol_wave_client_common_util_EventWrapper_2_classLit = createForClass('org.waveprotocol.wave.client.common.util.', 'EventWrapper'), Lorg_waveprotocol_wave_client_common_util_LogicalPanel$Impl_2_classLit = createForClass('org.waveprotocol.wave.client.common.util.', 'LogicalPanel$Impl'), Lorg_waveprotocol_wave_client_common_util_SignalEvent$MoveUnit_2_classLit = createForEnum('org.waveprotocol.wave.client.common.util.', 'SignalEvent$MoveUnit', Ljava_lang_Enum_2_classLit, values_15, valueOf_21), _3Lorg_waveprotocol_wave_client_common_util_SignalEvent$MoveUnit_2_classLit = createForArray('[Lorg.waveprotocol.wave.client.common.util.', 'SignalEvent$MoveUnit;', Lorg_waveprotocol_wave_client_common_util_SignalEvent$MoveUnit_2_classLit), Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier_2_classLit = createForEnum('org.waveprotocol.wave.client.common.util.', 'SignalEvent$KeyModifier', Ljava_lang_Enum_2_classLit, values_13, valueOf_19), _3Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier_2_classLit = createForArray('[Lorg.waveprotocol.wave.client.common.util.', 'SignalEvent$KeyModifier;', Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier_2_classLit), Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$1_2_classLit = createForEnum('org.waveprotocol.wave.client.common.util.', 'SignalEvent$KeyModifier$1', Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier_2_classLit, null, null), Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$2_2_classLit = createForEnum('org.waveprotocol.wave.client.common.util.', 'SignalEvent$KeyModifier$2', Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier_2_classLit, null, null), Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$3_2_classLit = createForEnum('org.waveprotocol.wave.client.common.util.', 'SignalEvent$KeyModifier$3', Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier_2_classLit, null, null), Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$4_2_classLit = createForEnum('org.waveprotocol.wave.client.common.util.', 'SignalEvent$KeyModifier$4', Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier_2_classLit, null, null), Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$5_2_classLit = createForEnum('org.waveprotocol.wave.client.common.util.', 'SignalEvent$KeyModifier$5', Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier_2_classLit, null, null), Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$6_2_classLit = createForEnum('org.waveprotocol.wave.client.common.util.', 'SignalEvent$KeyModifier$6', Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier_2_classLit, null, null), Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$7_2_classLit = createForEnum('org.waveprotocol.wave.client.common.util.', 'SignalEvent$KeyModifier$7', Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier_2_classLit, null, null), Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier$8_2_classLit = createForEnum('org.waveprotocol.wave.client.common.util.', 'SignalEvent$KeyModifier$8', Lorg_waveprotocol_wave_client_common_util_SignalEvent$KeyModifier_2_classLit, null, null), Lorg_waveprotocol_wave_client_doodad_link_LinkAnnotationHandler$2$1_2_classLit = createForClass('org.waveprotocol.wave.client.doodad.link.', 'LinkAnnotationHandler$2$1'), Lorg_waveprotocol_wave_client_doodad_selection_SelectionExtractor_2_classLit = createForClass('org.waveprotocol.wave.client.doodad.selection.', 'SelectionExtractor'), Lorg_waveprotocol_wave_client_editor_content_misc_CaretAnnotations_2_classLit = createForClass('org.waveprotocol.wave.client.editor.content.misc.', 'CaretAnnotations'), Lorg_waveprotocol_wave_client_editor_content_paragraph_Paragraph$RegularStyler_2_classLit = createForClass('org.waveprotocol.wave.client.editor.content.paragraph.', 'Paragraph$RegularStyler'), Lorg_waveprotocol_wave_client_editor_content_paragraph_Paragraph$ListStyler_2_classLit = createForClass('org.waveprotocol.wave.client.editor.content.paragraph.', 'Paragraph$ListStyler'), Lorg_waveprotocol_wave_client_editor_content_paragraph_Paragraph$3_2_classLit = createForClass('org.waveprotocol.wave.client.editor.content.paragraph.', 'Paragraph$3'), Lorg_waveprotocol_wave_client_editor_content_paragraph_Paragraph$4_2_classLit = createForClass('org.waveprotocol.wave.client.editor.content.paragraph.', 'Paragraph$4'), Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$IndentType_2_classLit = createForEnum('org.waveprotocol.wave.client.editor.content.paragraph.', 'ParagraphNiceHtmlRenderer$IndentType', Ljava_lang_Enum_2_classLit, values_27, valueOf_33), _3Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$IndentType_2_classLit = createForArray('[Lorg.waveprotocol.wave.client.editor.content.paragraph.', 'ParagraphNiceHtmlRenderer$IndentType;', Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$IndentType_2_classLit), Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$IndentType$1_2_classLit = createForEnum('org.waveprotocol.wave.client.editor.content.paragraph.', 'ParagraphNiceHtmlRenderer$IndentType$1', Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$IndentType_2_classLit, null, null), Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$IndentType$2_2_classLit = createForEnum('org.waveprotocol.wave.client.editor.content.paragraph.', 'ParagraphNiceHtmlRenderer$IndentType$2', Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$IndentType_2_classLit, null, null), Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$IndentType$3_2_classLit = createForEnum('org.waveprotocol.wave.client.editor.content.paragraph.', 'ParagraphNiceHtmlRenderer$IndentType$3', Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$IndentType_2_classLit, null, null), Lorg_waveprotocol_wave_client_editor_content_paragraph_ParagraphNiceHtmlRenderer$HtmlStack_2_classLit = createForClass('org.waveprotocol.wave.client.editor.content.paragraph.', 'ParagraphNiceHtmlRenderer$HtmlStack'), Lorg_waveprotocol_wave_client_editor_content_ContentDocument$7_2_classLit = createForClass('org.waveprotocol.wave.client.editor.content.', 'ContentDocument$7'), Lorg_waveprotocol_wave_client_editor_content_ContentPoint_2_classLit = createForClass('org.waveprotocol.wave.client.editor.content.', 'ContentPoint'), Lorg_waveprotocol_wave_client_editor_content_ContentRange_2_classLit = createForClass('org.waveprotocol.wave.client.editor.content.', 'ContentRange'), Lorg_waveprotocol_wave_client_editor_content_FocusedContentRange_2_classLit = createForClass('org.waveprotocol.wave.client.editor.content.', 'FocusedContentRange'), Lorg_waveprotocol_wave_client_editor_content_NodeEventRouter_2_classLit = createForClass('org.waveprotocol.wave.client.editor.content.', 'NodeEventRouter'), Lorg_waveprotocol_wave_client_editor_debug_CursorDisplay_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'CursorDisplay'), Lorg_waveprotocol_wave_client_editor_debug_DebugDialog_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugDialog'), Lorg_waveprotocol_wave_client_editor_debug_DebugDialog$Selection_2_classLit = createForEnum('org.waveprotocol.wave.client.editor.debug.', 'DebugDialog$Selection', Ljava_lang_Enum_2_classLit, values_28, valueOf_34), _3Lorg_waveprotocol_wave_client_editor_debug_DebugDialog$Selection_2_classLit = createForArray('[Lorg.waveprotocol.wave.client.editor.debug.', 'DebugDialog$Selection;', Lorg_waveprotocol_wave_client_editor_debug_DebugDialog$Selection_2_classLit), Lorg_waveprotocol_wave_client_editor_debug_DebugDialog$LogPanel_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugDialog$LogPanel'), Lorg_waveprotocol_wave_client_editor_debug_DebugDialog$LogPanel$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugDialog$LogPanel$1'), Lorg_waveprotocol_wave_client_editor_debug_DebugDialog$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugDialog$1'), Lorg_waveprotocol_wave_client_editor_debug_DebugDialog$2_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugDialog$2'), Lorg_waveprotocol_wave_client_editor_debug_DebugOptions_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugOptions'), Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugOptions$1'), Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$2_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugOptions$2'), Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$3_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugOptions$3'), Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$4_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugOptions$4'), Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$5_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugOptions$5'), Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$6_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugOptions$6'), Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$7_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugOptions$7'), Lorg_waveprotocol_wave_client_editor_debug_DebugOptions$7$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugOptions$7$1'), Lorg_waveprotocol_wave_client_editor_debug_DebugPopupFactory$2_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugPopupFactory$2'), Lorg_waveprotocol_wave_client_editor_debug_DebugPopupFactory$3_2_classLit = createForClass('org.waveprotocol.wave.client.editor.debug.', 'DebugPopupFactory$3'), Lorg_waveprotocol_wave_client_editor_event_CompositionEventHandler_2_classLit = createForClass('org.waveprotocol.wave.client.editor.event.', 'CompositionEventHandler'), Lorg_waveprotocol_wave_client_editor_event_CompositionEventHandler$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.event.', 'CompositionEventHandler$1'), Lorg_waveprotocol_wave_client_editor_event_EditorEventHandler_2_classLit = createForClass('org.waveprotocol.wave.client.editor.event.', 'EditorEventHandler'), Lorg_waveprotocol_wave_client_editor_event_EditorEventHandler$State_2_classLit = createForEnum('org.waveprotocol.wave.client.editor.event.', 'EditorEventHandler$State', Ljava_lang_Enum_2_classLit, values_29, valueOf_35), _3Lorg_waveprotocol_wave_client_editor_event_EditorEventHandler$State_2_classLit = createForArray('[Lorg.waveprotocol.wave.client.editor.event.', 'EditorEventHandler$State;', Lorg_waveprotocol_wave_client_editor_event_EditorEventHandler$State_2_classLit), Lorg_waveprotocol_wave_client_editor_event_EditorEventHandler$SelectionLostException_2_classLit = createForClass('org.waveprotocol.wave.client.editor.event.', 'EditorEventHandler$SelectionLostException'), Lorg_waveprotocol_wave_client_editor_event_EditorEventHandler$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.event.', 'EditorEventHandler$1'), Lorg_waveprotocol_wave_client_editor_event_EditorEventImpl_2_classLit = createForClass('org.waveprotocol.wave.client.editor.event.', 'EditorEventImpl'), Lorg_waveprotocol_wave_client_editor_event_EditorEventImpl$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.event.', 'EditorEventImpl$1'), Lorg_waveprotocol_wave_client_editor_extract_DomMutationReverter_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'DomMutationReverter'), Lorg_waveprotocol_wave_client_editor_extract_DomMutationReverter$RemovalEntry_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'DomMutationReverter$RemovalEntry'), Lorg_waveprotocol_wave_client_editor_extract_ImeExtractor_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'ImeExtractor'), Lorg_waveprotocol_wave_client_editor_extract_PasteAnnotationLogic_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'PasteAnnotationLogic'), Lorg_waveprotocol_wave_client_editor_extract_PasteAnnotationLogic$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'PasteAnnotationLogic$1'), Lorg_waveprotocol_wave_client_editor_extract_PasteAnnotationLogic$2_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'PasteAnnotationLogic$2'), Lorg_waveprotocol_wave_client_editor_extract_PasteAnnotationLogic$3_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'PasteAnnotationLogic$3'), Lorg_waveprotocol_wave_client_editor_extract_PasteAnnotationLogic$4_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'PasteAnnotationLogic$4'), Lorg_waveprotocol_wave_client_editor_extract_PasteExtractor_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'PasteExtractor'), Lorg_waveprotocol_wave_client_editor_extract_PasteExtractor$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'PasteExtractor$1'), Lorg_waveprotocol_wave_client_editor_extract_PasteExtractor$2_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'PasteExtractor$2'), Lorg_waveprotocol_wave_client_editor_extract_PasteFormatRenderer_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'PasteFormatRenderer'), Lorg_waveprotocol_wave_client_editor_extract_SelectionMatcher_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'SelectionMatcher'), Lorg_waveprotocol_wave_client_editor_extract_SelectionMatcher$LazyPoint$Type_2_classLit = createForEnum('org.waveprotocol.wave.client.editor.extract.', 'SelectionMatcher$LazyPoint$Type', Ljava_lang_Enum_2_classLit, values_30, valueOf_36), _3Lorg_waveprotocol_wave_client_editor_extract_SelectionMatcher$LazyPoint$Type_2_classLit = createForArray('[Lorg.waveprotocol.wave.client.editor.extract.', 'SelectionMatcher$LazyPoint$Type;', Lorg_waveprotocol_wave_client_editor_extract_SelectionMatcher$LazyPoint$Type_2_classLit), Lorg_waveprotocol_wave_client_editor_extract_SelectionMatcher$EagerPoint_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'SelectionMatcher$EagerPoint'), Lorg_waveprotocol_wave_client_editor_extract_SelectionMatcher$LazyPointImpl_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'SelectionMatcher$LazyPointImpl'), Lorg_waveprotocol_wave_client_editor_extract_SubTreeXmlRenderer_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'SubTreeXmlRenderer'), Lorg_waveprotocol_wave_client_editor_extract_TypingExtractor_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'TypingExtractor'), Lorg_waveprotocol_wave_client_editor_extract_TypingExtractor$TypingState_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'TypingExtractor$TypingState'), Lorg_waveprotocol_wave_client_editor_extract_TypingExtractor$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.extract.', 'TypingExtractor$1'), Lorg_waveprotocol_wave_client_editor_keys_KeyBindingRegistry_2_classLit = createForClass('org.waveprotocol.wave.client.editor.keys.', 'KeyBindingRegistry'), Lorg_waveprotocol_wave_client_editor_selection_content_PassiveSelectionHelper_2_classLit = createForClass('org.waveprotocol.wave.client.editor.selection.content.', 'PassiveSelectionHelper'), Lorg_waveprotocol_wave_client_editor_selection_content_AggressiveSelectionHelper_2_classLit = createForClass('org.waveprotocol.wave.client.editor.selection.content.', 'AggressiveSelectionHelper'), Lorg_waveprotocol_wave_client_editor_selection_content_CaretMovementHelperWebkitImpl_2_classLit = createForClass('org.waveprotocol.wave.client.editor.selection.content.', 'CaretMovementHelperWebkitImpl'), Lorg_waveprotocol_wave_client_editor_selection_content_SelectionHelper$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.selection.content.', 'SelectionHelper$1'), Lorg_waveprotocol_wave_client_editor_selection_html_SelectionWebkit$Direction_2_classLit = createForEnum('org.waveprotocol.wave.client.editor.selection.html.', 'SelectionWebkit$Direction', Ljava_lang_Enum_2_classLit, values_33, valueOf_39), _3Lorg_waveprotocol_wave_client_editor_selection_html_SelectionWebkit$Direction_2_classLit = createForArray('[Lorg.waveprotocol.wave.client.editor.selection.html.', 'SelectionWebkit$Direction;', Lorg_waveprotocol_wave_client_editor_selection_html_SelectionWebkit$Direction_2_classLit), Lorg_waveprotocol_wave_client_editor_selection_html_SelectionWebkit$MoveUnit_2_classLit = createForEnum('org.waveprotocol.wave.client.editor.selection.html.', 'SelectionWebkit$MoveUnit', Ljava_lang_Enum_2_classLit, values_34, valueOf_40), _3Lorg_waveprotocol_wave_client_editor_selection_html_SelectionWebkit$MoveUnit_2_classLit = createForArray('[Lorg.waveprotocol.wave.client.editor.selection.html.', 'SelectionWebkit$MoveUnit;', Lorg_waveprotocol_wave_client_editor_selection_html_SelectionWebkit$MoveUnit_2_classLit), Lorg_waveprotocol_wave_client_editor_sugg_InteractiveSuggestionsManager_2_classLit = createForClass('org.waveprotocol.wave.client.editor.sugg.', 'InteractiveSuggestionsManager'), Lorg_waveprotocol_wave_client_editor_sugg_InteractiveSuggestionsManager$PopupCloser_2_classLit = createForClass('org.waveprotocol.wave.client.editor.sugg.', 'InteractiveSuggestionsManager$PopupCloser'), Lorg_waveprotocol_wave_client_editor_sugg_InteractiveSuggestionsManager$PopupCloser$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.sugg.', 'InteractiveSuggestionsManager$PopupCloser$1'), Lorg_waveprotocol_wave_client_editor_sugg_InteractiveSuggestionsManager$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.sugg.', 'InteractiveSuggestionsManager$1'), Lorg_waveprotocol_wave_client_editor_sugg_SuggestionMenu_2_classLit = createForClass('org.waveprotocol.wave.client.editor.sugg.', 'SuggestionMenu'), Lorg_waveprotocol_wave_client_editor_toolbar_ButtonUpdater_2_classLit = createForClass('org.waveprotocol.wave.client.editor.toolbar.', 'ButtonUpdater'), Lorg_waveprotocol_wave_client_editor_toolbar_ParagraphApplicationController_2_classLit = createForClass('org.waveprotocol.wave.client.editor.toolbar.', 'ParagraphApplicationController'), Lorg_waveprotocol_wave_client_editor_toolbar_ParagraphApplicationController$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.toolbar.', 'ParagraphApplicationController$1'), Lorg_waveprotocol_wave_client_editor_toolbar_ParagraphTraversalController_2_classLit = createForClass('org.waveprotocol.wave.client.editor.toolbar.', 'ParagraphTraversalController'), Lorg_waveprotocol_wave_client_editor_toolbar_ParagraphTraversalController$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.toolbar.', 'ParagraphTraversalController$1'), Lorg_waveprotocol_wave_client_editor_toolbar_TextSelectionController_2_classLit = createForClass('org.waveprotocol.wave.client.editor.toolbar.', 'TextSelectionController'), Lorg_waveprotocol_wave_client_editor_toolbar_TextSelectionController$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.toolbar.', 'TextSelectionController$1'), Lorg_waveprotocol_wave_client_editor_util_AnnotationBehaviourLogic_2_classLit = createForClass('org.waveprotocol.wave.client.editor.util.', 'AnnotationBehaviourLogic'), Lorg_waveprotocol_wave_client_editor_util_AnnotationBehaviourLogic$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.util.', 'AnnotationBehaviourLogic$1'), Lorg_waveprotocol_wave_client_editor_EditorContextAdapter_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorContextAdapter'), Lorg_waveprotocol_wave_client_editor_EditorImpl_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl'), Lorg_waveprotocol_wave_client_editor_EditorImpl$ConsistentStateCommandRunner_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$ConsistentStateCommandRunner'), Lorg_waveprotocol_wave_client_editor_EditorImpl$EditorEventsSubHandlerImpl_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$EditorEventsSubHandlerImpl'), Lorg_waveprotocol_wave_client_editor_EditorImpl$EditorInteractorImpl_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$EditorInteractorImpl'), Lorg_waveprotocol_wave_client_editor_EditorImpl$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$1'), Lorg_waveprotocol_wave_client_editor_EditorImpl$2_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$2'), Lorg_waveprotocol_wave_client_editor_EditorImpl$3_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$3'), Lorg_waveprotocol_wave_client_editor_EditorImpl$4_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$4'), Lorg_waveprotocol_wave_client_editor_EditorImpl$8_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$8'), Lorg_waveprotocol_wave_client_editor_EditorImpl$10_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$10'), Lorg_waveprotocol_wave_client_editor_EditorImpl$11_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$11'), Lorg_waveprotocol_wave_client_editor_EditorImpl$12_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$12'), Lorg_waveprotocol_wave_client_editor_EditorImpl$13_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$13'), Lorg_waveprotocol_wave_client_editor_EditorImpl$14_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$14'), Lorg_waveprotocol_wave_client_editor_EditorImpl$15_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$15'), Lorg_waveprotocol_wave_client_editor_EditorImpl$16_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$16'), Lorg_waveprotocol_wave_client_editor_EditorImpl$17_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImpl$17'), Lorg_waveprotocol_wave_client_editor_EditorImplWebkitMobile_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorImplWebkitMobile'), Lorg_waveprotocol_wave_client_editor_EditorSettings_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorSettings'), Lorg_waveprotocol_wave_client_editor_EditorSettings$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorSettings$1'), Lorg_waveprotocol_wave_client_editor_EditorUndoManager$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorUndoManager$1'), Lorg_waveprotocol_wave_client_editor_EditorUndoManagerImpl_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorUndoManagerImpl'), Lorg_waveprotocol_wave_client_editor_EditorUpdateEventImpl_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorUpdateEventImpl'), Lorg_waveprotocol_wave_client_editor_EditorUpdateEventImpl$1_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'EditorUpdateEventImpl$1'), Lorg_waveprotocol_wave_client_editor_ResponsibilityManagerImpl_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'ResponsibilityManagerImpl'), Lorg_waveprotocol_wave_client_editor_RestrictedRange_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'RestrictedRange'), Lorg_waveprotocol_wave_client_editor_UndoableSequencer_2_classLit = createForClass('org.waveprotocol.wave.client.editor.', 'UndoableSequencer'), Lorg_waveprotocol_wave_client_scheduler_CommandQueue$1$1_2_classLit = createForClass('org.waveprotocol.wave.client.scheduler.', 'CommandQueue$1$1'), Lorg_waveprotocol_wave_client_StageThree$DefaultProvider_2_classLit = createForClass('org.waveprotocol.wave.client.', 'StageThree$DefaultProvider'), Lorg_waveprotocol_wave_client_testing_UndercurrentHarness$1$4_2_classLit = createForClass('org.waveprotocol.wave.client.testing.', 'UndercurrentHarness$1$4'), Lorg_waveprotocol_wave_client_util_ClientFlagsBase_2_classLit = createForClass('org.waveprotocol.wave.client.util.', 'ClientFlagsBase'), Lorg_waveprotocol_wave_client_util_ClientFlags_2_classLit = createForClass('org.waveprotocol.wave.client.util.', 'ClientFlags'), Lorg_waveprotocol_wave_client_util_ClientFlagsBaseHelper_2_classLit = createForClass('org.waveprotocol.wave.client.util.', 'ClientFlagsBaseHelper'), Lorg_waveprotocol_wave_client_util_OverridingTypedSource_2_classLit = createForClass('org.waveprotocol.wave.client.util.', 'OverridingTypedSource'), Lorg_waveprotocol_wave_client_util_OverridingTypedSource$MapsHolder_2_classLit = createForClass('org.waveprotocol.wave.client.util.', 'OverridingTypedSource$MapsHolder'), Lorg_waveprotocol_wave_client_util_UrlParameters_2_classLit = createForClass('org.waveprotocol.wave.client.util.', 'UrlParameters'), Lorg_waveprotocol_wave_client_util_WrappedJSObject_2_classLit = createForClass('org.waveprotocol.wave.client.util.', 'WrappedJSObject'), Lorg_waveprotocol_wave_client_wavepanel_impl_edit_Actions$Action_2_classLit = createForEnum('org.waveprotocol.wave.client.wavepanel.impl.edit.', 'Actions$Action', Ljava_lang_Enum_2_classLit, values_40, valueOf_46), _3Lorg_waveprotocol_wave_client_wavepanel_impl_edit_Actions$Action_2_classLit = createForArray('[Lorg.waveprotocol.wave.client.wavepanel.impl.edit.', 'Actions$Action;', Lorg_waveprotocol_wave_client_wavepanel_impl_edit_Actions$Action_2_classLit), Lorg_waveprotocol_wave_client_wavepanel_impl_edit_ActionsImpl_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.edit.', 'ActionsImpl'), Lorg_waveprotocol_wave_client_wavepanel_impl_edit_EditController_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.edit.', 'EditController'), Lorg_waveprotocol_wave_client_wavepanel_impl_edit_EditSession_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.edit.', 'EditSession'), Lorg_waveprotocol_wave_client_wavepanel_impl_edit_EditSession$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.edit.', 'EditSession$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_edit_EditSession$2_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.edit.', 'EditSession$2'), Lorg_waveprotocol_wave_client_wavepanel_impl_edit_FocusedActions_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.edit.', 'FocusedActions'), Lorg_waveprotocol_wave_client_wavepanel_impl_edit_KeepFocusInView_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.edit.', 'KeepFocusInView'), Lorg_waveprotocol_wave_client_wavepanel_impl_edit_ParticipantController_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.edit.', 'ParticipantController'), Lorg_waveprotocol_wave_client_wavepanel_impl_edit_ParticipantController$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.edit.', 'ParticipantController$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_edit_ParticipantController$2_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.edit.', 'ParticipantController$2'), Lorg_waveprotocol_wave_client_wavepanel_impl_edit_ParticipantController$3_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.edit.', 'ParticipantController$3'), Lorg_waveprotocol_wave_client_wavepanel_impl_focus_FocusBlipSelector_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.focus.', 'FocusBlipSelector'), Lorg_waveprotocol_wave_client_wavepanel_impl_indicator_ReplyIndicatorController_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.indicator.', 'ReplyIndicatorController'), Lorg_waveprotocol_wave_client_wavepanel_impl_menu_MenuController_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.menu.', 'MenuController'), Lorg_waveprotocol_wave_client_wavepanel_impl_title_WaveTitleHandler_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.title.', 'WaveTitleHandler'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_attachment_AttachmentPopupWidget_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.attachment.', 'AttachmentPopupWidget'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_attachment_AttachmentPopupWidget$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.attachment.', 'AttachmentPopupWidget$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_attachment_AttachmentPopupWidget$2_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.attachment.', 'AttachmentPopupWidget$2'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_attachment_AttachmentPopupWidget$3_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.attachment.', 'AttachmentPopupWidget$3'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoProvider$GadgetCategoryType_2_classLit = createForEnum('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetInfoProvider$GadgetCategoryType', Ljava_lang_Enum_2_classLit, values_41, valueOf_47), _3Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoProvider$GadgetCategoryType_2_classLit = createForArray('[Lorg.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetInfoProvider$GadgetCategoryType;', Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoProvider$GadgetCategoryType_2_classLit), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoProvider$GadgetInfo_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetInfoProvider$GadgetInfo'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoProviderImpl_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetInfoProviderImpl'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoProviderImpl$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetInfoProviderImpl$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoWidget_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetInfoWidget'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoWidget$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetInfoWidget$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoWidget$2_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetInfoWidget$2'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoWidget_1BinderImpl$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetInfoWidget_BinderImpl$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetInfoWidget_1BinderImpl_1GenBundle_1en_1InlineClientBundleGenerator$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetInfoWidget_BinderImpl_GenBundle_en_InlineClientBundleGenerator$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetSelectorWidget'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetSelectorWidget$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget$2_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetSelectorWidget$2'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget$3_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetSelectorWidget$3'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget$4_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetSelectorWidget$4'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget$5_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetSelectorWidget$5'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget$6_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetSelectorWidget$6'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget_1BinderImpl$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetSelectorWidget_BinderImpl$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_gadget_GadgetSelectorWidget_1BinderImpl_1GenBundle_1en_1InlineClientBundleGenerator$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.gadget.', 'GadgetSelectorWidget_BinderImpl_GenBundle_en_InlineClientBundleGenerator$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$FontFamily_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'EditToolbar$FontFamily'), _3Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$FontFamily_2_classLit = createForArray('[Lorg.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'EditToolbar$FontFamily;', Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$FontFamily_2_classLit), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$Alignment_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'EditToolbar$Alignment'), _3Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$Alignment_2_classLit = createForArray('[Lorg.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'EditToolbar$Alignment;', Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$Alignment_2_classLit), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'EditToolbar'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'EditToolbar$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$2_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'EditToolbar$2'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$2$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'EditToolbar$2$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$3_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'EditToolbar$3'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$3$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'EditToolbar$3$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$4_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'EditToolbar$4'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$5_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'EditToolbar$5'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_EditToolbar$6_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'EditToolbar$6'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_ToolbarSwitcher_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'ToolbarSwitcher'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_ViewToolbar_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'ViewToolbar'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_ViewToolbar$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'ViewToolbar$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_ViewToolbar$2_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'ViewToolbar$2'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_ViewToolbar$3_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'ViewToolbar$3'), Lorg_waveprotocol_wave_client_wavepanel_impl_toolbar_ViewToolbar$4_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.toolbar.', 'ViewToolbar$4'), Lorg_waveprotocol_wave_client_wavepanel_view_dom_full_BlipLinkPopupWidget_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.view.dom.full.', 'BlipLinkPopupWidget'), Lorg_waveprotocol_wave_client_widget_common_ImplPanel_2_classLit = createForClass('org.waveprotocol.wave.client.widget.common.', 'ImplPanel'), Lorg_waveprotocol_wave_client_widget_overflowpanel_OverflowPanelUpdater_2_classLit = createForClass('org.waveprotocol.wave.client.widget.overflowpanel.', 'OverflowPanelUpdater'), Lorg_waveprotocol_wave_client_widget_overflowpanel_OverflowPanelUpdater$1_2_classLit = createForClass('org.waveprotocol.wave.client.widget.overflowpanel.', 'OverflowPanelUpdater$1'), Lorg_waveprotocol_wave_client_widget_popup_DesktopTitleBar_2_classLit = createForClass('org.waveprotocol.wave.client.widget.popup.', 'DesktopTitleBar'), Lorg_waveprotocol_wave_client_widget_profile_ProfilePopupPresenter_2_classLit = createForClass('org.waveprotocol.wave.client.widget.profile.', 'ProfilePopupPresenter'), Lorg_waveprotocol_wave_client_widget_profile_ProfilePopupWidget_2_classLit = createForClass('org.waveprotocol.wave.client.widget.profile.', 'ProfilePopupWidget'), Lorg_waveprotocol_wave_client_widget_toolbar_buttons_AbstractToolbarButton_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.buttons.', 'AbstractToolbarButton'), Lorg_waveprotocol_wave_client_widget_toolbar_buttons_HorizontalToolbarButtonWidget_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.buttons.', 'HorizontalToolbarButtonWidget'), Lorg_waveprotocol_wave_client_widget_toolbar_buttons_HorizontalToolbarButtonWidget_1BinderImpl$1_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.buttons.', 'HorizontalToolbarButtonWidget_BinderImpl$1'), Lorg_waveprotocol_wave_client_widget_toolbar_buttons_HorizontalToolbarButtonWidget_1BinderImpl$2_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.buttons.', 'HorizontalToolbarButtonWidget_BinderImpl$2'), Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarButtonUiProxy_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.buttons.', 'ToolbarButtonUiProxy'), Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarButtonView$State_2_classLit = createForEnum('org.waveprotocol.wave.client.widget.toolbar.buttons.', 'ToolbarButtonView$State', Ljava_lang_Enum_2_classLit, values_53, valueOf_59), _3Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarButtonView$State_2_classLit = createForArray('[Lorg.waveprotocol.wave.client.widget.toolbar.buttons.', 'ToolbarButtonView$State;', Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarButtonView$State_2_classLit), Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarButtonViewProxy_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.buttons.', 'ToolbarButtonViewProxy'), Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarButtonViewProxy$1_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.buttons.', 'ToolbarButtonViewProxy$1'), Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarClickButton_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.buttons.', 'ToolbarClickButton'), Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarPopupToggler_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.buttons.', 'ToolbarPopupToggler'), Lorg_waveprotocol_wave_client_widget_toolbar_buttons_ToolbarToggleButton_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.buttons.', 'ToolbarToggleButton'), Lorg_waveprotocol_wave_client_widget_toolbar_buttons_VerticalToolbarButtonWidget_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.buttons.', 'VerticalToolbarButtonWidget'), Lorg_waveprotocol_wave_client_widget_toolbar_buttons_VerticalToolbarButtonWidget_1BinderImpl$1_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.buttons.', 'VerticalToolbarButtonWidget_BinderImpl$1'), Lorg_waveprotocol_wave_client_widget_toolbar_buttons_VerticalToolbarButtonWidget_1BinderImpl$2_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.buttons.', 'VerticalToolbarButtonWidget_BinderImpl$2'), Lorg_waveprotocol_wave_client_widget_toolbar_GroupingToolbar_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.', 'GroupingToolbar'), Lorg_waveprotocol_wave_client_widget_toolbar_SubmenuToolbarWidget_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.', 'SubmenuToolbarWidget'), Lorg_waveprotocol_wave_client_widget_toolbar_ToolbarButtonViewBuilder_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.', 'ToolbarButtonViewBuilder'), Lorg_waveprotocol_wave_client_widget_toolbar_ToplevelToolbarWidget_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.', 'ToplevelToolbarWidget'), Lorg_waveprotocol_wave_client_widget_toolbar_ToplevelToolbarWidget$Item_2_classLit = createForClass('org.waveprotocol.wave.client.widget.toolbar.', 'ToplevelToolbarWidget$Item'), Lorg_waveprotocol_wave_client_Stages$4$1_2_classLit = createForClass('org.waveprotocol.wave.client.', 'Stages$4$1'), Lorg_waveprotocol_wave_media_model_AttachmentId_2_classLit = createForClass('org.waveprotocol.wave.media.model.', 'AttachmentId'), Lorg_waveprotocol_wave_media_model_AttachmentIdGeneratorImpl_2_classLit = createForClass('org.waveprotocol.wave.media.model.', 'AttachmentIdGeneratorImpl'), Lorg_waveprotocol_wave_model_conversation_WaveletBasedConversationBlip$5_2_classLit = createForClass('org.waveprotocol.wave.model.conversation.', 'WaveletBasedConversationBlip$5'), Lorg_waveprotocol_wave_model_conversation_WaveletBasedConversationBlip$6_2_classLit = createForClass('org.waveprotocol.wave.model.conversation.', 'WaveletBasedConversationBlip$6'), Lorg_waveprotocol_wave_model_document_indexed_IndexedDocumentImpl$9_2_classLit = createForClass('org.waveprotocol.wave.model.document.indexed.', 'IndexedDocumentImpl$9'), Lorg_waveprotocol_wave_model_document_indexed_IndexedDocumentImpl$9$1_2_classLit = createForClass('org.waveprotocol.wave.model.document.indexed.', 'IndexedDocumentImpl$9$1'), Lorg_waveprotocol_wave_model_document_operation_algorithm_Composer$ReplaceAttributesPostTarget_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'Composer$ReplaceAttributesPostTarget'), Lorg_waveprotocol_wave_model_document_operation_algorithm_Decomposer$Target_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'Decomposer$Target'), Lorg_waveprotocol_wave_model_document_operation_algorithm_DocOpInverter_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'DocOpInverter'), Lorg_waveprotocol_wave_model_document_operation_algorithm_DocOpInverter$1_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'DocOpInverter$1'), Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$RangeCache_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'InsertionNoninsertionTransformer$RangeCache'), Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$Target_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'InsertionNoninsertionTransformer$Target'), Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$InsertionTarget_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'InsertionNoninsertionTransformer$InsertionTarget'), Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$NoninsertionTarget_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'InsertionNoninsertionTransformer$NoninsertionTarget'), Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$NoninsertionTarget$DeleteCharactersCache_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'InsertionNoninsertionTransformer$NoninsertionTarget$DeleteCharactersCache'), Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$NoninsertionTarget$DeleteElementStartCache_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'InsertionNoninsertionTransformer$NoninsertionTarget$DeleteElementStartCache'), Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$NoninsertionTarget$ReplaceAttributesCache_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'InsertionNoninsertionTransformer$NoninsertionTarget$ReplaceAttributesCache'), Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$NoninsertionTarget$UpdateAttributesCache_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'InsertionNoninsertionTransformer$NoninsertionTarget$UpdateAttributesCache'), Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$NoninsertionTarget$1_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'InsertionNoninsertionTransformer$NoninsertionTarget$1'), Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionNoninsertionTransformer$NoninsertionTarget$2_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'InsertionNoninsertionTransformer$NoninsertionTarget$2'), Lorg_waveprotocol_wave_model_document_operation_algorithm_InsertionTransformer$Target_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'InsertionTransformer$Target'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$InternalTransformException_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$InternalTransformException'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$AnnotationTracker_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$AnnotationTracker'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$RangeCache_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$RangeCache'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$DeleteCharactersResolver_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$DeleteCharactersResolver'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$DeleteElementStartResolver_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$DeleteElementStartResolver'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$ReplaceAttributesResolver_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$ReplaceAttributesResolver'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$UpdateAttributesResolver_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$UpdateAttributesResolver'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$Target_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$Target'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$Target$DeleteCharactersCache_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$Target$DeleteCharactersCache'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$Target$DeleteElementStartCache_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$Target$DeleteElementStartCache'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$Target$DeleteElementEndCache_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$Target$DeleteElementEndCache'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$Target$ReplaceAttributesCache_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$Target$ReplaceAttributesCache'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$Target$UpdateAttributesCache_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$Target$UpdateAttributesCache'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$Target$1_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$Target$1'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$1_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$1'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$2_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$2'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$3_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$3'), Lorg_waveprotocol_wave_model_document_operation_algorithm_NoninsertionTransformer$4_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'NoninsertionTransformer$4'), Lorg_waveprotocol_wave_model_document_operation_algorithm_PositionTracker_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'PositionTracker'), Lorg_waveprotocol_wave_model_document_operation_algorithm_PositionTracker$1_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'PositionTracker$1'), Lorg_waveprotocol_wave_model_document_operation_algorithm_PositionTracker$2_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.algorithm.', 'PositionTracker$2'), Lorg_waveprotocol_wave_model_document_operation_impl_OperationComponents$ReplaceAttributes_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.impl.', 'OperationComponents$ReplaceAttributes'), Lorg_waveprotocol_wave_model_document_operation_Nindo$ReplaceAttributes_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.', 'Nindo$ReplaceAttributes'), Lorg_waveprotocol_wave_model_document_operation_Nindo$2_2_classLit = createForClass('org.waveprotocol.wave.model.document.operation.', 'Nindo$2'), Lorg_waveprotocol_wave_model_document_util_GenericRangedAnnotationIterable_2_classLit = createForClass('org.waveprotocol.wave.model.document.util.', 'GenericRangedAnnotationIterable'), Lorg_waveprotocol_wave_model_document_util_GenericRangedAnnotationIterable$GenericRangedAnnotationIterator_2_classLit = createForClass('org.waveprotocol.wave.model.document.util.', 'GenericRangedAnnotationIterable$GenericRangedAnnotationIterator'), Lorg_waveprotocol_wave_model_document_util_GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$KeyEntry_2_classLit = createForClass('org.waveprotocol.wave.model.document.util.', 'GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$KeyEntry'), Lorg_waveprotocol_wave_model_document_util_GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$1_2_classLit = createForClass('org.waveprotocol.wave.model.document.util.', 'GenericRangedAnnotationIterable$GenericRangedAnnotationIterator$1'), Lorg_waveprotocol_wave_model_document_util_LineContainers$Rounding_2_classLit = createForEnum('org.waveprotocol.wave.model.document.util.', 'LineContainers$Rounding', Ljava_lang_Enum_2_classLit, values_72, valueOf_78), _3Lorg_waveprotocol_wave_model_document_util_LineContainers$Rounding_2_classLit = createForArray('[Lorg.waveprotocol.wave.model.document.util.', 'LineContainers$Rounding;', Lorg_waveprotocol_wave_model_document_util_LineContainers$Rounding_2_classLit), Lorg_waveprotocol_wave_model_document_util_LineContainers$RoundDirection_2_classLit = createForEnum('org.waveprotocol.wave.model.document.util.', 'LineContainers$RoundDirection', Ljava_lang_Enum_2_classLit, values_71, valueOf_77), _3Lorg_waveprotocol_wave_model_document_util_LineContainers$RoundDirection_2_classLit = createForArray('[Lorg.waveprotocol.wave.model.document.util.', 'LineContainers$RoundDirection;', Lorg_waveprotocol_wave_model_document_util_LineContainers$RoundDirection_2_classLit), Lorg_waveprotocol_wave_model_document_util_Range_2_classLit = createForClass('org.waveprotocol.wave.model.document.util.', 'Range'), Lorg_waveprotocol_wave_model_document_util_RangeTracker_2_classLit = createForClass('org.waveprotocol.wave.model.document.util.', 'RangeTracker'), Lorg_waveprotocol_wave_model_document_util_RangedAnnotationImpl_2_classLit = createForClass('org.waveprotocol.wave.model.document.util.', 'RangedAnnotationImpl'), Lorg_waveprotocol_wave_model_document_util_TextLocator$PredicateBoundaryLocator_2_classLit = createForClass('org.waveprotocol.wave.model.document.util.', 'TextLocator$PredicateBoundaryLocator'), Lorg_waveprotocol_wave_model_document_util_TextLocator$1_2_classLit = createForClass('org.waveprotocol.wave.model.document.util.', 'TextLocator$1'), Lorg_waveprotocol_wave_model_document_util_TextLocator$2_2_classLit = createForClass('org.waveprotocol.wave.model.document.util.', 'TextLocator$2'), Lorg_waveprotocol_wave_model_document_util_TextLocator$3_2_classLit = createForClass('org.waveprotocol.wave.model.document.util.', 'TextLocator$3'), Lorg_waveprotocol_wave_model_document_util_TextLocator$4_2_classLit = createForClass('org.waveprotocol.wave.model.document.util.', 'TextLocator$4'), Lorg_waveprotocol_wave_model_document_util_XmlStringBuilder$1_2_classLit = createForClass('org.waveprotocol.wave.model.document.util.', 'XmlStringBuilder$1'), Lorg_waveprotocol_wave_model_document_AnnotationBehaviour$CursorDirection_2_classLit = createForEnum('org.waveprotocol.wave.model.document.', 'AnnotationBehaviour$CursorDirection', Ljava_lang_Enum_2_classLit, values_59, valueOf_65), _3Lorg_waveprotocol_wave_model_document_AnnotationBehaviour$CursorDirection_2_classLit = createForArray('[Lorg.waveprotocol.wave.model.document.', 'AnnotationBehaviour$CursorDirection;', Lorg_waveprotocol_wave_model_document_AnnotationBehaviour$CursorDirection_2_classLit), Lorg_waveprotocol_wave_model_operation_wave_RemoveParticipant_2_classLit = createForClass('org.waveprotocol.wave.model.operation.wave.', 'RemoveParticipant'), Lorg_waveprotocol_wave_model_operation_OperationPair_2_classLit = createForClass('org.waveprotocol.wave.model.operation.', 'OperationPair'), Lorg_waveprotocol_wave_model_operation_TransformException_2_classLit = createForClass('org.waveprotocol.wave.model.operation.', 'TransformException'), Lorg_waveprotocol_wave_model_richtext_RichTextMutationBuilder_2_classLit = createForClass('org.waveprotocol.wave.model.richtext.', 'RichTextMutationBuilder'), Lorg_waveprotocol_wave_model_richtext_RichTextTokenizer$Type_2_classLit = createForEnum('org.waveprotocol.wave.model.richtext.', 'RichTextTokenizer$Type', Ljava_lang_Enum_2_classLit, values_74, valueOf_80), _3Lorg_waveprotocol_wave_model_richtext_RichTextTokenizer$Type_2_classLit = createForArray('[Lorg.waveprotocol.wave.model.richtext.', 'RichTextTokenizer$Type;', Lorg_waveprotocol_wave_model_richtext_RichTextTokenizer$Type_2_classLit), Lorg_waveprotocol_wave_model_richtext_RichTextTokenizer$Type$TypeGroup_2_classLit = createForEnum('org.waveprotocol.wave.model.richtext.', 'RichTextTokenizer$Type$TypeGroup', Ljava_lang_Enum_2_classLit, values_75, valueOf_81), _3Lorg_waveprotocol_wave_model_richtext_RichTextTokenizer$Type$TypeGroup_2_classLit = createForArray('[Lorg.waveprotocol.wave.model.richtext.', 'RichTextTokenizer$Type$TypeGroup;', Lorg_waveprotocol_wave_model_richtext_RichTextTokenizer$Type$TypeGroup_2_classLit), Lorg_waveprotocol_wave_model_richtext_RichTextTokenizerImpl_2_classLit = createForClass('org.waveprotocol.wave.model.richtext.', 'RichTextTokenizerImpl'), Lorg_waveprotocol_wave_model_richtext_RichTextTokenizerImpl$Token_2_classLit = createForClass('org.waveprotocol.wave.model.richtext.', 'RichTextTokenizerImpl$Token'), Lorg_waveprotocol_wave_model_richtext_RichTextTokenizerImpl$StyleTokenExtractor_2_classLit = createForClass('org.waveprotocol.wave.model.richtext.', 'RichTextTokenizerImpl$StyleTokenExtractor'), Lorg_waveprotocol_wave_model_undo_UndoManagerImpl_2_classLit = createForClass('org.waveprotocol.wave.model.undo.', 'UndoManagerImpl'), Lorg_waveprotocol_wave_model_undo_UndoManagerImpl$Checkpointer_2_classLit = createForClass('org.waveprotocol.wave.model.undo.', 'UndoManagerImpl$Checkpointer'), Lorg_waveprotocol_wave_model_undo_UndoStack_2_classLit = createForClass('org.waveprotocol.wave.model.undo.', 'UndoStack'), Lorg_waveprotocol_wave_model_undo_UndoStack$StackEntry_2_classLit = createForClass('org.waveprotocol.wave.model.undo.', 'UndoStack$StackEntry');
$entry(onLoad_0)();
