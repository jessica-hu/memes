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
var ref = db.ref("posts");
ref.orderByChild("post_id").equalTo("1717731545171536_1939179983026690").once("value", function(snapshot) {
  console.log(snapshot.val());
});

function main() {
    $.getJSON( './post_database.json', function(data) {
        data.forEach(function(d) {
          if (d.post_id.length > 0) {
                if (database[d.poster_name]) {
                    database[d.poster_name].posts.push(d.post_id);
                    database[d.poster_name].num_likes = database[d.poster_name].num_likes + d.num_likes;
                    database[d.poster_name].num_comments = database[d.poster_name].num_comments + d.num_comments;
                } else {
                    database[d.poster_name] = {'poster_id' : d.poster_id,
                                               'posts' : [d.post_id],
                                               'num_likes' : d.num_likes,
                                               'num_comments' : d.num_comments};
                }
            }
        });

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
    });
}