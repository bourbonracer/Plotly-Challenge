// Generate dropdown menu and base opening page data on first id
function init() {
    // Select HTML element
    var dropdown = d3.select("#selDataset")

    // Populating names for dropdown using names
    d3.json("../../data/samples.json").then((data) => {
        console.log(data);
        var namesid = data.names;
        console.log(namesid);
        namesid.forEach(name => {
            dropdown.append("option").text(name).property("value", name)
        });
    
    // Fill functions with default id top populate page upon opening
    openPage = namesid[0];
    barplot(openPage);
    bubble(openPage);
    demoInfo(openPage)
    });
}

// Bar plot
function barplot(select) {
    d3.json("../../data/samples.json").then((data) => {
        console.log(data);
    
    // Setting variables
    var samplesData = data.samples;
        console.log(samplesData);
    var sampleReturn = samplesData[0];
        console.log(sampleReturn);
    var filterSamples = samplesData.filter(object => object.id == select);
        console.log(filterSamples);
    var OTUid = sampleReturn.otu_ids;
        console.log(OTUid);
    var sampValue = sampleReturn.sample_values;
    var otuLabels = sampleReturn.otu_labels;

    // Slicing to pull top 10 OTUs
    var sliceOTU = OTUid.slice(0, 10).map(otuid => `OTU ${otuid}`).reverse();
        console.log(sliceOTU);
    var sliceSvalue = sampValue.slice(0, 10).reverse();
        console.log(sliceSvalue);
    var sliceLabel = otuLabels.slice(0, 10).reverse();
    
    // Build horizontal bar chart
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
        width: 500
    }

    Plotly.newPlot("bar", data, layout)
    });
}

// Bubble Chart
function bubble(select) {
    d3.json("../../data/samples.json").then((data) => {
        console.log(data);

    // Setting variables
    var samplesData = data.samples;
    var sampleReturn = samplesData[0];
    var filterSamples = samplesData.filter(object => object.id == select);
        console.log(filterSamples)
    var OTUid = sampleReturn.otu_ids;
    var sampValue = sampleReturn.sample_values;
    var otuLabels = sampleReturn.otu_labels;

    // Build bubble plot
    var trace2 = {
        x: OTUid,
        y: sampValue,
        text: otuLabels,
        xaxis: 'ID Number',
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

// Demographic Info Box
function demoInfo(select) {
    var demo = d3.select("#sample-metadata")
    d3.json("../../data/samples.json").then((data) => {
        console.log(data);
    
    // Set variables
    var metadata = data.metadata;
    var metaReturn = metadata[0];
    console.log(metaReturn);
    var filterMeta = metadata.filter(object => object.id == select);
        console.log(filterMeta);
        demo.html("");
    
    // Looping through for key and value, appending them to new h6 tag
    Object.entries(metaReturn).forEach(([key, value]) => {
        demo.append("h6").text(`${key}: ${value}`)
    })  
    });
}

// Update plots and demographic info when dropdown selection updated.
function optionChanged(updateSelect) {
    dropdownMenu(updateSelect);
    barplot(updateSelect);
    bubble(updateSelect);
    demoInfo(updateSelect)
}

init();