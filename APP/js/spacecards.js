     

  google.load('visualization', '1', { packages: ['table'] });

  function clearsidebar() {
      console.log("CLEAR SIDEBAR SPACECARDS"),
      $('#dataContainer').children().remove();
  }

    function drawTable() {
        clearsidebar()
        //CREATE QUERY
        var query = "SELECT 'City' as City, " +
            "'SpaceName' as Spacename, 'URL' as URL " +
            'FROM 17hTjMNDoPFAu8i7fpxcLBclOOnLrfx0uQ1rtg2fK';
        //SEA DB : 17hTjMNDoPFAu8i7fpxcLBclOOnLrfx0uQ1rtg2fK
        console.log("query", query);

        //SELECT CITY TABLE
        var city = document.getElementById('city').value;
        if (city) {
          query += " WHERE 'City' = '" + city + "'";
        }

        //CREATE QUERYVIZ from QUERY
        var queryText = encodeURIComponent(query);
        var gvizQuery = new google.visualization.Query(
            'http://www.google.com/fusiontables/gvizdata?tq=' + queryText);

        //Check Query requested a l'API
        //console.log("gvizQuery", gvizQuery);

        //REQUEST QUERYVIZ 
        gvizQuery.send(function(data) {
        //Same GetJSON()
        console.log("response", data);

            //shortcut seize the data from the API response
            var packet = data.t.tf;

            var fusiondatareceived =  packet.length;
            console.log("fusiondatareceived lenght:",fusiondatareceived);
            
            //Set Up arrays to stock JSON from api
            var city = [0] 
            var spacename = [0] 
            var url = [0]

            //Populate JSON arrays from Fusion table DB
            for (i = 0; i < fusiondatareceived; i++) {
                city[i] = packet[i].c[0].v;  /// error
                //console.log("city[i]", city[i]);
                spacename[i] = packet[i].c[1].v;
                url[i] = packet[i].c[2].v;
            }

            //Print SpaceCards in #DataContainer
            for (var y = 0; y < spacename.length; y++) {
                var spaceCard = "<div class=\"info\"><div class='boxcontent'><a href=\"http://givenget.eu/COWORKINGUNITED/APP/s/hubba/index.html\" target='_blank'>" + spacename[y] + "</a><br><a href=\"" + url[y] +"\" target='_blank'>Web</a></div></div>"
                //PRINT HTML
                $('#dataContainer').append(spaceCard);
            };
        }); /// END  gvizQuery.send(function(data)

    } // END drawTable()

    //REQUEST API OR NOT
    //google.setOnLoadCallback(drawTable);
