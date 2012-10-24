function $runCallbacks(){
  var next;
  while (callbacksHead) {
    next = callbacksHead;
    callbacksHead = callbacksHead.next;
    !callbacksHead && (callbacksTail = null);
    $onSuccess(next.callback);
  }
}

function AsyncLoader1_0(){
}

function onLoad(){
  instance_2 = new AsyncLoader1_0;
  $fragmentHasLoaded(($clinit_21() , BROWSER_LOADER), 1);
  !!$stats && $stats($createStatsEvent('runCallbacks1', 'begin', -1, -1));
  instance_2.runCallbacks();
  !!$stats && $stats($createStatsEvent('runCallbacks1', 'end', -1, -1));
}

function AsyncLoader1(){
}

_ = AsyncLoader1_0.prototype = AsyncLoader1.prototype = new Object_0;
_.getClass$ = function getClass_129(){
  return Lcom_google_gwt_lang_asyncloaders_AsyncLoader1_2_classLit;
}
;
_.runCallbacks = function runCallbacks(){
  $runCallbacks();
}
;
_.castableTypeMap$ = {};
function runAsync_0(callback){
  var newCallback;
  newCallback = new AsyncLoader2__Callback_0;
  newCallback.callback = callback;
  !!callbacksTail_0 && (callbacksTail_0.next = newCallback);
  callbacksTail_0 = newCallback;
  !callbacksHead_0 && (callbacksHead_0 = newCallback);
  if (instance_3) {
    instance_3.runCallbacks();
    return;
  }
  !!($clinit_21() , BROWSER_LOADER).pendingDownloadErrorHandlers[2] || $inject(BROWSER_LOADER, 2, new AsyncLoader2$1_0);
}

function runCallbackOnFailures_0(e){
  while (callbacksHead_0) {
    $onFailure(e);
    callbacksHead_0 = callbacksHead_0.next;
  }
  callbacksTail_0 = null;
}

function AsyncLoader2$1_0(){
}

function AsyncLoader2$1(){
}

_ = AsyncLoader2$1_0.prototype = AsyncLoader2$1.prototype = new Object_0;
_.getClass$ = function getClass_133(){
  return Lcom_google_gwt_lang_asyncloaders_AsyncLoader2$1_2_classLit;
}
;
_.loadTerminated = function loadTerminated_1(reason){
  runCallbackOnFailures_0(reason);
}
;
_.castableTypeMap$ = {70:1};
function AsyncLoader2__Callback_0(){
}

function AsyncLoader2__Callback(){
}

_ = AsyncLoader2__Callback_0.prototype = AsyncLoader2__Callback.prototype = new Object_0;
_.getClass$ = function getClass_134(){
  return Lcom_google_gwt_lang_asyncloaders_AsyncLoader2_1_1Callback_2_classLit;
}
;
_.castableTypeMap$ = {};
_.callback = null;
_.next = null;
function $createRenderer(this$static){
  var docRenderer, pager, rules, monitor_0;
  pager = !this$static.queueRenderer?(this$static.queueRenderer = $createBlipQueueRenderer(this$static)):this$static.queueRenderer;
  docRenderer = new StageTwo$DefaultProvider$9_0(pager);
  rules = new FullDomRenderer_0(!this$static.blipDetailer?(this$static.blipDetailer = new UndercurrentShallowBlipRenderer_0(!this$static.profileManager?(this$static.profileManager = new ProfileManagerImpl_0):this$static.profileManager, !this$static.supplement?(this$static.supplement = $createSupplement(this$static)):this$static.supplement)):this$static.blipDetailer, docRenderer, !this$static.profileManager?(this$static.profileManager = new ProfileManagerImpl_0):this$static.profileManager, !this$static.viewIdMapper?(this$static.viewIdMapper = new ViewIdMapper_0(new ModelIdMapperImpl_0(!this$static.conversations?(this$static.conversations = create_55(!this$static.wave?(this$static.wave = $createWave(this$static)):this$static.wave, !this$static.idGenerator?(this$static.idGenerator = $createIdGenerator(this$static)):this$static.idGenerator)):this$static.conversations))):this$static.viewIdMapper, !this$static.threadReadStateMonitor?(this$static.threadReadStateMonitor = (monitor_0 = new ThreadReadStateMonitorImpl_0(!this$static.supplement?(this$static.supplement = $createSupplement(this$static)):this$static.supplement, !this$static.conversations?(this$static.conversations = create_55(!this$static.wave?(this$static.wave = $createWave(this$static)):this$static.wave, !this$static.idGenerator?(this$static.idGenerator = $createIdGenerator(this$static)):this$static.idGenerator)):this$static.conversations) , $init_4(monitor_0) , monitor_0)):this$static.threadReadStateMonitor);
  return new HtmlDomRenderer_0(new ReductionBasedRenderer_0(rules, of_7(!this$static.conversations?(this$static.conversations = create_55(!this$static.wave?(this$static.wave = $createWave(this$static)):this$static.wave, !this$static.idGenerator?(this$static.idGenerator = $createIdGenerator(this$static)):this$static.idGenerator)):this$static.conversations)));
}

function $install_1(this$static){
  var e;
  $install_4(!this$static.diffController?(this$static.diffController = new DiffController_0(!this$static.conversations?(this$static.conversations = create_55(!this$static.wave?(this$static.wave = $createWave(this$static)):this$static.wave, !this$static.idGenerator?(this$static.idGenerator = $createIdGenerator(this$static)):this$static.idGenerator)):this$static.conversations, !this$static.supplement?(this$static.supplement = $createSupplement(this$static)):this$static.supplement, !this$static.documentRegistry?(this$static.documentRegistry = $createDocumentRegistry()):this$static.documentRegistry, !this$static.modelAsView?(this$static.modelAsView = new ModelAsViewProviderImpl_0(!this$static.viewIdMapper?(this$static.viewIdMapper = new ViewIdMapper_0(new ModelIdMapperImpl_0(!this$static.conversations?(this$static.conversations = create_55(!this$static.wave?(this$static.wave = $createWave(this$static)):this$static.wave, !this$static.idGenerator?(this$static.idGenerator = $createIdGenerator(this$static)):this$static.idGenerator)):this$static.conversations))):this$static.viewIdMapper, this$static.stageOne.getDomAsViewProvider())):this$static.modelAsView)):this$static.diffController);
  $setRenderer_0(this$static.stageOne.getDomAsViewProvider(), !this$static.renderer?(this$static.renderer = $createRenderer(this$static)):this$static.renderer);
  e = $render_17(!this$static.renderer?(this$static.renderer = $createRenderer(this$static)):this$static.renderer, !this$static.conversations?(this$static.conversations = create_55(!this$static.wave?(this$static.wave = $createWave(this$static)):this$static.wave, !this$static.idGenerator?(this$static.idGenerator = $createIdGenerator(this$static)):this$static.idGenerator)):this$static.conversations);
  $init_6(this$static.stageOne.getWavePanel(), e);
  this$static.reader = install_8(!this$static.supplement?(this$static.supplement = $createSupplement(this$static)):this$static.supplement, this$static.stageOne.getFocusFrame(), !this$static.modelAsView?(this$static.modelAsView = new ModelAsViewProviderImpl_0(!this$static.viewIdMapper?(this$static.viewIdMapper = new ViewIdMapper_0(new ModelIdMapperImpl_0(!this$static.conversations?(this$static.conversations = create_55(!this$static.wave?(this$static.wave = $createWave(this$static)):this$static.wave, !this$static.idGenerator?(this$static.idGenerator = $createIdGenerator(this$static)):this$static.idGenerator)):this$static.conversations))):this$static.viewIdMapper, this$static.stageOne.getDomAsViewProvider())):this$static.modelAsView, !this$static.documentRegistry?(this$static.documentRegistry = $createDocumentRegistry()):this$static.documentRegistry);
  !this$static.connector?(this$static.connector = new UndercurrentHarness$1$3$1_0):this$static.connector;
}

