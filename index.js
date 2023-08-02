

const display = (data) => {
  data.map((ele) => {
    let img = document.createElement("img");
    img.src = ele.studentImg;

    let name = document.createElement("h3");
    name.innerHTML = ele.studentName;

    let num = document.createElement("h3");
    num.innerHTML = ele.studentNum;

    let email = document.createElement("h4");
    email.innerHTML = ele.studentEmail;

    let course = document.createElement("h5");
    course.innerHTML = ele.studentCourse;

    let btn1 = document.createElement("button");
    btn1.innerHTML = "Update";
    btn1.addEventListener("click", () => {
        fetch("http://localhost:8080/students")
        .then((sss) => sss.json())
        .then((dbdata) => {
            updatedata(dbdata)
        });

      updatedata(ele.id);
    });

    let btn2 = document.createElement("button"); //For Delet Button
    btn2.innerHTML = "Delete";
    btn2.addEventListener("click", () => {
      deletdata(ele.id);
    });

    let div = document.createElement("div");
    div.setAttribute("id", "main-div");

    div.append(img, name, num, email, course, btn1, btn2);
    document.getElementById("stdtsdb").append(div);
  });
};

const updatedata = (data) => {
   

    // console.log(id)
    // console.log(student)
    //  let udata = students.find((stu)=> (stu.id == id));
    //  console.log(udata);

  fetch(`http://localhost:8080/students`,{
      method : "PATCH",
      body : JSON.stringify(data),
      headers : {"Content-Type": "application/json"},
  })
  .then((res)=> res.json())
  .then((data)=> console.log(data))
};
const deletdata = async (id) => {
  fetch(`http://localhost:8080/students/${id}`, {
    method: "DELETE",
  });
};

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();

  let student = {
    studentImg: document.getElementById("simg").value,
    studentName: document.getElementById("sname").value,
    studentNum: document.getElementById("idno").value,
    studentEmail: document.getElementById("email").value,
    studentCourse: document.getElementById("course").value,
  };
  
  console.log(student);



  fetch("http://localhost:8080/students", {
    method: "POST",
    body: JSON.stringify(student),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
});

fetch("http://localhost:8080/students")
  .then((sss) => sss.json())
  .then((dbdata) => display(dbdata));
 