WebRTC_Simple_Sample
====================

WebRTCの１対１で接続する一番シンプルだと思う実装例を書いてみました。
WebRTCはSDPなどを相手に送るための手段が(現在の仕様において)別途必要となります。
今回は、その手段にSocket.IOを使用しています。
ですので、Node.js及びSocket.IOがインストールされている必要があります。


### WebRTCで使用されるAPI(オブジェクト)の説明

* RTCPeerConnection  
  P2P接続を行うためのオブジェクト  
* getUserMedia  
  カメラやマイクから映像や音声のストリームを取得するためのAPI。  
  また、現在Chromeしか実装されていませんが、デスクトップ画面やブラウザーのタブの映像ストリームも取得することができます。


### 実行手順

1. Node.jsでsimpleSampleServer.jsを起動します。
2. simpleSample.htmlをChrome同士またはFirefox同士２つのタブ(ウインドウ)で開きます。
3. 先に開いたタブの接続ボタンが有効になります。(有功にならない場合はSocket.IOの接続がうまく行っていません。)
4. 有効になったらクリックします。するとカメラのアクセス許可を求めるバーまたはポップアップが表示されますので許可します。
5. もう一方のタブ(ウインドウ)でもアクセス許可を求めますので許可します。

以上の手順を行うと、ビデオチャットができるようになっていると思います。



### 1対多や多対多の場合の実装方法

1対多や多対多の接続を行う場合は、各ピアごとにRTCPeerConnectionのインスタンスを相手の人数分作成して接続するという実装となります。

* A、B、Cの３人でAに対してBとCが1対多接続を行う場合  
A：Bと接続を行うためのRTCPeerConnectionとCと接続を行うためのRTCPeerConnection  
B：Aと接続を行うためのRTCPeerConnection  
C：Aと接続を行うためのRTCPeerConnection    

* A、B、Cの３人で多対多接続を行う場合  
A：Bと接続を行うためのRTCPeerConnectionとCと接続を行うためのRTCPeerConnection  
B：Aと接続を行うためのRTCPeerConnectionとCと接続を行うためのRTCPeerConnection  
C：Aと接続を行うためのRTCPeerConnectionとBと接続を行うためのRTCPeerConnection  

なので、このへんはユーザーIDを発行してユーザー識別が行えるようにする必要があります。