function StageTwo$DefaultProvider(){
}

_ = StageTwo$DefaultProvider.prototype = new AsyncHolder$Impl;
_.create = function create_8(whenReady){
  var synchronizer;
  $add_21(this.val$timeline, 'stage2_start');
  synchronizer = new CountdownLatch_0(new StageTwo$DefaultProvider$1_0(this, whenReady));
  $fetchWave(this, new StageTwo$DefaultProvider$2_0(this, synchronizer));
  !instance_7 && (instance_7 = new BrowserBackedScheduler_0 , setDefaultTimerService() , undefined);
  $scheduleDelayed_0(medium, new StageTwo$DefaultProvider$3_0(synchronizer), 20);
}
;
_.getClass$ = function getClass_325(){
  return Lorg_waveprotocol_wave_client_StageTwo$DefaultProvider_2_classLit;
}
;
_.castableTypeMap$ = {176:1, 182:1};
_.blipDetailer = null;
_.connector = null;
_.conversations = null;
_.diffController = null;
_.documentRegistry = null;
_.idGenerator = null;
_.modelAsView = null;
_.profileManager = null;
_.queueRenderer = null;
_.reader = null;
_.renderer = null;
_.sessionId = null;
_.signedInuser = null;
_.stageOne = null;
_.supplement = null;
_.threadReadStateMonitor = null;
_.viewIdMapper = null;
_.wave = null;
_.waveData = null;
_.wavelets = null;
function $execute(this$static){
  $install_1(this$static.this$1);
  $add_21(this$static.this$1.val$timeline, 'stage2_end');
  $use(this$static.val$whenReady, this$static.this$1);
}

function StageTwo$DefaultProvider$1_0(this$1, val$whenReady){
  this.this$1 = this$1;
  this.val$whenReady = val$whenReady;
}

function StageTwo$DefaultProvider$1(){
}

_ = StageTwo$DefaultProvider$1_0.prototype = StageTwo$DefaultProvider$1.prototype = new Object_0;
_.execute_0 = function execute_12(){
  $execute(this);
}
;
_.getClass$ = function getClass_326(){
  return Lorg_waveprotocol_wave_client_StageTwo$DefaultProvider$1_2_classLit;
}
;
_.castableTypeMap$ = {42:1, 52:1};
_.this$1 = null;
_.val$whenReady = null;
function StageTwo$DefaultProvider$2_0(this$1, val$synchronizer){
  this.this$1 = this$1;
  this.val$synchronizer = val$synchronizer;
}

function StageTwo$DefaultProvider$2(){
}

_ = StageTwo$DefaultProvider$2_0.prototype = StageTwo$DefaultProvider$2.prototype = new Object_0;
_.getClass$ = function getClass_328(){
  return Lorg_waveprotocol_wave_client_StageTwo$DefaultProvider$2_2_classLit;
}
;
_.use = function use_0(x){
  this.this$1.waveData = dynamicCast(x, 173);
  $tick(this.val$synchronizer);
}
;
_.castableTypeMap$ = {182:1};
_.this$1 = null;
_.val$synchronizer = null;
function StageTwo$DefaultProvider$3_0(val$synchronizer){
  this.val$synchronizer = val$synchronizer;
}

function StageTwo$DefaultProvider$3(){
}

_ = StageTwo$DefaultProvider$3_0.prototype = StageTwo$DefaultProvider$3.prototype = new Object_0;
_.execute_0 = function execute_13(){
  $clinit_1533();
  $clinit_735();
  $tick(this.val$synchronizer);
}
;
_.getClass$ = function getClass_329(){
  return Lorg_waveprotocol_wave_client_StageTwo$DefaultProvider$3_2_classLit;
}
;
_.castableTypeMap$ = {252:1, 253:1};
_.val$synchronizer = null;
function StageTwo$DefaultProvider$9_0(val$pager){
  this.val$pager = val$pager;
}

function StageTwo$DefaultProvider$9(){
}

_ = StageTwo$DefaultProvider$9_0.prototype = StageTwo$DefaultProvider$9.prototype = new Object_0;
_.getClass$ = function getClass_333(){
  return Lorg_waveprotocol_wave_client_StageTwo$DefaultProvider$9_2_classLit;
}
;
_.castableTypeMap$ = {};
_.val$pager = null;
function $onSuccess(this$static){
  $call($createStageTwoLoader(this$static.this$0, this$static.val$one), new Stages$3$1_0(this$static));
}

function Stages$3$1_0(this$1){
  this.this$1 = this$1;
}

function Stages$3$1(){
}

_ = Stages$3$1_0.prototype = Stages$3$1.prototype = new Object_0;
_.getClass$ = function getClass_340(){
  return Lorg_waveprotocol_wave_client_Stages$3$1_2_classLit;
}
;
_.use = function use_3(x){
  runAsync_0(new Stages$4_0(this.this$1.this$0, dynamicCast(x, 176)));
}
;
_.castableTypeMap$ = {182:1};
_.this$1 = null;
function Stages$4_0(this$0, val$two){
  this.this$0 = this$0;
  this.val$two = val$two;
}

function Stages$4(){
}

_ = Stages$4_0.prototype = Stages$4.prototype = new Stages$SimpleAsyncCallback;
_.getClass$ = function getClass_341(){
  return Lorg_waveprotocol_wave_client_Stages$4_2_classLit;
}
;
_.castableTypeMap$ = {};
_.this$0 = null;
_.val$two = null;
function $tick(this$static){
  checkState(this$static.count > 0);
  --this$static.count;
  this$static.count == 0 && $execute(this$static.whenZero);
}

function CountdownLatch_0(whenZero){
  this.whenZero = whenZero;
  this.count = 2;
}

function CountdownLatch(){
}

_ = CountdownLatch_0.prototype = CountdownLatch.prototype = new Object_0;
_.getClass$ = function getClass_356(){
  return Lorg_waveprotocol_wave_client_common_util_CountdownLatch_2_classLit;
}
;
_.castableTypeMap$ = {};
_.count = 0;
_.whenZero = null;
function $reduceInner(keys, values, initial, proc){
  var reduction = initial;
  for (var k in values) {
    reduction = proc.apply_12(reduction, keys[k], values[k]);
  }
  return reduction;
}

_ = JsIdentityMap.prototype;
_.reduce = function reduce(initial, proc){
  return $reduceInner(this.keys, this.values, initial, proc);
}
;
_ = MutableDocumentImpl.prototype;
_.appendXml = function appendXml(xml){
  return $insertXml(this, new Point$El_0(this.doc.substrate.getDocumentElement(), null), xml);
}
;
_ = IndexedDocumentImpl.prototype;
_.asOperation = function asOperation(){
  return $asOperation(this);
}
;
function $render_1(this$static){
  var c, conversations;
  conversations = ($clinit_2309() , defaultCollectionFactory.createIdentityMap());
  c = this$static.structure.mainConversation;
  !!c && conversations.put_0(c, $render_2(this$static, c));
  return conversations.isEmpty()?null:dynamicCast(conversations.reduce(null, new FullDomRenderer$1_0), 16);
}

function ReductionBasedRenderer_0(builders, structure){
  this.builders = builders;
  this.structure = structure;
}

function ReductionBasedRenderer(){
}

_ = ReductionBasedRenderer_0.prototype = ReductionBasedRenderer.prototype = new Object_0;
_.getClass$ = function getClass_772(){
  return Lorg_waveprotocol_wave_client_render_ReductionBasedRenderer_2_classLit;
}
;
_.castableTypeMap$ = {};
_.builders = null;
_.structure = null;
function $createStageTwoLoader(this$static, one){
  return new UndercurrentHarness$1$3_0(one, this$static.val$timeline);
}

