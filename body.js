var userid = 'CHRIS TRIL';

console.log('better now i hope');

var config = {
        apiKey: "AIzaSyBG_tG-e0BHOE9PpV6AkEgfcBRfyKk-q9Y",
        authDomain: "memes-database.firebaseapp.com",
        databaseURL: "https://memes-database.firebaseio.com",
        projectId: "memes-database",
        storageBucket: "memes-database.appspot.com",
        messagingSenderId: "615363636077"
    };
firebase.initializeApp(config);

var database = [];

var db = firebase.database();
var posts = db.ref("posts");
posts.orderByChild("post_id").equalTo("1717731545171536_1939179983026690").once("value", function(snapshot) {
  console.log(snapshot.val());
});

var users = db.ref("users");
var user_ids = db.ref("user_id");

function main() {
    draw('Riley Woo');

    function draw(userName) {
        var poster_id = database[userName].poster_id;
        if (poster_id) {
            createReactBar(userName, poster_id);
            console.log('drawing...');
            FB.api(
              "/" + poster_id + "/picture?type=large",
              function (response) {
                if (response && !response.error) {
                    $("#picture").attr("src",response.data.url);
                }
              }
            );
        } else {
            console.log('what r u doin');
        }
    }

    $("#user-form").submit(function(e) {
        e.preventDefault();
        console.log($('#user-name').val());
        draw($('#user-name').val());
        $('#user-name').val('');
    });

    function insert(val) {
      document.getElementById("inserthere").innerHTML = val;
    }
        
//        {
//            "comments": {
//                "data": [],
//                "summary": {
//                    "can_comment": false,
//                    "order": "chronological",
//                    "total_count": 25
//                }
//            },
//            "created_time": "2017-08-18T19:43:22+0000",
//            "id": "1717731545171536_1967971476814207",
//            "likes": {
//                "data": [],
//                "summary": {
//                    "can_like": true,
//                    "has_liked": false,
//                    "total_count": 150
//                }
//            },
//            "link": "https://www.facebook.com/photo.php?fbid=1385535668160151&set=gm.1967971476814207&type=3"
//        }
        
    FB.api(
        "/1717731545171536/feed/?fields=link,created_time,name,id,likes.limit(0).summary(true),comments.limit(0).summary(true),shares&access_token=443809049300463|e6ff2a431bb3da7624faefbf39a15a3d",
        function (response) {
          if (response && !response.error) {
            draw('Christopher Cox');
            $('#user-name').val(response.data[0].likes.summary.total_count);
          }
        }
    );

    function createReactBar(name, input) {
      $(function () {
        var myChart = Highcharts.chart('bar chart', {
          chart: {
            type: 'bar'
          },
          title: {
            text: 'Reaction Data Breakdown'
          },
          xAxis: {
            categories: ['Total Likes', 'Total Comments']
          },
          yAxis: {
            title: {
              text: 'Reactions to posts'
            },
            type: 'linear',
            tickInterval: 50,
          },
            series: [
                {
                    data: formatUserData(name),
                    name: name
                }
            ],
          credits: false
        });
      });
    }

        function formatUserData(userName) {
          return Object.values([database[userName].num_likes, database[userName].num_comments]);
        }


        //======================= BELOW IS REACTION-SPECIFIC =====================

        //function formatUserData(data) {
        //  var dictionary = {'ANGRY' : 0, 'HAHA' : 0, 'LIKE' : 0, 'LOVE' : 0, 'SAD' : 0, 'WOW' : 0};
        //
        //  for(var i in data.reactions){
        //     dictionary[data.reactions[i].type] = dictionary[data.reactions[i].type] + 1;
        //   }
        //
        //  return Object.values(dictionary);
        //}

        //function createReactBar(input) {
        //  $(function () {
        //    var myChart = Highcharts.chart('bar chart', {
        //      chart: {
        //        type: 'bar'
        //      },
        //      title: {
        //        text: 'Reaction Data Breakdown'
        //      },
        //      xAxis: {
        //        categories: ['ANGRY', 'HAHA', 'LIKE', 'LOVE', 'SAD', 'WOW']
        //      },
        //      yAxis: {
        //        title: {
        //          text: 'Total Reactions'
        //        },
        //        type: 'linear',
        //        tickInterval: 20,
        //      },
        //      series: [
        //        {
        //          data: formatUserData(input),
        //          name: Session.get('userid')
        //        }
        //      ],
        //      credits: false
        //    });
        //  });
        //}


        // Hannah Bockley
        // Seth Van Doren
}