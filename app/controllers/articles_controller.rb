class ArticlesController < ApplicationController
 
  def index
    @article = Article.new
    @articles = Article.includes(:user).order("updated_at DESC")
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.create(article_params)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def destroy
    article = Article.find(params[:id])
    if article.user_id == current_user.id 
      article.destroy
    end 
    redirect_to root_path
  end

  def edit
    @article = Article.find(params[:id])
  end

  def update
    article = Article.find(params[:id])
    if article.user_id == current_user.id 
      article.update(article_params) 
    end
    redirect_to article_path(article)
  end

  def show 
    @article = Article.find(params[:id])
  end

  private
  def article_params
    params.require(:article).permit(:title, :content,:image).merge(user_id: current_user.id)
  end
end