function $fetchWave(this$static, whenReady){
  var fake;
  $add_21(this$static.val$timeline, 'fakewave_start');
  fake = create_29(!this$static.documentRegistry?(this$static.documentRegistry = $createDocumentRegistry()):this$static.documentRegistry);
  $add_21(this$static.val$timeline, 'fakewave_end');
  whenReady.this$1.waveData = fake;
  $tick(whenReady.val$synchronizer);
}

function UndercurrentHarness$1$3_0($anonymous0, val$timeline){
  this.val$timeline = val$timeline;
  this.stageOne = $anonymous0;
}

function UndercurrentHarness$1$3(){
}

_ = UndercurrentHarness$1$3_0.prototype = UndercurrentHarness$1$3.prototype = new StageTwo$DefaultProvider;
_.getClass$ = function getClass_806(){
  return Lorg_waveprotocol_wave_client_testing_UndercurrentHarness$1$3_2_classLit;
}
;
_.castableTypeMap$ = {176:1, 182:1};
_.val$timeline = null;
function UndercurrentHarness$1$3$1_0(){
}

function UndercurrentHarness$1$3$1(){
}

_ = UndercurrentHarness$1$3$1_0.prototype = UndercurrentHarness$1$3$1.prototype = new Object_0;
_.getClass$ = function getClass_807(){
  return Lorg_waveprotocol_wave_client_testing_UndercurrentHarness$1$3$1_2_classLit;
}
;
_.castableTypeMap$ = {};
function create_29(docFactory){
  var copied, copier, newData, p, p$iterator, sampleData, src, src$iterator, c, docFactory_0, gen, root, sampleAuthor, v, wave, waveData, waveletDataFactory, waveletFactory, convView, d, d_0, d_1, rootWavelet_0;
  sampleData = (sampleAuthor = ofUnsafe('nobody@example.com') , gen = new IdGeneratorImpl_0('example.com', new FakeIdGenerator$1_0) , waveData = new WaveViewDataImpl_0(of_8(gen.defaultDomain, $newId(gen, 'w'))) , docFactory_0 = ($clinit_2285() , new FakeDocument$Factory_0(schemas_0)) , waveletDataFactory = new UndercurrentHarness$WaveFactory$1_0(docFactory_0, waveData) , waveletFactory = $build_6($with_1($with_0(($clinit_2294() , new OpBasedWaveletFactory$Builder_0(schemas_0)), waveletDataFactory), sampleAuthor)) , wave = new WaveViewImpl_0(waveletFactory, waveData.id_0, gen, sampleAuthor, $clinit_2432()) , v = ($serialiseWaveId(wave.waveId) , convView = new WaveBasedConversationView_0(wave, gen) , $add_31(wave.listeners, convView) , convView) , c = (rootWavelet_0 = $createRoot_0(v.waveView) , $clinit_1723() , getOrCreateFirstTopLevelElement($getDocument_5(rootWavelet_0, 'conversation'), ($clinit_2095() , ABSENT)) , dynamicCast(v.conversations.get(rootWavelet_0), 371)) , root = c.rootThread , sampleReply((root.isUsable || illegalState('Deleted thread is not usable: ' + root) , $appendBlipWithContent(root))) , d = (root.isUsable || illegalState('Deleted thread is not usable: ' + root) , $appendBlipWithContent(root)).blip.blip.content_0.getMutableDocument() , d.emptyElement(dynamicCast(d.getDocumentElement(), 260)) , d.appendXml(innerXml($parse_1(($clinit_2112() , '<body><line><\/line>Hello World<\/body>')))) , d_0 = (root.isUsable || illegalState('Deleted thread is not usable: ' + root) , $appendBlipWithContent(root)).blip.blip.content_0.getMutableDocument() , d_0.emptyElement(dynamicCast(d_0.getDocumentElement(), 260)) , d_0.appendXml(innerXml($parse_1('<body><line><\/line>Hello World<\/body>'))) , d_1 = (root.isUsable || illegalState('Deleted thread is not usable: ' + root) , $appendBlipWithContent(root)).blip.blip.content_0.getMutableDocument() , d_1.emptyElement(dynamicCast(d_1.getDocumentElement(), 260)) , d_1.appendXml(innerXml($parse_1('<body><line><\/line>Hello World<\/body>'))) , waveData);
  newData = new WaveViewDataImpl_0(sampleData.id_0);
  copier = new WaveletDataImpl$Factory_0(docFactory);
  for (src$iterator = ($clinit_480() , new Collections$UnmodifiableCollection_0($values(sampleData.wavelets))).iterator_0(); src$iterator.hasNext();) {
    src = dynamicCast(src$iterator.next_0(), 172);
    copied = $create_5(copier, src);
    for (p$iterator = (new Collections$UnmodifiableSet_0(src.participants)).iterator_0(); p$iterator.hasNext();) {
      p = dynamicCast(p$iterator.next_0(), 164);
      $addParticipant_0(copied, p);
    }
    $setVersion(copied, copied.version);
    $setHashedVersion(copied, src.hashedVersion);
    $setLastModifiedTime_0(copied, src.lastModifiedTime);
    $addWavelet(newData, copied);
  }
  return newData;
}

function sampleReply(blip){
  var thread, d_0, d_1;
  d_1 = blip.blip.blip.content_0.getMutableDocument();
  d_1.emptyElement(dynamicCast(d_1.getDocumentElement(), 260));
  d_1.appendXml(innerXml($parse_1(($clinit_2112() , '<body><line><\/line>Hello World<\/body>'))));
  thread = $addReplyThread(blip, 8);
  d_0 = (thread.isUsable || illegalState('Deleted thread is not usable: ' + thread) , $appendBlipWithContent(thread)).blip.blip.content_0.getMutableDocument();
  d_0.emptyElement(dynamicCast(d_0.getDocumentElement(), 260));
  d_0.appendXml(innerXml($parse_1('<body><line><\/line>Hello World<\/body>')));
}

function UndercurrentHarness$WaveFactory$1_0(val$docFactory, val$waveData){
  this.val$docFactory = val$docFactory;
  this.val$waveData = val$waveData;
  this.inner = new WaveletDataImpl$Factory_0(this.val$docFactory);
}

function UndercurrentHarness$WaveFactory$1(){
}

