# Next Air - Air pollution prediction and forecast for North Macedonia using Machine Learning

## Contents
- Data tools for extracting and updating data for the firebase database ✅
- Machine learning model that predicts next day AQI with mean absolute error of 13 points ✅
###### Display next week AQI forecast and an interactive map that estimates the AQI for the user's location:
- A React.js web-app
- A React-native mobile app

## Machine learning model
The regression algorithm was trained with 5 features (rain, wind, temprature, previous day AQI, previous year AQI) and more that 10000 rows of historical data from all the provided stations in North Macedonia.

## Data
- The historical AQI data was provided by https://aqicn.org
- The historical weather data was provided by https://www.ncei.noaa.gov/

## Tools
- Tensorflow lite and tensorflow.js for the android and web app respectively.
- Firebase Realtime Database
- React.js and React-native for the apps

