var ctx1 = document.getElementById("myChart1");
new Chart(ctx1, {

    type: 'doughnut',
    data: {
       labels: [ "lus", "non lus", ],
       datasets: [{

           data:[ ctx1.dataset.lu,ctx1.dataset.nonlu, ],
           backgroundColor: [
            '#595F7C',
            '#8E9098'],
       
       }]
    }
   
});

var ctx2 = document.getElementById("myChart2");

new Chart(ctx2, {

    type: 'pie',
    data: {
       labels: [ "Expédié", "Non Expédié" ],
       datasets: [{

           data:[ ctx2.dataset.expedie,ctx2.dataset.nonexpedie,],
           backgroundColor: [
            '#595F7C',
            '#8E9098'],
       
       }]
    }
});
var ctx3 = document.getElementById("myChart3");
var ca = JSON.parse(ctx3.dataset.ca)
var label = []
var month = []
for(var i=0;i<ca.length;i++){
    var mois = ca[i].ca
    month.push(month)
}
console.log(month)
new Chart(ctx3, {

    type: 'line',
    data: {
       labels: [ "fr", "uk", "es", "it" ],
       datasets: [{

           data:[ 12 ,  19 ,  3  ,  5 ],
       
       }]
    }
});

var ctx4 = document.getElementById("myChart4");

new Chart(ctx4, {

    type: 'bar',
    data: {
       labels: [ "female", "male", ],
       datasets: [{

           data:[ ctx4.dataset.female,ctx4.dataset.male,  ],
           backgroundColor: [
            '#595F7C',
            '#8E9098'],}] 
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }}
});