_ = UndercurrentHarness$WaveFactory$1_0.prototype = UndercurrentHarness$WaveFactory$1.prototype = new Object_0;
_.create_3 = function create_30(data){
  var wavelet;
  return wavelet = $create_5(this.inner, data) , $addWavelet(this.val$waveData, wavelet) , wavelet;
}
;
_.getClass$ = function getClass_813(){
  return Lorg_waveprotocol_wave_client_testing_UndercurrentHarness$WaveFactory$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.val$docFactory = null;
_.val$waveData = null;
_ = DiffContentDocument.prototype;
_.asOperation = function asOperation_0(){
  return $asOperation(this.document_0.indexedDoc);
}
;
_ = MutableDocumentProxy.prototype;
_.appendXml = function appendXml_0(xml){
  return $appendXml(this.getDelegate(), xml);
}
;
_ = LazyContentDocument.prototype;
_.asOperation = function asOperation_1(){
  return dynamicCast(this.document_0?this.document_0:this.spec, 261).asOperation();
}
;
function $startReading(this$static, blip){
  checkState(!this$static.reading);
  this$static.reading = blip;
  $startAutoReading(this$static, this$static.reading);
}

function $stopReading(this$static, blip){
  checkState(!!this$static.reading);
  checkArgument(this$static.reading == blip);
  dynamicCast(this$static.delegate, 263).markAsRead(this$static.reading);
  this$static.autoRead.put_0(this$static.reading, new Double_0((new Date).getTime()));
  this$static.reading = null;
}

_ = SimpleDiffDoc.prototype;
_.asOperation = function asOperation_2(){
  return compose_1(this.state, this.diff?$composeAll(this.diff):null);
}
;
function $install_4(this$static){
  var conversation, conversation$iterator;
  depthFirst(this$static.suppress, this$static.wave);
  $add_31(this$static.wave.listeners, this$static);
  for (conversation$iterator = ($clinit_480() , new Collections$UnmodifiableCollection_0($values(this$static.wave.conversations))).iterator_0(); conversation$iterator.hasNext();) {
    conversation = dynamicCast(conversation$iterator.next_0(), 255);
    $add_31(conversation.listeners, this$static);
  }
  $addListener_1(this$static.supplement, this$static.supplementListener);
}

function $getNext_3(this$static, start){
  var blipUi;
  blipUi = $getNext_2(this$static.traverser, start);
  while (!!blipUi && !$isUnread(this$static.supplement, $blipOf_0(this$static.models.viewIdMapper, dynamicCast(blipUi.impl, 334).getId()))) {
    blipUi = $getNext_2(this$static.traverser, blipUi);
  }
  return blipUi;
}

function $getPrevious_1(this$static, start){
  var blipUi;
  blipUi = $getPrevious_0(this$static.traverser, start);
  while (!!blipUi && !$isUnread(this$static.supplement, $blipOf_0(this$static.models.viewIdMapper, dynamicCast(blipUi.impl, 334).getId()))) {
    blipUi = $getPrevious_0(this$static.traverser, blipUi);
  }
  return blipUi;
}

function Reader_0(supplement, models, documents, traverser){
  this.supplement = supplement;
  this.models = models;
  this.documents = documents;
  this.traverser = traverser;
}

function install_8(supplement, focus_0, models, documents){
  var reader, traverser;
  traverser = new ViewTraverser_0;
  reader = new Reader_0(supplement, models, documents, traverser);
  focus_0.order = reader;
  $add_31(focus_0.listeners, reader);
  return reader;
}

function Reader(){
}

_ = Reader_0.prototype = Reader.prototype = new Object_0;
_.getClass$ = function getClass_870(){
  return Lorg_waveprotocol_wave_client_wavepanel_impl_reader_Reader_2_classLit;
}
;
_.getNext = function getNext(start){
  return $getNext_3(this, start);
}
;
_.getPrevious = function getPrevious(start){
  return $getPrevious_1(this, start);
}
;
_.onFocusMoved = function onFocusMoved_0(oldUi, newUi){
  var document_0, newBlip, oldBlip;
  if (oldUi) {
    oldBlip = $blipOf_0(this.models.viewIdMapper, dynamicCast(oldUi.impl, 334).getId());
    document_0 = dynamicCast($get_19(this.documents, oldBlip), 275);
    if (oldBlip) {
      $stopReading(this.supplement, oldBlip);
      checkState_1(document_0.diffsRetained, initValues(_3Ljava_lang_Object_2_classLit, {9:1, 68:1}, 0, [($clinit_428() , document_0.diffsSuppressed?TRUE_0:FALSE_0), document_0.diffsRetained?TRUE_0:FALSE_0]));
      document_0.diffsRetained = false;
      $clearDiffs(document_0);
    }
  }
  if (newUi) {
    newBlip = $blipOf_0(this.models.viewIdMapper, dynamicCast(newUi.impl, 334).getId());
    document_0 = dynamicCast($get_19(this.documents, newBlip), 275);
    if (newBlip) {
      checkState_1(!document_0.diffsRetained, initValues(_3Ljava_lang_Object_2_classLit, {9:1, 68:1}, 0, [($clinit_428() , document_0.diffsSuppressed?TRUE_0:FALSE_0), document_0.diffsRetained?TRUE_0:FALSE_0]));
      document_0.diffsRetained = true;
      $startReading(this.supplement, newBlip);
    }
  }
}
;
_.castableTypeMap$ = {284:1};
_.documents = null;
_.models = null;
_.supplement = null;
_.traverser = null;
function FullDomRenderer_0(blipPopulator, docRenderer, profileManager, viewIdMapper, readMonitor){
  this.blipPopulator = blipPopulator;
  this.docRenderer = docRenderer;
  this.profileManager = profileManager;
  this.viewIdMapper = viewIdMapper;
  this.readMonitor = readMonitor;
}

function FullDomRenderer(){
}

_ = FullDomRenderer_0.prototype = FullDomRenderer.prototype = new Object_0;
_.getClass$ = function getClass_916(){
  return Lorg_waveprotocol_wave_client_wavepanel_render_FullDomRenderer_2_classLit;
}
;
_.castableTypeMap$ = {};
_.blipPopulator = null;
_.docRenderer = null;
_.profileManager = null;
_.readMonitor = null;
_.viewIdMapper = null;
function $apply_20(soFar, item){
  return !soFar?item:soFar;
}

function $apply_21(soFar, key, item){
  return $apply_20(dynamicCast(soFar, 16), (dynamicCast(key, 249) , dynamicCast(item, 16)));
}

function FullDomRenderer$1_0(){
}

function FullDomRenderer$1(){
}

_ = FullDomRenderer$1_0.prototype = FullDomRenderer$1.prototype = new Object_0;
_.apply_12 = function apply_71(soFar, key, item){
  return $apply_20(dynamicCast(soFar, 16), (dynamicCast(key, 249) , dynamicCast(item, 16)));
}
;
_.getClass$ = function getClass_917(){
  return Lorg_waveprotocol_wave_client_wavepanel_render_FullDomRenderer$1_2_classLit;
}
;
_.castableTypeMap$ = {};
function $render_17(this$static){
  return $parseHtml($render_1(this$static.driver));
}

function HtmlDomRenderer_0(driver){
  this.driver = driver;
}

function HtmlDomRenderer(){
}

_ = HtmlDomRenderer_0.prototype = HtmlDomRenderer.prototype = new Object_0;
_.getClass$ = function getClass_923(){
  return Lorg_waveprotocol_wave_client_wavepanel_render_HtmlDomRenderer_2_classLit;
}
;
_.castableTypeMap$ = {};
_.driver = null;
function $setRenderer_0(this$static, renderer){
  checkArgument(!!renderer);
  checkState(!this$static.renderer);
  this$static.renderer = renderer;
}

function depthFirst(p, wave){
  var $e0;
  try {
    $apply_26(new BlipMappers$DepthFirst_0(p), wave);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (!instanceOf($e0, 361))
      throw $e0;
  }
}

function $apply_26(this$static, wave){
  var conversation, conversation$iterator;
  for (conversation$iterator = ($clinit_480() , new Collections$UnmodifiableCollection_0($values(wave.conversations))).iterator_0(); conversation$iterator.hasNext();) {
    conversation = dynamicCast(conversation$iterator.next_0(), 249);
    $apply_27(this$static, conversation.rootThread);
  }
}

function ConversationStructure_0(anchoring, mainConversation){
  this.anchoring = anchoring;
  this.mainConversation = mainConversation;
}

function addLazily(map, key, value){
  var list;
  list = dynamicCast(map.get(key), 363);
  if (!list) {
    list = ($clinit_2309() , defaultCollectionFactory.createQueue());
    map.put_0(key, list);
  }
  list.add_0(value);
}

function getMainConversation(view){
  var curr, curr$iterator, root;
  root = $getRoot(view);
  if (!root) {
    for (curr$iterator = ($clinit_480() , new Collections$UnmodifiableCollection_0($values(view.conversations))).iterator_0(); curr$iterator.hasNext();) {
      curr = dynamicCast(curr$iterator.next_0(), 249);
      if (!$isValidAnchor(curr, $getAnchorWaveletId(curr), dynamicCast($getAnchor(curr.manifest).anchor.second, 1))) {
        root = curr;
        break;
      }
    }
  }
  return root;
}

function of_7(wave){
  var anchor, anchoring, blip, conversation, conversation$iterator, mainConversation, unanchored;
  anchoring = null;
  unanchored = null;
  mainConversation = getMainConversation(wave);
  for (conversation$iterator = ($clinit_480() , new Collections$UnmodifiableCollection_0($values(wave.conversations))).iterator_0(); conversation$iterator.hasNext();) {
    conversation = dynamicCast(conversation$iterator.next_0(), 249);
    if (conversation == mainConversation) {
      continue;
    }
    anchor = $maybeMakeAnchor(conversation, $getAnchorWaveletId(conversation), dynamicCast($getAnchor(conversation.manifest).anchor.second, 1));
    blip = anchor?dynamicCast(anchor.anchor.second, 247):null;
    blip?addLazily(anchoring = anchoring?anchoring:($clinit_2309() , defaultCollectionFactory.createIdentityMap()), blip, conversation):(unanchored = unanchored?unanchored:($clinit_2309() , defaultCollectionFactory.createQueue())).add_0(conversation);
  }
  !anchoring && (anchoring = ($clinit_2309() , $clinit_2309() , EMPTY_1));
  return new ConversationStructure_0(anchoring, mainConversation);
}

function ConversationStructure(){
}

_ = ConversationStructure_0.prototype = ConversationStructure.prototype = new Object_0;
_.getClass$ = function getClass_1092(){
  return Lorg_waveprotocol_wave_model_conversation_ConversationStructure_2_classLit;
}
;
_.castableTypeMap$ = {};
_.anchoring = null;
_.mainConversation = null;
function getOrCreateFirstTopLevelElement(doc, expectation){
  var actualTag, firstElement, firstNode;
  firstNode = $getNodeAfter(doc.locate(0));
  if (expectation == ($clinit_2095() , PRESENT) && firstNode == null) {
    throw new IllegalArgumentException_1('Document has no top-level element');
  }
   else if (expectation == ABSENT && firstNode != null) {
    throw new IllegalArgumentException_1('Document already has top-level node: ' + firstNode);
  }
  if (firstNode == null) {
    return doc.createChildElement(doc.getDocumentElement(), 'conversation', ($clinit_1880() , EMPTY_MAP_0));
  }
   else {
    firstElement = doc.asElement_0(firstNode);
    if (firstElement == null) {
      throw new IllegalArgumentException_1('First node is not an element: ' + firstNode);
    }
    actualTag = doc.getTagName(firstElement);
    if ($equals_3('conversation', actualTag)) {
      return firstElement;
    }
     else {
      throw new RuntimeException_1('Document already has non-matching top-level element: ' + firstElement);
    }
  }
}

function $clinit_2095(){
  $clinit_2095 = nullMethod;
  NONE_4 = new DocHelper$Expectation_0('NONE', 0);
  ABSENT = new DocHelper$Expectation_0('ABSENT', 1);
  PRESENT = new DocHelper$Expectation_0('PRESENT', 2);
  $VALUES_70 = initValues(_3Lorg_waveprotocol_wave_model_document_util_DocHelper$Expectation_2_classLit, {9:1, 68:1, 170:1}, 152, [NONE_4, ABSENT, PRESENT]);
}

function DocHelper$Expectation_0(enum$name, enum$ordinal){
  this.name_1 = enum$name;
  this.ordinal = enum$ordinal;
}

function valueOf_77(name_0){
  $clinit_2095();
  return valueOf_0(($clinit_2096() , $MAP_70), name_0);
}

function values_71(){
  $clinit_2095();
  return $VALUES_70;
}

function DocHelper$Expectation(){
}

_ = DocHelper$Expectation_0.prototype = DocHelper$Expectation.prototype = new Enum;
_.getClass$ = function getClass_1365(){
  return Lorg_waveprotocol_wave_model_document_util_DocHelper$Expectation_2_classLit;
}
;
_.castableTypeMap$ = {9:1, 10:1, 65:1, 152:1};
var $VALUES_70, ABSENT, NONE_4, PRESENT;
function $clinit_2096(){
  $clinit_2096 = nullMethod;
  $MAP_70 = createValueOfMap(($clinit_2095() , $VALUES_70));
}

var $MAP_70;
function SilentOperationSink$Executor$1_0(val$target){
  this.val$target = val$target;
}

function SilentOperationSink$Executor$1(){
}

_ = SilentOperationSink$Executor$1_0.prototype = SilentOperationSink$Executor$1.prototype = new Object_0;
_.consume = function consume_11(op){
  var $e0, e;
  try {
    op.apply_7(this.val$target);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 189)) {
      e = $e0;
      throw new OperationRuntimeException_0('Operation failed in silent operation executor', e);
    }
     else 
      throw $e0;
  }
}
;
_.getClass$ = function getClass_1428(){
  return Lorg_waveprotocol_wave_model_operation_SilentOperationSink$Executor$1_2_classLit;
}
;
_.castableTypeMap$ = {};
_.val$target = null;
function $apply_45(this$static, wavelet){
  $doInternalApply(this$static, wavelet);
  $update_0(this$static, wavelet);
}

