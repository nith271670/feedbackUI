import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Axis from 'd3-axis';
import { HttpService } from '../shared/http.service';
import * as _ from "lodash";


@Component({
  selector: 'app-graphical-representation',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './graphical-representation.component.html',
  styleUrls: ['./graphical-representation.component.css']
})
export class GraphicalRepresentationComponent implements OnInit {
    feedBackList = [];

    feedBackListGrouped = [];
    activeTab = 0;
    trainingContent = [];
    trainingExperience = [];
    initializeGraph = false;
    comment = [];
    YesNoCount = [];

    private width: number;
    private height: number;
    private margin = {top: -50, right: 20, bottom: 30, left: 40};
    private x: any;
    private y: any;
    private svg: any;
    private g: any;
    private radius: number;
    private arc: any;
    private labelArc: any;
    private pie: any;
    private color: any;
    

  constructor(private httpService: HttpService) { 
    this.width = 400 - this.margin.left - this.margin.right;
        this.height = 300 - this.margin.top - this.margin.bottom;
        this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit() {
    this.httpService.getList().subscribe(response => {
      this.feedBackList = response as [];
      this.feedBackListGrouped = this.groupBy(this.feedBackList, 'training', 'trainingName', 'trainingData');
      console.log(this.feedBackListGrouped);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.tabSwitch(0);
    }, 2000);

  }

  groupBy(dataToGroupOn, fieldNameToGroupOn, fieldNameForGroupName, fieldNameForChildren) {
    var result = _.chain(dataToGroupOn)
    .groupBy(fieldNameToGroupOn)
    .toPairs()
    .map(function (currentItem) {
      return _.zipObject([fieldNameForGroupName, fieldNameForChildren], currentItem);
    })
    .value();
    return result;
  }

  tabSwitch(index){
    this.activeTab = index;
    if(!this.initializeGraph){
      this.getDataForGraph();
      this.initializeGraph = true;
    }

  }



  getDataForGraph(){
    this.getTrainingContent();
  }

  getTrainingContent(){
    for(let j=0;j<this.feedBackListGrouped.length;j++){
      var sum1 = 0;
      var sum2 = 0;
      var sum3 = 0;
      var sum4 = 0;

      var sumte1 = 0;
      var sumte2 = 0;
      var sumte3 = 0;
      var sumte4 = 0;

      var sumtq1 = 0;
      var sumtq2 = 0;
      var sumtq3 = 0;
      var sumtq4 = 0;

      var yesCount = 0;
      var noCount = 0;
      // var sumte2 = 0;
      this.comment[j] = new Array();
    for(let i=0;i<this.feedBackListGrouped[j].trainingData.length;i++){
         

               sum1 = sum1 + parseInt(this.feedBackListGrouped[j].trainingData[i].questions[0].subquestions[0].rating);
               sum2 = sum2 + parseInt(this.feedBackListGrouped[j].trainingData[i].questions[0].subquestions[1].rating);
               sum3 = sum3 + parseInt(this.feedBackListGrouped[j].trainingData[i].questions[0].subquestions[2].rating);
               sum4 = sum4 + parseInt(this.feedBackListGrouped[j].trainingData[i].questions[0].subquestions[3].rating);

               sumte1 = sumte1 + parseInt(this.feedBackListGrouped[j].trainingData[i].questions[7].subquestions[0].rating);
               sumte2 = sumte2 + parseInt(this.feedBackListGrouped[j].trainingData[i].questions[7].subquestions[1].rating);
               sumte3 = sumte3 + parseInt(this.feedBackListGrouped[j].trainingData[i].questions[7].subquestions[2].rating);
               sumte4 = sumte4 + parseInt(this.feedBackListGrouped[j].trainingData[i].questions[7].subquestions[3].rating);

               
              
              if(this.feedBackListGrouped[j].trainingData[i].questions[2].answer == 'yes'){
                yesCount++;
              } else{
                noCount++;
                if(this.feedBackListGrouped[j].trainingData[i].questions[2].subquestions[0].comments != "")
                {
                    this.comment[j].push(this.feedBackListGrouped[j].trainingData[i].questions[2].subquestions[0].comments);
                }
              }
   

  }

          sum1 = sum1/this.feedBackListGrouped[j].trainingData.length;
          sum2 = sum2/this.feedBackListGrouped[j].trainingData.length;
          sum3 = sum3/this.feedBackListGrouped[j].trainingData.length;
          sum4 = sum4/this.feedBackListGrouped[j].trainingData.length;

          sumte1 = sumte1/this.feedBackListGrouped[j].trainingData.length;
          sumte2 = sumte2/this.feedBackListGrouped[j].trainingData.length;
          sumte3 = sumte3/this.feedBackListGrouped[j].trainingData.length;
          sumte4 = sumte4/this.feedBackListGrouped[j].trainingData.length;


          this.trainingContent[j] = new Array();
          this.trainingContent[j].push({"Topic": "Quality of Content","Rating":sum1.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Value Of Content","Rating":sum2.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Relavance of exercises","Rating":sum3.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Logical structute","Rating":sum4.toFixed(2)});

          this.trainingExperience[j] = new Array();
          this.trainingExperience[j].push({"Topic": "Recommendation of Training","Rating":sumte1.toFixed(2)});
          this.trainingExperience[j].push({"Topic": "Event Organization","Rating":sumte2.toFixed(2)});
          this.trainingExperience[j].push({"Topic": "Applicability","Rating":sumte3.toFixed(2)});
          this.trainingExperience[j].push({"Topic": "Overall Experience","Rating":sumte4.toFixed(2)});

          this.YesNoCount[j] = new Array();
          this.YesNoCount[j].push({value: 'Yes', count: yesCount});
          this.YesNoCount[j].push({value: 'No', count: noCount});

          this.drawGraph(1,j,this.trainingContent[j]);
          this.drawGraph(2,j,this.trainingExperience[j]);
          this.drawPieChart(3,j,this.YesNoCount[j]);
}
  }

  private drawGraph(QId,graphId, data) {
    this.initSvg('#svg'+QId+ graphId, data);
  }

  private initSvg(svgid, data) {
    this.svg = d3.select(svgid);
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
        this.initAxis(data);
}

private initAxis(data) {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(data.map((d) => d.Topic));
    this.y.domain([0, 6]);
    this.drawAxis(data);
}

private drawAxis(data) {
    this.g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3Axis.axisBottom(this.x));

    this.g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3Axis.axisLeft(this.y))
        .append('text')
        .attr('class', 'axis-title')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Rating');

    this.drawBars(data);
}

private drawBars(data) {

    const div = d3.select("body").append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

    this.g.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => this.x(d.Topic) )
        .attr('y', (d) => this.y(d.Rating) )
        .attr('width', this.x.bandwidth())
        .attr('height', (d) => this.height - this.y(d.Rating))
        .on('mouseover', (d) => {
            div.style('opacity', .9);
            div.html('<b>Rating: </b>' + d.Rating + '<br/><b>' + d.Topic+'</b>')
               .style('left', (d3.event.pageX) + 'px')
               .style('top', (d3.event.pageY - 28) + 'px');
  })
  .on('mouseout', (d) => {
              div.style('opacity', 0);
  });


}

private drawPieChart(QId,graphId, data){
  this.initPieSvg(QId,graphId);
  this.drawPie(data);
}

private initPieSvg(QId,graphId) {
  this.color = d3Scale.scaleOrdinal()
      .range(['#00A200', '#777777']);
  this.arc = d3Shape.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);
  this.labelArc = d3Shape.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);
  this.pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.count);
  this.svg = d3.select('#svg'+QId+graphId)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
}

private drawPie(data) {
  let g = this.svg.selectAll('.arc')
      .data(this.pie(data))
      .enter().append('g')
      .attr('class', 'arc');
  g.append('path').attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.value) );
  g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
      .attr('dy', '-1em')
      .text((d: any) => d.data.value +"("+d.data.count+")");
}

}
