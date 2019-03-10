from bs4 import BeautifulSoup
from setup import simple_get

def get_ynet_data():
    """
    Parse the page where the data of ynet news and take the main headers
    """
    ynet_url = 'https://ynet.co.il/home/0,7340,L-8,00.html'
    response = simple_get(ynet_url)

    if response is not None:
        soup = BeautifulSoup(response, 'html.parser')
        titles = []
        titles_squares = soup.find_all("div", class_="str3s_txt")
        for ts in titles_squares:
            titles.append({
                'title': ts.find("div", class_="title").text,
                'sub_title': ts.find("div", class_="sub_title").text
            })
        return titles

    # Raise an exception if we failed to get any data from the url
    raise Exception('Error retrieving contents at {}'.format(ynet_url))

def get_walla_data():
    """
    Parse the page where the data of walla news and take the main headers
    """
    walla_url = 'https://www.walla.co.il/'
    response = simple_get(walla_url)

    if response is not None:
        soup = BeautifulSoup(response, 'html.parser')
        titles = []
        titles_squares = [data.find_all("article",  {"class": ["article", "fc", "common-article"]}) for data in soup.find_all("section", class_="editor-selections")]
        for ts in titles_squares[0]:
            titles.append({
                'title': ts.find("span", class_="text").text,
                'sub_title': ts.find("p").text
            })
        return titles

    # Raise an exception if we failed to get any data from the url
    raise Exception('Error retrieving contents at {}'.format(walla_url))

print('כותרות ראשיות Ynet')
print(get_ynet_data())
print('כותרות ראשיות Walla')
print(get_walla_data())