_ = WaveletOperation.prototype;
_.createVersionUpdateOp = function createVersionUpdateOp(versionIncrement, hashedVersion){
  return new VersionUpdateOp_0(this.context.creator, versionIncrement, hashedVersion);
}
;
function $doInternalApply(this$static, wavelet){
  var blip, newDocVersion, newWaveletVersion, oldDocVersion, oldHashedVersion;
  oldHashedVersion = wavelet.hashedVersion;
  if (this$static.docId != null) {
    blip = dynamicCast(wavelet.documents.get(this$static.docId), 473);
    newWaveletVersion = add_1(wavelet.version, this$static.context.versionIncrement);
    newDocVersion = this$static.useFixedDocInfo?this$static.docVersion:newWaveletVersion;
    oldDocVersion = $setLastModifiedVersion(blip, newDocVersion);
    return new VersionUpdateOp_2(this$static.context.creator, neg(this$static.context.versionIncrement), oldHashedVersion, this$static.docId, oldDocVersion, true);
  }
   else {
    return new VersionUpdateOp_0(this$static.context.creator, neg(this$static.context.versionIncrement), oldHashedVersion);
  }
}

function VersionUpdateOp_0(creator, versionIncrement, hashedVersion){
  VersionUpdateOp_2.call(this, creator, versionIncrement, hashedVersion, null, N1_longLit, false);
}

function VersionUpdateOp_1(creator, increment, hashedVersion, docId){
  VersionUpdateOp_2.call(this, creator, increment, hashedVersion, docId, N1_longLit, false);
}

function VersionUpdateOp_2(creator, versionIncrement, hashedVersion, docId, docVersion, useFixedBlipInfo){
  this.context = new WaveletOperationContext_1(creator, N1_longLit, versionIncrement, hashedVersion);
  checkNotNull_1(creator, 'Null participant ID');
  this.docId = docId;
  this.docVersion = docVersion;
  this.useFixedDocInfo = useFixedBlipInfo;
}

function VersionUpdateOp(){
}

