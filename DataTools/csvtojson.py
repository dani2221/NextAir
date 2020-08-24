import csv 
import json

data_paths = [
    r'C:\Users\danil\nextair\DataTools\Data\centar,-skopje, macedonia-air-quality (1).csv',
    r'C:\Users\danil\nextair\DataTools\Data\bitola-2,-macedonia-air-quality.csv',
    r'C:\Users\danil\nextair\DataTools\Data\gazi-baba, skopje, macedonia-air-quality.csv',
    r'C:\Users\danil\nextair\DataTools\Data\gostivar,-macedonia-air-quality.csv',
    r'C:\Users\danil\nextair\DataTools\Data\karposh,-skopje, macedonia-air-quality.csv',
    r'C:\Users\danil\nextair\DataTools\Data\kavadarci,-macedonia-air-quality.csv',
    r'C:\Users\danil\nextair\DataTools\Data\kicevo,-macedonia-air-quality.csv',
    r'C:\Users\danil\nextair\DataTools\Data\kocani,-macedonia-air-quality.csv',
    r'C:\Users\danil\nextair\DataTools\Data\kumanovo,-macedonia-air-quality.csv',
    r'C:\Users\danil\nextair\DataTools\Data\lazaropole,-macedonia-air-quality.csv',
    r'C:\Users\danil\nextair\DataTools\Data\lisice,-macedonia-air-quality (1).csv',
    r'C:\Users\danil\nextair\DataTools\Data\miladinovci,-macedonia-air-quality.csv',
    r'C:\Users\danil\nextair\DataTools\Data\rektorat,-skopje, macedonia-air-quality.csv',
    r'C:\Users\danil\nextair\DataTools\Data\strumica,-macedonia-air-quality.csv',
    r'C:\Users\danil\nextair\DataTools\Data\tetovo,-macedonia-air-quality.csv',
    r'C:\Users\danil\nextair\DataTools\Data\veles-2,-macedonia-air-quality.csv'
]
station_names = [
'centar',
'bitola',
'gazi-baba',
'gostivar',
'karposh',
'kavadarci',
'kicevo',
'kocani',
'kumanovo',
'lazaropole',
'lisice',
'miladinovci,',
'rektorat',
'strumica',
'tetovo',
'veles']

output = {'stations': {}}

for idx,doc in enumerate(data_paths):
    with open(doc) as csv_file:
        station = {station_names[idx]: {}}
        for index,row in enumerate(csv.DictReader(csv_file)):
            if index>370:
                break
            data =row[' pm25']
            if row[' pm25'] in (None,""):
                data =  " "
            station[station_names[idx]].update({row['date']:data});
        output['stations'].update(station)

output_json = json.dumps(output).replace('/',':').strip()
print(output_json)
with open(r'C:\Users\danil\nextair\DataTools\Data\aqi_data.json', 'w') as f:
    f.write(output_json)
            