import pandas as pd
import numpy as np
import json
import csv

#Read in original data file.
raw_data = pd.read_csv("Patient_Characteristics_Survey_PCS_2015.csv")

print("\nNumber of instances and columns before preprocessing data:\n")
print(raw_data.shape)

#Replace "UNKNOWN" values with NaN.
raw_data = raw_data.replace("UNKNOWN", np.nan)

#Randomize data
raw_data.reindex(np.random.permutation(raw_data.index))

#Drop all rows that have NaN values in at least one cell.
raw_data = raw_data.dropna()

#Condense data to only include the following attributes:
raw_data = raw_data[['Mental Illness','Alcohol Related Disorder','Drug Substance Disorder',
					'High Blood Pressure','Diabetes','Obesity','Heart Attack','Stroke',
					'Pulmonary Asthma','Kidney Disease','Liver Disease','Cancer']]

#Replace categorical cells with 1s and 0s.
raw_data = raw_data.replace("NO", 0.0)
raw_data = raw_data.replace("YES", 1.0)

print("\nNumber of instances and columns after processing:\n")
print(raw_data.shape)

#Get resulting correlation matrix:
corr_matrix = raw_data.corr()
result = raw_data.corr()
print("\nCorrelation Matrix has now been generated.\n")

#Transfer data to new CSV
raw_data.to_csv('parsed_data.csv', index=False)

#Transfer data to new JSON file
csvfile = open('parsed_data.csv', 'r')
jsonfile = open('parsed_data.json', 'w')
fieldnames = ('Mental Illness','Alcohol Related Disorder','Drug Substance Disorder',
			'High Blood Pressure','Diabetes','Obesity','Heart Attack','Stroke',
			'Pulmonary Asthma','Kidney Disease','Liver Disease','Cancer')

#Create csv reader and skip header row.
reader = csv.DictReader(csvfile, fieldnames)
next(reader)

for row in reader:
	json.dump(row, jsonfile)
	jsonfile.write('\n')
print("\nJSON file has now been generated.\n")

#Transfer correlation matrix to new CSV
corr_matrix.to_csv('correlation_matrix.csv', index=False)
result.to_csv('correlation_matrix.csv', index=False)