_ = VersionUpdateOp_2.prototype = VersionUpdateOp_1.prototype = VersionUpdateOp_0.prototype = VersionUpdateOp.prototype = new WaveletOperation;
_.doApply = function doApply_1(wave){
  $doInternalApply(this, wave);
}
;
_.equals$ = function equals_65(obj){
  var other;
  if (!(obj != null && obj.castableTypeMap$ && !!obj.castableTypeMap$[451])) {
    return false;
  }
  other = dynamicCast(obj, 451);
  return $equals_3(this.docId, other.docId) && this.useFixedDocInfo == other.useFixedDocInfo && eq(this.docVersion, other.docVersion);
}
;
_.getClass$ = function getClass_1438(){
  return Lorg_waveprotocol_wave_model_operation_wave_VersionUpdateOp_2_classLit;
}
;
_.hashCode$ = function hashCode_64(){
  return (this.docId == null?0:getHashCode_0(this.docId)) ^ (this.useFixedDocInfo?0:1) ^ toInt(xor(this.docVersion, shru(this.docVersion, 32)));
}
;
_.toString$ = function toString_131(){
  return 'version update op, blip id ' + this.docId + ' blipVersion ' + toString_14(this.docVersion);
}
;
_.castableTypeMap$ = {451:1, 466:1};
_.docId = null;
_.docVersion = P0_longLit;
_.useFixedDocInfo = false;
_ = WaveletBlipOperation.prototype;
_.createVersionUpdateOp = function createVersionUpdateOp_0(versionIncrement, hashedVersion){
  return new VersionUpdateOp_1(this.context.creator, versionIncrement, hashedVersion, $updatesBlipMetadata(this.blipOp, this.blipId)?this.blipId:null);
}
;
function $getSchemaForId(this$static, waveletId, documentId){
  var provider, provider$iterator, result, value;
  result = null;
  for (provider$iterator = new Collections$UnmodifiableCollectionIterator_0(this$static.providers.coll.iterator_0()); provider$iterator.it.hasNext();) {
    provider = dynamicCast(provider$iterator.it.next_0(), 458);
    value = provider.getSchemaForId(waveletId, documentId);
    if (value != ($clinit_2009() , NO_SCHEMA_CONSTRAINTS)) {
      checkState_2(!result, 'Several different schemas apply to document');
      result = value;
    }
  }
  return !result?($clinit_2009() , NO_SCHEMA_CONSTRAINTS):result;
}

function SchemaCollection_0(providers){
  this.providers = providers;
}

function SchemaCollection(){
}

_ = SchemaCollection_0.prototype = SchemaCollection.prototype = new Object_0;
_.getClass$ = function getClass_1450(){
  return Lorg_waveprotocol_wave_model_schema_SchemaCollection_2_classLit;
}
;
_.getSchemaForId = function getSchemaForId(waveletId, documentId){
  return $getSchemaForId(this, waveletId, documentId);
}
;
_.castableTypeMap$ = {458:1};
_.providers = null;
function $clinit_2285(){
  var emptyList;
  $clinit_2285 = nullMethod;
  schemas_0 = (emptyList = ($clinit_480() , $clinit_480() , EMPTY_LIST) , new SchemaCollection_0(emptyList?new Collections$UnmodifiableRandomAccessList_0(emptyList):new Collections$UnmodifiableList_0(null)));
}

var schemas_0;
_ = PluggableMutableDocument.prototype;
_.asOperation = function asOperation_3(){
  return $asOperation($getDocument_3(this));
}
;
function FakeDocument_0(initial, schema){
  ObservablePluggableMutableDocument_1.call(this, schema, initial, new ObservablePluggableMutableDocument$DocumentHandlerManager_0);
}

function FakeDocument(){
}

_ = FakeDocument_0.prototype = FakeDocument.prototype = new ObservablePluggableMutableDocument;
_.consume_1 = function consume_14(op){
  $consume_10($getDocument_3(this), op, performValidation);
}
;
_.getClass$ = function getClass_1488(){
  return Lorg_waveprotocol_wave_model_testing_FakeDocument_2_classLit;
}
;
_.toString$ = function toString_137(){
  return toPrettyXmlString($asOperation($getDelegate_0(this).doc));
}
;
_.castableTypeMap$ = {19:1, 266:1, 478:1};
function FakeDocument$Factory_0(schemas){
  this.schemas = schemas;
}

function FakeDocument$Factory(){
}

_ = FakeDocument$Factory_0.prototype = FakeDocument$Factory.prototype = new Object_0;
_.create_1 = function create_67(waveletId, blipId, content_0){
  var result;
  return new FakeDocument_0(content_0, (result = $getSchemaForId(this.schemas, waveletId, blipId) , result?result:($clinit_2009() , NO_SCHEMA_CONSTRAINTS)));
}
;
_.getClass$ = function getClass_1489(){
  return Lorg_waveprotocol_wave_model_testing_FakeDocument$Factory_2_classLit;
}
;
_.castableTypeMap$ = {};
_.schemas = null;
function FakeIdGenerator$1_0(){
}

function FakeIdGenerator$1(){
}

_ = FakeIdGenerator$1_0.prototype = FakeIdGenerator$1.prototype = new Object_0;
_.get_1 = function get_25(){
  return 'seed';
}
;
_.getClass$ = function getClass_1490(){
  return Lorg_waveprotocol_wave_model_testing_FakeIdGenerator$1_2_classLit;
}
;
_.castableTypeMap$ = {};
function MockParticipationHelper_0(){
  this.frames_0 = new LinkedList_0;
}

function MockParticipationHelper(){
}

_ = MockParticipationHelper_0.prototype = MockParticipationHelper.prototype = new Object_0;
_.getAuthoriser = function getAuthoriser(editor, candidates){
  if (this.frames_0.size_0 == 0) {
    throw new NoSuchElementException_1('No frames left to compare with getAuthoriser(' + editor + ', ' + candidates + ')');
  }
   else {
    throwClassCastExceptionUnlessNull($removeFirst(this.frames_0));
    if (null.nullMethod()) {
      return null.nullMethod();
    }
     else {
      throw new AssertionError_0;
    }
  }
}
;
_.getClass$ = function getClass_1491(){
  return Lorg_waveprotocol_wave_model_testing_MockParticipationHelper_2_classLit;
}
;
_.castableTypeMap$ = {};
function $setParticipantId(this$static, participantId){
  this$static.participantId = participantId;
  return this$static;
}

function MockWaveletOperationContextFactory_0(){
}

function MockWaveletOperationContextFactory(){
}

_ = MockWaveletOperationContextFactory_0.prototype = MockWaveletOperationContextFactory.prototype = new AbstractWaveletOperationContextFactory;
_.currentTimeMillis = function currentTimeMillis_5(){
  return this.timeMillis;
}
;
_.getClass$ = function getClass_1492(){
  return Lorg_waveprotocol_wave_model_testing_MockWaveletOperationContextFactory_2_classLit;
}
;
_.getParticipantId = function getParticipantId_0(){
  return this.participantId;
}
;
_.castableTypeMap$ = {};
_.participantId = null;
_.timeMillis = P0_longLit;
function $clinit_2294(){
  $clinit_2294 = nullMethod;
  FAKE_PARTICIPANT = new ParticipantId_0('fake@example.com');
}

function OpBasedWaveletFactory_0(holderFactory, author){
  $clinit_2294();
  this.holderFactory = holderFactory;
  this.author = author;
}

function OpBasedWaveletFactory(){
}

_ = OpBasedWaveletFactory_0.prototype = OpBasedWaveletFactory.prototype = new Object_0;
_.create_0 = function create_68(waveId, waveletId, creator){
  var executor, now, out, v0, waveData;
  return now = fromDouble((new Date).getTime()) , v0 = new HashedVersion_0(P0_longLit, initDim(_3B_classLit, {9:1}, -1, 0, 1)) , waveData = this.holderFactory.create_3(new EmptyWaveletSnapshot_0(waveId, waveletId, creator, v0, now)) , this.lastContextFactory = $setParticipantId(new MockWaveletOperationContextFactory_0, this.author) , this.lastAuthoriser = new MockParticipationHelper_0 , executor = new SilentOperationSink$Executor$1_0(waveData) , out = new OpBasedWaveletFactory$VersionIncrementingSink_0(waveData) , new OpBasedWavelet_0(waveId, waveData, this.lastContextFactory, this.lastAuthoriser, executor, out);
}
;
_.getClass$ = function getClass_1493(){
  return Lorg_waveprotocol_wave_model_testing_OpBasedWaveletFactory_2_classLit;
}
;
_.castableTypeMap$ = {};
_.author = null;
_.holderFactory = null;
_.lastAuthoriser = null;
_.lastContextFactory = null;
var FAKE_PARTICIPANT;
function $build_6(this$static){
  var docFactory;
  if (!this$static.holderFactory) {
    docFactory = new ObservablePluggableMutableDocument$1_0(this$static.schemas);
    this$static.holderFactory = new WaveletDataImpl$Factory_0(docFactory);
  }
  !this$static.sink && (this$static.sink = ($clinit_2195() , VOID));
  !this$static.author && (this$static.author = ($clinit_2294() , FAKE_PARTICIPANT));
  return new OpBasedWaveletFactory_0(this$static.holderFactory, this$static.author);
}

