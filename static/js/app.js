function init() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(function(data) {
        var namesid = data.names;
        console.log(namesid);
        namesid.forEach(name => {
            dropdown.append("option").text(name).property("value", name)
        });
    openPage = namesid[0];
    barplot(openPage);
    bubble(openPage);
    });
}

function barplot(select) {
    d3.json("samples.json").then((data) => {
        console.log(data);

    var samplesData = data.samples;
        console.log(samplesData);
    var sampleReturn = samplesData[0];
        console.log(sampleReturn);
    var filterSamples = samplesData.filter(object => object.id == select);
        console.log(filterSamples);
    var OTUid = sampleReturn.otu_ids;
        console.log(OTUid);
    var sliceOTU = OTUid.slice(0, 10).map(otuid => `OTU ${otuid}`).reverse();
        console.log(sliceOTU);
    var sampValue = sampleReturn.sample_values;
    var sliceSvalue = sampValue.slice(0, 10).reverse();
        console.log(sliceSvalue);
    var otuLabels = sampleReturn.otu_labels;
    var sliceLabel = otuLabels.slice(0, 10).reverse();

    var trace1 = {
        x: sliceSvalue,
        y: sliceOTU,
        text: sliceLabel,
        type: "bar",
        orientation: "h"
    };
    var data = [trace1];
    
    var layout = {
        height: 500,
        width: 400
    }

    Plotly.newPlot("bar", data, layout)
    });
}
barplot();

function bubble(select) {
    d3.json("samples.json").then((data) => {
        console.log(data);

    var samplesData = data.samples;
    var sampleReturn = samplesData[0];
    var filterSamples = samplesData.filter(object => object.id == select);
        console.log(filterSamples)
    var OTUid = sampleReturn.otu_ids;
    var sampValue = sampleReturn.sample_values;
    var otuLabels = sampleReturn.otu_labels;


    var trace2 = {
        x: OTUid,
        y: sampValue,
        text: otuLabels,
        mode: 'markers',
        marker: {
            size: sampValue,
            color:OTUid,

        }
    };
    var data = [trace2];
    
    var layout = {
            title: 'Belly Button Bacteria Amount',
            showlegend: false,
            height: 600,
            width: 1200
    }

    Plotly.newPlot("bubble", data, layout)
    });
}

function optionChanged(updateSelection) {
    barplot(updateSelection);

}

init();