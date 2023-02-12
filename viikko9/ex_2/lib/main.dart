import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Current weather'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  double temperature = 0.0;
  int humidity = 0;
  double windSpeed = 0.0;
  String city = "Hello";

  @override
  void initState() {
    super.initState();
    // Call the `_fetchWeatherData` method when the component is initialized
    _fetchWeatherData();
  }

  // Method to fetch weather data from an API
  _fetchWeatherData() async {
    final response = await http.get(
      Uri.parse('https://weatherapi-com.p.rapidapi.com/forecast.json')
          .replace(queryParameters: {
        'q': 'Helsinki',
        'days': '3',
      }),
      headers: {
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        'X-RapidAPI-Key': 'ac04bf2660msh8787e6ecda958ddp19a5d4jsn923efe2a39f9',
      },
    );
    if (response.statusCode == 200) {
      final weatherData = json.decode(response.body);
      setState(() {
        temperature = weatherData['current']['temp_c'];
        humidity = weatherData['current']['humidity'];
        windSpeed = weatherData['current']['wind_kph'];
        city = weatherData['location']['name'];
      });
    } else {
      print(response.statusCode);
      throw Exception('Failed to load weather data');
    }
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            Text(
              'Current weather in $city',
            ),
            Text(
              'Temperature: $temperature',
            ),
            Text(
              'Humidity: $humidity',
            ),
            Text(
              'Wind speed: $windSpeed',
            ),
            ElevatedButton(
                child: const Text("Hae säätiedot"),
                onPressed: () => _fetchWeatherData()),
          ],
        ),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
