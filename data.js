// import { Wrap } from './test.js';

var margin = {
  top: 20,
  right: 120,
  bottom: 20,
  left: 120
},
width = screen.width - margin.right - margin.left,
height = screen.height - margin.top - margin.bottom;

var root = {
  "name": "Start",
      "children": [{
      "name": "Buy Game",
          "children": [{
          "name": "cluster",
              "children": [{
              "name": "AgglomerativeCluster",
                //   "size": 3938
          }, {
              "name": "CommunityStructure",
                //   "size": 3812
          }, {
              "name": "HierarchicalCluster",
                //   "size": 6714
          }, {
              "name": "MergeEdge",
                //   "size": 743
          }]
      }, {
          "name": "graph",
              "children": [{
              "name": "BetweennessCentrality",
                //   "size": 3534
          }, {
              "name": "LinkDistance",
                //   "size": 5731  
                // happiness: (200,"+")
                // health: (11,"-")
          }, {
              "name": "MaxFlowMinCut",
                //   "size": 7840
          }, {
              "name": "ShortestPaths",
                //   "size": 5914
          }, {
              "name": "SpanningTree",
                //   "size": 3416
          }]
      }, {
          "name": "optimization",
              "children": [{
              "name": "AspectRatioBanker",
                //   "size": 7074
          }]
      }]
  }, {
      "name": "Buy food",
          "children": [{
          "name": "Buy Clothes",
              "children": [{
              "name": "Study",
                //   "size": 1983
                },{
                "name": "Play",
                //    "size": 1041
                  
          } ]
      }, {
          "name": "Buy Gift",
            //   "size": 1041
      }]
  
  
  }]
};



var i = 0,
  date = 1,
  body_top = 0,
  duration = 750,
  rectW = 90,
  rectH = 25;
  
document.getElementById("date").innerHTML = date.toString();


var tree = d3.layout.tree().nodeSize([200, 100]);
var diagonal = d3.svg.diagonal()
  .projection(function (d) {
  return [d.x + rectW / 2, d.y + rectH / 2];
});
console.log(screen.width, screen.height)
var svg = d3.select("#body").append("svg").attr("width",2000).attr("height", 7000)
  .call(zm = d3.behavior.zoom().scaleExtent([1,3]).on("zoom", null)).append("g")
  .attr("transform", "translate(" + screen.width/2.5 + "," + screen.height/7 + ")scale(2.5,2.5)");

//necessary so that zoom knows where to zoom and unzoom from
zm.translate([350, 20]).scale(2.5);;

root.x0 = 0;
root.y0 = height / 2;

function collapse(d) {
  if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
  }
}

root.children.forEach(collapse);
update(root);

d3.select("#body").style("height", screen.height);

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function (d) {
      d.y = d.depth * 180;
  });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function (d) {
      return d.id || (d.id = ++i);
  });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
      return "translate(" + source.x0 + "," + source.y0 + ")";
  })
      .on("click", click);

      

  nodeEnter.append("rect")
      .attr("class", "title")

      .attr("width", rectW)
    //   .attr("height", "25px")
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .style("fill", "#ffff");

      nodeEnter.append("rect")
      .attr("class", "description")

      .attr("width", rectW*2)
      .attr("height", rectH*2)
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("x", -50)
      .attr("y", 35)
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .style("fill", "#ffff");
  

  nodeEnter.append("text")
      .attr("x", rectW / 2)
      .attr("y", rectH / 2)
      
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
     
      .text(function (d) {
      return d.name;
  }) 
//   .call(Wrap.d3.util.wrap(rectW))
  ;


  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
  });

  nodeUpdate.select("rect")
      .attr("width", rectW)
      .attr("height", rectH)
     
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .style("fill",  "#fff");

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function (d) {
      return "translate(" + source.x + "," + source.y + ")";
  })
      .remove();

  nodeExit.select("rect")
      .attr("width", rectW)
      .attr("height", rectH)
    //   .attr("width", bbox.getBBox().width)
    //   .attr("height", bbox.getBBox().height)
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("stroke", "gray")
      .attr("stroke-width", 1);

  nodeExit.select("text");

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function (d) {
      return d.target.id;
  });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("x", rectW / 2)
      .attr("y", rectH / 2)
      .attr("d", function (d) {
      var o = {
          x: source.x0,
          y: source.y0
      };
      return diagonal({
          source: o,
          target: o
      });
  });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

//   Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function (d) {
      var o = {
          x: source.x,
          y: source.y
      };
      return diagonal({
          source: o,
          target: o
      });
  })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
  });
}

var audio_btn = new Audio('button.mp3');
var audio_move = new Audio('move.mp3');



// Toggle children on click.
function click(d) {
  if (d.children) {
    //   d._children = d.children;
    //   d.children = null;
  } else {
      body_top = body_top - screen.height/2.2;
      var shift_value = body_top.toString();
      document.getElementById("body").style.top = shift_value+"px";
      document.getElementById("body").style.height = shift_value+"px";

      nextday();

      audio_btn.play();
      audio_move.play();
      
      d.children = d._children;
      d._children = null;
  }
  update(d);
}

//Redraw for zoom
function redraw() {
//console.log("here", d3.event.translate, d3.event.scale);
svg.attr("transform",
    "translate(" + d3.event.translate + ")"
    + " scale(" + d3.event.scale + ")");
}


function nextday(){
    console.log(date)
    document.getElementById("day_"+date.toString()).classList.remove("active");

    date++;
    
    document.getElementById("date").innerHTML = date.toString();

    document.getElementById("day_"+date.toString()).classList.add("active");


}

function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width && line.length > 1) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}