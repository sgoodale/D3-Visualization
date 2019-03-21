import pandas as pd
import numpy as np
import json
import csv
import matplotlib.pyplot as plt

def rm_unknown_vals(df):
	#Remove any ambiguous values from columns with NaN.
	df = df.replace("UNKNOWN", np.nan)
	df['Race'] = df['Race'].replace("UNKNOWN RACE", np.nan)
	df['Transgender'] = df['Transgender'].replace("CLIENT DIDN'T ANSWER", np.nan)
	#Consider only Mental Illness = "YES".
	df['Mental Illness'] = df['Mental Illness'].replace("NO", np.nan)

	#Drop all rows that have NaN values in at least one cell.
	df = df.dropna()

	for i in df.index:
		race_val = df.loc[i, 'Race']
		hisp_val = df.loc[i, 'Hispanic Ethnicity']
		if race_val == 'OTHER':
			if hisp_val == 'YES':
				df.loc[i, 'Race'] = 'HISPANIC'
			else:
				df.loc[i, 'Race'] = np.nan
	
	#Drop all rows that have NaN values in at least one cell.
	df = df.dropna()
	
	#Normalize Data
	df['Race'] = df['Race'].replace("WHITE ONLY", "WHITE")
	df['Race'] = df['Race'].replace("BLACK ONLY", "BLACK")
	df['Transgender'] = df['Transgender'].replace("NO, NOT TRANSGENDER", "NO")
	df['Transgender'] = df['Transgender'].replace("YES, TRANSGENDER", "YES")

	#Condense data to only include the following attributes:
	df = df[['Mental Illness', 'Age Group', 'Race', 'Hispanic Ethnicity', 'Sex', 'Transgender', 'Veteran Status', 'Alcohol Related Disorder','Drug Substance Disorder',
					'High Blood Pressure','Diabetes','Obesity','Heart Attack','Stroke',
					'Pulmonary Asthma','Kidney Disease','Liver Disease','Cancer']]
	return df

def print_stats(df):
	#Count occurrences of categorical data
	print("Statistics for individuals with Mental Illness:\n")
	print("RACE:\n--------------")
	print(str(df['Race'].value_counts())+"\n")
	print("SEX:\n--------------")
	print(str(df['Sex'].value_counts())+"\n")
	print("AGE:\n--------------")
	print(str(df['Age Group'].value_counts())+"\n")
	print("IDENTIFY AS TRANS:\n--------------")
	print(str(df['Transgender'].value_counts())+"\n")
	print("ARE A VETERAN:\n--------------")
	print(str(df['Veteran Status'].value_counts())+"\n")

#Read in original data file.
raw_data = pd.read_csv("Patient_Characteristics_Survey_PCS_2015.csv")

print("\nNumber of instances and columns before preprocessing data: "+str(raw_data.shape)+"\n")

#Remove unknown or ambiguous values in data.
raw_data = rm_unknown_vals(raw_data)

print("\nNumber of instances and columns after processing data: "+str(raw_data.shape)+"\n")

print_stats(raw_data)

#Transfer data to new CSV
raw_data.to_csv('disparity_groups.csv', index=False)