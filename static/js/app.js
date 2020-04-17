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

    // generate traces
    let trace1 = {
        x: samples[0]["otu_ids"].slice(0,11).map(i => `OTU ${i}`), //maps the OTU ids array to a string array to use as labels
        y:samples[0]["sample_values"].slice(0,11),
        type: 'bar'
    };

    let layout = {
        title: 'Top OTUs per Subject Sample',
        xaxis: {
            title: "OTU ID"
        },
        yaxis: {
            title: "Sample Value"
        },

    }

    // make chartData variable with list of traces and draw with newPlot
    let chartData = [trace1]
    Plotly.newPlot('bar', chartData, layout);

    // barchart listener function and d3 selection to bind function
    
    d3.selectAll("#selDataset").on("change", updateBar); //listener for dropdown selections

    function updateBar(){
        let menuSelection = d3.select("#selDataset").property("value"); // save the selected value in variable
        let selectionIndex = names.findIndex(element => element == menuSelection); // find the index of the selected variable
        let newBarX = samples[selectionIndex]["otu_ids"].slice(0, 11).map(i => `OTU ${i}`),
            newBarY = samples[selectionIndex]["sample_values"].slice(0, 11);

        Plotly.restyle("bar", "x", [newBarX]);
        Plotly.restyle("bar", "y", [newBarY]);
    };

}
);

// optionChanged function for updating value of dropdown
function optionChanged() {
    let selection = document.getElementById("selDataset");
    selection.text = selection.value
}