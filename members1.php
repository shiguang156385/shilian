<?php
/**
 * Created by IntelliJ IDEA.
 * User: JiaoXinLiang
 * Date: 2019/2/14
 * Time: 9:15
 */
date_default_timezone_set('PRC');
$name=$_POST['name'];
$phone=$_POST['phone'];
$dbms='mysql';
$host='';
$dbName='';
$user='';
$pass='';
$dsn="$dbms:host=$host;dbname=$dbName";


try {
    $conn = new mysqli($host, $user, $pass, $dbName);
    $conn->query("SET NAMES utf8");
    $sql = "SELECT * FROM phsxysc_receive where mobile = '$phone'";
    $result = $conn->query($sql);
    if ($result -> num_rows == 1)
    {
        $data = ['status' => 2, 'msg' => '手机号不能重复!'];
        header("Content-Type:text/html;charset=utf-8");
        echo json_encode($data);
    }else{
        $create_time = date('Y-m-d H:i:s');
        $sql1="insert into phsxysc_receive (name,mobile,create_time) values('$name','$phone','$create_time')";
        $result = $conn -> query($sql1);
        if ($result == 1)
        {
            $data = ['status' => 0, 'msg' => '添加成功!'];
            header("Content-Type:text/html;charset=utf-8");
            echo json_encode($data);
        }else{
            $data[] = ['status' => 1, 'msg' => '添加失败!'];
            header("Content-Type:text/html;charset=utf-8");
            echo json_encode($data);
        }
    }
}
catch(PDOException $e)
{
    echo $e->getMessage();
}
