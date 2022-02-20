# bitget_合約帳戶明細API
![image](https://user-images.githubusercontent.com/24865458/154845599-ae553e9e-ecbe-4acf-8332-f55940795986.png)
### 基於google sheet的app script
### 可以直接利用Bitget自帶的api自動抓取合約交易 開倉關倉 做多座空的時間點、利潤、手續費、交易量
### 沒有任何交易功能，敬請使用

## 第一步:申請API
![image](https://user-images.githubusercontent.com/24865458/154844906-09d00271-70d9-452d-ae4e-479df442d785.png)

右上角點擊API管理，如果沒有綁定google authenticator的這時候會要求你綁定

![image](https://user-images.githubusercontent.com/24865458/154845011-ddeab17d-cb12-4abd-a4c1-f8b65b20490d.png)

passphrase的部分很像密碼，在此處輸入後就不會再出現，須牢記

 權限方面建議不要將交易api打開，以免有財產被盜走的風險存在

 接著下一步後可以得到三個東西，apikey,secretkey,passphrase

 apikey:類似於你的api的帳號

 secretkey:非常重要，加密的鑰匙

 passphrase:類似於你的api的密碼
## 第二步:建立google sheet的副本
https://docs.google.com/spreadsheets/d/1ykDxYzQgo47Dquxjiep8bJs72wooCtWLTIy88zJRpEE/edit?usp=sharing

點選左上角建立副本，你可以得到一份試算表出現在你的雲端硬碟
## 第三步:填入內容
此處就兩個部分需要填入
### 所需的時間區間
![image](https://user-images.githubusercontent.com/24865458/154845414-cee6028c-40ae-4fda-837f-4e02594ed0b8.png)

### 你的apikey,secretkey,passphrase
![image](https://user-images.githubusercontent.com/24865458/154845538-a2d058a2-4d23-4b91-a089-d3e2a9c00489.png)
## 完成

