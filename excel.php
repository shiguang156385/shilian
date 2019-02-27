<?php
/**
 * Created by IntelliJ IDEA.
 * User: JiaoXinLiang
 * Date: 2019/2/15
 * Time: 14:24
 */

$dbms='mysql';
$host='127.0.0.1';
$dbName='wajueji';
$user='root';
$pass='';
$dsn="$dbms:host=$host;dbname=$dbName";

try {
    $conn = new mysqli($host, $user, $pass, $dbName);
    $conn->query("SET NAMES utf8");
    $sql = "SELECT * FROM members";
    $res = mysqli_query($conn, $sql);
    $file = fopen('./领取人员信息.xls', 'w');
    fwrite($file, "序号\t姓名\t手机号\t创建时间\n");
    if(mysqli_num_rows($res) > 0) {
        while($row = mysqli_fetch_array($res)) {
            fwrite($file, $row['id']."\t".$row['name']."\t".$row['mobile']."\t".$row['create_time']."\t\n");
        }
    }
    fclose($file);
    $filename ="领取人员信息.xls";
    $fileinfo = pathinfo($filename);
    header('Content-type: application/x-'.$fileinfo['extension']);
    header('Content-Disposition: attachment; filename='.$fileinfo['basename']);
    header('Content-Length: '.filesize($filename));
    readfile($filename);
    exit();
}
catch(PDOException $e)
{
    echo $e->getMessage();
}
