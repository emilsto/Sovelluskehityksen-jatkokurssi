package com.example.newsfetcher;


import android.content.Context;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;

import java.util.List;

//Business facade singleton, for serving UI layer
public class NewsDataManager{
    private static NewsDataManager instance;
    private static Context context;
    private List<NewsDataManagerListener> listeners;
    private NewsData fetchedNewsData = new NewsData(5);
    private boolean dataFetched =  false;

    private String urlString = "https://api.il.fi/v1/articles/iltalehti/lists/popular?limit=";
    private RequestQueue requestQueue;

    private NewsDataManager( Context aContext ) {
        context = aContext;
        requestQueue = Volley.newRequestQueue( context );
    }
    //singleton
    public static NewsDataManager getInstance(Context aContext) {
        if (instance == null) {
            instance = new NewsDataManager(aContext);
        }
        return instance;
    }

    void addListener(NewsDataManagerListener listener){
        listeners.add(listener);
    }

    public void reloadNewsData (int newsItems ){
        //take the count of requested items and return to user
    }

    public NewsData getCurrentNews(int newsCount) {
        //get the latest news, amount of news determined by user
        //add newsCount to url
        urlString += newsCount;

        if (dataFetched) {
            return fetchedNewsData;
        }
        else {
            for ( NewsDataManagerListener l : listeners){
                l.NewsUpdated(fetchedNewsData);
            }
        }
        return fetchedNewsData;
    }


    //talletetaan sovelluksen data tierostoon
    void saveAppData() {

    }


}
