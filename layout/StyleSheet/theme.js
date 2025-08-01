import { StyleSheet } from 'react-native';

const theme = StyleSheet.create({
themeBg:{
    backgroundColor:'white',
    flex:1,
    paddingHorizontal: 15,
},
logo: {
    width: 200,
    height: 200, // Set the size of the logo
    marginBottom: 0,
    resizeMode: 'contain',
},
pageTitle:{
    fontSize:25,
    paddingVertical:18,
    paddingHorizontal:15,
    backgroundColor:'#00a954',
    // marginBottom:15,
    alignItems:'center',
    display:'flex',
    borderBottomWidth:1,
    borderBottomColor:'gray'
},
pageTitleArrow:{
    fontSize:23,
    color:'white'
},
pageTitleText:{
    fontSize:22,
    marginLeft:15,
    color:'white'
},
container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom:15
},
headerLogo:{
    width:130,
    height:50,
    resizeMode:'contain'
},

authBackground: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal:30,
    paddingVertical:30,
    // backgroundColor:'#63b747',
    backgroundColor:'white',
},
authcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 20,
    // backgroundColor:'white',
    borderRadius:20
},  
authtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#9E9E9E',
    marginBottom: 20,
    marginTop:30
},
authinputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#fffffff',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    height: 50,
    borderBottomWidth:1,
    borderColor:'#9E9E9E'
}, 
authinputIcon: {
    marginRight: 10,
    color:'#FFC107'
},
authinput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
},
authrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
},
authforgotPassword: {
    color: '#fffffff',
    textDecorationLine: 'underline',
},
authbutton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 20,
},
authbuttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
},
authsignupText: {
    color: '#fffffff',
    marginTop: 20,
},
authsignupLink: {
    color: '#9E9E9E',
    fontWeight: 'bold',
},
button:{
    width: '100%',
    paddingVertical: 0,
    alignItems: 'center',
},
tabButton:{
    // width: '100%',
    paddingVertical: 10,
    paddingHorizontal:10,
    alignItems: 'center',
    backgroundColor:'green',
    borderRadius:5,
    marginTop:10,
    marginRight:5,
},
tabButtonText:{
    color:'white',
    fontSize:20,
    textAlign:'center'
},



inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#fffffff',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    height: 50,
    borderBottomWidth:1,
    borderColor:'#9E9E9E'
}, 
fileType: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
},
fileTypeimage: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
},
placeholderText: {
    textAlign: 'center',
    color: '#999',
},
input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
},
inputIcon: {
    marginRight: 10,
    color:'#FFC107'
},
inputLabel:{
    flex:1,
    width:'100%',
    backgroundColor:'transparent',
    // color:'#999'
    // height:15,
},
label: {
    fontSize: 18,
    marginBottom: 10,
    color:'#999',
},
picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
},
selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
},





alertcontainer: {
    padding: 20,
    alignItems: 'center',
},
alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#FFC107',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
},
alertSuccess:{
    backgroundColor:'green'
},
alertInfo:{
    backgroundColor:'#04c1c4'
},
alertDanger:{
    backgroundColor:'red'
},
alerttextContainer: {
    flex: 1,
    marginLeft: 10,
},
alertText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
},
alertsubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
},
alertbutton: {
    backgroundColor: '#FFA500',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
},
alertbuttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
},





profileImage: {
    width: 150,
    height: 150,
    borderRadius: 25,
    marginRight: 10,
},
cardImage:{
    flex:1,
    width:'100%',
    textAlign:'center',
    alignItems:'center'
},

card:{
    flex:1,
    backgroundColor:'white',
    boxShadow:'0px 0px 8px 2px rgba(90, 97, 105, 0.1)',
    borderRadius:10,
    paddingVertical:10,
    paddingHorizontal:10,
    marginTop:20,
},
cardHeader:{
    backgroundColor:'red',
},
cardHeaderText:{
    color:'white',  
    textAlign:'center',
    fontSize:20,
    paddingVertical:5,
    fontWeight:'bold'
},
cardRow:{
    flex:1,
    backgroundColor:'white',
    boxShadow:'0px 0px 8px 2px rgba(90, 97, 105, 0.1)',
    borderRadius:10,
    paddingVertical:10,
    paddingHorizontal:10,
    marginTop:20,
    alignItems:'center'
},
cardRowBold:{
    fontWeight:'bold',
    marginRight:5,
    fontSize:16,
    marginBottom:5
},
cardRowText:{
    fontSize:16,
    marginBottom:5
},

statusSuccess:{
    backgroundColor:'green',
    color:'white',
    width:'fit-contecnt',
    padding:2,
    fontSize:10,
    fontWeight:'bold',
    borderRadius:2,
    textAlign:'center'
},

