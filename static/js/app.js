// read json with d3
d3.json('../../samples.json').then(function(data){
    let names = data.names,
        metadata = data.metadata,
        samples = data.samples;
    console.log(samples);

    //append the left dropdown with each of the names in the dataset
    names.forEach(name => {
        d3.select('#selDataset').append('option')
            .attr("value", name)
            .text(name)
    });

    //set otu_ids and sample values as variables
    function findBarData(index) {
        let OTUdata = {};
        OTUdata['IDs'] = samples[index]["otu_ids"].slice(0,11).map(i => `OTU ${i}`);
        OTUdata['values'] = samples[index]["sample_values"].slice(0,11);
        return OTUdata;
    } 
    
    function findBubbleData(index) {
        let OTUdata = {};
        OTUdata['IDs'] = samples[index]["otu_ids"];
        OTUdata['values'] = samples[index]["sample_values"];
        return OTUdata;
    } 

    // generate traces
    let traceBar = { //bar trace
        y: findBarData(0).IDs,
        x: findBarData(0).values,
        type: 'bar',
        orientation: "h"
    };

    let traceBubble = { //scatter plot trace
        x: findBubbleData(0).IDs,
        y: findBubbleData(0).values,
        type: 'scatter',
        mode: "markers",
        marker: {
            size: findBubbleData(0).values,
            color: findBubbleData(0).IDs,
        }
    };

    // set layout settings
    let barLayout = {
        title: 'Top OTUs per Subject Sample',
        xaxis: {
            title: "Sample Value"
        },
        yaxis: {
            title: "OTU ID"
        },
    }

    let bubbleLayout = {
        title: 'All OTUs in Sample',
        xaxis: {
            title: "OTU ID"
        },
        yaxis: {
            title: "Sample Value"
        },
    }

    // Create new plots

    Plotly.newPlot('bar', [traceBar], barLayout);
    Plotly.newPlot("bubble", [traceBubble], bubbleLayout);

    // barchart listener function and d3 selection to bind function
    
    d3.selectAll("#selDataset").on("change", updateBar); //listener for dropdown selections

    function updateBar(){
        let menuSelection = d3.select("#selDataset").property("value"); // save the selected value in variable
        let selectionIndex = names.findIndex(element => element == menuSelection); // find the index of the selected variable
        // restyle the bar plot
        Plotly.restyle("bar", "y", [findBarData(selectionIndex).IDs]);
        Plotly.restyle("bar", "x", [findBarData(selectionIndex).values]);
        //restyle the scatter plot
        Plotly.restyle("bubble", "x", [findBubbleData(selectionIndex).IDs]);
        Plotly.restyle("bubble", "y", [findBubbleData(selectionIndex).values]);
        console.log(findBubbleData(selectionIndex).values)
    };

}
);

// optionChanged function for updating value of dropdown
function optionChanged() {
    let selection = document.getElementById("selDataset");
    selection.text = selection.value
}