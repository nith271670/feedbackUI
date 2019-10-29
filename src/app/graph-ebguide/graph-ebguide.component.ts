import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Axis from 'd3-axis';
import { HttpService } from '../shared/http.service';
import * as _ from "lodash";


@Component({
  selector: 'app-graph-ebguide',
  templateUrl: './graph-ebguide.component.html',
  styleUrls: ['./graph-ebguide.component.css']
})
export class GraphEbguideComponent implements OnInit {
    feedBackList = [];

    feedBackListGrouped = [];
    activeTab = 0;
    trainingContent = [];
    trainingpresentation = [];
    trainingExperience = [];
    trainingExperiencea = [];
    trainingExperienceb = [];
    trainingQualification = [];
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
    feedBackListTabulated = [];

  constructor(private httpService: HttpService) { 
    this.width = 400 - this.margin.left - this.margin.right;
        this.height = 300 - this.margin.top - this.margin.bottom;
        this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit() {
    this.httpService.getEBGuideFeedbackList().subscribe(response => {
      console.log(response);
      this.feedBackListTabulated = response as [];
      // this.feedBackListGrouped = this.groupBy(this.feedBackListTabulated[0].formValue, 'training', 'trainingName', 'trainingData');
      // console.log(this.feedBackListGrouped);
 console.log(this.feedBackListTabulated)
 

      // this.feedBackListTabulated.pop();
      // console.log(this.feedBackListTabulated);
      // console.log(this.feedbackWholeData);
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
    for(let j=0;j<this.feedBackListTabulated.length;j++){
      var sum0 = 0;
      var sum1 = 0;
      var sum2 = 0;
      var sum3 = 0;
      var sum4 = 0;
      var sum5 = 0;
      var sum6 = 0;
      var sum7 = 0;
      var sum8 = 0;
      var sum9 = 0;
      var sum10 = 0;
      var sum11 = 0;
      var sum12 = 0;
      var sum13 = 0;
      var sum14 = 0;
      var sum15 = 0;

      var sumd0 = 0;
      var sumd1 = 0;
      var sumd2 = 0;
      var sumd3 = 0;
      var sumd4 = 0;
      var sumd5 = 0;
      var sumd6 = 0;
      var sumd7 = 0;
      var sumd8 = 0;
      var sumd9 = 0;
      var sumd10 = 0;
      var sumd11 = 0;
      var sumd12 = 0;
      var sumd13 = 0;
      var sumd14 = 0;
      var sumd15 = 0;

      

      var suma0 = 0;
      var suma1 = 0;
      var suma2 = 0;

      var sumb0 = 0;
      var sumb1 = 0;
      var sumb2 = 0;

      var sumc0 = 0;
      var sumc1 = 0;
      var sumc2 = 0;

     


      var sumtrq = [];
      var yesCount = 0;
      var noCount = 0;
      
      this.comment[j] = new Array();

      var ratingCount = [];

    
         

               sum0 = sum0 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[0].content_rating);
               sum1 = sum1 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[1].content_rating);
               sum2 = sum2 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[2].content_rating);
               sum3 = sum3 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[3].content_rating);
               sum4 = sum4 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[4].content_rating);
               sum5 = sum5 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[5].content_rating);
               sum6 = sum6 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[6].content_rating);
               sum7 = sum7 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[7].content_rating);
               sum8 = sum8 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[8].content_rating);
               sum9 = sum9 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[9].content_rating);
               sum10 = sum10 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[10].content_rating);
               sum11 = sum11 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[11].content_rating);
               sum12 = sum12 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[12].content_rating);
               sum13 = sum13+ parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[13].content_rating);
               sum14 = sum14 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[14].content_rating);
               sum15 = sum15+ parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[15].content_rating);


               sumd0 = sumd0 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[0].presentation_rating);
               sumd1 = sumd1 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[1].presentation_rating);
               sumd2 = sumd2 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[2].presentation_rating);
               sumd3 = sumd3 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[3].presentation_rating);
               sumd4 = sumd4 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[4].presentation_rating);
               sumd5 = sumd5 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[5].presentation_rating);
               sumd6 = sumd6 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[6].presentation_rating);
               sumd7 = sumd7 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[7].presentation_rating);
               sumd8 = sumd8 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[8].presentation_rating);
               sumd9 = sumd9 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[9].presentation_rating);
               sumd10 = sumd10 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[10].presentation_rating);
               sumd11 = sumd11 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[11].presentation_rating);
               sumd12 = sumd12 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[12].presentation_rating);
               sumd13 = sumd13+ parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[13].presentation_rating);
               sumd14 = sumd14 + parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[14].presentation_rating);
               sumd15 = sumd15+ parseInt(this.feedBackListTabulated[j].formValue.questions[0].subQuestions[15].presentation_rating);


               suma0 = suma0 + parseInt(this.feedBackListTabulated[j].formValue.questions[2].subQuestions[0].presentation_rating);
               suma1 = suma1 + parseInt(this.feedBackListTabulated[j].formValue.questions[2].subQuestions[1].presentation_rating);
               suma2 = suma2 + parseInt(this.feedBackListTabulated[j].formValue.questions[2].subQuestions[2].presentation_rating);

               sumb0 = sumb0 + parseInt(this.feedBackListTabulated[j].formValue.questions[3].subQuestions[0].presentation_rating);
               sumb1 = sumb1 + parseInt(this.feedBackListTabulated[j].formValue.questions[3].subQuestions[1].presentation_rating);
               sumb2 = sumb2 + parseInt(this.feedBackListTabulated[j].formValue.questions[3].subQuestions[2].presentation_rating);

               sumc0 = sumc0 + parseInt(this.feedBackListTabulated[j].formValue.questions[4].subQuestions[0].presentation_rating);
               sumc1 = sumc1 + parseInt(this.feedBackListTabulated[j].formValue.questions[4].subQuestions[1].presentation_rating);
               sumc2 = sumc2 + parseInt(this.feedBackListTabulated[j].formValue.questions[4].subQuestions[2].presentation_rating);

               
               
              

              //  if(i==0){
              //   ratingCount[j] = 0;
              //  }

              //  if( this.feedBackListGrouped[j].trainingData[i].questions[1].subquestions[0].trainerrating != undefined)
              //  {
              //    if(i==0){
              //     ratingCount[j] = 0;
              //    }
              //   ratingCount[j] = ratingCount[j] +1;
              //   var numTrainers = this.feedBackListGrouped[j].trainingData[i].questions[1].subquestions[0].trainerrating.length;
                

                // for(var p=0;p<numTrainers;p++){
                //   sumtrq[p] = [];
                //   for(var k=0;k<4;k++){
                //       if(k==0){
                //         sumtrq[p][k] = 0;
                //       }
                //       sumtrq[p][k] = sumtrq[p][k] + parseInt(this.feedBackListGrouped[j].trainingData[i].questions[1].subquestions[k].trainerrating[p].rating);
                //     }
                //   }

                // for(var k=0;k<numTrainers;k++){

                //     if(sumtrq[k]==undefined){
                //       sumtrq[k] = [];
                //       sumtrq[k][0] = 0;
                //       sumtrq[k][1] = 0;
                //       sumtrq[k][2] = 0;
                //       sumtrq[k][3] = 0;
                //     }
                    

                   

                  
              //     sumtrq[k][0] = sumtrq[k][0] + parseInt(this.feedBackListGrouped[j].trainingData[i].questions[1].subquestions[0].trainerrating[k].rating);
              //     sumtrq[k][1] = sumtrq[k][1] + parseInt(this.feedBackListGrouped[j].trainingData[i].questions[1].subquestions[1].trainerrating[k].rating);
              //     sumtrq[k][2] = sumtrq[k][2] + parseInt(this.feedBackListGrouped[j].trainingData[i].questions[1].subquestions[2].trainerrating[k].rating);
              //     sumtrq[k][3] = sumtrq[k][3] + parseInt(this.feedBackListGrouped[j].trainingData[i].questions[1].subquestions[3].trainerrating[k].rating);


              //   }
               

              //  }

              

              // if(this.feedBackListGrouped[j].trainingData[i].questions[2].answer == 'yes'){
              //   yesCount++;
              // } else{
              //   noCount++;
              //   if(this.feedBackListGrouped[j].trainingData[i].questions[2].subquestions[0].comments != "")
              //   {
              //       this.comment[j].push(this.feedBackListGrouped[j].trainingData[i].questions[2].subquestions[0].comments);
              //   }
              // }

  //             // console.log(sumtrq);

  
  // // console.log(this.feedBackListGrouped[j].trainingName)
  // // console.log(sumtrq);
  // // console.log(ratingCount[j]);
 
          // sum1 = sum1/this.feedBackListGrouped[j].trainingData.length;
          // sum2 = sum2/this.feedBackListGrouped[j].trainingData.length;
          // sum3 = sum3/this.feedBackListGrouped[j].trainingData.length;
          // sum4 = sum4/this.feedBackListGrouped[j].trainingData.length;

          // sumte1 = sumte1/this.feedBackListGrouped[j].trainingData.length;
          // sumte2 = sumte2/this.feedBackListGrouped[j].trainingData.length;
          // sumte3 = sumte3/this.feedBackListGrouped[j].trainingData.length;
          // sumte4 = sumte4/this.feedBackListGrouped[j].trainingData.length;

          // this.trainingQualification[j] = [];
          // for(var p = 0;p<sumtrq.length;p++){
          //   this.trainingQualification[j][p] = new Array();
          //   sumtrq[p][0] = sumtrq[p][0]/ratingCount[j];
          //   sumtrq[p][1] = sumtrq[p][1]/ratingCount[j];
          //   sumtrq[p][2] = sumtrq[p][2]/ratingCount[j];
          //   sumtrq[p][3] = sumtrq[p][3]/ratingCount[j];
          // if( this.feedBackListGrouped[j].trainingData[this.feedBackListGrouped[j].trainingData.length-1].questions[1].subquestions[0].trainerrating[p] != undefined)
          // {
          //   this.trainingQualification[j][p].push({"name":this.feedBackListGrouped[j].trainingData[this.feedBackListGrouped[j].trainingData.length-1].questions[1].subquestions[0].trainerrating[p].name,"Topic": "Presentation Skills","Rating":sumtrq[p][0].toFixed(2)});
          //   this.trainingQualification[j][p].push({"name":this.feedBackListGrouped[j].trainingData[this.feedBackListGrouped[j].trainingData.length-1].questions[1].subquestions[0].trainerrating[p].name,"Topic": "Understandability","Rating":sumtrq[p][1].toFixed(2)});
          //   this.trainingQualification[j][p].push({"name":this.feedBackListGrouped[j].trainingData[this.feedBackListGrouped[j].trainingData.length-1].questions[1].subquestions[0].trainerrating[p].name,"Topic": "Product expertise","Rating":sumtrq[p][2].toFixed(2)});
          //   this.trainingQualification[j][p].push({"name":this.feedBackListGrouped[j].trainingData[this.feedBackListGrouped[j].trainingData.length-1].questions[1].subquestions[0].trainerrating[p].name,"Topic": "Interaction","Rating":sumtrq[p][3].toFixed(2)});
            
          //   }
            
          // }

          
          this.trainingContent[j] = new Array();
          this.trainingContent[j].push({"Topic": "Architectural overview","Rating":sumd0.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Components of the GUI","Rating":sumd1.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Creating your first EB GUIDE model","Rating":sumd2.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Adding behavior to your EB GUIDE model","Rating":sumd3.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Adding behavior to your EB GUIDE model","Rating":sumd4.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Working with templates","Rating":sumd5.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Adding more functionality using widget features","Rating":sumd6.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Creating a scrollable list with dynamic content","Rating":sumd7.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Enhancing your EB GUIDE model with animations","Rating":sumd8.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Adding conditional behavior","Rating":sumd9.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Modeling go-back functionality with history states","Rating":sumd10.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Modeling pop-ups with dynamic state machines","Rating":sumd11.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Working with multiple state machines","Rating":sumd12.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Dealing with focus and key input features","Rating":sumd13.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Adding support for multiple languages","Rating":sumd14.toFixed(2)});
          this.trainingContent[j].push({"Topic": "Working with EB GUIDE Speech","Rating":sumd15.toFixed(2)});

          this.trainingpresentation[j] = new Array();
          this.trainingpresentation[j].push({"Topic": "Architectural overview","Rating":sum0.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Components of the GUI","Rating":sum1.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Creating your first EB GUIDE model","Rating":sum2.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Adding behavior to your EB GUIDE model","Rating":sum3.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Adding behavior to your EB GUIDE model","Rating":sum4.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Working with templates","Rating":sum5.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Adding more functionality using widget features","Rating":sum6.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Creating a scrollable list with dynamic content","Rating":sum7.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Enhancing your EB GUIDE model with animations","Rating":sum8.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Adding conditional behavior","Rating":sum9.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Modeling go-back functionality with history states","Rating":sum10.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Modeling pop-ups with dynamic state machines","Rating":sum11.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Working with multiple state machines","Rating":sum12.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Dealing with focus and key input features","Rating":sum13.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Adding support for multiple languages","Rating":sum14.toFixed(2)});
          this.trainingpresentation[j].push({"Topic": "Working with EB GUIDE Speech","Rating":sum15.toFixed(2)});



          this.trainingExperience[j] = new Array();
          this.trainingExperience[j].push({"Topic": "Content","Rating":suma0.toFixed(2)});
          this.trainingExperience[j].push({"Topic": "Practical use","Rating":suma1.toFixed(2)});
          this.trainingExperience[j].push({"Topic": "Comprehensibility","Rating":suma2.toFixed(2)});


          this.trainingExperiencea[j] = new Array();
          this.trainingExperiencea[j].push({"Topic": "Structuring","Rating":sumb0.toFixed(2)});
          this.trainingExperiencea[j].push({"Topic": "Time management","Rating":sumb1.toFixed(2)});
          this.trainingExperiencea[j].push({"Topic": "Overall rating","Rating":sumb2.toFixed(2)});

          this.trainingExperienceb[j] = new Array();
          this.trainingExperienceb[j].push({"Topic": "Organization","Rating":sumc0.toFixed(2)});
          this.trainingExperienceb[j].push({"Topic": "Location","Rating":sumc1.toFixed(2)});
          this.trainingExperienceb[j].push({"Topic": "Catering","Rating":sumc2.toFixed(2)});
          
         
          // this.YesNoCount[j] = new Array();
          // this.YesNoCount[j].push({value: 'Yes', count: yesCount});
          // this.YesNoCount[j].push({value: 'No', count: noCount});

          this.drawGraph(1,j,this.trainingContent[j],0);
          this.drawGraph(2,j,this.trainingpresentation[j],0);
          this.drawGraph(3,j,this.trainingExperience[j],0);
          this.drawGraph(4,j,this.trainingExperiencea[j],0);
          this.drawGraph(5,j,this.trainingExperienceb[j],0);
          // this.drawPieChart(3,j,this.YesNoCount[j]);
         
          // for(var p = 0;p<sumtrq.length;p++){
          //   this.drawGraph(4,p,this.trainingQualification[j][p],j);
          // }

}

// console.log(this.trainingQualification);

  }

  private drawGraph(QId,graphId, data,j) {

    if(QId == 6 ){
      if(j!=0){
        this.initSvg('#svg'+QId+j+ graphId, data);
        console.log('#svg'+QId+j+ graphId);
      }
      
    }
    else{
      this.initSvg('#svg'+QId+ graphId, data);
    }

    // if(QId == 4){
    //   console.log("QID"+QId);
    //   // console.log(data);
    // // }
  }

  private initSvg(svgid, data) {
 
    this.svg = d3.select(svgid);
    this.width =  +this.svg.attr('width') - this.margin.left - this.margin.right;
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
        .attr('y', 16)
        .attr('dy', '1em')
        .attr('text-anchor', 'end')
        .attr('fill','#eee' )
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
        .attr('fill', 'green')
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