statusDanger:{
    backgroundColor:'red',
    color:'white',
    width:'fit-contecnt',
    padding:2,
    fontSize:10,
    fontWeight:'bold',
    borderRadius:2,
    textAlign:'center'
},

barsIcon:{
    color:'#2E7D32',
    fontSize:25
},


row: {
    // flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
},
col1:{
    width:'8.33333333%'
},
col2:{
    width:'16.66666667%'
},
col3:{
    width:'25%'
},
col4:{
    width:"33.33333333%",
},
col5:{
    width:'41.66666667%'
},
col6:{
    width:'50%'
},

col7:{
    width:'58.33333333%'
},
col8:{
    width:'66.66666667%'
},
col9:{
    width:'75%'
},
col10:{
    width:'83.33333333%'
},
col11:{
    width:'91.66666667%'
},
col12:{
    width:'100%'
},



m0:{
    margin:0,
},
mt1:{
    marginTop:1,
},
mt2:{
    marginTop:2,
},
mt3:{
    marginTop:3,
},
mt4:{
    marginTop:4,
},
mt5:{
    marginTop:5,
},
mt6:{
    marginTop:6,
},
mt7:{
    marginTop:7,
},
mt8:{
    marginTop:8,
},
mt9:{
    marginTop:9,
},
mt10:{
    marginTop:10,
},
mt11:{
    marginTop:11,
},
mt12:{
    marginTop:12,
},
mt13:{
    marginTop:13,
},
mt14:{
    marginTop:14,
},
mt15:{
    marginTop:15,
},
mt16:{
    marginTop:16,
},
mt17:{
    marginTop:17,
},
mt18:{
    marginTop:18,
},
mt19:{
    marginTop:19,
},
mt20:{
    marginTop:20,
},
mb1:{
    marginBottom:1,
},
mb2:{
    marginBottom:2,
},
mb3:{
    marginBottom:3,
},
mb4:{
    marginBottom:4,
},
mb5:{
    marginBottom:5,
},
mb6:{
    marginBottom:6,
},
mb7:{
    marginBottom:7,
},
mb8:{
    marginBottom:8,
},
mb9:{
    marginBottom:9,
},
mb10:{
    marginBottom:10,
},
mb11:{
    marginBottom:11,
},
mb12:{
    marginBottom:12,
},
mb13:{
    marginBottom:13,
},
mb14:{
    marginBottom:14,
},
mb15:{
    marginBottom:15,
},
mb16:{
    marginBottom:16,
},
mb17:{
    marginBottom:17,
},
mb18:{
    marginBottom:18,
},
mb19:{
    marginBottom:19,
},
mb20:{
    marginBottom:20,
},


mr1:{
    marginRight:1,
},
mr2:{
    marginRight:2,
},
mr3:{
    marginRight:3,
},
mr4:{
    marginRight:4,
},
mr5:{
    marginRight:5,
},
mr6:{
    marginRight:6,
},
mr7:{
    marginRight:7,
},
mr8:{
    marginRight:8,
},
mr9:{
    marginRight:9,
},
mr10:{
    marginRight:10,
},
mr11:{
    marginRight:11,
},
mr12:{
    marginRight:12,
},
mr13:{
    marginRight:13,
},
mr14:{
    marginRight:14,
},
mr15:{
    marginRight:15,
},
mr16:{
    marginRight:16,
},
mr17:{
    marginRight:17,
},
mr18:{
    marginRight:18,
},
mr19:{
    marginRight:19,
},
mr20:{
    marginRight:20,
},
ml1:{
    marginLeft:1,
},
ml2:{
    marginLeft:2,
},
ml3:{
    marginLeft:3,
},
ml4:{
    marginLeft:4,
},
ml5:{
    marginLeft:5,
},
ml6:{
    marginLeft:6,
},
ml7:{
    marginLeft:7,
},
ml8:{
    marginLeft:8,
},
ml9:{
    marginLeft:9,
},
ml10:{
    marginLeft:10,
},
ml11:{
    marginLeft:11,
},
ml12:{
    marginLeft:12,
},
ml13:{
    marginLeft:13,
},
ml14:{
    marginLeft:14,
},
ml15:{
    marginLeft:15,
},
ml16:{
    marginLeft:16,
},
ml17:{
    marginLeft:17,
},
ml18:{
    marginLeft:18,
},
ml19:{
    marginLeft:19,
},
ml20:{
    marginLeft:20,
},


pl2:{
    paddingLeft:2,
},
pr2:{
    paddingRight:2,
},
p1:{
    padding:1,
},
p2:{
    padding:2,
},
p3:{
    padding:3,
},
p4:{
    padding:4,
},
p5:{
    padding:5,
},
p6:{
    padding:6,
},
p7:{
    padding:7,
},


plr5:{
    paddingHorizontal:5,
},



});

export default theme;
