// load courses from JSON file
let path = "/static/courses.json";
$(document).ready(function() {
  //store the get parameters in a variable
  let params = new URLSearchParams(window.location.search);
  let courseId = params.get("id");
  //check if that parameter exists
  if (!courseId) {
    $.getJSON(path, function(data) {
      var courses = data.courses;

      // generate HTML for each course card
      var courseCards = "";
      for (var i = 0; i < courses.length; i++) {
        var course = courses[i];

        // create a new row for every 3 cards
        if (i % 3 === 0) {
          courseCards += '<div class="row" style="padding: 1% 0% 1% 0%;">';
          courseCards += '<div class="card-deck"></div>';
        }

        // generate HTML for the current course card
        courseCards += `
          <div class="col-sm-4" style="padding:2%;">
            <div class="card shadow border-0" >
          <!-- <h4 class="card-header bg-dark text-white" style="font-weight:bold;padding:2 0 0 2 ;">${course.title}</h2> -->
              <img src="/static/img/${course.id}.jpg" class="card-img-top" style="aspect-ratio: 16/9;object-fit: cover;"> 
              <div class="card-body">
                <h4 class="card-title" style="font-weight:bold;">${course.title}</h4>
                  <p class="card-text">${course.description}</p>
                <a href="#" class="btn btn-primary" onclick="window.location.href='/?id=${course.id}';">Visit</a>
              </div>
            </div>
          </div>
        `;

        // close the row after the third card
        if ((i + 1) % 3 === 0 || (i + 1) === courses.length) {
          courseCards += '</div></div><hr/>';
        }
      }

      // add course cards to grid container
      $("#courses-grid").html(courseCards);
    });
    
  }else{
    let path = `/static/json/${courseId}.json`;
    $.getJSON(path, function(data) {
      var courses = data.courses;

      // generate HTML for each course card
      var courseCards = "";

      for (var i = 0; i < courses.length; i++) {
        var course = courses[i];

        // create a new row for every 3 cards
        if (i % 3 === 0) {
          courseCards += '<div class="row" style="padding: 1% 0% 1% 0%;">';
          courseCards += '<div class="card-deck"></div>';
        }

        // generate HTML for the current course card
        courseCards += `
          <div class="col-sm-4" style="padding:2%;">
            <div class="card shadow border-0" >
          <h4 class="card-header bg-dark text-white" style="font-weight:bold;padding:2 0 0 2 ;">${course.title}</h2>
              <div class="card-body">
                <h4 class="card-title" style="font-weight:bold;">${course.title}</h4>
                  <p class="card-text">${course.description}</p>
                  <div class="list-group">`;
        var files = course.files;
        for(var j = 0; j<files.length;j++){
          var file = files[j];
          var type = file.type;
          var viewlink=`/resources?filename=${file.link}`;
          var text = "View"
          if (type=="video"){
            viewlink=`/video?videolink=${file.link}&title=${file.filename}`;
            text="Watch";
          };
          courseCards += `
          <div class="container list-group-item-action list-group-item border-0">
          <div class="row">
              <h5 href="" >${file.filename}</h5>
            </div>
            <div class="row">
            <div class="btn-group btn-group-justified" >
              <a class="btn btn-danger col1 " href="${viewlink}" role="button">${text}</a>
              <a class="btn btn-outline-danger col1 " href="/resources?filename=${file.link}&download=1" role="button">Download</a>
            </div>
            </div>
            <hr>
          </div>
          `

        }

        courseCards+=`
                  </div>
              </div>
            </div>
          </div>
        `;

        // close the row after the third card
        if ((i + 1) % 3 === 0 || (i + 1) === courses.length) {
          courseCards += '</div></div><hr/>';
        }
      }

      // add course cards to grid container
      $("#courses-grid").html(courseCards);
    });


  };
});
