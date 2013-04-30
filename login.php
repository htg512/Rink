<?
$m_id = $_POST['uid'];
$m_pw = $_POST['upw'];

/*
setcookie("Rink_User_Idinfo", $_POST['uid'], 0);
setcookie("ck_pwd",$_POST['upw'], 0);
$id = $_COOKIE['Rink_User_Idinfo'];
$pwd = $_COOKIE['upw'];
*/
         $connect = mysql_connect('localhost','root','apmsetup');
  if($connect)
  mysql_query("SET NAMES utf8");
  $m_db = mysql_select_db('member_db',$connect);

  $result = mysql_query($sql, $connect);
 
  
  
  $sql = "SELECT * FROM member_tb WHERE ID='{$m_id}' AND Pwd=old_password('{$m_pw}')";  
  
  $result = mysql_query($sql); // 편의상 
  $list = mysql_num_rows($result);
 
 if($list) echo 't';
 else echo 'f';
  
  /*
if( mysql_num_rows($result) ){
	echo "true";
}
else { 
$row = mysql_fetch_assoc($result); // 이용 
echo "비밀번호가 틀립니다.<br />";

 echo "<script>
   alert('로그인 실패 \\r\\n 로그인으로 이동');
   location.replace('login_form1.html');
   </script>";
  }
  */
  
 

  
 
  mysql_close($connect);
?>