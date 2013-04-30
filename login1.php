<?
    $uid = $_POST["uid"];
    $upw = $_POST["upw"];

    //쿼리등을 실행한후
    //................................

    if($uid=="raspose" && $upw=="1111") {
        echo "true";
    } else {
        echo "false";
    }
?>
