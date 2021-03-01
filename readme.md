# Restaurant Data Processing
## What's included
- A jupyter notebook where I explore and visualize interesting portions of the provided datasets
- Folder of Python functions used for processing and augmenting the initial datasets. More detailed information is provided in the supporting code section of this readme.
- Prototype visualization framework with one finished example. This project lives in the cloudy folder with more information included in the project readme file.

## Supporting Code:
### dataframes:
This is where the table processing logic lives for each of the different table types (order, menu, performance, ngram).

### io_operations:
Utilities for downloading and uploading data.

### order:
Order class for calculating parallel cook time and pretty printing order data.

### util:
Helper functions for ngram and window brute force calculations.

### clean:
Processed dataframes for table types that need processing (order, performance, ngram).

### process_datasets:
Runs the processing pipeline and outputs the final json files into clean folder.

## Included Business Metrics
- Menu item performance
- Operational efficiency by day, hour
- Order volume by day, hour
- Items commonly ordered together

## Pipeline
The order service would send the raw orders to a database where a worker of some sort would process the order data into a consumable format for other applications. 

The processed data could be stored in another DB table or an in-memory database for quicker client reads depending on how important latency is for the application. 

## Assumptions
The end user has a computer with Docker, Python, and Jupyter. The end user is also reasonably technical.

