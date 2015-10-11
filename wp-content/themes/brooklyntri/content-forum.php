<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

$infobox = get_fields( get_the_ID() );

$forum = get_forum_id_by_url();

?>
				<section class="forum-area">
					<header>
						<?php the_title('<h1>','</h1>'); ?>
						<?= $infobox['intro'] ?>
					</header>

					<div class="divider">
						<div class="holder"></div>
					</div>
					<?php //echo the_content(); ?>
					<form action="#" class="search-form">
						<fieldset>
							<legend class="hidden">search form</legend>
							<input class="button" type="submit" value="SEARCH">
							<div class="input-holder">
								<label for="search" class="hidden">search</label>
								<input class="search" type="search" id="search">
							</div>
						</fieldset>
					</form>

				    <div class="post" id="post-<?php the_ID(); ?>">
				        <div class="entry forum-table">
							<table>
								<caption class="hidden">this is forum table</caption>
								<thead>
									<tr>
										<th class="col1">Forum</th>
										<th class="col2">Topics</th>
										<th class="last">Posts</th>
									</tr>
								</thead>
								<tbody>
<?php if ($forum == 'forum'):
	$forums = get_all_forums();
	foreach ( $forums as $f ):
		$rel = get_post_topic_counts($f->forum_id);
?>
								<tr>
									<td class="col1">
										<h2><a href="<?= esc_url( get_permalink( $post->ID ) . '/' . $f->forum_slug ); ?>"><?= esc_html( $f->forum_name ) ?></a></h2>
										<p><?= esc_html( $f->forum_desc ) ?></p>
									</td>
									<td class="col2"><span><?= $rel['topics'] ? $rel['topics'] : 0 ?></span></td>
									<td class="last"><em><?= $rel['posts'] ? $rel['posts'] : 0 ?></em></td>
								</tr>
<?php endforeach; endif; ?>
								</tbody>
							</table>
				        </div>
				    </div>


				</section>