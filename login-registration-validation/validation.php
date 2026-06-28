<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<style type="text/css">
		.red{
			color: red;
		}
	</style>

<body>

<?php

$nameErr = $emailErr = $dobErr = $genderErr = $degreeErr = $bgErr ="";
$name = $email = $dob = $gender = $degree = $bg = "";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["name"])) {
      $nameErr = "Name is required";
    } else {
      $name = $_POST["name"];
    
      if (!preg_match("/^[a-zA-Z-' ]*$/",$name)) {
        $nameErr = "Only letters and white space allowed";
      }
    }

    if (empty($_POST["email"])) {
      $emailErr = "Email is required";
    } else {
      $email = $_POST["email"];

      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailErr = "Invalid email format";
      }
    }

    
    if (empty($_POST["dob"])) {
      $dobErr = "Please Enter your Birthdath";
    } else {
      $dob = $_POST["dob"];
    }

    if (empty($_POST["gender"])) {
      $genderErr = "Gender is required";
    } else {
      $gender = $_POST["gender"];
    }

    if (empty($_POST["degree"])) {
      $degreeErr = "Enter Any two";
    } else {
      $degree = $_POST["degree"];
    }

    if (empty($_POST["bg"])) {
      $bgErr = "Enter your Blood Group";
    } else {
      $bg = $_POST["bg"];
    }



}
?>
    <h1>PHP Form Page</h1>
    <form form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">

    <fieldset><legend><b>NAME</b></legend>
    <input type="text" name="name" value="<?php echo $name;?>"><span class="red">*<?php echo $nameErr ?></span><br>
    <hr>  
    </fieldset>

    <fieldset><legend><b>EMAIL</b></legend>
    <input type="text" name="email" value="<?php echo $email;?>"><span class="red">*<?php echo $emailErr ?></span><br>
    <hr>
    </fieldset>

    
    <fieldset><legend><b>Date of Birth<b></legend>
    <input type="date" name="dob" value="<?php echo $dob;?>"><span class="red">*<?php echo $dobErr ?></span><br>
    <hr>
    </fieldset>

    <fieldset><legend><b>GENDER</b></legend>
		<input type="radio" name="gender"
		<?php if (isset($gender) && $gender=="female") echo "checked";?>
		value="female">Female
		<input type="radio" name="gender"
		<?php if (isset($gender) && $gender=="male") echo "checked";?>
		value="male">Male
		<input type="radio" name="gender"
		<?php if (isset($gender) && $gender=="other") echo "checked";?>
		value="other">Other<span class="red">*<?php echo $genderErr ?></span>
		<br>
    <hr>
    </fieldset>




    <fieldset><legend><b>DEGREE</b></legend>
 
    <input type="checkbox"  name="ssc"
    <?php if(isset($degree) && $degree=="ssc") echo "SSC";?>
    value="ssc">SSC

    <input type="checkbox"  name="hsc"
    <?php if(isset($degree) && $degree=="hsc") echo "HSC";?>
    value="hsc">HSC

    <input type="checkbox"  name="bsc"
    <?php if(isset($degree) && $degree=="bsc") echo "BSC";?>
    value="bsc">BSC

    <input type="checkbox"  name="msc"
    <?php if(isset($degree) && $degree=="msc") echo "MSC";?>
    value="msc">MSC
		<br>
    <hr>
    </fieldset>
    

    <fieldset><legend><b>BLOOD GROUP</b></legend>
    <select>    
        <option value="A+" name="a+">A+</option>
        <option value="A-" name="a-">A-</option>
        <option value="B+" name="b+">B+</option>
        <option value="B-" name="b-">B-</option>
        <option value="AB+" name="ab+">AB+</option>
        <option value="AB-" name="ab-">AB-</option>
    </select>
    <hr>
    </fieldset>

    <input type="submit" name="">
    <input type="reset" name="">
 

</form>


<h2>Input Data</h2>
	<?php 
	echo "Name : " .$name."<br>";
	echo "Email : ".$email."<br>";
  echo "Dete of Birth : " .$dob."<br>";
	echo "Gender : " .$gender."<br>";
  echo "Degree : " .$degree."<br>";
  echo "Blood Group : " .$bg ."<br>";

	 ?>

</body>
</html>