function $with_0(this$static, holderFactory){
  this$static.holderFactory = holderFactory;
  return this$static;
}

function $with_1(this$static, author){
  this$static.author = author;
  return this$static;
}

function OpBasedWaveletFactory$Builder_0(schemas){
  this.schemas = schemas;
}

function OpBasedWaveletFactory$Builder(){
}

_ = OpBasedWaveletFactory$Builder_0.prototype = OpBasedWaveletFactory$Builder.prototype = new Object_0;
_.getClass$ = function getClass_1494(){
  return Lorg_waveprotocol_wave_model_testing_OpBasedWaveletFactory$Builder_2_classLit;
}
;
_.castableTypeMap$ = {};
_.author = null;
_.holderFactory = null;
_.schemas = null;
_.sink = null;
function $consume_21(this$static, op){
  var $e0, e;
  try {
    $apply_45(op.createVersionUpdateOp(P1_longLit, null), this$static.data_0);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 189)) {
      e = $e0;
      throw new OperationRuntimeException_0('test sink verison update failed', e);
    }
     else 
      throw $e0;
  }
}

function OpBasedWaveletFactory$VersionIncrementingSink_0(data){
  this.data_0 = data;
}

function OpBasedWaveletFactory$VersionIncrementingSink(){
}

_ = OpBasedWaveletFactory$VersionIncrementingSink_0.prototype = OpBasedWaveletFactory$VersionIncrementingSink.prototype = new Object_0;
_.consume = function consume_15(op){
  $consume_21(this, dynamicCast(op, 466));
}
;
_.getClass$ = function getClass_1495(){
  return Lorg_waveprotocol_wave_model_testing_OpBasedWaveletFactory$VersionIncrementingSink_2_classLit;
}
;
_.castableTypeMap$ = {};
_.data_0 = null;
_ = CollectionUtils$4.prototype;
_.reduce = function reduce_0(initial, proc){
  return initial;
}
;
_ = CollectionUtils$IdentityHashMapAdapter.prototype;
_.reduce = function reduce_1(initial, proc){
  var entry, entry$iterator, reduction;
  reduction = initial;
  for (entry$iterator = new AbstractHashMap$EntrySetIterator_0((new AbstractHashMap$EntrySet_0(this.backend)).this$0); $hasNext_2(entry$iterator.iter);) {
    entry = entry$iterator.last = dynamicCast($next_4(entry$iterator.iter), 11);
    reduction = $apply_21(reduction, entry.getKey(), entry.getValue());
  }
  return reduction;
}
;
function $copyDocuments(this$static, source){
  var docData, docId, docId$iterator;
  for (docId$iterator = source.getDocumentIds().iterator_0(); docId$iterator.hasNext();) {
    docId = dynamicCast(docId$iterator.next_0(), 1);
    docData = source.getDocument_1(docId);
    $createDocument(this$static, docData.id_0, docData.author, docData.contributors, docData.content_0.asOperation(), docData.lastModifiedTime, docData.lastModifiedVersion);
  }
}

_ = AbstractWaveletData.prototype;
_.getCreationTime = function getCreationTime(){
  return this.creationTime;
}
;
_.getCreator = function getCreator(){
  return this.creator;
}
;
_.getDocument_1 = function getDocument_3(documentId){
  return dynamicCast(this.documents.get(documentId), 473);
}
;
_.getHashedVersion = function getHashedVersion(){
  return this.hashedVersion;
}
;
_.getLastModifiedTime = function getLastModifiedTime(){
  return this.lastModifiedTime;
}
;
_.getParticipants = function getParticipants(){
  return $clinit_480() , new Collections$UnmodifiableSet_0(this.participants);
}
;
_.getVersion = function getVersion(){
  return this.version;
}
;
_.getWaveId = function getWaveId(){
  return this.waveId;
}
;
_.getWaveletId = function getWaveletId(){
  return this.id_0;
}
;
function EmptyWaveletSnapshot_0(waveId, waveletId, creator, version, creationTime){
  this.waveId = waveId;
  this.waveletId = waveletId;
  this.creator = creator;
  this.hashedVersion = version;
  this.creationTime = creationTime;
}

function EmptyWaveletSnapshot(){
}

_ = EmptyWaveletSnapshot_0.prototype = EmptyWaveletSnapshot.prototype = new Object_0;
_.getClass$ = function getClass_1546(){
  return Lorg_waveprotocol_wave_model_wave_data_impl_EmptyWaveletSnapshot_2_classLit;
}
;
_.getCreationTime = function getCreationTime_0(){
  return this.creationTime;
}
;
_.getCreator = function getCreator_0(){
  return this.creator;
}
;
_.getDocument_1 = function getDocument_4(documentName){
  return null;
}
;
_.getDocumentIds = function getDocumentIds(){
  return $clinit_480() , $clinit_480() , EMPTY_SET;
}
;
_.getHashedVersion = function getHashedVersion_0(){
  return this.hashedVersion;
}
;
_.getLastModifiedTime = function getLastModifiedTime_0(){
  return this.creationTime;
}
;
_.getParticipants = function getParticipants_0(){
  return $clinit_480() , $clinit_480() , EMPTY_SET;
}
;
_.getVersion = function getVersion_0(){
  return this.hashedVersion.version;
}
;
_.getWaveId = function getWaveId_0(){
  return this.waveId;
}
;
_.getWaveletId = function getWaveletId_0(){
  return this.waveletId;
}
;
_.castableTypeMap$ = {};
_.creationTime = P0_longLit;
_.creator = null;
_.hashedVersion = null;
_.waveId = null;
_.waveletId = null;
function $addWavelet(this$static, wavelet){
  var waveletId;
  waveletId = wavelet.id_0;
  checkArgument_3(!this$static.wavelets.containsKey(waveletId), 'Duplicate wavelet id: %s', initValues(_3Ljava_lang_Object_2_classLit, {9:1, 68:1}, 0, [waveletId]));
  this$static.wavelets.put(waveletId, wavelet);
}

function WaveViewDataImpl_0(id){
  this.wavelets = ($clinit_2309() , new HashMap_0);
  this.id_0 = id;
}

function WaveViewDataImpl(){
}

_ = WaveViewDataImpl_0.prototype = WaveViewDataImpl.prototype = new Object_0;
_.getClass$ = function getClass_1552(){
  return Lorg_waveprotocol_wave_model_wave_data_impl_WaveViewDataImpl_2_classLit;
}
;
_.castableTypeMap$ = {173:1};
_.id_0 = null;
function WaveletDataImpl_1(data, contentFactory){
  this.listenerManager = new WaveletDataListenerManager_0;
  this.id_0 = data.getWaveletId();
  this.creator = data.getCreator();
  this.creationTime = data.getCreationTime();
  this.version = data.getVersion();
  this.hashedVersion = data.getHashedVersion();
  this.lastModifiedTime = data.getLastModifiedTime();
  this.waveId = data.getWaveId();
  this.contentFactory = contentFactory;
  $$init_266(this);
}

_ = WaveletDataImpl_1.prototype = WaveletDataImpl.prototype;
_.getDocument_1 = function getDocument_5(documentName){
  return dynamicCast(this.documents.get(documentName), 473);
}
;
function $create_5(this$static, data){
  var waveletData;
  waveletData = new WaveletDataImpl_1(data, this$static.contentFactory);
  waveletData.participants.addAll(data.getParticipants());
  $copyDocuments(waveletData, data);
  return waveletData;
}

function WaveletDataImpl$Factory_0(contentFactory){
  checkNotNull_1(contentFactory, 'null DocumentFactory');
  this.contentFactory = contentFactory;
}

