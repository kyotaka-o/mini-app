class ArticlesController < ApplicationController
  def index
    @article = Article.new
    @articles = Article.includes(:user).order("updated_at DESC")
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)
    if @article.save
      redirect_to root_path
    else
      render :new
    end
  end

  def destroy
    article = Article.find(params[:id])
    article.destroy if article.user_id == current_user.id 
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
    redirect_to root_path
  end

  private
  def article_params
    params.require(:article).permit(:title, :content).merge(user_id: current_user.id)
  end

end