function WaveletDataImpl$Factory(){
}

_ = WaveletDataImpl$Factory_0.prototype = WaveletDataImpl$Factory.prototype = new Object_0;
_.create_3 = function create_70(data){
  return $create_5(this, data);
}
;
_.getClass$ = function getClass_1554(){
  return Lorg_waveprotocol_wave_model_wave_data_impl_WaveletDataImpl$Factory_2_classLit;
}
;
_.castableTypeMap$ = {};
_.contentFactory = null;
function $createRoot_0(this$static){
  var $e0, e;
  try {
    return $createWavelet(this$static, this$static.rootId);
  }
   catch ($e0) {
    $e0 = caught_0($e0);
    if (instanceOf($e0, 444)) {
      e = $e0;
      throw new IllegalStateException_2('Attempted to create duplicate root wavelet', e);
    }
     else 
      throw $e0;
  }
}

var Lcom_google_gwt_lang_asyncloaders_AsyncLoader1_2_classLit = createForClass('com.google.gwt.lang.asyncloaders.', 'AsyncLoader1'), Lcom_google_gwt_lang_asyncloaders_AsyncLoader2$1_2_classLit = createForClass('com.google.gwt.lang.asyncloaders.', 'AsyncLoader2$1'), Lcom_google_gwt_lang_asyncloaders_AsyncLoader2_1_1Callback_2_classLit = createForClass('com.google.gwt.lang.asyncloaders.', 'AsyncLoader2__Callback'), Lorg_waveprotocol_wave_client_common_util_CountdownLatch_2_classLit = createForClass('org.waveprotocol.wave.client.common.util.', 'CountdownLatch'), Lorg_waveprotocol_wave_client_render_ReductionBasedRenderer_2_classLit = createForClass('org.waveprotocol.wave.client.render.', 'ReductionBasedRenderer'), Lorg_waveprotocol_wave_client_testing_UndercurrentHarness$WaveFactory$1_2_classLit = createForClass('org.waveprotocol.wave.client.testing.', 'UndercurrentHarness$WaveFactory$1'), Lorg_waveprotocol_wave_client_StageTwo$DefaultProvider_2_classLit = createForClass('org.waveprotocol.wave.client.', 'StageTwo$DefaultProvider'), Lorg_waveprotocol_wave_client_testing_UndercurrentHarness$1$3_2_classLit = createForClass('org.waveprotocol.wave.client.testing.', 'UndercurrentHarness$1$3'), Lorg_waveprotocol_wave_client_testing_UndercurrentHarness$1$3$1_2_classLit = createForClass('org.waveprotocol.wave.client.testing.', 'UndercurrentHarness$1$3$1'), Lorg_waveprotocol_wave_client_wavepanel_impl_reader_Reader_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.impl.reader.', 'Reader'), Lorg_waveprotocol_wave_client_wavepanel_render_FullDomRenderer_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.render.', 'FullDomRenderer'), Lorg_waveprotocol_wave_client_wavepanel_render_FullDomRenderer$1_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.render.', 'FullDomRenderer$1'), Lorg_waveprotocol_wave_client_wavepanel_render_HtmlDomRenderer_2_classLit = createForClass('org.waveprotocol.wave.client.wavepanel.render.', 'HtmlDomRenderer'), Lorg_waveprotocol_wave_client_StageTwo$DefaultProvider$1_2_classLit = createForClass('org.waveprotocol.wave.client.', 'StageTwo$DefaultProvider$1'), Lorg_waveprotocol_wave_client_StageTwo$DefaultProvider$2_2_classLit = createForClass('org.waveprotocol.wave.client.', 'StageTwo$DefaultProvider$2'), Lorg_waveprotocol_wave_client_StageTwo$DefaultProvider$3_2_classLit = createForClass('org.waveprotocol.wave.client.', 'StageTwo$DefaultProvider$3'), Lorg_waveprotocol_wave_client_StageTwo$DefaultProvider$9_2_classLit = createForClass('org.waveprotocol.wave.client.', 'StageTwo$DefaultProvider$9'), Lorg_waveprotocol_wave_client_Stages$3$1_2_classLit = createForClass('org.waveprotocol.wave.client.', 'Stages$3$1'), Lorg_waveprotocol_wave_client_Stages$4_2_classLit = createForClass('org.waveprotocol.wave.client.', 'Stages$4'), Lorg_waveprotocol_wave_model_conversation_ConversationStructure_2_classLit = createForClass('org.waveprotocol.wave.model.conversation.', 'ConversationStructure'), Lorg_waveprotocol_wave_model_document_util_DocHelper$Expectation_2_classLit = createForEnum('org.waveprotocol.wave.model.document.util.', 'DocHelper$Expectation', Ljava_lang_Enum_2_classLit, values_71, valueOf_77), _3Lorg_waveprotocol_wave_model_document_util_DocHelper$Expectation_2_classLit = createForArray('[Lorg.waveprotocol.wave.model.document.util.', 'DocHelper$Expectation;', Lorg_waveprotocol_wave_model_document_util_DocHelper$Expectation_2_classLit), Lorg_waveprotocol_wave_model_operation_wave_VersionUpdateOp_2_classLit = createForClass('org.waveprotocol.wave.model.operation.wave.', 'VersionUpdateOp'), Lorg_waveprotocol_wave_model_operation_SilentOperationSink$Executor$1_2_classLit = createForClass('org.waveprotocol.wave.model.operation.', 'SilentOperationSink$Executor$1'), Lorg_waveprotocol_wave_model_schema_SchemaCollection_2_classLit = createForClass('org.waveprotocol.wave.model.schema.', 'SchemaCollection'), Lorg_waveprotocol_wave_model_testing_FakeDocument_2_classLit = createForClass('org.waveprotocol.wave.model.testing.', 'FakeDocument'), Lorg_waveprotocol_wave_model_testing_FakeDocument$Factory_2_classLit = createForClass('org.waveprotocol.wave.model.testing.', 'FakeDocument$Factory'), Lorg_waveprotocol_wave_model_testing_FakeIdGenerator$1_2_classLit = createForClass('org.waveprotocol.wave.model.testing.', 'FakeIdGenerator$1'), Lorg_waveprotocol_wave_model_testing_MockParticipationHelper_2_classLit = createForClass('org.waveprotocol.wave.model.testing.', 'MockParticipationHelper'), Lorg_waveprotocol_wave_model_testing_MockWaveletOperationContextFactory_2_classLit = createForClass('org.waveprotocol.wave.model.testing.', 'MockWaveletOperationContextFactory'), Lorg_waveprotocol_wave_model_testing_OpBasedWaveletFactory_2_classLit = createForClass('org.waveprotocol.wave.model.testing.', 'OpBasedWaveletFactory'), Lorg_waveprotocol_wave_model_testing_OpBasedWaveletFactory$VersionIncrementingSink_2_classLit = createForClass('org.waveprotocol.wave.model.testing.', 'OpBasedWaveletFactory$VersionIncrementingSink'), Lorg_waveprotocol_wave_model_testing_OpBasedWaveletFactory$Builder_2_classLit = createForClass('org.waveprotocol.wave.model.testing.', 'OpBasedWaveletFactory$Builder'), Lorg_waveprotocol_wave_model_wave_data_impl_EmptyWaveletSnapshot_2_classLit = createForClass('org.waveprotocol.wave.model.wave.data.impl.', 'EmptyWaveletSnapshot'), Lorg_waveprotocol_wave_model_wave_data_impl_WaveViewDataImpl_2_classLit = createForClass('org.waveprotocol.wave.model.wave.data.impl.', 'WaveViewDataImpl'), Lorg_waveprotocol_wave_model_wave_data_impl_WaveletDataImpl$Factory_2_classLit = createForClass('org.waveprotocol.wave.model.wave.data.impl.', 'WaveletDataImpl$Factory');
$entry(onLoad)();
